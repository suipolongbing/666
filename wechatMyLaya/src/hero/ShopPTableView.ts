/*
* name;
*/
class ShopPTableView extends ui.shopPTableUI {
    constructor() {
        super();
        this.init();
        this.addFourCardZero();
        this.initStartDeck();
        this.initBrodcast();
    }

    private startCard: Laya.Sprite;
    private threeCard: Laya.Sprite;
    private buildList: Array<BuildCard>;
    private threeList: Array<BuildCard>;
    private four1List: Array<BuildCard>;
    private four2List: Array<BuildCard>;
    private four3List: Array<BuildCard>;
    private four4List: Array<BuildCard>;
    private targetPos: Laya.Point;
    private deckCard1: Laya.Sprite;
    private deckCard2: Laya.Sprite;
    private deckCard3: Laya.Sprite;
    private deckCard4: Laya.Sprite;
    private buildCard1: Laya.Sprite;
    private buildCard2: Laya.Sprite;
    private buildCard3: Laya.Sprite;
    private buildCard4: Laya.Sprite;
    private deckBox1: Laya.Rectangle;
    private deckBox2: Laya.Rectangle;
    private deckBox3: Laya.Rectangle;
    private deckBox4: Laya.Rectangle;
    private buildBox1: Laya.Rectangle;
    private buildBox2: Laya.Rectangle;
    private buildBox3: Laya.Rectangle;
    private buildBox4: Laya.Rectangle;
    private bottom1Img: Laya.Image;
    private bottom2Img: Laya.Image;
    private bottom3Img: Laya.Image;
    private bottom4Img: Laya.Image;
    private trashcanBox: Laya.Rectangle;

    private MouseStartPos: laya.maths.Point = new laya.maths.Point();
    private IsStartDraging: boolean = false; //开始拖拽
    private IsStartDragMoved: boolean = false;//是否开始拖动了(点击判断使用)
    private DragMovingStartPos: laya.maths.Point = new laya.maths.Point();
    private LastzOrder: number = 0;
    private LastParent: Laya.Sprite = null;

    private vg;

    onShow(bool, villageId) {
        if (bool) {
            this.visible = true;
            this.initBuildDeck(villageId);
            Xconfig.LastVillageId = villageId;
            this.addEvent();
            this.initCoin();
            console.log('6666');
        } else {
            this.visible = false;
            this.removeEvent();
            // this.Dispose();
        }
    }

    init() {
        this.startCard = this.getChildByName('PokerTable').getChildByName('StartCard') as Laya.Sprite;
        this.threeCard = this.getChildByName('PokerTable').getChildByName('ThreeCard') as Laya.Sprite;
        this.deckCard1 = this.getChildByName('PokerTable').getChildByName('Deck1') as Laya.Sprite;
        this.deckCard2 = this.getChildByName('PokerTable').getChildByName('Deck2') as Laya.Sprite;
        this.deckCard3 = this.getChildByName('PokerTable').getChildByName('Deck3') as Laya.Sprite;
        this.deckCard4 = this.getChildByName('PokerTable').getChildByName('Deck4') as Laya.Sprite;
        this.buildCard1 = this.getChildByName('PokerTable').getChildByName('Build1') as Laya.Sprite;
        this.buildCard2 = this.getChildByName('PokerTable').getChildByName('Build2') as Laya.Sprite;
        this.buildCard3 = this.getChildByName('PokerTable').getChildByName('Build3') as Laya.Sprite;
        this.buildCard4 = this.getChildByName('PokerTable').getChildByName('Build4') as Laya.Sprite;
        this.deckBox1 = new Laya.Rectangle(this.deckCard1.x, this.deckCard1.y, this.deckCard1.width, this.deckCard1.height);
        this.deckBox2 = new Laya.Rectangle(this.deckCard2.x, this.deckCard2.y, this.deckCard2.width, this.deckCard2.height);
        this.deckBox3 = new Laya.Rectangle(this.deckCard3.x, this.deckCard3.y, this.deckCard3.width, this.deckCard3.height);
        this.deckBox4 = new Laya.Rectangle(this.deckCard4.x, this.deckCard4.y, this.deckCard4.width, this.deckCard4.height);
        this.buildBox1 = new Laya.Rectangle(this.buildCard1.x, this.buildCard1.y, this.buildCard1.width, this.buildCard1.height);
        this.buildBox2 = new Laya.Rectangle(this.buildCard2.x, this.buildCard2.y, this.buildCard2.width, this.buildCard2.height);
        this.buildBox3 = new Laya.Rectangle(this.buildCard3.x, this.buildCard3.y, this.buildCard3.width, this.buildCard3.height);
        this.buildBox4 = new Laya.Rectangle(this.buildCard4.x, this.buildCard4.y, this.buildCard4.width, this.buildCard4.height);
        this.trashcanBox = new Laya.Rectangle(this.trashcan.x, this.trashcan.y, this.trashcan.width, this.trashcan.height);
        this.targetPos = new Laya.Point();
        this.buildList = new Array<BuildCard>();
        this.threeList = new Array<BuildCard>();
        this.four1List = new Array<BuildCard>();
        this.four2List = new Array<BuildCard>();
        this.four3List = new Array<BuildCard>();
        this.four4List = new Array<BuildCard>();
    }

