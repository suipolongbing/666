/*
* wangwangxuebing;
*/
var BaseViewManager = /** @class */ (function () {
    function BaseViewManager() {
        this.scenes = [];
        // Xconfig.Id = 0;
        // for (let i = 0; i < Xconfig.FaPaiBaseCostList.length; i++) {
        //     Xconfig.FaPaiBaseCostList[i].baseCoin = Xconfig.BaseCostCoin;
        //     Xconfig.FaPaiBaseCostList[i].fapaiCount = Xconfig.FanPaiCount;
        // }
        // this.initBottom();
    }
    BaseViewManager.prototype.onSceneHide = function () {
        this.scenes.forEach(function (scene) {
            if (scene)
                scene.onShow(false);
        });
    };
    BaseViewManager.prototype.onDuel = function () {
        this.onSceneHide();
        if (!this.sceneDuel) {
            this.sceneDuel = new DuelView();
            Laya.stage.addChild(this.sceneDuel);
            this.scenes.push(this.sceneDuel);
        }
        this.sceneDuel.onShow(true);
    };
    BaseViewManager.prototype.onSelectDeck = function () {
        this.onSceneHide();
        if (!this.sceneSelectDeck) {
            this.sceneSelectDeck = new SelectDeckView();
            Laya.stage.addChild(this.sceneSelectDeck);
            this.scenes.push(this.sceneSelectDeck);
        }
        this.sceneSelectDeck.onShow(true);
    };
    BaseViewManager.prototype.onConnect = function () {
        this.onSceneHide();
        if (!this.sceneConnect) {
            this.sceneConnect = new ConnectView();
            Laya.stage.addChild(this.sceneConnect);
            this.scenes.push(this.sceneConnect);
        }
        this.sceneConnect.onShow(true);
    };
    BaseViewManager.prototype.onTransaction = function (villageId) {
        this.onSceneHide();
        if (!this.sceneShopPTable) {
            this.sceneShopPTable = new ShopPTableView();
            Laya.stage.addChild(this.sceneShopPTable);
            this.scenes.push(this.sceneShopPTable);
        }
        this.sceneShopPTable.onShow(true, villageId);
    };
    // public onBattle() {
    //     this.onSceneHide();
    //     if (!this.sceneBattle) {
    //         this.sceneBattle = new BattleView();
    //         Laya.stage.addChild(this.sceneBattle);
    //         this.scenes.push(this.sceneBattle);
    //     }
    //     this.sceneBattle.onShow(true);
    // }
    BaseViewManager.prototype.onMap = function (bool) {
        if (bool === void 0) { bool = true; }
        this.onSceneHide();
        if (!this.sceneMap) {
            this.sceneMap = new MapView();
            Laya.stage.addChild(this.sceneMap);
            this.scenes.push(this.sceneMap);
        }
        this.sceneMap.onShow(bool);
    };
    return BaseViewManager;
}());
//# sourceMappingURL=BaseViewManager.js.map