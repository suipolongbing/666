/**
* name
*/
var pokerUI;
(function (pokerUI) {
    var ConfirmAutoPlay = /** @class */ (function () {
        function ConfirmAutoPlay() {
            Laya.loader.load([{ url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onUILoad));
        }
        ConfirmAutoPlay.prototype.onUILoad = function () {
            this.confirmAutoPlayUI = new ui.poker.ConfirmAutoPlayUI();
            Laya.stage.addChild(this.confirmAutoPlayUI);
            this.confirmAutoPlayUI.visible = false;
            this.confirmAutoPlayUI.shareWechat.clickHandler = new Laya.Handler(this, this.onClickShareWechat);
            this.confirmAutoPlayUI.CloseBTN.on(Laya.Event.CLICK, this, this.onClickCLoseBTN);
        };
        //点击分享到微信
        ConfirmAutoPlay.prototype.onClickShareWechat = function () {
            //------------分享方法
            //--------------分享完毕
            //分享成功后调用这个方法就可以，全局可用
            GameMain.app.mShares++;
            GameMain.shareIndex = 3;
            GameMain.app.mShareCurrentTime = GameMain.app.getCurrTime();
            var shareTitle = "这局太难了，听说只有1%完成了。";
            var shareImg = "login/share.jpg";
            var surl = "2";
            if (GameMain.app.mWX.shareUrl.length > 0) {
                shareTitle = GameMain.app.mWX.shareUrl[0]["title"];
                shareImg = GameMain.app.mWX.shareUrl[0]["url"];
                // surl = GameMain.app.mWX.shareUrl[0]["id"];
            }
            wx.shareAppMessage({
                title: shareTitle,
                imageUrl: shareImg,
            });
        };
        //关闭UI的时候，需要外面激活点击自动完成的按钮
        ConfirmAutoPlay.prototype.onClickCLoseBTN = function () {
            this.confirmAutoPlayUI.visible = false;
            GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.onClickCLoseConfirmAutoPlayUI);
        };
        return ConfirmAutoPlay;
    }());
    pokerUI.ConfirmAutoPlay = ConfirmAutoPlay;
})(pokerUI || (pokerUI = {}));
//# sourceMappingURL=ConfirmAutoPlay.js.map