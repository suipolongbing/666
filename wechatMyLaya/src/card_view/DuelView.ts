/*
* name;
*/
class DuelView extends ui.DuelViewUI {
    constructor() {
        super();
        this.height = Laya.stage.height
    }

    public roundTime = 1;
    public myEnergyCount = 1;
    public otherEnergyCount = 1;

    public duelCardDataArray = [];

    public handCardArray = [];
    public otherHandCardArray = [];
    public deckCardArray = [];
    public cemeteryCardArray = [];
    public extradimensionalCardArray = [];
    public vacancyCardArray: any[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    public otherVacancyCardArray: any[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    public myVacancyGroundArray: any[] = [GroundType.NONE, GroundType.NONE, GroundType.NONE, GroundType.NONE, GroundType.NONE, GroundType.NONE, GroundType.NONE, GroundType.NONE, GroundType.NONE, GroundType.NONE];
    public otherVacancyGroundArray: any[] = [GroundType.NONE, GroundType.NONE, GroundType.NONE, GroundType.NONE, GroundType.NONE, GroundType.NONE, GroundType.NONE, GroundType.NONE, GroundType.NONE, GroundType.NONE];

    public isMyRoundTime = false;

    private mouseStartPos: laya.maths.Point = new laya.maths.Point();
    private isStartDraging: boolean = false; //开始拖拽
    private isStartDragMoved: boolean = false;//是否开始拖动了(点击判断使用)
    private dragMovingStartPos: laya.maths.Point = new laya.maths.Point();
    private isStartClicking: boolean = false; //开始点击(场上)
    private isShowClickMask: boolean = false; //场上点击生物出现的移动格子是否显示
    private moveArray = []; //移动的范围
    private consume = 0; //消耗能量
    private moveIndex = 0; //移动的终点位置
    private selectGroundIndex = 0; //选择的'地'
    private groundPlaceIndex = 0; //'地'放置的位置

    private canClick = false; //是否可以触发事件
    private selectCardIndex = 0; //选择的第几张卡(手牌)
    private selectCharacterIndex = 0; //选择的第几张卡(场上)
    private movingCard = null; //需要移动的卡(场上)
    private selectVacancyIndex = 0; //召唤到场上哪个空位(手牌)

    private myHexArray = [];
    private otherHexArray = [];

    private arrowArray = []; //箭头数组

    private groundArray = []; //'地'数组

    private drawType = DrawType.NONE;

    private numPlaceInTheRound = 1; //本回合可放置的'地'的数量

    onShow(bool) {
        if (bool) {
            this.visible = true;
            this.AddEvent();
            this.canClick = true;
            this.ShowExplainLabel(false);
            this.myEnergyBox.visible = false;
            this.otherEnergyBox.visible = false;
            this.roundImg.visible = false;
            this.gameOverBox.visible = false;
            this.reshuffleCardBox.visible = false;
            this.ShowMyTimeLabel(false);
            this.ShowOutCardBox(false, false, null);
            this.CreateArrow();
            this.myHexArray.push(this.myhex0, this.myhex1, this.myhex2, this.myhex3, this.myhex4, this.myhex5, this.myhex6, this.myhex7, this.myhex8, this.myhex9);
            this.otherHexArray.push(this.otherhex0, this.otherhex1, this.otherhex2, this.otherhex3, this.otherhex4, this.otherhex5, this.otherhex6, this.otherhex7, this.otherhex8, this.otherhex9);
            this.groundArray.push(this.earthBox, this.volcanoBox, this.oceanBox, this.furukiBox);
        } else {
            this.visible = false;
            this.RemoveEvent();
        }
    }

    close() {
        console.log("666")
    }

    AddEvent() {
        this.roundImg.on(Laya.Event.CLICK, this, this.EndRoundTime);
        this.reshuffleCard1.on(Laya.Event.CLICK, this, this.ChangeStartCard, [1])
        this.reshuffleCard2.on(Laya.Event.CLICK, this, this.ChangeStartCard, [2])
        this.reshuffleCard3.on(Laya.Event.CLICK, this, this.ChangeStartCard, [3])
        this.reshuffleChangeBtn.on(Laya.Event.CLICK, this, this.ChangeStartCard, [4])

        this.on(Laya.Event.MOUSE_DOWN, this, this.ClickHandler);
        this.on(Laya.Event.MOUSE_UP, this, this.ClickHandler);
        this.on(Laya.Event.MOUSE_MOVE, this, this.ClickHandler);
    }

    RemoveEvent() {
        this.roundImg.off(Laya.Event.CLICK, this, this.EndRoundTime);
        this.reshuffleCard1.off(Laya.Event.CLICK, this, this.ChangeStartCard)
        this.reshuffleCard2.off(Laya.Event.CLICK, this, this.ChangeStartCard)
        this.reshuffleCard3.off(Laya.Event.CLICK, this, this.ChangeStartCard)
        this.reshuffleChangeBtn.off(Laya.Event.CLICK, this, this.ChangeStartCard)
    }

    ClickHandler(e: Laya.Event) {
        if (!this.canClick) {
            return;
        }
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                if (this.explainBox.visible) {
                    this.ShowExplainLabel(false);
                }
                if (this.isShowClickMask) {
                    this.isShowClickMask = false;
                    this.myHexArray.filter((v, index) => {
                        if (v.getChildByName('mask') != null) {
                            let mask = v.getChildByName('mask');
                            mask.removeSelf();
                            mask.destroy();
                        }
                    });
                }
                this.handCardArray.filter((v, index) => {
                    if (new Laya.Rectangle(this.myHandCardBox.x + v.cardRender.x, this.myHandCardBox.y + v.cardRender.y, v.cardRender.width, v.cardRender.height).contains(e.stageX, e.stageY)) {
                        if (v == null) {
                            return;
                        }

                        if (this.isMyRoundTime) {
                            this.arrowArray.forEach(element => {
                                element.visible = true;
                            });
                        }

                        this.isStartDraging = true;
                        this.isStartDragMoved = false;

                        this.mouseStartPos.x = Laya.stage.mouseX;
                        this.mouseStartPos.y = Laya.stage.mouseY;

                        this.dragMovingStartPos.x = this.myHandCardBox.x + v.cardRender.x + v.cardRender.width / 2;
                        this.dragMovingStartPos.y = this.myHandCardBox.y + v.cardRender.y + v.cardRender.height / 2;

                        this.drawType = DrawType.HAND;
                        this.selectCardIndex = index;

                        this.ShowExplainLabel(true, true, this.selectCardIndex);
                    }
                });
                this.myHexArray.filter((v, index) => {
                    if (new Laya.Rectangle(this.mycheckerboard.x + v.x, this.mycheckerboard.y + v.y, v.width, v.height).contains(e.stageX, e.stageY)) {
                        if (this.vacancyCardArray[index] == index) {
                            return;
                        }

                        if (v.getChildByName('character') != null || v.getChildByName('myHero') != null) {

                        } else {
                            return;
                        }

                        if (this.isMyRoundTime) {
                            this.arrowArray.forEach(element => {
                                element.visible = true;
                            });
                        }

                        this.isStartDraging = true;
                        this.isStartDragMoved = false;

                        this.mouseStartPos.x = Laya.stage.mouseX;
                        this.mouseStartPos.y = Laya.stage.mouseY;

                        this.dragMovingStartPos.x = this.mycheckerboard.x + v.x + v.width / 2;
                        this.dragMovingStartPos.y = this.mycheckerboard.y + v.y + v.height / 2;

                        // this.isStartClicking = true;
                        this.drawType = DrawType.CARD;
                        this.selectCharacterIndex = index
                        let hx = HexMoveUtil.SelectLocation(this.selectCharacterIndex, Number((v.getChildByName('character') || v.getChildByName('myHero')).action.text));
                        this.moveArray = hx.moveArray;
                        this.consume = hx.consume;
                        this.ShowExplainLabel(true, false, this.selectCardIndex);

                        this.moveArray.forEach(element => {
                            if (this.vacancyCardArray[element] == element) {
                                this.isShowClickMask = true;
                                var mask = new ui.HexMaskUI();
                                mask.name = 'mask'
                                this.myHexArray[element].addChild(mask)
                            }
                        });
                    }
                });
                this.groundArray.filter((v, index) => {
                    if (new Laya.Rectangle(this.atributeBox.x + v.x, this.atributeBox.y + v.y, v.width, v.height).contains(e.stageX, e.stageY)) {
                        if(this.numPlaceInTheRound <= 0){
                            return;
                        }
                        
                        if (this.isMyRoundTime) {
                            this.arrowArray.forEach(element => {
                                element.visible = true;
                            });
                        }

                        this.isStartDraging = true;
                        this.isStartDragMoved = false;

                        this.mouseStartPos.x = Laya.stage.mouseX;
                        this.mouseStartPos.y = Laya.stage.mouseY;

                        this.dragMovingStartPos.x = this.atributeBox.x + v.x + v.width / 2;
                        this.dragMovingStartPos.y = this.atributeBox.y + v.y + v.height / 2;

                        this.selectGroundIndex = index + 1;
                        this.drawType = DrawType.GROUND;
                    }
                });
                break;
            case Laya.Event.MOUSE_UP:
                if (!this.isStartDraging) {
                    return;
                }
                if (!this.isMyRoundTime) {
                    return;
                }
                this.arrowArray.forEach(element => {
                    element.visible = false;
                    element.x = -100;
                });
                if (this.isStartDragMoved) {
                    console.log('yidong');
                    this.isStartDraging = false;
                    this.isStartDragMoved = false;

                    if (this.drawType == DrawType.CARD) {
                        // this.isStartClicking = false;
                        if (this.isShowClickMask) {
                            this.isShowClickMask = false;
                            this.myHexArray.filter((v, index) => {
                                if (v.getChildByName('mask') != null) {
                                    let mask = v.getChildByName('mask');
                                    mask.removeSelf();
                                    mask.destroy();
                                }
                            });
                        }
                        this.myHexArray.filter((v, index) => {
                            if (new Laya.Rectangle(this.mycheckerboard.x + v.x, this.mycheckerboard.y + v.y, v.width, v.height).contains(e.stageX, e.stageY)) {
                                if (this.moveArray.indexOf(index) >= 0) {
                                    this.moveIndex = index;
                                    SocketManager.Inst.MoveCharacter(this.selectCharacterIndex, index, this.consume);
                                }
                            }
                        });
                        this.otherHexArray.filter((v, index) => {
                            if (new Laya.Rectangle(this.enemycheckerboard.x + v.x, this.enemycheckerboard.y + v.y, v.width, v.height).contains(e.stageX, e.stageY)) {
                                SocketManager.Inst.AttackCharacter(this.selectCharacterIndex, index);
                            }
                        });
                    }
                    else if (this.drawType == DrawType.HAND) {
                        console.log("cardType:", this.handCardArray, this.selectCardIndex)
                        if (this.handCardArray[this.selectCardIndex].cardData.cardType == CardType.CHARACTER) {
                            this.myHexArray.filter((v, index) => {
                                if (new Laya.Rectangle(this.mycheckerboard.x + v.x, this.mycheckerboard.y + v.y, v.width, v.height).contains(e.stageX, e.stageY)) {
                                    this.selectVacancyIndex = index;
                                    SocketManager.Inst.Summon(this.selectCardIndex, this.selectVacancyIndex);
                                }
                            });
                        }
                    }
                    else if (this.drawType == DrawType.GROUND) {
                        console.log('selectGroundIndex:', this.selectGroundIndex)
                        this.myHexArray.filter((v, index) => {
                            if (new Laya.Rectangle(this.mycheckerboard.x + v.x, this.mycheckerboard.y + v.y, v.width, v.height).contains(e.stageX, e.stageY)) {
                                this.groundPlaceIndex = index;
                                SocketManager.Inst.PlaceGround(this.selectGroundIndex, this.groundPlaceIndex);
                            }
                        });
                    }
                    this.drawType = DrawType.NONE;
                } else {
                    console.log('dianji');
                    this.isStartDraging = false;
                    // if (this.isStartClicking) {
                    //     this.isStartClicking = false;
                    // } else {

                    // }
                }
                break;
            case Laya.Event.MOUSE_MOVE:
                if (!this.isStartDraging) {
                    return;
                }
                if (!this.isMyRoundTime) {
                    return;
                }
                this.ShowExplainLabel(false);

                this.SetArrowPos(new Laya.Point(this.dragMovingStartPos.x, this.dragMovingStartPos.y), new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY));

                var offsetX = Laya.stage.mouseX - this.mouseStartPos.x;
                var offsetY = Laya.stage.mouseY - this.mouseStartPos.y;

                if (!this.isStartDragMoved) {
                    var pt = new Laya.Point(offsetX, offsetY);
                    if (pt.distance(0, 0) > 5)//拖动距离小于5的话就算是点击 不然就是移动
                    {
                        this.isStartDragMoved = true;
                    }
                }
        }
    }

