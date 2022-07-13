import { CancellationToken } from './modules/cancellationToken.js';

export class Scsaver {
    // Defaults for options
    defaults = {
        timeout: null,
        waitTime: 3200,
        events: ['keydown', 'mousemove', 'touchstart', 'click'],
        showFadeTime: 1000,
        hideFadeTime: 1000,
        autoStart: true,
        doInterval: 200,
        debug: false,
    };

    element;
    selector = '#scsaver';
    waitStateCancelToken = null;
    waitingTimeoutID = null;

    isWaiting = false;
    isShowing = false;
    isHidden = true;
    isFadeIn = false;
    isFadeOut = false;

    states = {
        Default: Symbol('Default'),
        Wait: Symbol('Wait'),
        Show: Symbol('Show'),
        ShowFadeInComplete: Symbol('ShowFadeInComplete'),
        Hide: Symbol('Hide'),
        HideFadeOut: Symbol('HideFadeOutComplete'),
        Disabled: Symbol('Disabled'),
    };

    eventPrefix = 'scsaver';
    beforeState = this.states.Default;
    currentState = this.states.Default;
    stateEventName = '';
    lastEventNow = 0;

    constructor(...args) {
        // Merge options
        this.settings = { ...this.defaults, ...args[1] };

        this.selector = args[0] || this.selector;

        // Scsaver Instance
        const scsaver = this;

        this.init();

        return scsaver;
    }

    on(event, callback) {
        this.element.addEventListener(event, callback);
    }

    init() {
        this.setElement();

        // create scsaver event
        this.setStateEvent();

        this.setAddEvents();

        if (this.settings.autoStart) {
            this.start();
        }
    }

    setElement() {
        // only one element
        this.element = document.querySelector(this.selector);

        if (null === this.element) {
            throw Error("Scsaver element not found.");
        }
    }

    setAddEvents() {
        if (!this.settings.on) return;

        if (this.settings.on.waitStart) {
            this.on('waitStart', this.settings.on.waitStart);
        }

        if (this.settings.on.showStart) {
            this.on('showStart', this.settings.on.showStart);
        }

        if (this.settings.on.hideStart) {
            this.on('hideStart', this.settings.on.hideStart);
        }

        if (this.settings.on.disabledStart) {
            this.on('disabledStart', this.settings.on.disabledStart);
        }
    }

    setStateEvent() {
        this.stateEventName = `${this.eventPrefix}ChangeState`;
        const self = this;

        this.element.addEventListener(this.stateEventName, (e) => {
            self.stateController(e.detail.beforeState, e.detail.currentState);
        });
    }

    stateController(beforeState, currentState) {
        switch (currentState) {
            case this.states.Wait:
                this.element.dispatchEvent(new CustomEvent('waitStart', { detail: { beforeState: beforeState, currentState: currentState } }));
                this.waitState();
                break;
            case this.states.Show:
                this.element.dispatchEvent(new CustomEvent('showStart', { detail: { beforeState: beforeState, currentState: currentState } }));
                this.showState();
                break;
            case this.states.ShowFadeInComplete:
                this.element.dispatchEvent(new CustomEvent('showFadeInComplete', { detail: { beforeState: beforeState, currentState: currentState } }));
                break;
            case this.states.Hide:
                this.element.dispatchEvent(new CustomEvent('hideStart', { detail: { beforeState: beforeState, currentState: currentState } }));
                this.hideState();
                break;
            case this.states.HideFadeOutComplete:
                this.element.dispatchEvent(new CustomEvent('hideFadeOutComplete', { detail: { beforeState: beforeState, currentState: currentState } }));
                break;
            case this.states.Disabled:
                this.element.dispatchEvent(new CustomEvent('disabledStart', { detail: { beforeState: beforeState, currentState: currentState } }));
                this.disabledState();
                break;
            case this.states.Default:
            default:
                break;
        }
    }

    // TODO: private method
    changeState(state) {
        this.beforeState = this.currentState;
        this.currentState = state;

        this.element.dispatchEvent(new CustomEvent(`${this.stateEventName}`, { detail: { beforeState: this.beforeState, currentState: this.currentState } }));
    }

    start() {
        this.registerDoing();

        this.wait();
    }

    registerDoing() {
        const self = this;

        this.settings.events.forEach(function (event) {
            window.addEventListener(event, self.intervalDoing.bind(self));
        });
    }

    unregisterDoing() {
        const self = this;

        this.settings.events.forEach(function (event) {
            window.removeEventListener(event, self.intervalDoing);
        });
    }

    intervalDoing() {
        if (performance.now() - this.lastEventNow <= this.settings.doInterval) return;

        this.doing();
        this.lastEventNow = performance.now();
    }

