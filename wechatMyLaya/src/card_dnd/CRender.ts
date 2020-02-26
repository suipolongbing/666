/*
* name;
*/
class CRender {
    constructor() {

        this.img = new Laya.Image();
        this.img.size(146, 208);

        this.img1 = new Laya.Image();
        this.img1.size(128, 58);
        this.img1.pos(9, 141);
        this.img.addChild(this.img1);
        this.img1.skin = 'bottom_desc.png';

        this.img2 = new Laya.Image();
        this.img2.size(128, 28);
        this.img2.pos(9, 98);
        this.img.addChild(this.img2);
        this.img2.skin = 'top_name.png';

        this.img3 = new Laya.Image();
        this.img3.scale(1.5, 1.5);
        this.img3.pos(44, 116);
        this.img.addChild(this.img3);
        this.img3.skin = 'Item_Bubble.png';

        this.txt1 = new Laya.Label();
        this.txt1.width = 106;
        this.txt1.anchorY = 0.5;
        this.txt1.fontSize = 10;
        this.txt1.bold = true;
        this.txt1.font = "Helvetica"
        this.txt1.color = "#15e2c9";
        this.txt1.pos(11, 29)
        this.img1.addChild(this.txt1);

        this.txt2 = new Laya.Label();
        this.txt2.fontSize = 12;
        this.txt2.anchorY = 0.5;
        this.txt2.bold = true;
        this.txt2.font = "SimSun"
        this.txt2.color = "#ec9a98";
        this.txt2.pos(11, 14)
        this.img2.addChild(this.txt2);

        this.txt3 = new Laya.Label();
        this.txt3.fontSize = 18;
        this.txt3.anchorX = 0.5;
        this.txt3.anchorY = 0.5;
        this.txt3.bold = true;
        this.txt3.font = "SimHei"
        this.txt3.color = "#eaff00";
        this.txt3.pos(13, 13)
        this.img3.addChild(this.txt3);
    }
    public static backSkinName: string = "back.png";
    public static cardSkinName: string = "card_img.png";
    public static ReadSkin() { //刷新皮肤，暂时没有
        // pokerRender.backSkinName = pokerUI.shop.ItemSelectedInPage3.ItemIcon;
        // pokerRender.cardSkinName = pokerUI.shop.ItemSelectedInPage2.ItemIcon;
    }
    public img: Laya.Image;
    public img1: Laya.Image;
    public img2: Laya.Image;
    public img3: Laya.Image;
    public txt1: Laya.Label;
    public txt2: Laya.Label;
    public txt3: Laya.Label;

    public ImageFileName: string = "";
    public Txt1FileName: string = "";
    public Txt2FileName: string = "";
    public Txt3FileName: string = "";
    cardType: CRenderType = CRenderType.cardIMG;//卡片图类型

    public Dispose() {
        if (this.img) {
            this.img.removeSelf();
            this.img.dispose();
            this.img = null;
        }
    }

    public ChangeRenderToSystemCard(systemImgName: string) {
        this.cardType = CRenderType.systemIMG;
        // this.ImageFileName = "system/" + systemImgName;
        this.ImageFileName = "card_img.png"
        this.onLoadedSystemIMG();
        //Laya.loader.load("res/atlas/system.atlas",Laya.Handler.create(this,this.onLoadedSystemIMG));	
        // Laya.loader.load([{ url: "res/atlas/system.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onLoadedSystemIMG));

    }

    public ChangeRenderByData(data: CData) {
        if (data.IsCardBack) {
            this.cardType = CRenderType.cardBack;
            //更换背面卡背皮肤
            // if (pokerUI.shop.ItemSelectedInPage3 != null) {
            this.ImageFileName = CRender.backSkinName;
            this.onCardBackIMGLoaded();
            // Laya.loader.load([{ url: "res/atlas/back.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onCardBackIMGLoaded));
            // }
        }
        else {
            this.cardType = CRenderType.cardIMG;
            //更换正面卡片皮肤
            // if (pokerUI.shop.ItemSelectedInPage2 != null) {
            this.ImageFileName = CRender.cardSkinName;
            this.Txt1FileName = CRender.GetTxt1FileName(data);
            this.Txt2FileName = CRender.GetTxt2FileName(data);
            // this.Txt3FileName = CRender.GetTxt3FileName(data);
            this.SetHp(data, Number(CRender.GetTxt3FileName(data)));
            console.log('?:', this.Txt1FileName, "??:", this.Txt2FileName, this.Txt3FileName);
            this.onLoadedCardIMG();
            //     pokerUI.shop.ItemSelectedInPage2.ItemIcon + BuildRender.GetImgFileName(data);
            // Laya.loader.load([{ url: "res/atlas/poker4.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onLoadedCardIMG));
            // }
        }
    }

    private onCardBackIMGLoaded(): void {
        if (this.cardType != CRenderType.cardBack) {
            return;
        }

        var newSkinName = this.ImageFileName//pokerUI.shop.ItemSelectedInPage3.ItemIcon;
        if (this.img.skin != newSkinName) {
            this.img.graphics.clear();
            this.img.skin = newSkinName;//"back/"+this.backSkinFileName+".png"
        }
    }

    private onLoadedCardIMG(): void {
        if (this.cardType != CRenderType.cardIMG) {
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
        var newTxt3 = this.Txt3FileName;
        if (this.txt3.text != newTxt3) {
            this.txt3.text = newTxt3;
        }
    }

    private onLoadedSystemIMG(): void {
        if (this.cardType != CRenderType.systemIMG) {
            return;
        }

        var newSkinName = this.ImageFileName;
        if (this.img.skin != newSkinName) {
            this.img.graphics.clear();
            this.img.skin = newSkinName;
            console.log('???:', this.img.skin, newSkinName);

        }
    }


    public static GetImgFileNameWithTypeNum(type: CType, no: number): string {
        var data = new CData(type, no);
        return CRender.GetImgFileName(data);
    }
    public static GetImgFileName(data: CData): string {
        var typeStr = "";
        switch (data.mType) {
            case CType.Enemy:
                typeStr = "weapon_white";
                break;
            case CType.Weapon:
                typeStr = "weapon_white";
                break;
            case CType.Shiled:
                typeStr = "weapon_white";
                break;
            case CType.Player:
                typeStr = "weapon_white";
                break;
            case CType.Skill:
                typeStr = "weapon_white";
                break;
            case CType.Treasure:
                typeStr = "weapon_white";
                break;
            case CType.Cure:
                typeStr = "weapon_white";
                break;
        }
        var tRet = "" + typeStr + ".png"

        return tRet;
    }

    public static GetTxt1FileName(data: CData): string {
        var tRet = "" + CConfig.GetT1Desc(data.mType, data.mNo);
        return tRet;
    }

    public static GetTxt2FileName(data: CData): string {
        var tRet = "" + CConfig.GetT2Name(data.mType, data.mNo)
        return tRet;
    }

    public static GetTxt3FileName(data: CData): string {
        var tRet = "" + CConfig.GetT3Hp(data.mType, data.mNo)
        return tRet;
    }

    public SetAtk(data: CData, value): string {
        data.SetAtk(value);
        var tRet = "" + data.mAtk
        return tRet;
    }

    public SetHp(data: CData, value) {
        data.SetHp(value);
        var tRet = "" + data.mHp
        this.Txt3FileName = tRet;
    }

    public SetShield(data: CData, value): string {
        data.SetShield(value);
        var tRet = "" + data.mShield
        return tRet;
    }
}
enum CRenderType {
    cardIMG,//卡正面
    cardBack,//卡背
    systemIMG//系统图案
}