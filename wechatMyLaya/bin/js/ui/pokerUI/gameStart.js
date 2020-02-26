/**
* 设置主界面
*/
var pokerUI;
(function (pokerUI) {
    var startGame = /** @class */ (function () {
        function startGame() {
            Laya.loader.load([{ url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onUILoad));
            // this.onUILoad()
        }
        startGame.prototype.onUILoad = function () {
            this.startGameUI = new ui.poker.StartGameUI();
            // if (GameMain.app.mWX.fhOnoff == 0) {
            this.startGameUI.shop.visible = false;
            // }
            Laya.stage.addChild(this.startGameUI);
            this.startGameUI.visible = false;
            // Laya.timer.once(3000, this, this.onClickStartGame)
            // this.onClickStartGame()
            // this.startGameUI.startGame.clickHandler = new Laya.Handler(this, this.onClickStartGame);
            // this.startGameUI.shop.clickHandler = new Laya.Handler(this, this.onClickShop);
            GameMain.app.isServer1 = true;
        };
        startGame.prototype.onClickStartGame = function () {
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.OnGameStart);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        startGame.prototype.onClickShop = function () {
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.OnClickShop);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        return startGame;
    }());
    pokerUI.startGame = startGame;
})(pokerUI || (pokerUI = {}));
//# sourceMappingURL=gameStart.js.map