    doing() {
        switch (this.currentState) {
            case this.states.Wait:
                this.cancelWait();
                this.wait();
                break;
            case this.states.Show:
            case this.states.ShowFadeInComplete:
                console.log("Start Hide");
                // TODO: Cancel fade in
                this.hide();
                break;
            case this.states.Hide:
            case this.states.HideFadeOutComplete:
                if (this.isHidden) {
                    this.wait();
                    return;
                }
                break;
            case this.states.Default:
            default:
                break;
        }
    }

    disabled() {
        this.changeState(this.states.Disabled);
    }

    wait() {
        this.changeState(this.states.Wait);
    }

    show() {
        this.changeState(this.states.Show);
    }

    hide() {
        this.changeState(this.states.Hide);
    }

    disabledState() {
        this.unregisterDoing();
        this.cancelWait();

        if (this.isShowing) {
            // TODO: Cancel fade in
            this.fadeOut();
        }
    }


    async waitState() {
        try {
            if (this.isWaiting) return;

            this.waitStateCancelToken = new CancellationToken();

            await this.waiting(this.settings.waitTime, this.waitStateCancelToken);

            this.show();

            this.cancelWait();
        }
        catch (e) {
            if (!this.settings.debug) return;
            console.log(e.cancelled ? "Waiting is cancelled." : "some other err");
        }
    }

    async showState() {
        try {
            this.isHidden = false;

            await this.fadeIn(this.element, this.settings.showFadeTime);

            this.changeState(this.states.ShowFadeInComplete);

            this.isShowing = true;
        }
        catch (e) {
            if (!this.settings.debug) return;
            console.log(e.cancelled ? "Fade in is cancelled." : "some other err");
        }
    }

    async hideState() {
        try {
            this.isShowing = false;

            await this.fadeOut(this.element, this.settings.hideFadeTime);

            this.changeState(this.states.HideFadeOutComplete);

            this.isHidden = true;

            this.wait();
        }
        catch (e) {
            if (!this.settings.debug) return;
            console.log(e.cancelled ? "Fade out is cancelled." : "some other err");
        }
    }

    cancelWait() {
        if (this.waitStateCancelToken == null) return;

        this.waitStateCancelToken.cancel();
        this.waitStateCancelToken = null;

        clearTimeout(this.waitingTimeoutID);
        this.isWaiting = false;
    }

    waiting(time, cancellationToken = null) {
        this.isWaiting = true;

        return new Promise((resolve, reject) => {
            this.waitingTimeoutID = setTimeout(function () {
                // TODO: progress bar should be here
                this.isWaiting = false;
                resolve();
            }, time);

            if (cancellationToken) {
                cancellationToken.register(reject);
            }
        });
    }

    fadeIn(el, duration = 2000, display, cancellationToken = null) {
        this.isFadeIn = true;
        const defaultOpacity = parseFloat(window.getComputedStyle(el).opacity);
        const finalOpacity = 1;
        const start = performance.now();
        const self = this;

        el.style.opacity = defaultOpacity;
        el.style.display = display || 'block';

        return new Promise((resolve, reject) => {
            requestAnimationFrame(function fade(time) {
                let timeFraction = (time - start) / duration;
                let progress = Math.min(timeFraction, 1);

                el.style.opacity = defaultOpacity + (finalOpacity - defaultOpacity) * progress;

                if (+el.style.opacity < finalOpacity) {
                    requestAnimationFrame(fade);
                } else {
                    el.classList.add('is-fade-in-done');
                    el.classList.remove('is-fade-out-done');
                    self.isFadeIn = false;
                    resolve();
                }

                if (cancellationToken) {
                    cancellationToken.register(reject);
                }
            });
        });
    }

    fadeOut(el, duration = 2000, cancellationToken = null) {
        this.isFadeOut = true;
        const defaultOpacity = parseFloat(window.getComputedStyle(el).opacity);
        const finalOpacity = 0;
        const start = performance.now();
        const self = this;

        return new Promise((resolve, reject) => {
            requestAnimationFrame(function fade(time) {
                let timeFraction = (time - start) / duration;
                let progress = Math.min(timeFraction, 1);

                el.style.opacity = defaultOpacity - defaultOpacity * progress;

                if (+el.style.opacity > finalOpacity) {
                    requestAnimationFrame(fade);
                } else {
                    el.style.display = "none";
                    el.classList.add('is-fade-out-done');
                    el.classList.remove('is-fade-in-done');
                    self.isFadeOut = false;
                    resolve();
                }

                if (cancellationToken) {
                    cancellationToken.register(reject);
                }
            });
        });
    }

    // TODO: cancel fadeIn and fadeOut functions
};