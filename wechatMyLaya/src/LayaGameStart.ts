
class GameMain {
	public static app: GameMain = null;
	public static isGaming: boolean = false;
	public static Soundable: boolean = true;  // 记录是否静音
	public mShares: number = 0;                // 分享次数
	public static shareIndex: number = 0;      // 分享标记
	public mShareTimeArray: Array<string> = [];// 分享成功判定的时间数组
	public mShareCurrentTime: number = 0;      // 分享那一刻的时间戳
	public static isEnterIn: boolean = false;  // 记录是否是从排行榜或者接力链接进入游戏的

	// public otherGameId: string = '';                // 分享次数
	public wClick: string = '';                // 分享次数

	public gameType: number
	public otherGameId: number
	public mSDKVersion: string = "";           // 微信客户端基础库版本
	public mAdOn: boolean = true;              // 是否接通广告 true=>接通, false=>未接广告
	public mScreenHeight: number;              // 通过微信获取的屏幕高度
	public mScreenWidth: number;               // 通过微信获取的屏幕宽度
	public mWX: wxMinPro;
	//  wxMinPro = null;               // 微信及后台接口类
	public mPlayed: number = 0;                //记录单局游戏复活次数
	public pointPlayed: number = 0;             //埋点复活次数
	public rebirth_video: number = 0;          // 单局游戏视频复活计数
	public mUseCards: boolean = false;         // 记录是否使用复活卡
	public mMapLevel = 0;                     // 记录关卡(现在版本还没有关卡的概念,所以默认值都是0,以后可能会用到)
	public wRankData: Array<Object> = [];      // 世界排名当前已请求的数据
	public myLevel = 0;                       // 记录我的等级
	public mWXVersion: string = "";

	public isServer1 = false;
	public isServer2 = false;

	public upVoiceCount = 1;
	public upVoiceBool = false;

	public getValues: any = null;

	public viewManager: BaseViewManager = null;

	constructor() {
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
		this.begin()
	}

	initMusic() {
		var res: Array<any> = [
			{ url: "res/sound/cardMove.wav", type: Laya.Loader.SOUND },  //卡片移动 0
			{ url: "res/sound/button_click_settings.wav", type: Laya.Loader.SOUND },  //按钮点击 1
			{ url: "res/sound/deal.wav", type: Laya.Loader.SOUND },  //发牌 2
			{ url: "res/sound/drop_card.wav", type: Laya.Loader.SOUND },//点击牌 3
			{ url: "res/sound/four_card.wav", type: Laya.Loader.SOUND },//点击牌 4
			//mp3格式
			{ url: "res/sound/click1.mp3", type: Laya.Loader.SOUND },//点击牌 5
			{ url: "res/sound/click2.mp3", type: Laya.Loader.SOUND },//点击牌 6

			{ url: "res/sound/up1.mp3", type: Laya.Loader.SOUND },//提升音量 7
			{ url: "res/sound/up2.mp3", type: Laya.Loader.SOUND },//提升音量 8
			{ url: "res/sound/up3.mp3", type: Laya.Loader.SOUND },//提升音量 9
			{ url: "res/sound/up4.mp3", type: Laya.Loader.SOUND },//提升音量 10
			{ url: "res/sound/up5.mp3", type: Laya.Loader.SOUND },//提升音量 11
			{ url: "res/sound/up6.mp3", type: Laya.Loader.SOUND },//提升音量 12
			{ url: "res/sound/up7.mp3", type: Laya.Loader.SOUND },//提升音量 13
			{ url: "res/sound/up8.mp3", type: Laya.Loader.SOUND },//提升音量 14
			{ url: "res/sound/up9.mp3", type: Laya.Loader.SOUND },//提升音量 15
			{ url: "res/sound/up10.mp3", type: Laya.Loader.SOUND }//提升音量 16
		];
		Laya.loader.load(res, Laya.Handler.create(this, this.onLoadComplite, null, false));
	}

	private onLoadComplite() {
		console.log('音乐加载完毕');

	}

	public begin() {
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
	}

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



	private onUILoad() {
		//设置适配模式
		//Laya.stage.alignH="center";
		//Laya.stage.alignV="middle";
		//var modes:string = "fixedauto";
		//Laya.stage.scaleMode = this.modes;
		var chaingame = new pokerGame.GameManager();
		Laya.timer.once(3000, this, () => {
			GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.OnGameStart);
		})
		//Laya.date
		//		//Laya.LocalStorage.getItem();
		//Date
	}
	/* 初始化微信core */
	private initWXCore(): void {
		if (wxCore.uo == null) {
			new wxCore();
		}
		wxCore.uo.initWX(2);

	}
	/* 获取当前时间戳 */
	public getCurrTime(): number {
		var date: Date = new Date();
		return date.getTime();
	}
	/* 本地保存值 */
	public setLocalInfo(key: string, value: any) {
		wx.setStorageSync(key, value);
	}

	/* 本地取出值 */
	public getLocalInfo(key: string) {
		return wx.getStorageSync(key);
	}
	/* 提示信息 */
	public showMessage(msg: string, icon: string = "", image: string = ""): void {
		wx.showToast({
			title: msg,
			icon: icon,
			image: image,
			duration: 2000
		});
	}

	public getRandom(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}
new GameMain();