    UpdateRoundTime(value) {
        this.roundImg.visible = true;
        this.roundTime = value;
        this.RoundAdd();
        this.IsMyTime();
        this.ShowMyTimeLabel(true);
        this.ResetTerrainNum();
    }

    //重设本回合可放置'地'的数量
    ResetTerrainNum(num = 1){   
        if(this.isMyRoundTime){
            this.numPlaceInTheRound = num;
        }
    }

    UpdateEnergyCount(isMy, value, valueBase) {
        if (isMy) {
            this.myEnergyCount = value;
            this.myEnergyCount1.text = this.myEnergyCount + '/' + valueBase;
            this.otherEnergyCount2.text = this.myEnergyCount + '/' + valueBase;
        } else {
            this.otherEnergyCount = value;
            this.myEnergyCount2.text = this.otherEnergyCount + '/' + valueBase;
            this.otherEnergyCount1.text = this.otherEnergyCount + '/' + valueBase;
        }
    }

    EndRoundTime() {
        if (!this.isMyRoundTime) {
            return;
        }
        //结束回合
        SocketManager.Inst.EndRoundTime();
    }

    RoundAdd() {
        this.roundCount.text = this.roundTime + '';
    }

    ChangeStartCard(type) {
        if (type == 4) {
            let rsc = [this.reshuffleOk1.visible ? 1 : 0, this.reshuffleOk2.visible ? 1 : 0, this.reshuffleOk3.visible ? 1 : 0]
            SocketManager.Inst.ChangeStartCard(rsc);
            for (let i = rsc.length - 1; i >= 0; i--) {
                if (rsc[i] == 1) {
                    var handCard = this.handCardArray.splice(i, 1)[0];
                    handCard.cardRender.removeSelf();
                    handCard.cardRender.destroy();
                }
            }
            this.reshuffleCardBox.visible = false;
            this.canClick = true;
        }
        else if (type == 1) {
            this.reshuffleOk1.visible = !this.reshuffleOk1.visible;
        }
        else if (type == 2) {
            this.reshuffleOk2.visible = !this.reshuffleOk2.visible;
        }
        else if (type == 3) {
            this.reshuffleOk3.visible = !this.reshuffleOk3.visible;
        }
    }

