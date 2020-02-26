/*
* name;
*/
class BottomView extends ui.bottomViewUI{
    constructor(){
        super();
        this.init();
    }

    init(){
                    this.addEvent();
    }

    addEvent(){
        this.mapBtn.on(Laya.Event.MOUSE_DOWN, this, this.onEnterMap);
        this.transactionBtn.on(Laya.Event.MOUSE_DOWN, this, this.onEnterTransaction);
    }

    onEnterMap(){
        GameMain.app.viewManager.onMap();
    }

    onEnterTransaction(){
        GameMain.app.viewManager.onTransaction(Xconfig.LastVillageId);
    }
}