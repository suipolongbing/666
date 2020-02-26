/*
* name;
*/
class BuildRender {
    constructor() {

        this.img = new Laya.Image();
        this.img.size(102, 152);

        this.txt1 = new Laya.Label();
        this.txt1.anchorX = 0.5;
        this.txt1.anchorY = 0.5;
        this.txt1.fontSize = 24;
        this.txt1.bold = true;
        this.txt1.font = "Microsoft YaHei"
        this.txt1.color = "#4c33d1";
        this.txt1.pos(102 / 2, 152 / 2)
        this.img.addChild(this.txt1);

        this.txt2 = new Laya.Label();
        this.txt2.fontSize = 24;
        this.txt2.bold = true;
        this.txt2.font = "Microsoft YaHei"
        this.txt2.color = "#d64240";
        this.txt2.pos(5, 5)
        this.img.addChild(this.txt2);

    }
    public static backSkinName: string = "img_card_back5.png";
    public static cardSkinName: string = "";
    public static ReadSkin() { //刷新皮肤，暂时没有
        // pokerRender.backSkinName = pokerUI.shop.ItemSelectedInPage3.ItemIcon;
        // pokerRender.cardSkinName = pokerUI.shop.ItemSelectedInPage2.ItemIcon;
    }
    public img: Laya.Image;
    public txt1: Laya.Label;
    public txt2: Laya.Label;

    public ImageFileName: string = "";
    public Txt1FileName: string = "";
    public Txt2FileName: string = "";
    cardType: BuildRenderType = BuildRenderType.cardIMG;//卡片图类型

    public Dispose() {
        if (this.img) {
            this.img.removeSelf();
            this.img.dispose();
            this.img = null;
        }
    }
    
    public ChangeRenderToSystemCard(systemImgName: string) {
        this.cardType = BuildRenderType.systemIMG;
        this.ImageFileName = "system/" + systemImgName;
        //Laya.loader.load("res/atlas/system.atlas",Laya.Handler.create(this,this.onLoadedSystemIMG));	
        Laya.loader.load([{ url: "res/atlas/system.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onLoadedSystemIMG));

    }

    public ChangeRenderByData(data: BuildData) {
        if (data.IsCardBack) {
            this.cardType = BuildRenderType.cardBack;
            //更换背面卡背皮肤
            // if (pokerUI.shop.ItemSelectedInPage3 != null) {
            this.ImageFileName = "back/" + BuildRender.backSkinName;
            Laya.loader.load([{ url: "res/atlas/back.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onCardBackIMGLoaded));
            // }
        }
        else {
            this.cardType = BuildRenderType.cardIMG;
            //更换正面卡片皮肤
            // if (pokerUI.shop.ItemSelectedInPage2 != null) {
            this.ImageFileName = BuildRender.cardSkinName + BuildRender.GetImgFileName(data);
            this.Txt1FileName = BuildRender.GetTxt1FileName(data);
            this.Txt2FileName = BuildRender.GetTxt2FileName(data);
            console.log('?:', this.Txt1FileName);

            //     pokerUI.shop.ItemSelectedInPage2.ItemIcon + BuildRender.GetImgFileName(data);
            Laya.loader.load([{ url: "res/atlas/poker4.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onLoadedCardIMG));
            // }
        }
    }

    private onCardBackIMGLoaded(): void {
        if (this.cardType != BuildRenderType.cardBack) {
            return;
        }

        var newSkinName = this.ImageFileName//pokerUI.shop.ItemSelectedInPage3.ItemIcon;
        if (this.img.skin != newSkinName) {
            this.img.graphics.clear();
            this.img.skin = newSkinName;//"back/"+this.backSkinFileName+".png"
        }
    }

    private onLoadedCardIMG(): void {
        if (this.cardType != BuildRenderType.cardIMG) {
            return;
        }

        var newSkinName = this.ImageFileName;
        if (this.img.skin != newSkinName) {
            this.img.graphics.clear();
            this.img.skin = newSkinName;
        }
        var newTxt1 = this.Txt1FileName;
        if (this.txt1.text != newTxt1) {
            this.txt1.text = newTxt1;
        }
        var newTxt2 = this.Txt2FileName;
        if (this.txt2.text != newTxt2) {
            this.txt2.text = newTxt2;
        }
    }

    private onLoadedSystemIMG(): void {
        if (this.cardType != BuildRenderType.systemIMG) {
            return;
        }

        var newSkinName = this.ImageFileName;
        if (this.img.skin != newSkinName) {
            this.img.graphics.clear();
            this.img.skin = newSkinName;
            console.log('???:', this.img.skin, newSkinName);

        }
    }


    public static GetImgFileNameWithTypeNum(type: BuildType): string {
        var data = new BuildData(type);
        return BuildRender.GetImgFileName(data);
    }
    public static GetImgFileName(data: BuildData): string {
        var typeStr = "";
        switch (data.mType) {
            case BuildType.duanzaoshi:
                typeStr = "weapon_white";
                break;
            case BuildType.cuimu:
                typeStr = "weapon_white";
                break;
            case BuildType.qishi:
                typeStr = "weapon_white";
                break;
            case BuildType.mixian:
                typeStr = "weapon_white";
                break;
            case BuildType.yugang:
                typeStr = "weapon_white";
                break;
            case BuildType.wugang:
                typeStr = "weapon_white";
                break;
        }
        var tRet = "" + typeStr + ".png"

        return tRet;
    }

    public static GetTxt1FileName(data: BuildData): string {
        var tRet = "" + Xconfig.GetMetName(data.mType);
        return tRet;
    }

    public static GetTxt2FileName(data: BuildData): string {
        var tRet = "" +  + Xconfig.GetMetPrice(data.mType)
        return tRet;
    }
}
enum BuildRenderType {
    cardIMG,//卡正面
    cardBack,//卡背
    systemIMG//系统图案
}