// /*
// * name;
// */
// class BattleView extends ui.BattleViewUI {
//     constructor() {
//         super();
//         this.init();
//         this.initBrodcast();
//     }
//     private startCard: Laya.Sprite;
//     private playerCard: PlayerCard = null;
//     private deckBox1: Laya.Rectangle;
//     private deckBox2: Laya.Rectangle;
//     private deckBox3: Laya.Rectangle;
//     private deckBox4: Laya.Rectangle;
//     private buildBox1: Laya.Rectangle;
//     private buildBox2: Laya.Rectangle;
//     private buildBox3: Laya.Rectangle;
//     private buildBox4: Laya.Rectangle;
//     private playerBox: Laya.Rectangle;
//     private buildList: Array<CCard>;
//     private deckCard1: CCard = null;
//     private deckCard2: CCard = null;
//     private deckCard3: CCard = null;
//     private deckCard4: CCard = null;
//     private buildCard1: CCard = null;
//     private buildCard2: CCard = null;
//     private buildCard3: CCard = null;
//     private buildCard4: CCard = null;
//     private MouseStartPos: laya.maths.Point = new laya.maths.Point();
//     private IsStartDraging: boolean = false; //开始拖拽
//     private IsStartDragMoved: boolean = false;//是否开始拖动了(点击判断使用)
//     private DragMovingStartPos: laya.maths.Point = new laya.maths.Point();
//     private LastzOrder: number = 0;
//     private LastParent: Laya.Sprite = null;
//     private vg;
//     onShow(bool) {
//         if (bool) {
//             this.visible = true;
//             this.addEvent();
//             this.initStartDeck();
//             this.initPlayerCard();
//             console.log('6666');
//             Laya.timer.once(1000, this, this.FanPai, [true]);
//         } else {
//             this.visible = false;
//             this.removeEvent();
//         }
//     }
//     init() {
//         this.startCard = new Laya.Sprite();
//         this.startCard.pos(Laya.stage.width / 2, -300);
//         this.addChild(this.startCard);
//         this.deckBox1 = new Laya.Rectangle(this.deckslot1.x, this.deckslot1.y, this.deckslot1.width, this.deckslot1.height);
//         this.deckBox2 = new Laya.Rectangle(this.deckslot2.x, this.deckslot2.y, this.deckslot2.width, this.deckslot2.height);
//         this.deckBox3 = new Laya.Rectangle(this.deckslot3.x, this.deckslot3.y, this.deckslot3.width, this.deckslot3.height);
//         this.deckBox4 = new Laya.Rectangle(this.deckslot4.x, this.deckslot4.y, this.deckslot4.width, this.deckslot4.height);
//         this.buildBox1 = new Laya.Rectangle(this.weaponslot1.x, this.weaponslot1.y, this.weaponslot1.width, this.weaponslot1.height);
//         this.buildBox2 = new Laya.Rectangle(this.weaponslot2.x, this.weaponslot2.y, this.weaponslot2.width, this.weaponslot2.height);
//         this.buildBox3 = new Laya.Rectangle(this.skillslot1.x, this.skillslot1.y, this.skillslot1.width, this.skillslot1.height);
//         this.buildBox4 = new Laya.Rectangle(this.skillslot2.x, this.skillslot2.y, this.skillslot2.width, this.skillslot2.height);
//         this.playerBox = new Laya.Rectangle(this.playerslot.x, this.playerslot.y, this.playerslot.width, this.playerslot.height);
//         this.buildList = new Array();
//     }
//     initPlayerCard() {
//         this.playerCard = PlayerCard.create(this.playerslot);
//         this.addPlyerClick(this.playerCard);
//     }
//     updateRemainCard(value) {
//         this.remaininglevel.text = '剩余卡牌:' + value;
//     }
//     initStartDeck() {
//         this.buildList = [];
//         var rmc = [CType.Cure, CType.Enemy, CType.Shiled, CType.Weapon];
//         var rmv = [CConfig.cureCount, CConfig.enemyCount, CConfig.shiledCount, CConfig.weaponCount];
//         for (var i = 0; i < CConfig.StartBuildDeckNum; i++) {
//             var no = GameMain.app.getRandom(0, rmc.length - 1);
//             let num = rmc[no];
//             let vno = GameMain.app.getRandom(1, rmv[no]);
//             var poker = new CCard(num, vno);
//             poker.data.IsCardBack = true;
//             poker.CreateRender();
//             this.buildList.push(poker);
//             this.startCard.addChild(poker.render.img);
//         }
//         //第一次发牌两武器两怪物
//         let temp = [0, 0];
//         let temp2 = [0, 0];
//         let wcount = 0;
//         let ecount = 0;
//         this.buildList.forEach((element, index) => {
//             if (wcount < 2) {
//                 if (element.data.mType == CType.Weapon || element.data.mType == CType.Shiled) {
//                     temp[wcount] = index;
//                     wcount += 1;
//                 }
//             }
//             if (ecount < 2) {
//                 if (element.data.mType == CType.Enemy) {
//                     temp2[ecount] = index;
//                     ecount += 1;
//                 }
//             }
//             if (wcount >= 2 && ecount >= 2) {
//                 return;
//             }
//         });
//         var x1 = this.buildList[temp[0]];
//         var x2 = this.buildList[temp[1]];
//         var x3 = this.buildList[temp2[0]];
//         var x4 = this.buildList[temp2[1]];
//         console.log("xxxxxxx1:", x1.data.mType, x2.data.mType, x3.data.mType, x4.data.mType);
//         var rrrr = [this.buildList.length - 4, this.buildList.length - 3, this.buildList.length - 2, this.buildList.length - 1]
//         var r1, r2, r3, r4, rr1, rr2, rr3;
//         rr1 = GameMain.app.getRandom(0, 3);
//         r1 = rrrr[rr1];
//         rrrr.splice(rr1, 1);
//         rr3 = GameMain.app.getRandom(0, 2);
//         r3 = rrrr[rr3];
//         rrrr.splice(rr3, 1);
//         rr2 = GameMain.app.getRandom(0, 1);
//         r2 = rrrr[rr2]
//         rrrr.splice(rr2, 1);
//         r4 = rrrr[0]
//         console.log("xxxxxxx2:", this.buildList[r1].data.mType,
//             this.buildList[r2].data.mType,
//             this.buildList[r3].data.mType,
//             this.buildList[r4].data.mType);
//         this.buildList[temp[0]] = this.buildList[r1];
//         this.buildList[temp[1]] = this.buildList[r2];
//         this.buildList[temp2[0]] = this.buildList[r3];
//         this.buildList[temp2[1]] = this.buildList[r4];
//         this.buildList[r1] = x1;
//         this.buildList[r2] = x2;
//         this.buildList[r3] = x3;
//         this.buildList[r4] = x4;
//     }
//     addBuildList() {
//         for (var i = 0; i < Xconfig.StartBuildDeckNum - this.buildList.length; i++) {
//             let num = GameMain.app.getRandom(1, Xconfig.BuildMaxType);
//             var poker = new BuildCard(num);
//             poker.data.IsCardBack = true;
//             poker.CreateRender();
//             this.buildList.push(poker);
//             this.startCard.addChild(poker.render.img)
//         }
//     }
//     addEvent() {
//         //翻牌
//         this.startCard.on(Laya.Event.MOUSE_DOWN, this, this.FanPai);
//     }
//     initBrodcast() {
//         GameGlobal.Dispatcher.addEvent(HeroEvent.REFERSH_GOLD, this, this.earnCoin);
//         GameGlobal.Dispatcher.addEvent(HeroEvent.FINISH_CARD, this, this.finishCard);
//         GameGlobal.Dispatcher.addEvent(HeroEvent.START_TO_MAKU, this, this.checkWeaponCardStyle);
//     }
//     addBuildClick(card: CCard) {
//         card.render.img.on(Laya.Event.MOUSE_DOWN, this, this.imgBuildHandler, [1, card]);
//         card.render.img.on(Laya.Event.MOUSE_UP, this, this.imgBuildHandler, [2, card]);
//         card.render.img.on(Laya.Event.MOUSE_MOVE, this, this.imgBuildHandler, [3, card]);
//     }
//     addDeckClick(card: CCard) {
//         card.render.img.on(Laya.Event.MOUSE_DOWN, this, this.imgDeckHandler, [1, card]);
//         card.render.img.on(Laya.Event.MOUSE_UP, this, this.imgDeckHandler, [2, card]);
//         card.render.img.on(Laya.Event.MOUSE_MOVE, this, this.imgDeckHandler, [3, card]);
//     }
//     addPlyerClick(img) {
//         img.on(Laya.Event.MOUSE_DOWN, this, this.imgPlyerHandler, [1, img]);
//         img.on(Laya.Event.MOUSE_UP, this, this.imgPlyerHandler, [2, img]);
//         img.on(Laya.Event.MOUSE_MOVE, this, this.imgPlyerHandler, [3, img]);
//     }
//     checkBuildClick() {
//         for (let i = 0; i < this.threeList.length; i++) {
//             console.log('addDeckClick1:', this.threeList[i], i, <Laya.Image>this.threeCard.getChildAt(i));
//             let img = <Laya.Image>this.threeCard.getChildAt(i);
//             if (i == this.threeList.length - 1) {
//                 this.addBuildClick(img)
//             } else {
//                 this.removeBuildClick(img)
//             }
//         }
//     }
//     checkDeckClick() {
//         for (let i = 0; i < this.four1List.length; i++) {
//             console.log('addDeckClick2:', this.four1List[i], i, <Laya.Image>this.deckCard1.getChildAt(i + 1));
//             let img = <Laya.Image>this.deckCard1.getChildAt(i + 1);
//             if (img == this.bottom1Img) {
//                 continue;
//             }
//             if (i == this.four1List.length - 1) {
//                 this.addDeckClick(img)
//             } else {
//                 this.removeDeckClick(img)
//             }
//         }
//         for (let i = 0; i < this.four2List.length; i++) {
//             let img = <Laya.Image>this.deckCard2.getChildAt(i + 1);
//             if (img == this.bottom2Img) {
//                 continue;
//             }
//             if (i == this.four2List.length - 1) {
//                 this.addDeckClick(img)
//             } else {
//                 this.removeDeckClick(img)
//             }
//         }
//         for (let i = 0; i < this.four3List.length; i++) {
//             let img = <Laya.Image>this.deckCard3.getChildAt(i + 1);
//             if (img == this.bottom3Img) {
//                 continue;
//             }
//             if (i == this.four3List.length - 1) {
//                 this.addDeckClick(img)
//             } else {
//                 this.removeDeckClick(img)
//             }
//         }
//         for (let i = 0; i < this.four4List.length; i++) {
//             let img = <Laya.Image>this.deckCard4.getChildAt(i + 1);
//             if (img == this.bottom4Img) {
//                 continue;
//             }
//             if (i == this.four4List.length - 1) {
//                 this.addDeckClick(img)
//             } else {
//                 this.removeDeckClick(img)
//             }
//         }
//     }
//     removeBuildClick(img) {
//         console.log('removeBuildClick:', img);
//         img.off(Laya.Event.MOUSE_DOWN, this, this.imgBuildHandler);
//         img.off(Laya.Event.MOUSE_UP, this, this.imgBuildHandler);
//         img.off(Laya.Event.MOUSE_MOVE, this, this.imgBuildHandler);
//     }
//     removeDeckClick(img) {
//         img.off(Laya.Event.MOUSE_DOWN, this, this.imgDeckHandler);
//         img.off(Laya.Event.MOUSE_UP, this, this.imgDeckHandler);
//         img.off(Laya.Event.MOUSE_MOVE, this, this.imgDeckHandler);
//     }
//     removeEvent() {
//         this.startCard.off(Laya.Event.MOUSE_DOWN, this, this.FanPai);
//     }
//     public Dispose() {
//         this.removeSelf();
//         this.destroy();
//     }
//     //第一次发牌发四张，以后每次剩一张触发发牌，发三张
//     FanPai(isFirst) {
//         var num = 0;
//         if (isFirst) {
//             num = 4;
//         } else {
//             num = 3;
//         }
//         for (let i = 0; i < num; i++) {
//             var card: CCard = this.buildList[this.buildList.length - 1];
//             var deck;
//             this.buildList.splice(this.buildList.length - 1, 1);
//             this.startCard.removeChild(card.render.img);
//             this.addChild(card.render.img);
//             if (this.deckCard1 == null) {
//                 deck = this.deckslot1;
//                 this.deckCard1 = card;
//             }
//             else if (this.deckCard2 == null) {
//                 deck = this.deckslot2;
//                 this.deckCard2 = card;
//             }
//             else if (this.deckCard3 == null) {
//                 deck = this.deckslot3;
//                 this.deckCard3 = card;
//             }
//             else if (this.deckCard4 == null) {
//                 deck = this.deckslot4;
//                 this.deckCard4 = card;
//             }
//             console.log('11111', card.data.mType, card.data.mNo);
//             card.render.img.pos(this.startCard.x, this.startCard.y);
//             Laya.Tween.to(card.render.img, { x: deck.x, y: deck.y }, 750, Laya.Ease.sineIn, Laya.Handler.create(this, this.MoveAniEnd, [deck, card]), i * 100);
//         }
//         this.updateRemainCard(this.buildList.length);
//     }
//     Calculate(n) {
//         var count = 1;
//         while (n > 0) {
//             for (var i = 0; i < count; i++) {
//                 n--;
//                 if (n < 1) {
//                     console.log('lol:', count)
//                     this.upCoin(count);
//                     break;
//                 }
//             }
//             count++;
//         }
//     }
//     //1-开始牌堆卡牌移动结束处理
//     MoveAniEnd(deck, card: CCard) {
//         console.log('i???', deck.rotation, card.render.img.x, card.render.img.y);
//         deck.addChild(card.render.img);
//         card.render.img.pos(0, 0);
//         card.data.IsCardBack = false;
//         card.FlushRender();
//         this.addDeckClick(card);
//     }
//     SortAndMoveToPos() {
//         if (this.threeList.length > 0) {
//             for (let i = 0; i < this.threeList.length; i++) {
//                 var img = <Laya.Image>this.threeCard.getChildAt(i);
//                 var indexFromLast = this.threeList.length - 1 - i;
//                 console.log('img:', i, indexFromLast);
//                 if (indexFromLast <= 2) {
//                     var posIndex = 2 - indexFromLast;
//                     if (this.threeList.length < 3) {
//                         posIndex = i;
//                     }
//                     var pos = new Laya.Point(posIndex * Xconfig.threeCardSpacing, 0);
//                     Laya.Tween.to(img, { x: pos.x, y: pos.y }, 90, null, null, 0);
//                 }
//             }
//         }
//     }
//     imgBuildHandler(e, card: CCard) {
//         let target = card.render.img;
//         if (e == 1) {
//             console.log('down2');
//             this.IsStartDraging = true;
//             this.IsStartDragMoved = false;
//             let lx = target.x;
//             let ly = target.y;
//             this.LastParent = target.parent as Laya.Sprite
//             this.LastParent.removeChild(target);
//             this.addChild(target);
//             target.x = this.LastParent.x + lx;
//             target.y = this.LastParent.y + ly;
//             target.rotation = this.LastParent.rotation;
//             this.MouseStartPos.x = Laya.stage.mouseX;
//             this.MouseStartPos.y = Laya.stage.mouseY;
//             this.DragMovingStartPos.x = target.x;
//             this.DragMovingStartPos.y = target.y;
//             this.LastzOrder = target.zOrder;
//             target.zOrder = 999;
//         }
//         else if (e == 2) {
//             if (!this.IsStartDraging) {
//                 return;
//             }
//             target.zOrder = this.LastzOrder;
//             if (this.IsStartDragMoved) {
//                 console.log('yidong2');
//                 this.IsStartDraging = false;
//                 this.buildDeal2Collsion(card);
//             } else {
//                 console.log('dianji2');
//                 this.IsStartDraging = false;
//                 this.deal2MoveClickEvent(target);
//             }
//         }
//         else if (e == 3) {
//             if (!this.IsStartDraging) {
//                 return;
//             }
//             var offsetX = Laya.stage.mouseX - this.MouseStartPos.x;
//             var offsetY = Laya.stage.mouseY - this.MouseStartPos.y;
//             target.x = this.DragMovingStartPos.x + offsetX;
//             target.y = this.DragMovingStartPos.y + offsetY;
//             if (!this.IsStartDragMoved) {
//                 var pt = new Laya.Point(offsetX, offsetY);
//                 if (pt.distance(0, 0) > 1)//拖动距离小于1的话就算是点击 不然就是移动
//                 {
//                     this.IsStartDragMoved = true;
//                 }
//             }
//         }
//     }
//     imgPlyerHandler(e, card: Laya.Image) {
//         let target = card;
//         if (e == 1) {
//             console.log('down2');
//             this.IsStartDraging = true;
//             this.IsStartDragMoved = false;
//             let lx = target.x;
//             let ly = target.y;
//             this.LastParent = target.parent as Laya.Sprite
//             this.LastParent.removeChild(target);
//             this.addChild(target);
//             target.x = this.LastParent.x + lx;
//             target.y = this.LastParent.y + ly;
//             target.rotation = this.LastParent.rotation;
//             this.MouseStartPos.x = Laya.stage.mouseX;
//             this.MouseStartPos.y = Laya.stage.mouseY;
//             this.DragMovingStartPos.x = target.x;
//             this.DragMovingStartPos.y = target.y;
//             this.LastzOrder = target.zOrder;
//             target.zOrder = 999;
//         }
//         else if (e == 2) {
//             if (!this.IsStartDraging) {
//                 return;
//             }
//             target.zOrder = this.LastzOrder;
//             if (this.IsStartDragMoved) {
//                 console.log('yidong2');
//                 this.IsStartDraging = false;
//                 this.playerDeal2Collsion(target);
//             } else {
//                 console.log('dianji2');
//                 this.IsStartDraging = false;
//                 this.deal2MoveClickEvent(target);
//             }
//         }
//         else if (e == 3) {
//             if (!this.IsStartDraging) {
//                 return;
//             }
//             var offsetX = Laya.stage.mouseX - this.MouseStartPos.x;
//             var offsetY = Laya.stage.mouseY - this.MouseStartPos.y;
//             target.x = this.DragMovingStartPos.x + offsetX;
//             target.y = this.DragMovingStartPos.y + offsetY;
//             if (!this.IsStartDragMoved) {
//                 var pt = new Laya.Point(offsetX, offsetY);
//                 if (pt.distance(0, 0) > 1)//拖动距离小于1的话就算是点击 不然就是移动
//                 {
//                     this.IsStartDragMoved = true;
//                 }
//             }
//         }
//     }
//     imgDeckHandler(e, card: CCard) {
//         let target = card.render.img;
//         if (e == 1) {
//             console.log('down2');
//             this.IsStartDraging = true;
//             this.IsStartDragMoved = false;
//             let lx = target.x;
//             let ly = target.y;
//             this.LastParent = target.parent as Laya.Sprite
//             this.LastParent.removeChild(target);
//             this.addChild(target);
//             target.x = this.LastParent.x + lx;
//             target.y = this.LastParent.y + ly;
//             target.rotation = this.LastParent.rotation;
//             this.MouseStartPos.x = Laya.stage.mouseX;
//             this.MouseStartPos.y = Laya.stage.mouseY;
//             this.DragMovingStartPos.x = target.x;
//             this.DragMovingStartPos.y = target.y;
//             this.LastzOrder = target.zOrder;
//             target.zOrder = 999;
//         }
//         else if (e == 2) {
//             if (!this.IsStartDraging) {
//                 return;
//             }
//             target.zOrder = this.LastzOrder;
//             if (this.IsStartDragMoved) {
//                 console.log('yidong2');
//                 this.IsStartDraging = false;
//                 this.deal2Collsion(card);
//             } else {
//                 console.log('dianji2');
//                 this.IsStartDraging = false;
//                 this.deal2MoveClickEvent(target);
//             }
//         }
//         else if (e == 3) {
//             if (!this.IsStartDraging) {
//                 return;
//             }
//             var offsetX = Laya.stage.mouseX - this.MouseStartPos.x;
//             var offsetY = Laya.stage.mouseY - this.MouseStartPos.y;
//             target.x = this.DragMovingStartPos.x + offsetX;
//             target.y = this.DragMovingStartPos.y + offsetY;
//             if (!this.IsStartDragMoved) {
//                 var pt = new Laya.Point(offsetX, offsetY);
//                 if (pt.distance(0, 0) > 1)//拖动距离小于1的话就算是点击 不然就是移动
//                 {
//                     if (card.data.mType == CType.Enemy) {
//                         this.imgDeckHandler(2, card);
//                     } else {
//                         this.IsStartDragMoved = true;
//                     }
//                 }
//             }
//         }
//     }
//     checkCollsion(img: Laya.Image) {
//         let imgAnX: number = img.x + img.width / 2;
//         let imgAnY: number = img.y + img.height / 2;
//         if (this.deckBox1.contains(imgAnX, imgAnY)) {
//             console.log('deckCard1发光', this.bottom1Img);
//         }
//         else if (this.deckBox2.contains(imgAnX, imgAnY)) {
//             console.log('deckCard2发光', this.bottom2Img);
//         }
//         else if (this.deckBox3.contains(imgAnX, imgAnY)) {
//             console.log('deckCard3发光', this.bottom3Img);
//         }
//         else if (this.deckBox4.contains(imgAnX, imgAnY)) {
//             console.log('deckCard4发光', this.bottom4Img);
//         } else {
//             console.log('deckCard1234不发光', this.bottom1Img, this.bottom2Img, this.bottom3Img, this.bottom4Img);
//         }
//     }
//     dealCollsion(img: Laya.Image) {
//         let imgAnX: number = img.x + img.width / 2;
//         let imgAnY: number = img.y + img.height / 2;
//         if (this.deckBox1.contains(imgAnX, imgAnY)) {
//             if (this.four1List.length > 0) {
//                 Laya.Tween.to(img, { x: this.DragMovingStartPos.x, y: this.DragMovingStartPos.y }, 200, Laya.Ease.sineOut, new Laya.Handler(this, () => {
//                     this.threeCard.addChild(img);
//                     img.pos(this.DragMovingStartPos.x - this.threeCard.x, this.DragMovingStartPos.y - this.threeCard.y)
//                 }), 0);
//                 return;
//             }
//             console.log('deckCard1碰撞事件处理');
//             this.deckCard1.addChild(img);
//             img.pos(0, 0);
//             let poker = this.threeList[this.threeList.length - 1];
//             this.threeList.splice(this.threeList.length - 1, 1);
//             this.four1List.push(poker);
//             this.SortAndMoveToPos();
//             this.removeBuildClick(img);
//             this.checkBuildClick();
//             this.checkDeckClick();
//         }
//         else if (this.deckBox2.contains(imgAnX, imgAnY)) {
//             if (this.four2List.length > 0) {
//                 Laya.Tween.to(img, { x: this.DragMovingStartPos.x, y: this.DragMovingStartPos.y }, 200, Laya.Ease.sineOut, new Laya.Handler(this, () => {
//                     this.threeCard.addChild(img);
//                     img.pos(this.DragMovingStartPos.x - this.threeCard.x, this.DragMovingStartPos.y - this.threeCard.y)
//                 }), 0);
//                 return;
//             }
//             console.log('deckCard2碰撞事件处理');
//             this.deckCard2.addChild(img);
//             img.pos(0, 0);
//             let poker = this.threeList[this.threeList.length - 1];
//             this.threeList.splice(this.threeList.length - 1, 1);
//             this.four2List.push(poker);
//             this.SortAndMoveToPos();
//             this.removeBuildClick(img);
//             this.checkBuildClick();
//             this.checkDeckClick();
//         }
//         else if (this.deckBox3.contains(imgAnX, imgAnY)) {
//             if (this.four3List.length > 0) {
//                 Laya.Tween.to(img, { x: this.DragMovingStartPos.x, y: this.DragMovingStartPos.y }, 200, Laya.Ease.sineOut, new Laya.Handler(this, () => {
//                     this.threeCard.addChild(img);
//                     img.pos(this.DragMovingStartPos.x - this.threeCard.x, this.DragMovingStartPos.y - this.threeCard.y)
//                 }), 0);
//                 return;
//             }
//             console.log('deckCard3碰撞事件处理');
//             this.deckCard3.addChild(img);
//             img.pos(0, 0);
//             let poker = this.threeList[this.threeList.length - 1];
//             this.threeList.splice(this.threeList.length - 1, 1);
//             this.four3List.push(poker);
//             this.SortAndMoveToPos();
//             this.removeBuildClick(img);
//             this.checkBuildClick();
//             this.checkDeckClick();
//         }
//         else if (this.deckBox4.contains(imgAnX, imgAnY)) {
//             if (this.four4List.length > 0) {
//                 Laya.Tween.to(img, { x: this.DragMovingStartPos.x, y: this.DragMovingStartPos.y }, 200, Laya.Ease.sineOut, new Laya.Handler(this, () => {
//                     this.threeCard.addChild(img);
//                     img.pos(this.DragMovingStartPos.x - this.threeCard.x, this.DragMovingStartPos.y - this.threeCard.y)
//                 }), 0);
//                 return;
//             }
//             console.log('deckCard4碰撞事件处理');
//             this.deckCard4.addChild(img);
//             img.pos(0, 0);
//             let poker = this.threeList[this.threeList.length - 1];
//             this.threeList.splice(this.threeList.length - 1, 1);
//             this.four4List.push(poker);
//             this.SortAndMoveToPos();
//             this.removeBuildClick(img);
//             this.checkBuildClick();
//             this.checkDeckClick();
//         }
//         else if (this.trashcanBox.contains(imgAnX, imgAnY)) {
//             let poker = this.threeList[this.threeList.length - 1];
//             this.threeList.splice(this.threeList.length - 1, 1);
//             let coin: number = Number(Xconfig.GetMetPrice(poker.data.mType))
//             this.earnCoin(coin)
//             this.SortAndMoveToPos();
//             this.removeBuildClick(img);
//             this.checkBuildClick();
//             poker.Dispose();
//         }
//         else {
//             console.log('deckCard1234没有碰撞事件');
//             Laya.Tween.to(img, { x: this.DragMovingStartPos.x, y: this.DragMovingStartPos.y }, 200, Laya.Ease.sineOut, new Laya.Handler(this, () => {
//                 this.threeCard.addChild(img);
//                 img.pos(this.DragMovingStartPos.x - this.threeCard.x, this.DragMovingStartPos.y - this.threeCard.y)
//             }), 0);
//         }
//     }
//     dealMoveClickEvent(img: Laya.Image) {
//         if (!img) {
//             return;
//         }
//         if (this.four1List.length <= 0) {
//             Laya.Tween.to(img, { x: this.deckCard1.x, y: this.deckCard1.y }, 150, Laya.Ease.sineIn, new Laya.Handler(this, () => {
//                 this.deckCard1.addChild(img);
//                 img.pos(0, 0);
//                 let poker = this.threeList[this.threeList.length - 1];
//                 this.threeList.splice(this.threeList.length - 1, 1);
//                 this.four1List.push(poker);
//                 this.SortAndMoveToPos();
//                 this.removeBuildClick(img);
//                 this.checkBuildClick();
//                 this.checkDeckClick();
//             }), 0);
//         }
//         else if (this.four2List.length <= 0) {
//             Laya.Tween.to(img, { x: this.deckCard2.x, y: this.deckCard2.y }, 150, Laya.Ease.sineIn, new Laya.Handler(this, () => {
//                 this.deckCard2.addChild(img);
//                 img.pos(0, 0);
//                 let poker = this.threeList[this.threeList.length - 1];
//                 this.threeList.splice(this.threeList.length - 1, 1);
//                 this.four2List.push(poker);
//                 this.SortAndMoveToPos();
//                 this.removeBuildClick(img);
//                 this.checkBuildClick();
//                 this.checkDeckClick();
//             }), 0);
//         }
//         else if (this.four3List.length <= 0) {
//             Laya.Tween.to(img, { x: this.deckCard3.x, y: this.deckCard3.y }, 150, Laya.Ease.sineIn, new Laya.Handler(this, () => {
//                 this.deckCard3.addChild(img);
//                 img.pos(0, 0);
//                 let poker = this.threeList[this.threeList.length - 1];
//                 this.threeList.splice(this.threeList.length - 1, 1);
//                 this.four3List.push(poker);
//                 this.SortAndMoveToPos();
//                 this.removeBuildClick(img);
//                 this.checkBuildClick();
//                 this.checkDeckClick();
//             }), 0);
//         }
//         else if (this.four4List.length <= 0) {
//             Laya.Tween.to(img, { x: this.deckCard4.x, y: this.deckCard4.y }, 150, Laya.Ease.sineIn, new Laya.Handler(this, () => {
//                 this.deckCard4.addChild(img);
//                 img.pos(0, 0);
//                 let poker = this.threeList[this.threeList.length - 1];
//                 this.threeList.splice(this.threeList.length - 1, 1);
//                 this.four4List.push(poker);
//                 this.SortAndMoveToPos();
//                 this.removeBuildClick(img);
//                 this.checkBuildClick();
//                 this.checkDeckClick();
//             }), 0);
//         }
//         else {
//             this.threeCard.addChild(img);
//             img.pos(this.DragMovingStartPos.x - this.threeCard.x, this.DragMovingStartPos.y - this.threeCard.y)
//         }
//     }
//     deal2MoveClickEvent(img: Laya.Image) {
//         this.LastParent.addChild(img);
//         img.pos(0, 0);
//         img.rotation = 0;
//     }
//     buildDeal2Collsion(card: CCard) {
//         let dealSuccess = false;
//         let img = card.render.img;
//         let imgAnX: number = img.x + img.width / 2;
//         let imgAnY: number = img.y + img.height / 2;
//         if (card.data.mType == CType.Weapon || card.data.mType == CType.Shiled) {
//             if (this.playerBox.contains(imgAnX, imgAnY)) {
//                 this.deal2Of3();
//                 img.removeSelf();
//                 img.destroy();
//                 dealSuccess = true;
//                 if (card.data.mType == CType.Weapon) {
//                     this.playerCard.liftAtk(card.data.mHp);
//                 } else {
//                     this.playerCard.showShiled(true, card.data.mHp);
//                 }
//             }
//         }
//         else if (card.data.mType == CType.Skill) {
//             // dealSuccess = true;
//         }
//         else if (card.data.mType == CType.Cure) {
//             if (this.playerBox.contains(imgAnX, imgAnY)) {
//                 this.deal2Of3();
//                 img.removeSelf();
//                 img.destroy();
//                 dealSuccess = true;
//                 this.playerCard.costHp(card.data.mHp);
//             }
//         }
//         if (!dealSuccess) {
//             console.log('没有碰撞事件处理');
//             this.deal2Of1(img);
//         }
//     }
//     playerDeal2Collsion(card: Laya.Image) {
//         let dealSuccess = false;
//         let imgAnX: number = card.x + card.width / 2;
//         let imgAnY: number = card.y + card.height / 2;
//         console.log("playercardpos:", imgAnX, imgAnY, this.buildBox1, this.buildBox2, this.buildBox3, this.buildBox4, this.buildCard1, this.buildCard2, this.buildCard3, this.buildCard4)
//         if (this.deckBox1.contains(imgAnX, imgAnY) && this.deckCard1 != null && this.deckCard1.data.mType == CType.Enemy) {
//             this.duelWithMonster(true, false, this.deckCard1, null);
//         }
//         else if (this.deckBox2.contains(imgAnX, imgAnY) && this.deckCard2 != null && this.deckCard2.data.mType == CType.Enemy) {
//             this.duelWithMonster(true, false, this.deckCard2, null);
//         }
//         else if (this.deckBox3.contains(imgAnX, imgAnY) && this.deckCard3 != null && this.deckCard3.data.mType == CType.Enemy) {
//             this.duelWithMonster(true, false, this.deckCard3, null);
//         }
//         else if (this.deckBox4.contains(imgAnX, imgAnY) && this.deckCard4 != null && this.deckCard4.data.mType == CType.Enemy) {
//             this.duelWithMonster(true, false, this.deckCard4, null);
//         }
//         this.deal2Of1(card);
//     }
//     deal2Collsion(card: CCard) {
//         let dealSuccess = false;
//         let img = card.render.img;
//         let imgAnX: number = img.x + img.width / 2;
//         let imgAnY: number = img.y + img.height / 2;
//         if (this.buildBox1.contains(imgAnX, imgAnY) && this.buildCard1 == null) {
//             console.log('buildCard1碰撞事件处理');
//             if (card.data.mType == CType.Weapon || card.data.mType == CType.Shiled) {
//                 this.weaponslot1.addChild(img);
//                 this.buildCard1 = card;
//                 img.pos(0, 0);
//                 img.rotation = 0;
//                 this.deal2Of2()
//                 dealSuccess = true;
//                 this.removeDeckClick(img);
//                 this.addBuildClick(card);
//             }
//         }
//         else if (this.buildBox2.contains(imgAnX, imgAnY) && this.buildCard2 == null) {
//             console.log('buildCard2碰撞事件处理');
//             if (card.data.mType == CType.Weapon || card.data.mType == CType.Shiled) {
//                 this.weaponslot2.addChild(img);
//                 this.buildCard2 = card;
//                 img.pos(0, 0);
//                 img.rotation = 0;
//                 this.deal2Of2()
//                 dealSuccess = true;
//                 this.removeDeckClick(img);
//                 this.addBuildClick(card);
//             }
//         }
//         else if (this.buildBox3.contains(imgAnX, imgAnY) && this.buildCard3 == null) {
//             console.log('buildCard3碰撞事件处理');
//             if (card.data.mType == CType.Skill || card.data.mType == CType.Cure || card.data.mType == CType.Treasure) {
//                 this.skillslot1.addChild(img);
//                 this.buildCard3 = card;
//                 img.pos(0, 0);
//                 img.rotation = 0;
//                 this.deal2Of2()
//                 dealSuccess = true;
//                 this.removeDeckClick(img);
//                 this.addBuildClick(card);
//             }
//         }
//         else if (this.buildBox4.contains(imgAnX, imgAnY) && this.buildCard4 == null) {
//             console.log('buildCard4碰撞事件处理');
//             if (card.data.mType == CType.Skill || card.data.mType == CType.Cure || card.data.mType == CType.Treasure) {
//                 this.skillslot2.addChild(img);
//                 this.buildCard4 = card;
//                 img.pos(0, 0);
//                 img.rotation = 0;
//                 this.deal2Of2()
//                 dealSuccess = true;
//                 this.removeDeckClick(img);
//                 this.addBuildClick(card);
//             }
//         }
//         if (!dealSuccess) {
//             console.log('buildCard1234没有碰撞事件处理');
//             this.deal2Of1(img);
//         }
//     }
//     deal2Of1(img) {
//         Laya.Tween.to(img, { x: this.DragMovingStartPos.x, y: this.DragMovingStartPos.y }, 200, Laya.Ease.sineOut, new Laya.Handler(this, () => {
//             this.LastParent.addChild(img);
//             img.pos(this.DragMovingStartPos.x - this.LastParent.x, this.DragMovingStartPos.y - this.LastParent.y)
//             img.rotation = 0;
//         }), 0);
//     }
//     checkFaPai() {
//         let notlist = [this.deckCard1, this.deckCard2, this.deckCard3, this.deckCard4];
//         let notcount = 0;
//         notlist.forEach(element => {
//             if (element == null) {
//                 notcount += 1;
//             }
//         });
//         console.log("notlist", notlist)
//         if (notcount >= 3) {
//             this.FanPai(false);
//         }
//     }
//     deal2Of2() {
//         switch (this.LastParent) {
//             case this.deckslot1:
//                 this.deckCard1 = null;
//                 break;
//             case this.deckslot2:
//                 this.deckCard2 = null;
//                 break;
//             case this.deckslot3:
//                 this.deckCard3 = null;
//                 break;
//             case this.deckslot4:
//                 this.deckCard4 = null;
//                 break;
//         }
//         this.checkFaPai();
//     }
//     deal2Of3() {
//         switch (this.LastParent) {
//             case this.weaponslot1:
//                 this.buildCard1 = null;
//                 break;
//             case this.weaponslot2:
//                 this.buildCard2 = null;
//                 break;
//             case this.skillslot1:
//                 this.buildCard3 = null;
//                 break;
//             case this.skillslot2:
//                 this.buildCard4 = null;
//                 break;
//         }
//     }
//     deal2Of4(parent) {
//         switch (parent) {
//             case this.deckslot1:
//                 this.deckCard1 = null;
//                 break;
//             case this.deckslot2:
//                 this.deckCard2 = null;
//                 break;
//             case this.deckslot3:
//                 this.deckCard3 = null;
//                 break;
//             case this.deckslot4:
//                 this.deckCard4 = null;
//                 break;
//         }
//         this.checkFaPai();
//     }
//     duelWithMonster(isHavaPlayer, isSkill, card: CCard, skill: CCard) {
//         let duelSuccess = false;
//         let monsterHp = Number(card.data.mHp);
//         if (!isSkill) {
//             if (this.playerCard.curAtk >= monsterHp) {
//                 duelSuccess = true;
//             } else {
//                 if (this.playerCard.curAtk + this.playerCard.shieldcount >= monsterHp) {
//                     this.playerCard.costShield(-(monsterHp - this.playerCard.curAtk));
//                     duelSuccess = true;
//                 } else {
//                     if (this.playerCard.curAtk + this.playerCard.shieldcount + this.playerCard.curHp >= monsterHp) {
//                         duelSuccess = true;
//                     } else {
//                         this.playerCard.judgeDead();
//                     }
//                     let va = this.playerCard.shieldcount;
//                     this.playerCard.costShield(-monsterHp);
//                     this.playerCard.costHp(-(monsterHp - this.playerCard.curAtk - va));
//                 }
//             }
//             this.playerCard.resumeAtk();
//         } else {
//             if (!isHavaPlayer) {
//                 let skillDuel: number = Number(skill.data.mHp) - Number(card.data.mHp);
//                 if (skillDuel < 0) {
//                     CEffectConfig.Missile(card, Number(skill.data.mHp));
//                     // card.render.SetHp(card.data, Number(card.data.mHp) - Number(skill.data.mHp))
//                 } else {
//                     duelSuccess = true;
//                 }
//             } else {
//                 if (this.playerCard.curAtk + Number(skill.data.mHp) >= monsterHp) {
//                     duelSuccess = true;
//                 } else {
//                     CEffectConfig.Missile(card, Number(skill.data.mHp) + Number(this.playerCard.curAtk));
//                     // card.render.SetHp(card.data, Number(card.data.mHp) - Number(skill.data.mHp) - Number(this.playerCard.curAtk))
//                 }
//             }
//             skill.render.img.removeSelf();
//             skill.render.img.destroy();
//             this.deal2Of3();
//         }
//         if (duelSuccess) {
//             let p = card.render.img.parent;
//             this.deal2Of4(p);
//             card.render.img.removeSelf();
//             card.render.img.destroy();
//         }
//     }
//     costCoin(num) {
//         Xconfig.HeroCoin -= num;
//         this.earncoin.text = '' + Xconfig.HeroCoin;
//     }
//     earnCoin(num) {
//         Xconfig.HeroCoin += num;
//         this.earncoin.text = '' + Xconfig.HeroCoin;
//     }
//     upCoin(num) {
//         Xconfig.FaPaiBaseCostList[Xconfig.LastVillageId - 1].baseCoin = num;
//         this.costcoin.text = '' + Xconfig.FaPaiBaseCostList[Xconfig.LastVillageId - 1].baseCoin;
//     }
//     finishCard(...args) {
//         this.earnCoin(args[0]);
//         let ss: Laya.Label = GameMain.app.viewManager.sceneMap.completion2Array[Xconfig.LastVillageId - 1];
//         let ss2: Laya.Label = GameMain.app.viewManager.sceneMap.completion3Array[Xconfig.LastVillageId - 1];
//         let ss3: Laya.Label = GameMain.app.viewManager.sceneMap.completionArray[Xconfig.LastVillageId - 1];
//         let num = Number(ss.text);
//         let num2 = Number(ss2.text);
//         num -= 1;
//         num2 += 1;
//         ss.text = num + '';
//         ss2.text = num2 + '';
//         if (num == 0) {
//             ss.visible = false;
//         }
//         if (num2 > 0) {
//             ss2.visible = true;
//         }
//         if (args[1] != 0) {
//             let y4 = false;
//             for (let i = 0; i < this.vg.villageCard.length; i++) {
//                 if (this.vg.villageCard[i].style == 1) {
//                     y4 = true
//                 }
//             }
//             if (!y4) {
//                 ss3.visible = false;
//             }
//             for (let i = 0; i < this.vg.villageCard.length; i++) {
//                 if (this.vg.villageCard[i].id == args[1]) {
//                     console.log('xxx:', this.vg.villageCard[i].id, args[1], i);
//                     this.vg.villageCard[i].NoShow();
//                     return;
//                 }
//             }
//         }
//     }
//     checkWeaponCardStyle(id) {
//         let ss: Laya.Label = GameMain.app.viewManager.sceneMap.completionArray[Xconfig.LastVillageId - 1];
//         ss.visible = true;
//     }
// }
//# sourceMappingURL=BattleView.js.map