    ShowGameOverLabel(bool) {
        Laya.stage.mouseEnabled = false;
        this.gameOverBox.visible = true;
        if (bool) {
            this.overLabel.text = '你胜利了！'
        } else {
            this.overLabel.text = '你失败了！'
        }
    }

    ShowOutCardBox(bool, isMy, data) {
        this.outCardBox.zOrder = 999;
        this.outCardBox.visible = bool;
        if (!bool) {
            return;
        }
        if (isMy) {
            this.myOutCard.alpha = 0;
            Laya.Tween.to(this.myOutCard, { alpha: 1 }, 300, Laya.Ease.sineOut, new Laya.Handler(this, () => {
                Laya.timer.once(400, this, () => {
                    Laya.Tween.to(this.myOutCard, { alpha: 0 }, 500, Laya.Ease.sineIn, new Laya.Handler(this, () => {
                        this.ShowOutCardBox(false, false, null);
                    }))
                })
            }))
            this.myOutCard.visible = true;
            this.otherOutCard.visible = false;
            this.myOutCard.myContent.text = data['content'];
            this.myOutCard.myName.text = data['name'];
            this.myOutCard.myStar.text = data['cost'];
            let terrainTxt1 = this.myOutCard.terrainTxt1;
            let terrainTxt2 = this.myOutCard.terrainTxt2;
            let terrainTxt3 = this.myOutCard.terrainTxt3;
            let terrainTxt4 = this.myOutCard.terrainTxt4;
            if (!!data['terrain']) {
                this.OperateTerrain(data['terrain'], terrainTxt1, terrainTxt2, terrainTxt3, terrainTxt4)
            }
            this.myOutCard.myAtk.text = data['attackBase'];
            this.myOutCard.myLife.text = data['lifeBase'];
            this.myOutCard.myAction.text = data['actionBase'];
        } else {
            this.otherOutCard.alpha = 0;
            Laya.Tween.to(this.otherOutCard, { alpha: 1 }, 300, Laya.Ease.sineOut, new Laya.Handler(this, () => {
                Laya.timer.once(400, this, () => {
                    Laya.Tween.to(this.otherOutCard, { alpha: 0 }, 500, Laya.Ease.sineIn, new Laya.Handler(this, () => {
                        this.ShowOutCardBox(false, false, null);
                    }))
                })
            }))
            this.myOutCard.visible = false;
            this.otherOutCard.visible = true;
            this.otherOutCard.myContent.text = data['content'];
            this.otherOutCard.myName.text = data['name'];
            this.otherOutCard.myStar.text = data['cost'];
            this.otherOutCard.myAtk.text = data['attackBase'];
            this.otherOutCard.myLife.text = data['lifeBase'];
            this.otherOutCard.myAction.text = data['actionBase'];
            let terrainTxt1 = this.otherOutCard.terrainTxt1;
            let terrainTxt2 = this.otherOutCard.terrainTxt2;
            let terrainTxt3 = this.otherOutCard.terrainTxt3;
            let terrainTxt4 = this.otherOutCard.terrainTxt4;
            if (!!data['terrain']) {
                this.OperateTerrain(data['terrain'], terrainTxt1, terrainTxt2, terrainTxt3, terrainTxt4)
            }
        }
    }

    ShowExplainLabel(bool, isHand = false, index = 0) {
        this.explainBox.visible = bool;
        if (bool) {
            let data;
            if (isHand) {
                data = this.handCardArray[this.selectCardIndex].cardData;
            } else {
                data = this.vacancyCardArray[this.selectCharacterIndex];
            }
            this.explainCard.myContent.text = data['content'];
            this.explainCard.myName.text = data['name'];
            this.explainCard.myStar.text = data['cost'];
            this.explainCard.myAtk.text = data['attackBase'];
            this.explainCard.myLife.text = data['lifeBase'];
            this.explainCard.myAction.text = data['actionBase'];
            let terrainTxt1 = this.explainCard.terrainTxt1;
            let terrainTxt2 = this.explainCard.terrainTxt2;
            let terrainTxt3 = this.explainCard.terrainTxt3;
            let terrainTxt4 = this.explainCard.terrainTxt4;
            if (!!data['terrain']) {
                this.OperateTerrain(data['terrain'], terrainTxt1, terrainTxt2, terrainTxt3, terrainTxt4)
            }
        }
    }