    initCoin() {
        this.earncoin.text = '' + Xconfig.HeroCoin;
        this.costcoin.text = '' + Xconfig.FaPaiBaseCostList[Xconfig.LastVillageId - 1].baseCoin;
    }

    initStartDeck() {
        this.buildList = [];
        for (var i = 0; i < Xconfig.StartBuildDeckNum; i++) {
            let num = GameMain.app.getRandom(1, Xconfig.BuildMaxType);
            var poker = new BuildCard(num);
            poker.data.IsCardBack = true;
            poker.CreateRender();
            this.buildList.push(poker);
            this.startCard.addChild(poker.render.img);
        }
    }

    initBuildDeck(id) {
        this.buildCard1.removeChildren();
        this.buildCard2.removeChildren();
        this.buildCard3.removeChildren();
        this.buildCard4.removeChildren();
        for (var i = 0; i < Xconfig.villageData.length; i++) {
            if (Xconfig.villageData[i].villageId == id) {
                this.vg = Xconfig.villageData[i];
                if (this.vg.villageBuildCount == 4) {
                    if (this.vg.villageCard.length <= 0) {
                        let weapon1 = WeaponCard.create(this.buildCard1, Xconfig.WeaponMaxType[this.vg.villageBuild[0]]);
                        let weapon2 = WeaponCard.create(this.buildCard2, Xconfig.WeaponMaxType[this.vg.villageBuild[1]]);
                        let weapon3 = WeaponCard.create(this.buildCard3, Xconfig.WeaponMaxType[this.vg.villageBuild[2]]);
                        let weapon4 = WeaponCard.create(this.buildCard4, Xconfig.WeaponMaxType[this.vg.villageBuild[3]]);
                        this.vg.villageCard.push(weapon1);
                        this.vg.villageCard.push(weapon2);
                        this.vg.villageCard.push(weapon3);
                        this.vg.villageCard.push(weapon4);
                        console.log('vg2:', this.vg.villageCard);
                    }
                    else {
                        console.log('vg1:', this.vg.villageCard[0].visible, this.vg.villageCard[1].visible, this.vg.villageCard[2].visible, this.vg.villageCard[3].visible);
                        this.buildCard1.addChild(this.vg.villageCard[0]);
                        this.buildCard2.addChild(this.vg.villageCard[1]);
                        this.buildCard3.addChild(this.vg.villageCard[2]);
                        this.buildCard4.addChild(this.vg.villageCard[3]);
                    }
                }
                break;
            }
        }
    }

    addFourCardZero() {
        if (this.four1List.length <= 0 && this.four2List.length <= 0 && this.four3List.length <= 0 && this.four4List.length <= 0) {
            var pokerRd1: BuildRender = new BuildRender();
            var pokerRd2: BuildRender = new BuildRender();
            var pokerRd3: BuildRender = new BuildRender();
            var pokerRd4: BuildRender = new BuildRender();
            pokerRd1.ChangeRenderToSystemCard(Xconfig.zeroCardName);
            pokerRd2.ChangeRenderToSystemCard(Xconfig.zeroCardName);
            pokerRd3.ChangeRenderToSystemCard(Xconfig.zeroCardName);
            pokerRd4.ChangeRenderToSystemCard(Xconfig.zeroCardName);
            this.deckCard1.addChild(pokerRd1.img);
            this.deckCard2.addChild(pokerRd2.img);
            this.deckCard3.addChild(pokerRd3.img);
            this.deckCard4.addChild(pokerRd4.img);
            this.bottom1Img = pokerRd1.img;
            this.bottom2Img = pokerRd2.img;
            this.bottom3Img = pokerRd3.img;
            this.bottom4Img = pokerRd4.img;
        }
    }

    addBuildList() {
        for (var i = 0; i < Xconfig.StartBuildDeckNum - this.buildList.length; i++) {
            let num = GameMain.app.getRandom(1, Xconfig.BuildMaxType);
            var poker = new BuildCard(num);
            poker.data.IsCardBack = true;
            poker.CreateRender();
            this.buildList.push(poker);
            this.startCard.addChild(poker.render.img)
        }
    }

