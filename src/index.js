export class Scsaver {
    constructor(...args) {
        this.timeout = null;
        this.isActive = false;
        this.waitTime = 3;
        this.events = ['keydown', 'mousemove', 'touchstart', 'click'];
        this.elementId = "#scsaver";

        this.optionMerge(args);

        // Scsaver Instance
        const scsaver = this;

        this.init();

        return scsaver;
    }

    init() {
        console.log("init");
        // TODO: オプションの初期化をする

        this.switchScreen();
        let self = this;

        this.events.forEach(function (event) {
            document.addEventListener(event, function () {
                self.switchScreen();
            });
        });
    }

    setElement() {
        if (null != elementClass) {
            document.getElementsByClassName(args[0]);
        }
    }

    optionMerge(args) {
        console.log(args);
        this.isActive = false;
        this.waitTime = 3;
        this.events = ['keydown', 'mousemove', 'touchstart', 'click'];
        this.elementId = "#scsaver";

        let elementClass = args[0];

        if (null != elementClass) {
            document.getElementsByClassName(args[0]);
        }
    }

    test() {
        console.log("test");
    }

    clearEvent() {
        clearTimeout(this.timeout);
    }

    setEvent() {
        this.timeout = setTimeout(this.show.bind(this), 1000 * this.idletime);
    }

    switchScreen() {
        // console.log("タップされたので切り替え処理を開始");
        this.clearEvent();

        // console.log("有効か？：" + this.isActive);

        if (this.isActive) {
            // console.log("有効なので、スクリーンセーバーを停止させる");
            // スクリーンセーバーを停止
            this.stop();
        }

        // プレイ中でなければスクリーンセーバーを表示
        if (!this.videoPlaying) {
            // console.log("最後の操作から" + this.waitTime + "秒後にスクリーンセーバーを表示");
            // スクリーンセーバーが有効で無ければ、最後の操作からidletime秒後にスクリーンセーバーを表示
            this.setEvent();
        } else {
            // console.log("プレイ中なのでスクリーンセーバー表示処理をしない");
        }
    }

    show() {
        console.log("スクリーンセーバー表示");
        this.isActive = true;
        
    }

    stop() {
        console.log("スクリーンセーバー停止");
        // $("#screensaver").stop().fadeOut();
        this.isActive = false;
    }
};