    ShowReshuffleCardBox(array) {
        this.reshuffleCardBox.visible = true;
        this.canClick = false;
        let content1 = this.reshuffleCard1.myContent;
        let content2 = this.reshuffleCard2.myContent;
        let content3 = this.reshuffleCard3.myContent;
        let name1 = this.reshuffleCard1.myName;
        let name2 = this.reshuffleCard2.myName;
        let name3 = this.reshuffleCard3.myName;
        let star1 = this.reshuffleCard1.myStar;
        let star2 = this.reshuffleCard2.myStar;
        let star3 = this.reshuffleCard3.myStar;
        let atk1 = this.reshuffleCard1.myAtk;
        let atk2 = this.reshuffleCard2.myAtk;
        let atk3 = this.reshuffleCard3.myAtk;
        let life1 = this.reshuffleCard1.myLife;
        let life2 = this.reshuffleCard2.myLife;
        let life3 = this.reshuffleCard3.myLife;
        let action1 = this.reshuffleCard1.myAction;
        let action2 = this.reshuffleCard2.myAction;
        let action3 = this.reshuffleCard3.myAction;

        content1.text = array[0]['content'];
        name1.text = array[0]['name'];
        star1.text = array[0]['cost'];
        atk1.text = array[0]['attackBase'];
        life1.text = array[0]['lifeBase'];
        action1.text = array[0]['actionBase'];
        let terrainTxt11 = this.reshuffleCard1.terrainTxt1;
        let terrainTxt21 = this.reshuffleCard1.terrainTxt2;
        let terrainTxt31 = this.reshuffleCard1.terrainTxt3;
        let terrainTxt41 = this.reshuffleCard1.terrainTxt4;
        if (!!array[0]['terrain']) {
            this.OperateTerrain(array[0]['terrain'], terrainTxt11, terrainTxt21, terrainTxt31, terrainTxt41)
        }

        content2.text = array[1]['content'];
        name2.text = array[1]['name'];
        star2.text = array[1]['cost'];
        atk2.text = array[1]['attackBase'];
        life2.text = array[1]['lifeBase'];
        action2.text = array[1]['actionBase'];
        let terrainTxt12 = this.reshuffleCard2.terrainTxt1;
        let terrainTxt22 = this.reshuffleCard2.terrainTxt2;
        let terrainTxt32 = this.reshuffleCard2.terrainTxt3;
        let terrainTxt42 = this.reshuffleCard2.terrainTxt4;
        if (!!array[1]['terrain']) {
            this.OperateTerrain(array[1]['terrain'], terrainTxt12, terrainTxt22, terrainTxt32, terrainTxt42)
        }

        content3.text = array[2]['content'];
        name3.text = array[2]['name'];
        star3.text = array[2]['cost'];
        atk3.text = array[2]['attackBase'];
        life3.text = array[2]['lifeBase'];
        action3.text = array[2]['actionBase'];
        let terrainTxt13 = this.reshuffleCard3.terrainTxt1;
        let terrainTxt23 = this.reshuffleCard3.terrainTxt2;
        let terrainTxt33 = this.reshuffleCard3.terrainTxt3;
        let terrainTxt43 = this.reshuffleCard3.terrainTxt4;
        if (!!array[2]['terrain']) {
            this.OperateTerrain(array[2]['terrain'], terrainTxt13, terrainTxt23, terrainTxt33, terrainTxt43)
        }
    }

    ShowMyTimeLabel(bool) {
        this.myTimeBox.visible = bool;
        if (!bool) {
            return;
        }
        if (this.isMyRoundTime) {
            this.myTimeLabel.text = '我的回合'
        } else {
            this.myTimeLabel.text = '对方回合'
        }
        this.myTimeLabel.x = - Laya.stage.width / 2;
        this.myTimeLabel.y = Laya.stage.height / 2;
        Laya.Tween.to(this.myTimeLabel, { x: Laya.stage.width / 2 }, 500, Laya.Ease.sineIn,
            new Laya.Handler(this, () => {
                Laya.timer.once(400, this, () => {
                    Laya.Tween.to(this.myTimeLabel, { x: Laya.stage.width + Laya.stage.width / 2 }, 500, Laya.Ease.sineOut, new Laya.Handler(this, () => {
                        this.myTimeBox.visible = false;
                    }))
                })
            })
        );
    }

    IsMyTime() {
        if (this.isMyRoundTime) {
            this.myEnergyBox.visible = true;
            this.otherEnergyBox.visible = false;
        } else {
            this.myEnergyBox.visible = false;
            this.otherEnergyBox.visible = true;
        }
    }

    ChangeEvolutionTxt(isMy, value) {
        if (isMy) {
            this.myEvolutionTxt.text = "进化点数：" + value
        } else {
            this.otherEvolutionTxt.text = "进化点数：" + value
        }
    }

    ChangeDeckTxt(isMy, value) {
        if (isMy) {
            this.myDeckTxt.text = "卡组：" + value
        } else {
            this.otherDeckTxt.text = "卡组：" + value
        }
    }

    ChangeExtradimensionalTxt(isMy, value) {
        if (isMy) {
            this.myExtradimensionalTxt.text = "异次元：" + value
        } else {
            this.otherExtradimensionalTxt.text = "异次元：" + value
        }
    }

    ChangeCemeteryTxt(isMy, value) {
        if (isMy) {
            this.myCemeteryTxt.text = "墓地：" + value
        } else {
            this.otherCemeteryTxt.text = "墓地：" + value
        }
    }