    addEvent() {
        //翻牌
        this.startCard.on(Laya.Event.MOUSE_DOWN, this, this.FanPai);
    }

    initBrodcast() {
        GameGlobal.Dispatcher.addEvent(HeroEvent.REFERSH_GOLD, this, this.earnCoin);
        GameGlobal.Dispatcher.addEvent(HeroEvent.FINISH_CARD, this, this.finishCard);
        GameGlobal.Dispatcher.addEvent(HeroEvent.START_TO_MAKU, this, this.checkWeaponCardStyle);
    }

    addBuildClick(img) {
        img.on(Laya.Event.MOUSE_DOWN, this, this.imgBuildHandler, [1, img]);
        img.on(Laya.Event.MOUSE_UP, this, this.imgBuildHandler, [2, img]);
        img.on(Laya.Event.MOUSE_MOVE, this, this.imgBuildHandler, [3, img]);
    }

    addDeckClick(img) {
        img.on(Laya.Event.MOUSE_DOWN, this, this.imgDeckHandler, [1, img]);
        img.on(Laya.Event.MOUSE_UP, this, this.imgDeckHandler, [2, img]);
        img.on(Laya.Event.MOUSE_MOVE, this, this.imgDeckHandler, [3, img]);
    }

    checkBuildClick() {
        for (let i = 0; i < this.threeList.length; i++) {
            console.log('addDeckClick1:', this.threeList[i], i, <Laya.Image>this.threeCard.getChildAt(i));
            let img = <Laya.Image>this.threeCard.getChildAt(i);
            if (i == this.threeList.length - 1) {
                this.addBuildClick(img)
            } else {
                this.removeBuildClick(img)
            }
        }
    }

    checkDeckClick() {
        for (let i = 0; i < this.four1List.length; i++) {
            console.log('addDeckClick2:', this.four1List[i], i, <Laya.Image>this.deckCard1.getChildAt(i + 1));
            let img = <Laya.Image>this.deckCard1.getChildAt(i + 1);
            if (img == this.bottom1Img) {
                continue;
            }
            if (i == this.four1List.length - 1) {
                this.addDeckClick(img)
            } else {
                this.removeDeckClick(img)
            }
        }
        for (let i = 0; i < this.four2List.length; i++) {
            let img = <Laya.Image>this.deckCard2.getChildAt(i + 1);
            if (img == this.bottom2Img) {
                continue;
            }
            if (i == this.four2List.length - 1) {
                this.addDeckClick(img)
            } else {
                this.removeDeckClick(img)
            }
        }
        for (let i = 0; i < this.four3List.length; i++) {
            let img = <Laya.Image>this.deckCard3.getChildAt(i + 1);
            if (img == this.bottom3Img) {
                continue;
            }
            if (i == this.four3List.length - 1) {
                this.addDeckClick(img)
            } else {
                this.removeDeckClick(img)
            }
        }
        for (let i = 0; i < this.four4List.length; i++) {
            let img = <Laya.Image>this.deckCard4.getChildAt(i + 1);
            if (img == this.bottom4Img) {
                continue;
            }
            if (i == this.four4List.length - 1) {
                this.addDeckClick(img)
            } else {
                this.removeDeckClick(img)
            }
        }
    }

    removeBuildClick(img) {
        console.log('removeBuildClick:', img);
        img.off(Laya.Event.MOUSE_DOWN, this, this.imgBuildHandler);
        img.off(Laya.Event.MOUSE_UP, this, this.imgBuildHandler);
        img.off(Laya.Event.MOUSE_MOVE, this, this.imgBuildHandler);
    }

    removeDeckClick(img) {
        img.off(Laya.Event.MOUSE_DOWN, this, this.imgDeckHandler);
        img.off(Laya.Event.MOUSE_UP, this, this.imgDeckHandler);
        img.off(Laya.Event.MOUSE_MOVE, this, this.imgDeckHandler);
    }

    removeEvent() {
        this.startCard.off(Laya.Event.MOUSE_DOWN, this, this.FanPai);
    }

    public Dispose() {
        this.removeSelf();
        this.destroy();
    }

