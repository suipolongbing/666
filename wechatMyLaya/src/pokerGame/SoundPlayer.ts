/**
* name 
*/
module pokerGame {
	export class SoundPlayer {

		private res: Array<any> = [
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


		private userda: UserData;
		constructor(userda: UserData) {

			this.userda = userda;
			// Laya.loader.load(this.res, Laya.Handler.create(this, this.onLoadComplite, null, false));

			GameGlobal.Dispatcher.addEvent(GameGlobal.EVENT.PlayMusic, this, this.PlayMusic);
			GameGlobal.Dispatcher.addEvent(GameGlobal.EVENT.PlaySound, this, this.PlaySound);

		}

		private onLoadComplite() {

		}

		private PlayMusic(index: number) {
			if (this.userda.isSoundOn) {
				console.log('this.res[index]',this.res[index][`url`]);
				Laya.SoundManager.playMusic(this.res[index][`url`], 0);
			}



		}
		private PlaySound(index: number) {
			if (this.userda.isSoundOn) {
				console.log('this.res[index]',this.res[index][`url`]);
				Laya.SoundManager.playSound(this.res[index][`url`], 1);
			}

		}

		//pokerGame.SoundPlayer.PlaySound(0);
		//pokerGame.SoundPlayer.PlaySound(1);

		public static PlaySound(index: number) {
			GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.PlaySound, [index]);
		}
		public static PlayMusic(index: number) {
			GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.PlayMusic, [index]);
		}

	}
}