    DuelCard() {
        console.log('发牌喽');
        for (let i = 0; i < this.duelCardDataArray.length; i++) {
            let cardView = new ui.DuelCardUI();
            cardView.scale(1.1, 1.1);
            this.addChild(cardView);
            this.handCardArray.push({ index: this.handCardArray.length, cardRender: cardView, cardData: this.duelCardDataArray[i] })
            cardView.pos(this.myDuelCardPoint.x, this.myDuelCardPoint.y);

            let content = cardView.myContent;
            let name = cardView.myName;
            let star = cardView.myStar;
            let terrainTxt1 = cardView.terrainTxt1;
            let terrainTxt2 = cardView.terrainTxt2;
            let terrainTxt3 = cardView.terrainTxt3;
            let terrainTxt4 = cardView.terrainTxt4;
            let atk = cardView.myAtk;
            let life = cardView.myLife;
            let action = cardView.myAction;

            content.text = this.duelCardDataArray[i]['content'];
            name.text = this.duelCardDataArray[i]['name'];
            star.text = this.duelCardDataArray[i]['cost'];
            atk.text = this.duelCardDataArray[i]['attackBase'];
            life.text = this.duelCardDataArray[i]['lifeBase'];
            action.text = this.duelCardDataArray[i]['actionBase'];
            if (!!this.duelCardDataArray[i]['terrain']) {
                this.OperateTerrain(this.duelCardDataArray[i]['terrain'], terrainTxt1, terrainTxt2, terrainTxt3, terrainTxt4)
            }

            let posX = 0;
            if (this.handCardArray.length == 1) {
                posX = 590;
            } else {
                posX = 590 - (this.handCardArray.length - 1) * 50;
            }
            Laya.Tween.to(cardView, { x: posX, y: this.myHandCardBox.y }, 250, Laya.Ease.sineIn,
                new Laya.Handler(this, () => {
                    if (i == this.duelCardDataArray.length - 1) {
                        this.SortHandPosition();
                    }
                }), i * 250);
        }
    }

    SortHandPosition() {
        if (this.handCardArray.length * 160 > this.myHandCardBox.width) {
            let offer = ((this.handCardArray.length * 160 - this.myHandCardBox.width) / (this.handCardArray.length - 1) + 10);
            for (let i = 0; i < this.handCardArray.length; i++) {
                this.myHandCardBox.addChildAt(this.handCardArray[i]['cardRender'], i);
                this.handCardArray[i]['cardRender'].y = 0;
                if (i == 0) {
                    let ox = this.myHandCardBox.width - (this.handCardArray.length * 160 - (this.handCardArray.length - 1) * offer)
                    if (ox > 0) {
                        this.handCardArray[i]['cardRender'].x = ox / 2;
                    } else {
                        this.handCardArray[i]['cardRender'].x = 0;
                    }
                } else {
                    this.handCardArray[i]['cardRender'].x = i * 160 - offer * i + this.handCardArray[0]['cardRender'].x;
                }
                console.log("this.handCardArray[i]:", i, this.handCardArray[i]['cardRender'].x, offer)
            }
        } else {
            let offer = 20;
            for (let i = 0; i < this.handCardArray.length; i++) {
                this.myHandCardBox.addChildAt(this.handCardArray[i]['cardRender'], i);
                this.handCardArray[i]['cardRender'].y = 0;
                if (i == 0) {
                    let ox = this.myHandCardBox.width - (this.handCardArray.length * 160 - (this.handCardArray.length - 1) * offer)
                    if (ox > 0) {
                        this.handCardArray[i]['cardRender'].x = ox / 2;
                    } else {
                        this.handCardArray[i]['cardRender'].x = 0;
                    }
                } else {
                    this.handCardArray[i]['cardRender'].x = i * 160 - offer * i + this.handCardArray[0]['cardRender'].x;
                }
                console.log("this.handCardArray[i]:", i, this.handCardArray[i]['cardRender'].x, offer)
            }
        }
    }

    OperateTerrain(data, terrainTxt1, terrainTxt2, terrainTxt3, terrainTxt4) {
        let earthCount = 0, furukiCount = 0, oceanCount = 0, volcanoCount = 0, abyssCount = 0;
        data.forEach(element => {
            switch (element) {
                case GroundType.EARTH:
                    earthCount += 1;
                    break;
                case GroundType.FURUKI:
                    furukiCount += 1;
                    break;
                case GroundType.OCEAN:
                    oceanCount += 1;
                    break;
                case GroundType.VOLCANO:
                    volcanoCount += 1;
                    break;
                case GroundType.NONE:
                    abyssCount += 1;
                    break;
            }
        });
        if (abyssCount > 0) {
            terrainTxt1.visible = true;
            terrainTxt1.text = abyssCount + ''
            terrainTxt1.color = '#000000';
        } else {
            if (earthCount > 0) {
                terrainTxt1.visible = true;
                terrainTxt1.text = earthCount + ''
                terrainTxt1.color = '#6c4958';
                if (volcanoCount > 0) {
                    terrainTxt2.visible = true;
                    terrainTxt2.text = volcanoCount + ''
                    terrainTxt2.color = '#cc756a';
                    if (oceanCount > 0) {
                        terrainTxt3.visible = true;
                        terrainTxt3.text = oceanCount + ''
                        terrainTxt3.color = '#b19df3';
                        if (furukiCount > 0) {
                            terrainTxt4.visible = true;
                            terrainTxt4.text = furukiCount + ''
                            terrainTxt4.color = '#1ae87d';
                        }
                    } else {
                        if (furukiCount > 0) {
                            terrainTxt3.visible = true;
                            terrainTxt3.text = furukiCount + ''
                            terrainTxt3.color = '#1ae87d';
                        }
                    }
                } else {
                    if (oceanCount > 0) {
                        terrainTxt2.visible = true;
                        terrainTxt2.text = oceanCount + ''
                        terrainTxt2.color = '#b19df3';
                        if (furukiCount > 0) {
                            terrainTxt3.visible = true;
                            terrainTxt3.text = furukiCount + ''
                            terrainTxt3.color = '#1ae87d';
                        }
                    } else {
                        if (furukiCount > 0) {
                            terrainTxt2.visible = true;
                            terrainTxt2.text = furukiCount + ''
                            terrainTxt2.color = '#1ae87d';
                        }
                    }
                }
            } else {
                if (volcanoCount > 0) {
                    terrainTxt1.visible = true;
                    terrainTxt1.text = volcanoCount + ''
                    terrainTxt1.color = '#cc756a';
                    if (oceanCount > 0) {
                        terrainTxt2.visible = true;
                        terrainTxt2.text = oceanCount + ''
                        terrainTxt2.color = '#b19df3';
                        if (furukiCount > 0) {
                            terrainTxt3.visible = true;
                            terrainTxt3.text = furukiCount + ''
                            terrainTxt3.color = '#1ae87d';
                        }
                    } else {
                        if (furukiCount > 0) {
                            terrainTxt2.visible = true;
                            terrainTxt2.text = furukiCount + ''
                            terrainTxt2.color = '#1ae87d';
                        }
                    }
                } else {
                    if (oceanCount > 0) {
                        terrainTxt1.visible = true;
                        terrainTxt1.text = oceanCount + ''
                        terrainTxt1.color = '#b19df3';
                        if (furukiCount > 0) {
                            terrainTxt2.visible = true;
                            terrainTxt2.text = furukiCount + ''
                            terrainTxt2.color = '#1ae87d';
                        }
                    } else {
                        if (furukiCount > 0) {
                            terrainTxt1.visible = true;
                            terrainTxt1.text = furukiCount + ''
                            terrainTxt1.color = '#1ae87d';
                        }
                    }
                }
            }
        }
    }