    FanPai() {
        if (Xconfig.HeroCoin >= Xconfig.FaPaiBaseCostList[Xconfig.LastVillageId - 1].baseCoin) {
            this.costCoin(Xconfig.FaPaiBaseCostList[Xconfig.LastVillageId - 1].baseCoin);
            Xconfig.FaPaiBaseCostList[Xconfig.LastVillageId - 1].fapaiCount += 1;
            // Xconfig.FanPaiCount += 1;
        } else {
            return;
        }
        this.targetPos.x = this.threeCard.x;
        this.targetPos.y = this.threeCard.y;
        var card: BuildCard = this.buildList[this.buildList.length - 1];
        this.startCard.removeChild(card.render.img);
        this.startCard.parent.addChild(card.render.img);
        card.render.img.pos(this.startCard.x, this.startCard.y);
        Laya.Tween.to(card.render.img, { x: this.targetPos.x, y: this.targetPos.y }, 150, Laya.Ease.sineIn, Laya.Handler.create(this, this.MoveAniEnd, [1]), 0);
    }

    Calculate(n) {
        var count = 1;
        while (n > 0) {
            for (var i = 0; i < count; i++) {
                n--;
                if (n < 1) {
                    console.log('lol:', count)
                    this.upCoin(count);
                    break;
                }
            }
            count++;
        }
    }

    //1-开始牌堆卡牌移动结束处理
    MoveAniEnd(type) {
        switch (type) {
            case 1:
                this.Calculate(Xconfig.FaPaiBaseCostList[Xconfig.LastVillageId - 1].fapaiCount);
                // this.Calculate(Xconfig.FanPaiCount);
                var card: BuildCard = this.buildList[this.buildList.length - 1];
                this.buildList.splice(this.buildList.length - 1, 1);
                this.threeList.push(card);
                this.startCard.parent.removeChild(card.render.img);
                this.threeCard.addChild(card.render.img);
                card.render.img.pos(0, 0);
                card.data.IsCardBack = false;
                card.FlushRender();
                this.addBuildList();
                this.SortAndMoveToPos();
                this.checkBuildClick();
                break;
        }
    }

    SortAndMoveToPos() {
        if (this.threeList.length > 0) {
            for (let i = 0; i < this.threeList.length; i++) {
                var img = <Laya.Image>this.threeCard.getChildAt(i);
                var indexFromLast = this.threeList.length - 1 - i;
                console.log('img:', i, indexFromLast);
                if (indexFromLast <= 2) {
                    var posIndex = 2 - indexFromLast;
                    if (this.threeList.length < 3) {
                        posIndex = i;
                    }
                    var pos = new Laya.Point(posIndex * Xconfig.threeCardSpacing, 0);
                    Laya.Tween.to(img, { x: pos.x, y: pos.y }, 90, null, null, 0);
                }
            }
        }
    }

    imgBuildHandler(e, target: Laya.Image) {
        if (e == 1) {
            console.log('down');
            this.IsStartDraging = true;
            this.IsStartDragMoved = false;
            let lx = target.x;
            let ly = target.y;
            this.threeCard.removeChild(target);
            this.startCard.parent.addChild(target);
            target.x = this.threeCard.x + lx;
            target.y = this.threeCard.y + ly;
            this.MouseStartPos.x = Laya.stage.mouseX;
            this.MouseStartPos.y = Laya.stage.mouseY;

            this.DragMovingStartPos.x = target.x;
            this.DragMovingStartPos.y = target.y;

            this.LastzOrder = target.zOrder;
            target.zOrder = 999;
        }
        else if (e == 2) {
            if (!this.IsStartDraging) {
                return;
            }
            target.zOrder = this.LastzOrder;
            if (this.IsStartDragMoved) {
                console.log('yidong');
                this.IsStartDraging = false;
                this.dealCollsion(target);
            } else {
                console.log('dianji');
                this.IsStartDraging = false;
                this.dealMoveClickEvent(target);
            }

        }
        else if (e == 3) {
            if (!this.IsStartDraging) {
                return;
            }

            var offsetX = Laya.stage.mouseX - this.MouseStartPos.x;
            var offsetY = Laya.stage.mouseY - this.MouseStartPos.y;

            target.x = this.DragMovingStartPos.x + offsetX;
            target.y = this.DragMovingStartPos.y + offsetY;

            // this.checkCollsion(target);

            if (!this.IsStartDragMoved) {
                var pt = new Laya.Point(offsetX, offsetY);
                if (pt.distance(0, 0) > 5)//拖动距离小于5的话就算是点击 不然就是移动
                {
                    this.IsStartDragMoved = true;
                }
            }
        }
    }

