/*
* name;
*/
var BuildRender = /** @class */ (function () {
    function BuildRender() {
        this.ImageFileName = "";
        this.Txt1FileName = "";
        this.Txt2FileName = "";
        this.cardType = BuildRenderType.cardIMG; //卡片图类型
        this.img = new Laya.Image();
        this.img.size(102, 152);
        this.txt1 = new Laya.Label();
        this.txt1.anchorX = 0.5;
        this.txt1.anchorY = 0.5;
        this.txt1.fontSize = 24;
        this.txt1.bold = true;
        this.txt1.font = "Microsoft YaHei";
        this.txt1.color = "#4c33d1";
        this.txt1.pos(102 / 2, 152 / 2);
        this.img.addChild(this.txt1);
        this.txt2 = new Laya.Label();
        this.txt2.fontSize = 24;
        this.txt2.bold = true;
        this.txt2.font = "Microsoft YaHei";
        this.txt2.color = "#d64240";
        this.txt2.pos(5, 5);
        this.img.addChild(this.txt2);
    }
    BuildRender.ReadSkin = function () {
        // pokerRender.backSkinName = pokerUI.shop.ItemSelectedInPage3.ItemIcon;
        // pokerRender.cardSkinName = pokerUI.shop.ItemSelectedInPage2.ItemIcon;
    };
    BuildRender.prototype.Dispose = function () {
        if (this.img) {
            this.img.removeSelf();
            this.img.dispose();
            this.img = null;
        }
    };
    BuildRender.prototype.ChangeRenderToSystemCard = function (systemImgName) {
        this.cardType = BuildRenderType.systemIMG;
        this.ImageFileName = "system/" + systemImgName;
        //Laya.loader.load("res/atlas/system.atlas",Laya.Handler.create(this,this.onLoadedSystemIMG));	
        Laya.loader.load([{ url: "res/atlas/system.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onLoadedSystemIMG));
    };
    BuildRender.prototype.ChangeRenderByData = function (data) {
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
    };
    BuildRender.prototype.onCardBackIMGLoaded = function () {
        if (this.cardType != BuildRenderType.cardBack) {
            return;
        }
        var newSkinName = this.ImageFileName; //pokerUI.shop.ItemSelectedInPage3.ItemIcon;
        if (this.img.skin != newSkinName) {
            this.img.graphics.clear();
            this.img.skin = newSkinName; //"back/"+this.backSkinFileName+".png"
        }
    };
    BuildRender.prototype.onLoadedCardIMG = function () {
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
    };
    BuildRender.prototype.onLoadedSystemIMG = function () {
        if (this.cardType != BuildRenderType.systemIMG) {
            return;
        }
        var newSkinName = this.ImageFileName;
        if (this.img.skin != newSkinName) {
            this.img.graphics.clear();
            this.img.skin = newSkinName;
            console.log('???:', this.img.skin, newSkinName);
        }
    };
    BuildRender.GetImgFileNameWithTypeNum = function (type) {
        var data = new BuildData(type);
        return BuildRender.GetImgFileName(data);
    };
    BuildRender.GetImgFileName = function (data) {
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
        var tRet = "" + typeStr + ".png";
        return tRet;
    };
    BuildRender.GetTxt1FileName = function (data) {
        var tRet = "" + Xconfig.GetMetName(data.mType);
        return tRet;
    };
    BuildRender.GetTxt2FileName = function (data) {
        var tRet = "" + +Xconfig.GetMetPrice(data.mType);
        return tRet;
    };
    BuildRender.backSkinName = "img_card_back5.png";
    BuildRender.cardSkinName = "";
    return BuildRender;
}());
var BuildRenderType;
(function (BuildRenderType) {
    BuildRenderType[BuildRenderType["cardIMG"] = 0] = "cardIMG";
    BuildRenderType[BuildRenderType["cardBack"] = 1] = "cardBack";
    BuildRenderType[BuildRenderType["systemIMG"] = 2] = "systemIMG"; //系统图案
})(BuildRenderType || (BuildRenderType = {}));
//# sourceMappingURL=BuildRender.js.map