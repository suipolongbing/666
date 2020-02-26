var GameMain = /** @class */ (function () {
    function GameMain() {
        this.mShares = 0; // 分享次数
        this.mShareTimeArray = []; // 分享成功判定的时间数组
        this.mShareCurrentTime = 0; // 分享那一刻的时间戳
        // public otherGameId: string = '';                // 分享次数
        this.wClick = ''; // 分享次数
        this.mSDKVersion = ""; // 微信客户端基础库版本
        this.mAdOn = true; // 是否接通广告 true=>接通, false=>未接广告
        //  wxMinPro = null;               // 微信及后台接口类
        this.mPlayed = 0; //记录单局游戏复活次数
        this.pointPlayed = 0; //埋点复活次数
        this.rebirth_video = 0; // 单局游戏视频复活计数
        this.mUseCards = false; // 记录是否使用复活卡
        this.mMapLevel = 0; // 记录关卡(现在版本还没有关卡的概念,所以默认值都是0,以后可能会用到)
        this.wRankData = []; // 世界排名当前已请求的数据
        this.myLevel = 0; // 记录我的等级
        this.mWXVersion = "";
        this.isServer1 = false;
        this.isServer2 = false;
        this.upVoiceCount = 1;
        this.upVoiceBool = false;
        this.getValues = null;
        this.viewManager = null;
        //初始化微信小游戏
        Laya.MiniAdpter.init();
        //程序入口
        Laya.init(750, 1334, Laya.WebGL);
        //适配模式 宽度100%
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        GameMain.app = this;
        // this.initWXCore()
        this.initMusic();
        // GameMain.app.mWX.fhOnoff = 1
        this.begin();
    }
    GameMain.prototype.initMusic = function () {
        var res = [
            { url: "res/sound/cardMove.wav", type: Laya.Loader.SOUND },
            { url: "res/sound/button_click_settings.wav", type: Laya.Loader.SOUND },
            { url: "res/sound/deal.wav", type: Laya.Loader.SOUND },
            { url: "res/sound/drop_card.wav", type: Laya.Loader.SOUND },
            { url: "res/sound/four_card.wav", type: Laya.Loader.SOUND },
            //mp3格式
            { url: "res/sound/click1.mp3", type: Laya.Loader.SOUND },
            { url: "res/sound/click2.mp3", type: Laya.Loader.SOUND },
            { url: "res/sound/up1.mp3", type: Laya.Loader.SOUND },
            { url: "res/sound/up2.mp3", type: Laya.Loader.SOUND },
            { url: "res/sound/up3.mp3", type: Laya.Loader.SOUND },
            { url: "res/sound/up4.mp3", type: Laya.Loader.SOUND },
            { url: "res/sound/up5.mp3", type: Laya.Loader.SOUND },
            { url: "res/sound/up6.mp3", type: Laya.Loader.SOUND },
            { url: "res/sound/up7.mp3", type: Laya.Loader.SOUND },
            { url: "res/sound/up8.mp3", type: Laya.Loader.SOUND },
            { url: "res/sound/up9.mp3", type: Laya.Loader.SOUND },
            { url: "res/sound/up10.mp3", type: Laya.Loader.SOUND } //提升音量 16
        ];
        Laya.loader.load(res, Laya.Handler.create(this, this.onLoadComplite, null, false));
    };
    GameMain.prototype.onLoadComplite = function () {
        console.log('音乐加载完毕');
    };
    GameMain.prototype.begin = function () {
        //加载版本信息文件
        // Laya.loader.load([{ url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onUILoad));
        // this.onUILoad()
        this.viewManager = new BaseViewManager();
        // Xconfig.GetRandomBuild(6);
        // var villageId = 1;
        // this.viewManager.onMap(false);
        // this.viewManager.onTransaction(villageId);
        // this.viewManager.onBattle();
        // this.userId = new Date().getTime();
        this.viewManager.onConnect();
        SocketManager.Inst.userId = new Date().getTime();
        SocketManager.Inst.InitSocket("localhost", 8080);
    };
    // initSocket(host, port) {
    // 	this.socket = io.connect(`http://${host}:${port}`);
    // 	this.socket.emit("CONNECT", {
    // 		userId: this.userId
    // 	});
    // 	this.socket.on("WAITE", args => {
    // 		console.log("请等待")
    // 	});
    // 	this.socket.on("START", args => {
    // 		this.testLabel.text = args.count;
    // 		console.log("房间号:", args.roomNumber);
    // 	});
    // 	this.socket.on("UPDATE", args => {
    // 		this.testLabel.text = args.count;
    // 	});
    // }
    // addCount() {
    // 	this.socket.emit("ADD", {
    // 		userId: this.userId
    // 	});
    // }
    GameMain.prototype.onUILoad = function () {
        //设置适配模式
        //Laya.stage.alignH="center";
        //Laya.stage.alignV="middle";
        //var modes:string = "fixedauto";
        //Laya.stage.scaleMode = this.modes;
        var chaingame = new pokerGame.GameManager();
        Laya.timer.once(3000, this, function () {
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.OnGameStart);
        });
        //Laya.date
        //		//Laya.LocalStorage.getItem();
        //Date
    };
    /* 初始化微信core */
    GameMain.prototype.initWXCore = function () {
        if (wxCore.uo == null) {
            new wxCore();
        }
        wxCore.uo.initWX(2);
    };
    /* 获取当前时间戳 */
    GameMain.prototype.getCurrTime = function () {
        var date = new Date();
        return date.getTime();
    };
    /* 本地保存值 */
    GameMain.prototype.setLocalInfo = function (key, value) {
        wx.setStorageSync(key, value);
    };
    /* 本地取出值 */
    GameMain.prototype.getLocalInfo = function (key) {
        return wx.getStorageSync(key);
    };
    /* 提示信息 */
    GameMain.prototype.showMessage = function (msg, icon, image) {
        if (icon === void 0) { icon = ""; }
        if (image === void 0) { image = ""; }
        wx.showToast({
            title: msg,
            icon: icon,
            image: image,
            duration: 2000
        });
    };
    GameMain.prototype.getRandom = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    GameMain.app = null;
    GameMain.isGaming = false;
    GameMain.Soundable = true; // 记录是否静音
    GameMain.shareIndex = 0; // 分享标记
    GameMain.isEnterIn = false; // 记录是否是从排行榜或者接力链接进入游戏的
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaGameStart.js.map