    imgDeckHandler(e, target: Laya.Image) {
        if (e == 1) {
            console.log('down2');
            this.IsStartDraging = true;
            this.IsStartDragMoved = false;
            let lx = target.x;
            let ly = target.y;
            this.LastParent = target.parent as Laya.Sprite
            this.LastParent.removeChild(target);
            this.startCard.parent.addChild(target);
            target.x = this.LastParent.x + lx;
            target.y = this.LastParent.y + ly;
            this.MouseStartPos.x = Laya.stage.mouseX;
            this.MouseStartPos.y = Laya.stage.mouseY;

            this.DragMovingStartPos.x = target.x;
            this.DragMovingStartPos.y = target.y;

            this.LastzOrder = target.zOrder;
            target.zOrder = 999;
        }
        else if (e == 2) {
            if (!this.IsStartDraging) {
                return;
            }
            target.zOrder = this.LastzOrder;
            if (this.IsStartDragMoved) {
                console.log('yidong2');
                this.IsStartDraging = false;
                this.deal2Collsion(target);
            } else {
                console.log('dianji2');
                this.IsStartDraging = false;
                this.deal2MoveClickEvent(target);
            }

        }
        else if (e == 3) {
            if (!this.IsStartDraging) {
                return;
            }

            var offsetX = Laya.stage.mouseX - this.MouseStartPos.x;
            var offsetY = Laya.stage.mouseY - this.MouseStartPos.y;

            target.x = this.DragMovingStartPos.x + offsetX;
            target.y = this.DragMovingStartPos.y + offsetY;

            if (!this.IsStartDragMoved) {
                var pt = new Laya.Point(offsetX, offsetY);
                if (pt.distance(0, 0) > 5)//拖动距离小于5的话就算是点击 不然就是移动
                {
                    this.IsStartDragMoved = true;
                }
            }
        }
    }

    checkCollsion(img: Laya.Image) {
        let imgAnX: number = img.x + img.width / 2;
        let imgAnY: number = img.y + img.height / 2;
        if (this.deckBox1.contains(imgAnX, imgAnY)) {
            console.log('deckCard1发光', this.bottom1Img);
        }
        else if (this.deckBox2.contains(imgAnX, imgAnY)) {
            console.log('deckCard2发光', this.bottom2Img);
        }
        else if (this.deckBox3.contains(imgAnX, imgAnY)) {
            console.log('deckCard3发光', this.bottom3Img);
        }
        else if (this.deckBox4.contains(imgAnX, imgAnY)) {
            console.log('deckCard4发光', this.bottom4Img);
        } else {
            console.log('deckCard1234不发光', this.bottom1Img, this.bottom2Img, this.bottom3Img, this.bottom4Img);
        }
    }