    DuelOtherCard(duelCount) {
        // this.otherHandCardArray = [];
        let cardCount = duelCount - this.otherHandCardArray.length
        if (cardCount <= 0) {
            return;
        }
        console.log('给对方发牌喽', cardCount);
        for (let i = 0; i < cardCount; i++) {
            let cardView = new ui.DuelCardBackUI();
            cardView.scale(1.1, 1.1);
            this.addChild(cardView);
            this.otherHandCardArray.push({ index: this.otherHandCardArray.length, cardRender: cardView })
            cardView.pos(this.otherDuelCardPoint.x, this.otherDuelCardPoint.y);

            let posX = 0;
            if (this.otherHandCardArray.length == 1) {
                posX = 0;
            } else {
                posX = (this.otherHandCardArray.length - 1) * 50;
            }
            Laya.Tween.to(cardView, { x: posX, y: this.otherHandCardBox.y }, 250, Laya.Ease.sineIn,
                new Laya.Handler(this, () => {
                    if (i == cardCount - 1) {
                        this.SortOtherHandPosition();
                    }
                }), i * 250);
        }
    }


    SortOtherHandPosition() {
        if (this.otherHandCardArray.length * 160 > this.otherHandCardBox.width) {
            let offer = ((this.otherHandCardArray.length * 160 - this.otherHandCardBox.width) / (this.otherHandCardArray.length - 1) + 10);
            for (let i = 0; i < this.otherHandCardArray.length; i++) {
                this.otherHandCardBox.addChildAt(this.otherHandCardArray[i]['cardRender'], i);
                this.otherHandCardArray[i]['cardRender'].y = 0;
                if (i == 0) {
                    let ox = this.otherHandCardBox.width - (this.otherHandCardArray.length * 160 - (this.otherHandCardArray.length - 1) * offer)
                    if (ox > 0) {
                        this.otherHandCardArray[i]['cardRender'].x = ox / 2;
                    } else {
                        this.otherHandCardArray[i]['cardRender'].x = 0;
                    }
                } else {
                    this.otherHandCardArray[i]['cardRender'].x = i * 160 - offer * i + this.otherHandCardArray[0]['cardRender'].x;
                }
                console.log("this.otherHandCardArray[i]:", i, this.otherHandCardArray[i]['cardRender'].x, offer)
            }
        } else {
            let offer = 20;
            for (let i = 0; i < this.otherHandCardArray.length; i++) {
                this.otherHandCardBox.addChildAt(this.otherHandCardArray[i]['cardRender'], i);
                this.otherHandCardArray[i]['cardRender'].y = 0;
                if (i == 0) {
                    let ox = this.otherHandCardBox.width - (this.otherHandCardArray.length * 160 - (this.otherHandCardArray.length - 1) * offer)
                    if (ox > 0) {
                        this.otherHandCardArray[i]['cardRender'].x = ox / 2;
                    } else {
                        this.otherHandCardArray[i]['cardRender'].x = 0;
                    }
                } else {
                    this.otherHandCardArray[i]['cardRender'].x = i * 160 - offer * i + this.otherHandCardArray[0]['cardRender'].x;
                }
                console.log("this.otherHandCardArray[i]:", i, this.otherHandCardArray[i]['cardRender'].x, offer)
            }
        }
    }

    CreateArrow() {
        this.arrowArray = [];
        for (let i = 0; i < 19; i++) {
            var arrow = new Laya.Image();
            arrow.skin = 'rocket1.png';
            arrow.scale(1 * 0.2 + i / 18 * 0.8, 1 * 0.2 + i / 18 * 0.8);
            arrow.anchorX = 0.5;
            arrow.anchorY = 0.5;
            this.addChild(arrow);
            this.arrowArray.push(arrow);
        }
        var arrowTop = new Laya.Image();
        arrowTop.skin = 'rocket2.png';
        arrowTop.anchorX = 0.5;
        arrowTop.anchorY = 0.5;
        this.addChild(arrowTop);
        this.arrowArray.push(arrowTop);

        this.arrowArray.forEach(element => {
            element.visible = false;
        });
    }

    SetArrowPos(startPos, endPos) {
        var ctrlAPos = new Laya.Point();
        var ctrlBPos = new Laya.Point();
        ctrlAPos.x = startPos.x + (startPos.x - endPos.x) * 0.1
        ctrlAPos.y = endPos.y - (endPos.y - startPos.y) * 0.2
        ctrlBPos.y = endPos.y + (endPos.y - startPos.y) * 0.3
        ctrlBPos.x = startPos.x - (startPos.x - endPos.x) * 0.3

        for (let i = 0; i < 20; i++) {
            var t = i / 19
            var posX = startPos.x * (1 - t) * (1 - t) * (1 - t) + 3 * ctrlAPos.x * t * (1 - t) * (1 - t) + 3 * ctrlBPos.x * t * t * (1 - t) + endPos.x * t * t * t
            var posY = startPos.y * (1 - t) * (1 - t) * (1 - t) + 3 * ctrlAPos.y * t * (1 - t) * (1 - t) + 3 * ctrlBPos.y * t * t * (1 - t) + endPos.y * t * t * t
            this.arrowArray[i].pos(posX, posY);
        }
        this.UpdateArrowAngle()
    }

    UpdateArrowAngle() {
        for (let i = 0; i < 20; i++) {
            if (i == 0) {
                this.arrowArray[i].rotation = 270;
            } else {
                var current = this.arrowArray[i]
                var last = this.arrowArray[i - 1]
                var diff_x = last.x - current.x,
                    diff_y = last.y - current.y;
                //返回角度
                var angle = 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
                if (angle < 0) {
                    if (i == 16 || i == 17 || i == 18 || i == 19) {
                        if (diff_y < 0) {
                            current.rotation = angle + 180
                        } else {
                            current.rotation = angle
                        }
                    } else {
                        if (diff_y < 0) {
                            current.rotation = angle + 180;
                        } else {
                            current.rotation = angle;
                        }
                    }
                } else {
                    if (i == 16 || i == 17 || i == 18 || i == 19) {
                        if (diff_y < 0) {
                            current.rotation = angle;
                        } else {
                            current.rotation = angle + 180
                        }
                    } else {
                        if (diff_y < 0) {
                            current.rotation = angle;
                        } else {
                            current.rotation = angle + 180;
                        }
                    }
                }
            }
        }
    }

