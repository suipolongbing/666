/**
* name
*/
var pokerUI;
(function (pokerUI) {
    var win = /** @class */ (function () {
        function win() {
            Laya.loader.load([{ url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onUILoad));
        }
        win.prototype.onUILoad = function () {
            this.winUI = new ui.poker.WinUI();
            Laya.stage.addChild(this.winUI);
            this.winUI.visible = false;
            this.winUI.startNewgame.clickHandler = new Laya.Handler(this, this.onClickStartNewGame);
            this.winUI.shareBtn.clickHandler = new Laya.Handler(this, this.onClickShare);
        };
        win.prototype.onClickShare = function () {
            GameMain.app.mShares++;
            GameMain.app.mShareCurrentTime = GameMain.app.getCurrTime();
            var shareTitle = "这局太难了，听说只有1%完成了。";
            var shareImg = "login/share.jpg";
            var surl = "3";
            // if (GameMain.app.mWX.shareUrl.length > 2) {
            // 	shareTitle = GameMain.app.mWX.shareUrl[2]["title"];
            // 	shareImg = GameMain.app.mWX.shareUrl[2]["url"];
            // 	surl = GameMain.app.mWX.shareUrl[2]["id"];
            // }
            wx.shareAppMessage({
                title: shareTitle,
                imageUrl: shareImg,
            });
        };
        win.prototype.ShowWin = function (UsedTimeStr) {
            this.winUI.visible = true;
            this.winUI.timeCount.text = UsedTimeStr;
        };
        win.prototype.onClickStartNewGame = function () {
            this.winUI.visible = false;
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickNewGame);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        return win;
    }());
    pokerUI.win = win;
})(pokerUI || (pokerUI = {}));
//# sourceMappingURL=win.js.map