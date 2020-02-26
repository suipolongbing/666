/*
* name;
*/
class WeaponCard extends ui.MergeCardUI {
    constructor() {
        super();
    }

    public weaponType;
    public collectOverList: Laya.Dictionary = new Laya.Dictionary();
    public id;
    public style = 0; //0-未制作,1-正在制作中,2-已完成

    static create(view, data): WeaponCard {
        var inst: WeaponCard = null;
        if (!inst) {
            inst = new WeaponCard();
            view.addChild(inst);
            inst.init(data);
        }
        return inst;
    }

    init(data) {
        Xconfig.Id += 1;
        this.id = 'WeaponCard_' + Xconfig.Id + '_' + data.id
        this.weaponType = data;
        this.wealist.hScrollBarSkin = "";
        this.wealist.renderHandler = new Laya.Handler(this, this.updateList);
        var list = [];
        this.collectOverList.clear();
        for (let i = 0; i < data.material.length; i++) {
            list.push(data.material[i]);
            this.collectOverList.set(i, 0);
            console.log('data:', data.material[i]);
        }
        this.wealist.array = list;
        this.weaname.text = data.name + '';
        this.weaprice.text = data.price + '';
        this.IsCollectFinish();
    }

    updateList(cell, index) {
        let material = cell.getChildByName('weaimg').getChildByName('weamaterial') as Laya.Label;
        let gou = cell.getChildByName('weaimg').getChildByName('weagou') as Laya.Image;
        let typeStr;
        switch (cell.dataSource) {
            case BuildType.duanzaoshi:
                typeStr = "锻造石";
                break;
            case BuildType.cuimu:
                typeStr = "翠木";
                break;
            case BuildType.qishi:
                typeStr = "漆石";
                break;
            case BuildType.mixian:
                typeStr = "秘弦";
                break;
            case BuildType.yugang:
                typeStr = "玉钢";
                break;
            case BuildType.wugang:
                typeStr = "乌钢";
                break;
        }
        material.text = typeStr + '';
        gou.visible = false;
    }

    CheckMaterialRight(type): boolean {
        for (let i = 0; i < this.wealist.array.length; i++) {
            let cell = this.wealist.cells[i];
            if (cell.dataSource == type && this.collectOverList.get(i) == 0) {
                this.collectOverList.set(i, 1);
                cell.getChildByName('weaimg').getChildByName('weagou').visible = true;
                cell.getChildByName('weaimg').getChildByName('weamaterial').alpha = 0.7;
                this.IsCollectFinish();
                return true;
            }
        }
        return false
    }

    IsCollectFinish() {
        let count = 0;
        for (let i = 0; i < this.collectOverList.keys.length; i++) {
            if (this.collectOverList.get(i) == 1) {
                count++;
            }
        }
        if (count > 0) {
            if(this.style == 0){
                GameGlobal.Dispatcher.sendEvent(HeroEvent.START_TO_MAKU, [this.id]);
            }
            this.mc1.y = this.mc3.y;
            this.mc2.visible = true;
            this.style = 1;
        }
        else {
            this.mc1.y = 0;
            this.mc2.visible = false;
            this.style = 0;
        }
        if (count == this.collectOverList.keys.length) {
            this.style = 2;
            GameGlobal.Dispatcher.sendEvent(HeroEvent.FINISH_CARD, [Number(this.weaprice.text), this.id]);
            console.log('count:', count, this.collectOverList.keys.length);
        }

    }

    public Dispose() {
        this.removeSelf();
        this.destroy();
    }

    public NoShow() {
        this.visible = false;
    }
}