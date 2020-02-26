/*
* name;
*/
class MapView extends ui.MapViewUI {
    constructor() {
        super();
        this.init();
    }

    public villageArray: Array<Laya.Image>;
    public completionArray: Array<Laya.Label>; //正在制作中
    public completion2Array: Array<Laya.Label>; //未完成
    public completion3Array: Array<Laya.Label>; //已完成

    onShow(bool) {
        if (bool) {
            this.visible = true;
            this.addEvent();
        } else {
            this.visible = false;
            this.removeEvent();
        }
    }

    addEvent() {
        for (let i = 0; i < Xconfig.villageNum; i++) {
            this.villageArray[i].on(Laya.Event.MOUSE_DOWN, this, this.enterVillage, [i]);
        }
    }

    removeEvent() {
        for (let i = 0; i < this.villageArray.length; i++) {
            this.villageArray[i].off(Laya.Event.MOUSE_DOWN, this, this.enterVillage);
        }
    }

    init() {
        this.villageArray = new Array();
        this.villageArray.push(this.village1);
        this.villageArray.push(this.village2);
        this.villageArray.push(this.village3);
        this.villageArray.push(this.village4);
        this.villageArray.push(this.village5);
        this.villageArray.push(this.village6);
        this.completionArray = new Array();
        this.completionArray.push(this.completion11);
        this.completionArray.push(this.completion21);
        this.completionArray.push(this.completion31);
        this.completionArray.push(this.completion41);
        this.completionArray.push(this.completion51);
        this.completionArray.push(this.completion61);
        this.completion2Array = new Array();
        this.completion2Array.push(this.completion12);
        this.completion2Array.push(this.completion22);
        this.completion2Array.push(this.completion32);
        this.completion2Array.push(this.completion42);
        this.completion2Array.push(this.completion52);
        this.completion2Array.push(this.completion62);
        this.completion3Array = new Array();
        this.completion3Array.push(this.completion13);
        this.completion3Array.push(this.completion23);
        this.completion3Array.push(this.completion33);
        this.completion3Array.push(this.completion43);
        this.completion3Array.push(this.completion53);
        this.completion3Array.push(this.completion63);

        for (let i = 0; i < this.completionArray.length; i++) {
            this.completionArray[i].visible = false;
            this.completionArray[i].text = '!';
        }
        for (let i = 0; i < this.completion3Array.length; i++) {
            this.completion3Array[i].visible = false;
            this.completion3Array[i].text = '0';
        }
        for (let i = 0; i < this.completion2Array.length; i++) {
            this.completion2Array[i].visible = true;
            this.completion2Array[i].text = '4';
        }
    }

    enterVillage(id) {
        console.log('xxx:', id);
        GameMain.app.viewManager.onTransaction(id + 1);
    }
}