    //己方召唤
    Summon(card, selectVacancyIndex) {
        console.log('summon:', card, selectVacancyIndex, this.selectCardIndex)
        this.ShowOutCardBox(true, true, card);
        var handCard = this.handCardArray.splice(this.selectCardIndex, 1)[0];
        handCard.cardRender.removeSelf();
        handCard.cardRender.destroy();
        let token = new ui.HexSummonUI();
        token.name = 'character'
        Laya.timer.once(1000, this, () => {
            this.myHexArray[selectVacancyIndex].addChild(token);
            token.pos(0, 0);
            token.alpha = 0;
            Laya.timer.once(1000, this, () => {
                Laya.Tween.to(token, { alpha: 1 }, 500, Laya.Ease.sineIn, new Laya.Handler(this, () => {
                }));
            })
        })
        token.atk.text = card.attack + '';
        token.hp.text = card.life + '';
        token.action.text = card.action + '';
        console.log('summonafter:', this.handCardArray, this.vacancyCardArray)

        //调整位置
        this.SortHandPosition();
    }

    //对方召唤
    OtherSummon(card, selectVacancyIndex) {
        Laya.timer.once(1000, this, () => {
            this.arrowArray.forEach(element => {
                element.visible = false;
            });
            this.ShowOutCardBox(true, false, card);
        });
        var handCard = this.otherHandCardArray.splice(this.otherHandCardArray.length - 1, 1)[0];
        handCard.cardRender.removeSelf();
        handCard.cardRender.destroy();
        let token = new ui.HexSummonUI();
        token.name = 'character'
        let heroHex;
        this.otherHexArray.filter((v) => {
            if (v.getChildByName('otherHero') != null) {
                heroHex = v;
                return;
            }
        });
        this.arrowArray.forEach(element => {
            element.visible = true;
        });
        this.SetArrowPos(new Laya.Point(heroHex.x + this.enemycheckerboard.x + heroHex.width / 2, heroHex.y + this.enemycheckerboard.y + heroHex.height / 2),
            new Laya.Point(this.otherHexArray[selectVacancyIndex].x + this.enemycheckerboard.x + this.otherHexArray[selectVacancyIndex].width / 2, this.otherHexArray[selectVacancyIndex].y + this.enemycheckerboard.y + this.otherHexArray[selectVacancyIndex].height / 2));
        this.otherHexArray[selectVacancyIndex].addChild(token);
        token.pos(0, 0);
        token.alpha = 0;
        Laya.timer.once(2000, this, () => {
            Laya.Tween.to(token, { alpha: 1 }, 500, Laya.Ease.sineIn, new Laya.Handler(this, () => {
            }));
        })
        token.atk.text = card.attack + '';
        token.hp.text = card.life + '';
        token.action.text = card.action + '';
        console.log('othersummonafter:', this.otherHandCardArray, this.otherVacancyCardArray)

        //调整位置
        this.SortOtherHandPosition();
    }

    Moving(characterIndex, moveIndex) {
        var token = (this.myHexArray[characterIndex].getChildByName('character') || this.myHexArray[characterIndex].getChildByName('myHero'));
        this.mycheckerboard.addChild(token);
        token.pos(this.myHexArray[characterIndex].x, this.myHexArray[characterIndex].y);
        Laya.Tween.to(token, { x: this.myHexArray[moveIndex].x, y: this.myHexArray[moveIndex].y }, 800, Laya.Ease.linearIn, new Laya.Handler(this, () => {
            this.myHexArray[moveIndex].addChild(token);
            token.pos(0, 0);
        }));
        var card = this.vacancyCardArray[characterIndex];
        this.vacancyCardArray[moveIndex] = card;
        this.vacancyCardArray[characterIndex] = characterIndex;
    }

    OtherMoving(characterIndex, moveIndex) {
        var token = (this.otherHexArray[characterIndex].getChildByName('character') || this.otherHexArray[characterIndex].getChildByName('otherHero'));
        this.arrowArray.forEach(element => {
            element.visible = true;
        });
        this.SetArrowPos(new Laya.Point(this.otherHexArray[characterIndex].x + this.enemycheckerboard.x + this.otherHexArray[characterIndex].width / 2, this.otherHexArray[characterIndex].y + this.enemycheckerboard.y + this.otherHexArray[characterIndex].height / 2),
            new Laya.Point(this.otherHexArray[moveIndex].x + this.enemycheckerboard.x + this.otherHexArray[moveIndex].width / 2, this.otherHexArray[moveIndex].y + this.enemycheckerboard.y + this.otherHexArray[moveIndex].height / 2));

        Laya.timer.once(1000, this, () => {
            this.arrowArray.forEach(element => {
                element.visible = false;
            });
            this.enemycheckerboard.addChild(token);
            token.pos(this.otherHexArray[characterIndex].x, this.otherHexArray[characterIndex].y);
            Laya.Tween.to(token, { x: this.otherHexArray[moveIndex].x, y: this.otherHexArray[moveIndex].y }, 800, Laya.Ease.linearIn, new Laya.Handler(this, () => {
                this.otherHexArray[moveIndex].addChild(token);
                token.pos(0, 0);
            }));
        })

        var card = this.otherVacancyCardArray[characterIndex];
        this.otherVacancyCardArray[moveIndex] = card;
        this.otherVacancyCardArray[characterIndex] = characterIndex;
    }

    InitHero(isMy, card) {
        let token = new ui.HexSummonUI();
        if (isMy) {
            token.name = 'myHero'
            this.myHexArray[0].addChild(token);
        } else {
            token.name = 'otherHero'
            this.otherHexArray[0].addChild(token);
        }
        token.pos(0, 0);
        token.atk.text = card.attack + '';
        token.hp.text = card.life + '';
        token.action.text = card.action + '';
    }

