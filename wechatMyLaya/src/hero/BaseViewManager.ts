/*
* wangwangxuebing;
*/
class BaseViewManager {
    constructor() {
        // Xconfig.Id = 0;
        // for (let i = 0; i < Xconfig.FaPaiBaseCostList.length; i++) {
        //     Xconfig.FaPaiBaseCostList[i].baseCoin = Xconfig.BaseCostCoin;
        //     Xconfig.FaPaiBaseCostList[i].fapaiCount = Xconfig.FanPaiCount;
        // }
        // this.initBottom();
    }

    private scenes: Array<any> = [];
    public sceneShopPTable: ShopPTableView;
    public sceneMap: MapView;
    // public sceneBottom: BottomView;
    // public sceneBattle: BattleView;
    public sceneDuel: DuelView;
    public sceneConnect: ConnectView;
    public sceneSelectDeck: SelectDeckView;

    public onSceneHide() {
        this.scenes.forEach(scene => {
            if (scene)
                scene.onShow(false);
        })
    }

    public onDuel() {
        this.onSceneHide();
        if (!this.sceneDuel) {
            this.sceneDuel = new DuelView();
            Laya.stage.addChild(this.sceneDuel);
            this.scenes.push(this.sceneDuel);
        }
        this.sceneDuel.onShow(true);
    }

    public onSelectDeck() {
        this.onSceneHide();
        if (!this.sceneSelectDeck) {
            this.sceneSelectDeck = new SelectDeckView();
            Laya.stage.addChild(this.sceneSelectDeck);
            this.scenes.push(this.sceneSelectDeck);
        }
        this.sceneSelectDeck.onShow(true);
    }

    public onConnect() {
        this.onSceneHide();
        if (!this.sceneConnect) {
            this.sceneConnect = new ConnectView();
            Laya.stage.addChild(this.sceneConnect);
            this.scenes.push(this.sceneConnect);
        }
        this.sceneConnect.onShow(true);
    }

    public onTransaction(villageId: number) {
        this.onSceneHide();
        if (!this.sceneShopPTable) {
            this.sceneShopPTable = new ShopPTableView();
            Laya.stage.addChild(this.sceneShopPTable);
            this.scenes.push(this.sceneShopPTable);
        }
        this.sceneShopPTable.onShow(true, villageId);
    }

    // public onBattle() {
    //     this.onSceneHide();
    //     if (!this.sceneBattle) {
    //         this.sceneBattle = new BattleView();
    //         Laya.stage.addChild(this.sceneBattle);
    //         this.scenes.push(this.sceneBattle);
    //     }
    //     this.sceneBattle.onShow(true);
    // }

    public onMap(bool = true) {
        this.onSceneHide();
        if (!this.sceneMap) {
            this.sceneMap = new MapView();
            Laya.stage.addChild(this.sceneMap);
            this.scenes.push(this.sceneMap);
        }
        this.sceneMap.onShow(bool);
    }

    // public onLevelEndDialog() {
    //     this.levelEndDialog = new LevelEndDialog();
    //     this.levelEndDialog.popup();
    // }

    // initBottom() {
    //     this.sceneBottom = new BottomView;
    //     this.sceneBottom.bottom = 0;
    //     Laya.stage.addChild(this.sceneBottom);
    //     this.sceneBottom.zOrder = 99;
    // }
}