    dealCollsion(img: Laya.Image) {
        let imgAnX: number = img.x + img.width / 2;
        let imgAnY: number = img.y + img.height / 2;
        if (this.deckBox1.contains(imgAnX, imgAnY)) {
            if (this.four1List.length > 0) {
                Laya.Tween.to(img, { x: this.DragMovingStartPos.x, y: this.DragMovingStartPos.y }, 200, Laya.Ease.sineOut, new Laya.Handler(this, () => {
                    this.threeCard.addChild(img);
                    img.pos(this.DragMovingStartPos.x - this.threeCard.x, this.DragMovingStartPos.y - this.threeCard.y)
                }), 0);
                return;
            }
            console.log('deckCard1碰撞事件处理');
            this.deckCard1.addChild(img);
            img.pos(0, 0);
            let poker = this.threeList[this.threeList.length - 1];
            this.threeList.splice(this.threeList.length - 1, 1);
            this.four1List.push(poker);
            this.SortAndMoveToPos();
            this.removeBuildClick(img);
            this.checkBuildClick();
            this.checkDeckClick();
        }
        else if (this.deckBox2.contains(imgAnX, imgAnY)) {
            if (this.four2List.length > 0) {
                Laya.Tween.to(img, { x: this.DragMovingStartPos.x, y: this.DragMovingStartPos.y }, 200, Laya.Ease.sineOut, new Laya.Handler(this, () => {
                    this.threeCard.addChild(img);
                    img.pos(this.DragMovingStartPos.x - this.threeCard.x, this.DragMovingStartPos.y - this.threeCard.y)
                }), 0);
                return;
            }
            console.log('deckCard2碰撞事件处理');
            this.deckCard2.addChild(img);
            img.pos(0, 0);
            let poker = this.threeList[this.threeList.length - 1];
            this.threeList.splice(this.threeList.length - 1, 1);
            this.four2List.push(poker);
            this.SortAndMoveToPos();
            this.removeBuildClick(img);
            this.checkBuildClick();
            this.checkDeckClick();
        }
        else if (this.deckBox3.contains(imgAnX, imgAnY)) {
            if (this.four3List.length > 0) {
                Laya.Tween.to(img, { x: this.DragMovingStartPos.x, y: this.DragMovingStartPos.y }, 200, Laya.Ease.sineOut, new Laya.Handler(this, () => {
                    this.threeCard.addChild(img);
                    img.pos(this.DragMovingStartPos.x - this.threeCard.x, this.DragMovingStartPos.y - this.threeCard.y)
                }), 0);
                return;
            }
            console.log('deckCard3碰撞事件处理');
            this.deckCard3.addChild(img);
            img.pos(0, 0);
            let poker = this.threeList[this.threeList.length - 1];
            this.threeList.splice(this.threeList.length - 1, 1);
            this.four3List.push(poker);
            this.SortAndMoveToPos();
            this.removeBuildClick(img);
            this.checkBuildClick();
            this.checkDeckClick();
        }
        else if (this.deckBox4.contains(imgAnX, imgAnY)) {
            if (this.four4List.length > 0) {
                Laya.Tween.to(img, { x: this.DragMovingStartPos.x, y: this.DragMovingStartPos.y }, 200, Laya.Ease.sineOut, new Laya.Handler(this, () => {
                    this.threeCard.addChild(img);
                    img.pos(this.DragMovingStartPos.x - this.threeCard.x, this.DragMovingStartPos.y - this.threeCard.y)
                }), 0);
                return;
            }
            console.log('deckCard4碰撞事件处理');
            this.deckCard4.addChild(img);
            img.pos(0, 0);
            let poker = this.threeList[this.threeList.length - 1];
            this.threeList.splice(this.threeList.length - 1, 1);
            this.four4List.push(poker);
            this.SortAndMoveToPos();
            this.removeBuildClick(img);
            this.checkBuildClick();
            this.checkDeckClick();
        }
        else if (this.trashcanBox.contains(imgAnX, imgAnY)) {
            let poker = this.threeList[this.threeList.length - 1];
            this.threeList.splice(this.threeList.length - 1, 1);
            let coin: number = Number(Xconfig.GetMetPrice(poker.data.mType))
            this.earnCoin(coin)
            this.SortAndMoveToPos();
            this.removeBuildClick(img);
            this.checkBuildClick();
            poker.Dispose();
        }
        else {
            console.log('deckCard1234没有碰撞事件');
            Laya.Tween.to(img, { x: this.DragMovingStartPos.x, y: this.DragMovingStartPos.y }, 200, Laya.Ease.sineOut, new Laya.Handler(this, () => {
                this.threeCard.addChild(img);
                img.pos(this.DragMovingStartPos.x - this.threeCard.x, this.DragMovingStartPos.y - this.threeCard.y)
            }), 0);
        }
    }

    dealMoveClickEvent(img: Laya.Image) {
        if (!img) {
            return;
        }
        if (this.four1List.length <= 0) {
            Laya.Tween.to(img, { x: this.deckCard1.x, y: this.deckCard1.y }, 150, Laya.Ease.sineIn, new Laya.Handler(this, () => {
                this.deckCard1.addChild(img);
                img.pos(0, 0);
                let poker = this.threeList[this.threeList.length - 1];
                this.threeList.splice(this.threeList.length - 1, 1);
                this.four1List.push(poker);
                this.SortAndMoveToPos();
                this.removeBuildClick(img);
                this.checkBuildClick();
                this.checkDeckClick();
            }), 0);
        }
        else if (this.four2List.length <= 0) {
            Laya.Tween.to(img, { x: this.deckCard2.x, y: this.deckCard2.y }, 150, Laya.Ease.sineIn, new Laya.Handler(this, () => {
                this.deckCard2.addChild(img);
                img.pos(0, 0);
                let poker = this.threeList[this.threeList.length - 1];
                this.threeList.splice(this.threeList.length - 1, 1);
                this.four2List.push(poker);
                this.SortAndMoveToPos();
                this.removeBuildClick(img);
                this.checkBuildClick();
                this.checkDeckClick();
            }), 0);
        }
        else if (this.four3List.length <= 0) {
            Laya.Tween.to(img, { x: this.deckCard3.x, y: this.deckCard3.y }, 150, Laya.Ease.sineIn, new Laya.Handler(this, () => {
                this.deckCard3.addChild(img);
                img.pos(0, 0);
                let poker = this.threeList[this.threeList.length - 1];
                this.threeList.splice(this.threeList.length - 1, 1);
                this.four3List.push(poker);
                this.SortAndMoveToPos();
                this.removeBuildClick(img);
                this.checkBuildClick();
                this.checkDeckClick();
            }), 0);
        }
        else if (this.four4List.length <= 0) {
            Laya.Tween.to(img, { x: this.deckCard4.x, y: this.deckCard4.y }, 150, Laya.Ease.sineIn, new Laya.Handler(this, () => {
                this.deckCard4.addChild(img);
                img.pos(0, 0);
                let poker = this.threeList[this.threeList.length - 1];
                this.threeList.splice(this.threeList.length - 1, 1);
                this.four4List.push(poker);
                this.SortAndMoveToPos();
                this.removeBuildClick(img);
                this.checkBuildClick();
                this.checkDeckClick();
            }), 0);
        }
        else {
            this.threeCard.addChild(img);
            img.pos(this.DragMovingStartPos.x - this.threeCard.x, this.DragMovingStartPos.y - this.threeCard.y)
        }
    }

