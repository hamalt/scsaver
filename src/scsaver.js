import { CancellationToken } from './modules/cancellationToken.js';

/**
 * Web page screensaver JavaScript library.
 * @param  {...any} args Selector, options.
 * @returns {Scsaver}
 */
export default class Scsaver {
  /**
   * Defaults for options.
   * @type {Object}
   */
  defaults = {
    timeout: null,
    waitTime: 3200,
    events: ['keydown', 'mousemove', 'touchstart', 'click'],
    showFadeTime: 1000,
    hideFadeTime: 1000,
    autoStart: true,
    doInterval: 200,
    debug: false,
    progressBar: false,
  };

  /**
   * Scsaver element.
   * @type {Element}
   */
  element;

  /**
   * Element default selector.
   * @type {String}
   */
  selector = '#scsaver';
  waitStateCancelToken = null;
  waitingTimeoutID = null;
  waitingAnimID = null;

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
    Enabled: Symbol('Enabled')
  };

  eventPrefix = 'scsaver';
  beforeState = this.states.Default;
  currentState = this.states.Default;
  stateEventName = '';
  lastEventNow = 0;

  progressBar = {
    wrapperElement: null,
    barElement: null,
    progress: 0,
  }

  /**
   * Fade in data.
   * @type {Object}
   */
  fadeInData = {
    animReqID: null,
    cancelToken: null
  }

  /**
   * Fade out data.
   * @type {Object}
   */
  fadeOutData = {
    animReqID: null,
    cancelToken: null
  }

  constructor(...args) {
    // Merge options
    this.settings = { ...this.defaults, ...args[1] };

    this.selector = args[0] || this.selector;

    // Scsaver Instance
    const scsaver = this;

    this.init();

    return scsaver;
  }

  /**
   * Handle event.
   * @param {*} event
   * @param {*} callback
   */
  on(event, callback) {
    this.element.addEventListener(event, callback.bind(this));
  }

  init() {
    this.initElement();

    // create scsaver event
    this.initStateEvent();

    this.initAddEvents();

    if (this.settings.progressBar) {
      this.initProgressBar();
    }

    this.element.dispatchEvent(
      new CustomEvent('init')
    );

    if (this.settings.autoStart) {
      this.start();
    }
  }

  initElement() {
    // only one element
    this.element = document.querySelector(this.selector);

    if (null === this.element) {
      throw Error('Scsaver element not found.');
    }
  }

  initStateEvent() {
    this.stateEventName = `${this.eventPrefix}ChangeState`;
    const self = this;

    this.element.addEventListener(this.stateEventName, (e) => {
      self.stateController(e.detail.beforeState, e.detail.currentState);
    });
  }

  initAddEvents() {
    if (!this.settings.on) return;

    for (let key in this.settings.on) {
      this.on(key, this.settings.on[key]);
    }
  }

  // TODO: private method
  changeState(state) {
    this.beforeState = this.currentState;
    this.currentState = state;

    this.element.dispatchEvent(
      new CustomEvent(`${this.stateEventName}`, {
        detail: { beforeState: this.beforeState, currentState: this.currentState }
      })
    );
  }

  stateController(beforeState, currentState) {
    switch (currentState) {
      case this.states.Wait:
        this.element.dispatchEvent(
          new CustomEvent('waitStart', { detail: { beforeState: beforeState, currentState: currentState } })
        );
        this.waitState();
        break;
      case this.states.Show:
        this.element.dispatchEvent(
          new CustomEvent('showStart', { detail: { beforeState: beforeState, currentState: currentState } })
        );
        this.showState();
        break;
      case this.states.ShowFadeInComplete:
        this.element.dispatchEvent(
          new CustomEvent('showFadeInComplete', { detail: { beforeState: beforeState, currentState: currentState } })
        );
        break;
      case this.states.Hide:
        this.element.dispatchEvent(
          new CustomEvent('hideStart', { detail: { beforeState: beforeState, currentState: currentState } })
        );
        this.hideState();
        break;
      case this.states.HideFadeOutComplete:
        this.element.dispatchEvent(
          new CustomEvent('hideFadeOutComplete', { detail: { beforeState: beforeState, currentState: currentState } })
        );
        break;
      case this.states.Disabled:
        this.element.dispatchEvent(
          new CustomEvent('disabledStart', { detail: { beforeState: beforeState, currentState: currentState } })
        );
        this.disabledState();
        break;
      case this.states.Enabled:
        this.element.dispatchEvent(
          new CustomEvent('enabledStart', { detail: { beforeState: beforeState, currentState: currentState } })
        );
        this.enabledState();
        break;
      case this.states.Default:
      default:
        break;
    }
  }

  initProgressBar() {
    this.progressBar.wrapperElement = document.createElement('div');
    this.progressBar.wrapperElement.classList.add('scsaver-progress-wrapper');
    this.progressBar.wrapperElement.style.display = 'none';

    const progressBg = document.createElement('div');
    progressBg.classList.add('scsaver-progress-bg');

    this.progressBar.barElement = document.createElement('div');
    this.progressBar.barElement.classList.add('scsaver-progress-bar');
    this.progressBar.barElement.id = 'scsaver-progress-bar';

    progressBg.appendChild(this.progressBar.barElement);
    this.progressBar.wrapperElement.appendChild(progressBg);

    if (this.settings.progressBarParent) {
      const progressBarParentElm = document.querySelector(this.settings.progressBarParent);

      if (null === progressBarParentElm) {
        throw Error('Scsaver progress bar parent element not found.');
      }

      this.progressBar.wrapperElement.classList.add('is-child');
      progressBarParentElm.appendChild(this.progressBar.wrapperElement);
    } else {
      document.body.appendChild(this.progressBar.wrapperElement);
    }
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
        this.cancelFadeIn();
        this.hide();
        break;
      case this.states.Hide:
      case this.states.HideFadeOutComplete:
        if (this.isHidden) this.wait();
        break;
      case this.states.Default:
      default:
        break;
    }
  }

  disabled() {
    this.changeState(this.states.Disabled);
  }

  enabled() {
    this.changeState(this.states.Enabled);
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
      this.cancelFadeIn();
      this.fadeOut();
    }
  }

  enabledState() {
    this.start();
  }

  async waitState() {
    try {
      if (this.isWaiting) return;

      this.waitStateCancelToken = new CancellationToken();

      await this.waiting(this.settings.waitTime, this.waitStateCancelToken);

      this.show();

      this.cancelWait();
    } catch (e) {
      if (!this.settings.debug) return;
      console.log(e.cancelled ? 'Waiting is cancelled.' : 'some other err');
    }
  }

  async showState() {
    try {
      this.isHidden = false;

      this.fadeInData.cancelToken = new CancellationToken();

      await this.fadeIn(this.element, this.settings.showFadeTime, 'block', this.fadeInData.cancelToken);

      this.clearFadeIn();

      this.changeState(this.states.ShowFadeInComplete);

      this.isShowing = true;
    } catch (e) {
      if (!this.settings.debug) return;
      console.log(e.cancelled ? 'Fade in is cancelled.' : 'some other err');
    }
  }

  async hideState() {
    try {
      this.isShowing = false;

      this.fadeOutData.cancelToken = new CancellationToken();

      await this.fadeOut(this.element, this.settings.hideFadeTime, this.fadeOutData.cancelToken);

      this.clearFadeOut();

      this.changeState(this.states.HideFadeOutComplete);

      this.isHidden = true;

      this.wait();
    } catch (e) {
      if (!this.settings.debug) return;
      console.log(e.cancelled ? 'Fade out is cancelled.' : 'some other err');
    }
  }

  cancelWait() {
    if (null !== this.waitStateCancelToken) {
      this.waitStateCancelToken.cancel();
      this.waitStateCancelToken = null;
    }

    if (null !== this.waitingAnimID) {
      cancelAnimationFrame(this.waitingAnimID);
      this.waitingAnimID = null;
    }

    if (this.settings.progressBar) {
      this.disabledProgressBar();
    }

    this.isWaiting = false;
  }

  /**
   * Wait for the next process for the specified number of milliseconds.
   * @param {number} time - The number of milliseconds to wait.
   * @param {CancellationToken} cancellationToken - The cancellation token.
   * @returns {Promise<number>}
   */
  waiting(waitTime, cancellationToken = null) {
    this.isWaiting = true;
    const defaultValue = 0;
    const finalValue = 1;
    const start = performance.now();
    const self = this;

    if (this.settings.progressBar) {
      this.enabledProgressBar();
      this.progressBar.barElement.classList.remove('is-filled');
      this.progressBar.barElement.style.width = `${defaultValue}%`;
    }

    return new Promise((resolve, reject) => {
      self.waitingAnimID = requestAnimationFrame(function waitingProgress(time) {
        let timeFraction = (time - start) / waitTime;
        let progress = Math.min(timeFraction, 1);

        if (self.settings.progressBar) {
          self.progressBar.barElement.style.width = `${progress * 100}%`;
        }

        if (progress < finalValue) {
          self.waitingAnimID = requestAnimationFrame(waitingProgress);
        } else {

          if (self.settings.progressBar) {
            self.progressBar.barElement.classList.add('is-filled');
            self.progressBar.wrapperElement.style.display = 'none';
          }

          self.isWaiting = false;
          resolve();
        }

        if (cancellationToken) {
          cancellationToken.register(reject);
        }
      });
    });
  }

  enabledProgressBar() {
    this.progressBar.wrapperElement.style.display = 'block';
  }

  disabledProgressBar() {
    this.progressBar.wrapperElement.style.display = 'none';
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
      self.fadeInData.animReqID = requestAnimationFrame(function fade(time) {
        let timeFraction = (time - start) / duration;
        let progress = Math.min(timeFraction, 1);

        el.style.opacity = defaultOpacity + (finalOpacity - defaultOpacity) * progress;

        if (+el.style.opacity < finalOpacity) {
          self.fadeInData.animReqID = requestAnimationFrame(fade);
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
      self.fadeOutData.animReqID = requestAnimationFrame(function fade(time) {
        let timeFraction = (time - start) / duration;
        let progress = Math.min(timeFraction, 1);

        el.style.opacity = defaultOpacity - defaultOpacity * progress;

        if (+el.style.opacity > finalOpacity) {
          self.fadeOutData.animReqID = requestAnimationFrame(fade);
        } else {
          el.style.display = 'none';
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

  clearFadeIn() {
    this.fadeInData.cancelToken = null;
    this.fadeInData.animReqID = null;
  }

  clearFadeOut() {
    this.fadeOutData.cancelToken = null;
    this.fadeOutData.animReqID = null;
  }

  cancelFadeIn() {
    if (null !== this.fadeInData.cancelToken) {
      this.fadeInData.cancelToken.cancel();
      this.fadeInData.cancelToken = null;
    }

    if (null !== this.fadeInData.animReqID) {
      cancelAnimationFrame(this.fadeInData.animReqID);
      this.fadeInData.animReqID = null;
    }

    if (this.isFadeIn && null == this.fadeInData.cancelToken && null == this.fadeInData.animReqID) {
      this.isFadeIn = false;
    }
  }

  cancelFadeOut() {
    if (null !== this.fadeOutData.cancelToken) {
      this.fadeOutData.cancelToken.cancel();
      this.fadeOutData.cancelToken = null;
    }

    if (null !== this.fadeOutData.animReqID) {
      cancelAnimationFrame(this.fadeOutData.animReqID);
      this.fadeOutData.animReqID = null;
    }

    if (this.isFadeOut && null == this.fadeOutData.cancelToken && null == this.fadeOutData.animReqID) {
      this.isFadeOut = false;
    }
  }
}
