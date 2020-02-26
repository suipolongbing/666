/**
* name
*/
var pokerGame;
(function (pokerGame) {
    var SoundPlayer = /** @class */ (function () {
        function SoundPlayer(userda) {
            this.res = [
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
            this.userda = userda;
            // Laya.loader.load(this.res, Laya.Handler.create(this, this.onLoadComplite, null, false));
            GameGlobal.Dispatcher.addEvent(GameGlobal.EVENT.PlayMusic, this, this.PlayMusic);
            GameGlobal.Dispatcher.addEvent(GameGlobal.EVENT.PlaySound, this, this.PlaySound);
        }
        SoundPlayer.prototype.onLoadComplite = function () {
        };
        SoundPlayer.prototype.PlayMusic = function (index) {
            if (this.userda.isSoundOn) {
                console.log('this.res[index]', this.res[index]["url"]);
                Laya.SoundManager.playMusic(this.res[index]["url"], 0);
            }
        };
        SoundPlayer.prototype.PlaySound = function (index) {
            if (this.userda.isSoundOn) {
                console.log('this.res[index]', this.res[index]["url"]);
                Laya.SoundManager.playSound(this.res[index]["url"], 1);
            }
        };
        //pokerGame.SoundPlayer.PlaySound(0);
        //pokerGame.SoundPlayer.PlaySound(1);
        SoundPlayer.PlaySound = function (index) {
            GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.PlaySound, [index]);
        };
        SoundPlayer.PlayMusic = function (index) {
            GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.PlayMusic, [index]);
        };
        return SoundPlayer;
    }());
    pokerGame.SoundPlayer = SoundPlayer;
})(pokerGame || (pokerGame = {}));
//# sourceMappingURL=SoundPlayer.js.map