    deal2MoveClickEvent(img: Laya.Image) {
        this.LastParent.addChild(img);
        img.pos(0, 0)
    }

    deal2Collsion(img: Laya.Image) {
        let imgAnX: number = img.x + img.width / 2;
        let imgAnY: number = img.y + img.height / 2;
        if (this.buildBox1.contains(imgAnX, imgAnY)) {
            console.log('buildCard1碰撞事件处理');
            if (this.LastParent == this.deckCard1) {
                this.deal2Of2(img, 1, 1)
            }
            else if (this.LastParent == this.deckCard2) {
                this.deal2Of2(img, 2, 1)
            }
            else if (this.LastParent == this.deckCard3) {
                this.deal2Of2(img, 3, 1)
            }
            else if (this.LastParent == this.deckCard4) {
                this.deal2Of2(img, 4, 1)
            }
        }
        else if (this.buildBox2.contains(imgAnX, imgAnY)) {
            console.log('buildCard2碰撞事件处理');
            if (this.LastParent == this.deckCard1) {
                this.deal2Of2(img, 1, 2)
            }
            else if (this.LastParent == this.deckCard2) {
                this.deal2Of2(img, 2, 2)
            }
            else if (this.LastParent == this.deckCard3) {
                this.deal2Of2(img, 3, 2)
            }
            else if (this.LastParent == this.deckCard4) {
                this.deal2Of2(img, 4, 2)
            }
        }
        else if (this.buildBox3.contains(imgAnX, imgAnY)) {
            console.log('buildCard3碰撞事件处理');
            if (this.LastParent == this.deckCard1) {
                this.deal2Of2(img, 1, 3)
            }
            else if (this.LastParent == this.deckCard2) {
                this.deal2Of2(img, 2, 3)
            }
            else if (this.LastParent == this.deckCard3) {
                this.deal2Of2(img, 3, 3)
            }
            else if (this.LastParent == this.deckCard4) {
                this.deal2Of2(img, 4, 3)
            }
        }
        else if (this.buildBox4.contains(imgAnX, imgAnY)) {
            console.log('buildCard4碰撞事件处理');
            if (this.LastParent == this.deckCard1) {
                this.deal2Of2(img, 1, 4)
            }
            else if (this.LastParent == this.deckCard2) {
                this.deal2Of2(img, 2, 4)
            }
            else if (this.LastParent == this.deckCard3) {
                this.deal2Of2(img, 3, 4)
            }
            else if (this.LastParent == this.deckCard4) {
                this.deal2Of2(img, 4, 4)
            }
        }
        else if (this.trashcanBox.contains(imgAnX, imgAnY)) {
            let poker: BuildCard;
            if (this.LastParent == this.deckCard1) {
                poker = this.four1List[this.four1List.length - 1];
                this.four1List.splice(this.four1List.length - 1, 1);
            }
            else if (this.LastParent == this.deckCard2) {
                poker = this.four2List[this.four2List.length - 1];
                this.four2List.splice(this.four2List.length - 1, 1);
            }
            else if (this.LastParent == this.deckCard3) {
                poker = this.four3List[this.four3List.length - 1];
                this.four3List.splice(this.four3List.length - 1, 1);
            }
            else if (this.LastParent == this.deckCard4) {
                poker = this.four4List[this.four4List.length - 1];
                this.four4List.splice(this.four4List.length - 1, 1);
            }
            let coin: number = Number(Xconfig.GetMetPrice(poker.data.mType))
            this.earnCoin(coin)
            poker.Dispose();
        }
        else {
            console.log('buildCard1234没有碰撞事件处理');
            this.deal2Of1(img);
        }
    }

    deal2Of1(img) {
        Laya.Tween.to(img, { x: this.DragMovingStartPos.x, y: this.DragMovingStartPos.y }, 200, Laya.Ease.sineOut, new Laya.Handler(this, () => {
            this.LastParent.addChild(img);
            img.pos(this.DragMovingStartPos.x - this.LastParent.x, this.DragMovingStartPos.y - this.LastParent.y)
        }), 0);
    }