    Battle(data) {
        let type = data.overBattleType;
        let myIndex = data.myCharacterIndex;
        let otherIndex = data.otherCharacterIndex;
        let myBattleVacancy = data.myBattleVacancy;
        let otherBattleVacancy = data.otherBattleVacancy;

        this.vacancyCardArray[myIndex] = myBattleVacancy;
        this.otherVacancyCardArray[otherIndex] = otherBattleVacancy;
        console.log("Battle", type, myBattleVacancy, otherBattleVacancy)

        var myToken = (this.myHexArray[myIndex].getChildByName('character') || this.myHexArray[myIndex].getChildByName('myHero'));
        var otherToken = (this.otherHexArray[otherIndex].getChildByName('character') || this.otherHexArray[otherIndex].getChildByName('otherHero'));

        if (!this.isMyRoundTime) {
            this.arrowArray.forEach(element => {
                element.visible = true;
            });
            this.SetArrowPos(new Laya.Point(this.otherHexArray[otherIndex].x + this.enemycheckerboard.x + this.otherHexArray[otherIndex].width / 2, this.otherHexArray[otherIndex].y + this.enemycheckerboard.y + this.otherHexArray[otherIndex].height / 2),
                new Laya.Point(this.myHexArray[myIndex].x + this.mycheckerboard.x + this.myHexArray[myIndex].width / 2, this.myHexArray[myIndex].y + this.mycheckerboard.y + this.myHexArray[myIndex].height / 2));
            Laya.timer.once(500, this, () => {
                this.arrowArray.forEach(element => {
                    element.visible = false;
                });
                //攻击碰撞动画
                this.addChild(otherToken);
                otherToken.pos(this.otherHexArray[otherIndex].x + this.enemycheckerboard.x, this.otherHexArray[otherIndex].y + this.enemycheckerboard.y)
                let moveX = this.myHexArray[myIndex].x + this.mycheckerboard.x;
                let moveY = this.myHexArray[myIndex].y + this.mycheckerboard.y - Math.floor(this.myHexArray[myIndex].height * 2 / 3);
                Laya.Tween.to(otherToken, { x: moveX, y: moveY }, 500, Laya.Ease.circIn, new Laya.Handler(this, () => {
                    this.BattleEnd(type, myToken, otherToken, myBattleVacancy, otherBattleVacancy);
                    if (!!otherToken) {
                        Laya.Tween.to(otherToken, { x: this.otherHexArray[otherIndex].x + this.enemycheckerboard.x, y: this.otherHexArray[otherIndex].y + this.enemycheckerboard.y }, 800, Laya.Ease.circOut, new Laya.Handler(this, () => {
                            this.otherHexArray[otherIndex].addChild(otherToken);
                            otherToken.pos(0, 0);
                        }));
                    }
                }));
            });
        } else {
            //攻击碰撞动画
            this.addChild(myToken);
            myToken.pos(this.myHexArray[myIndex].x + this.mycheckerboard.x, this.myHexArray[myIndex].y + this.mycheckerboard.y)
            let moveX = this.otherHexArray[otherIndex].x + this.enemycheckerboard.x;
            let moveY = this.otherHexArray[otherIndex].y + this.enemycheckerboard.y - Math.floor(this.otherHexArray[otherIndex].height * 2 / 3);
            Laya.Tween.to(myToken, { x: moveX, y: moveY }, 500, Laya.Ease.circIn, new Laya.Handler(this, () => {
                this.BattleEnd(type, myToken, otherToken, myBattleVacancy, otherBattleVacancy);
                if (!!myToken) {
                    Laya.Tween.to(myToken, { x: this.myHexArray[myIndex].x + this.mycheckerboard.x, y: this.myHexArray[myIndex].y + this.mycheckerboard.y }, 800, Laya.Ease.circOut, new Laya.Handler(this, () => {
                        this.myHexArray[myIndex].addChild(myToken);
                        myToken.pos(0, 0);
                    }));
                }
            }));
        }
    }

    BattleEnd(type, myToken, otherToken, myBattleVacancy, otherBattleVacancy) {
        switch (type) {
            case OverBattleType.MY:
                myToken.atk.text = myBattleVacancy.attack + '';
                myToken.hp.text = myBattleVacancy.life + '';
                myToken.action.text = myBattleVacancy.action + '';
                otherToken.removeSelf();
                otherToken.destroy();
                break;
            case OverBattleType.OTHER:
                myToken.removeSelf();
                myToken.destroy();
                otherToken.atk.text = otherBattleVacancy.attack + '';
                otherToken.hp.text = otherBattleVacancy.life + '';
                otherToken.action.text = otherBattleVacancy.action + '';
                break;
            case OverBattleType.DRAW:
                myToken.atk.text = myBattleVacancy.attack + '';
                myToken.hp.text = myBattleVacancy.life + '';
                myToken.action.text = myBattleVacancy.action + '';
                otherToken.atk.text = otherBattleVacancy.attack + '';
                otherToken.hp.text = otherBattleVacancy.life + '';
                otherToken.action.text = otherBattleVacancy.action + '';
                break;
            case OverBattleType.PERISH_TOGETHER:
                myToken.removeSelf();
                myToken.destroy();
                otherToken.removeSelf();
                otherToken.destroy();
                break;
        }
    }

    Place(isMy, groundIndex, vacancyIndex) {
        console.log('place:', isMy, groundIndex, vacancyIndex)
        let skin = '';
        switch (groundIndex) {
            case GroundType.NONE:
                skin = 'duel/qipan/bg.png';
                break;
            case GroundType.EARTH:
                skin = 'duel/qipan/earth.png';
                break;
            case GroundType.VOLCANO:
                skin = 'duel/qipan/volcano.png';
                break;
            case GroundType.OCEAN:
                skin = 'duel/qipan/ocean.png';
                break;
            case GroundType.FURUKI:
                skin = 'duel/qipan/furuki.png';
                break;
        }
        if (isMy) {
            this.myHexArray[vacancyIndex].getChildByName('ground').skin = skin;
            this.numPlaceInTheRound -= 1;
        } else {
            this.otherHexArray[vacancyIndex].getChildByName('ground').skin = skin;
        }
    }
}
const OverBattleType = {
    MY: 1, //我赢了
    OTHER: 2, //你赢了
    DRAW: 3, //平局
    PERISH_TOGETHER: 4 //同归于尽
}
const DrawType = {
    NONE: 0, //空
    HAND: 1, //手牌
    GROUND: 2, //地
    CARD: 3, //场上的生物
}
const GroundType = {
    NONE: 0, //深渊
    EARTH: 1, //大地
    VOLCANO: 2, //火山
    OCEAN: 3, //海洋
    FURUKI: 4 //古木
}