    deal2Of2(img, type, num) {
        let poker: BuildCard;
        let weacard: WeaponCard;
        if (num == 1) {
            weacard = this.buildCard1.getChildAt(0) as WeaponCard;
        }
        else if (num == 2) {
            weacard = this.buildCard2.getChildAt(0) as WeaponCard;
        }
        else if (num == 3) {
            weacard = this.buildCard3.getChildAt(0) as WeaponCard;
        }
        else if (num == 4) {
            weacard = this.buildCard4.getChildAt(0) as WeaponCard;
        }
        let mat: any[] = weacard.weaponType.material;
        if (type == 1) {
            poker = this.four1List[this.four1List.length - 1];
            if (mat.indexOf(poker.data.mType) != -1) {
                let isCollect = weacard.CheckMaterialRight(poker.data.mType);
                if (isCollect) {
                    poker.Dispose();
                    this.four1List.splice(this.four1List.length - 1, 1);
                } else {
                    this.deal2Of1(img);
                }
            } else {
                this.deal2Of1(img);
            }
        }
        else if (type == 2) {
            poker = this.four2List[this.four2List.length - 1];
            if (mat.indexOf(poker.data.mType) != -1) {
                let isCollect = weacard.CheckMaterialRight(poker.data.mType);
                if (isCollect) {
                    poker.Dispose();
                    this.four2List.splice(this.four2List.length - 1, 1);
                } else {
                    this.deal2Of1(img);
                }
            } else {
                this.deal2Of1(img);
            }
        }
        else if (type == 3) {
            poker = this.four3List[this.four3List.length - 1];
            if (mat.indexOf(poker.data.mType) != -1) {
                let isCollect = weacard.CheckMaterialRight(poker.data.mType);
                if (isCollect) {
                    poker.Dispose();
                    this.four3List.splice(this.four3List.length - 1, 1);
                } else {
                    this.deal2Of1(img);
                }
            } else {
                this.deal2Of1(img);
            }
        }
        else if (type == 4) {
            poker = this.four4List[this.four4List.length - 1];
            if (mat.indexOf(poker.data.mType) != -1) {
                let isCollect = weacard.CheckMaterialRight(poker.data.mType);
                if (isCollect) {
                    poker.Dispose();
                    this.four4List.splice(this.four4List.length - 1, 1);
                } else {
                    this.deal2Of1(img);
                }
            } else {
                this.deal2Of1(img);
            }
        }
    }

    costCoin(num) {
        Xconfig.HeroCoin -= num;
        this.earncoin.text = '' + Xconfig.HeroCoin;
    }

    earnCoin(num) {
        Xconfig.HeroCoin += num;
        this.earncoin.text = '' + Xconfig.HeroCoin;
    }

    upCoin(num) {
        Xconfig.FaPaiBaseCostList[Xconfig.LastVillageId - 1].baseCoin = num;
        this.costcoin.text = '' + Xconfig.FaPaiBaseCostList[Xconfig.LastVillageId - 1].baseCoin;
    }

    finishCard(...args) {
        this.earnCoin(args[0]);
        let ss: Laya.Label = GameMain.app.viewManager.sceneMap.completion2Array[Xconfig.LastVillageId - 1];
        let ss2: Laya.Label = GameMain.app.viewManager.sceneMap.completion3Array[Xconfig.LastVillageId - 1];
        let ss3: Laya.Label = GameMain.app.viewManager.sceneMap.completionArray[Xconfig.LastVillageId - 1];
        let num = Number(ss.text);
        let num2 = Number(ss2.text);
        num -= 1;
        num2 += 1;
        ss.text = num + '';
        ss2.text = num2 + '';
        if (num == 0) {
            ss.visible = false;
        }
        if (num2 > 0) {
            ss2.visible = true;
        }
        if (args[1] != 0) {
            let y4 = false;
            for (let i = 0; i < this.vg.villageCard.length; i++) {
                if (this.vg.villageCard[i].style == 1) {
                    y4 = true
                }
            }
            if (!y4) {
                ss3.visible = false;
            }
            for (let i = 0; i < this.vg.villageCard.length; i++) {
                if (this.vg.villageCard[i].id == args[1]) {
                    console.log('xxx:', this.vg.villageCard[i].id, args[1], i);
                    this.vg.villageCard[i].NoShow();
                    return;
                }
            }
        }
    }

    checkWeaponCardStyle(id) {
        let ss: Laya.Label = GameMain.app.viewManager.sceneMap.completionArray[Xconfig.LastVillageId - 1];
        ss.visible = true;
    }
}