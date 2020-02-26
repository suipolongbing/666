/*
* name;
*/
class SelectDeckView extends ui.SelectDeckViewUI {
    constructor() {
        super();
    }

    private isAddDataSuccess = false;
    private data;
    private deckLength = 9;
    private deckCount = 0;
    private deckArray = [];
    private haveCard = [];

    onShow(bool) {
        if (bool) {
            this.visible = true;
            this.AddEvent();
            this.InitList();
            Laya.timer.once(5000, this, () => {
                if (this && !this.isAddDataSuccess) {
                    SocketManager.Inst.AgainRequeirAllCard();
                }
            })
            this.startBtn.text = '开始游戏' + '(' + this.deckCount + '/' + this.deckLength + ')';
        } else {
            this.visible = false;
            this.RemoveEvent();
        }
    }

    AddEvent() {
        this.startBtn.on(Laya.Event.CLICK, this, this.StartGame);
    }

    RemoveEvent() {
        this.startBtn.off(Laya.Event.CLICK, this, this.StartGame);
    }

    InitList() {
        this.cardList.renderHandler = new Laya.Handler(this, this.UpdateList);
        this.cardList.vScrollBarSkin = '';
        this.cardList.scrollBar.hide = true;
    }

    //拆解数据
    AddData(array) {
        this.isAddDataSuccess = true;
        this.data = array.myCard;
        this.cardList.array = this.data;
        for (let i = 0; i < this.cardList.array.length; i++) {
            this.haveCard[i] = { one: 0, two: 0 };
        }
        console.log('data:', this.data);
    }

    // 渲染列表
    UpdateList(cell, index): void {
        let cardView = cell.getChildByName('cardView') as ui.DuelCardUI;
        let selectOne = cell.getChildByName('selectOne') as Laya.Image;
        let selectTwo = cell.getChildByName('selectTwo') as Laya.Image;

        selectOne.visible = this.haveCard[index].one == 1 ? true : false;
        selectTwo.visible = this.haveCard[index].two == 1 ? true : false;

        let content = cardView.myContent;
        let name = cardView.myName;
        let star = cardView.myStar;
        let atk = cardView.myAtk;
        let life = cardView.myLife;
        let action = cardView.myAction
        let terrainTxt1 = cardView.terrainTxt1;
        let terrainTxt2 = cardView.terrainTxt2;
        let terrainTxt3 = cardView.terrainTxt3;
        let terrainTxt4 = cardView.terrainTxt4;
        if (!!cell.dataSource['terrain']) {
            this.OperateTerrain(cell.dataSource['terrain'], terrainTxt1, terrainTxt2, terrainTxt3, terrainTxt4)
        }

        if (cell.dataSource['cardType'] == CardType.CHARACTER) {
            atk.visible = true;
            life.visible = true;
            action.visible = true;
            atk.text = cell.dataSource['attackBase'] + '';
            life.text = cell.dataSource['lifeBase'] + '';
            action.text = cell.dataSource['action'] + '';
        } else {
            atk.visible = false;
            life.visible = false;
            action.visible = false;
            atk.text = '';
            life.text = '';
            action.text = '';
        }
        content.text = cell.dataSource['content'] + '';
        name.text = cell.dataSource['name'] + '';
        star.text = cell.dataSource['cost'] + '';

        cardView.on(Laya.Event.CLICK, this, this.OnClickAddDeck, [cell.dataSource['id'], index, cardView, selectOne, selectTwo]);
    }

    StartGame() {
        if (this.deckCount < this.deckLength) {
            console.log("牌组还没到30张，请继续添加卡牌");
            return;
        }
        SocketManager.Inst.AddCount();
        console.log("请等待");
    }

    GoToDuelView() {
        SocketManager.Inst.ReadyGo(this.deckArray);
        GameMain.app.viewManager.onDuel();
    }

    OnClickAddDeck(id, index, cv, one, two) {
        if (this.deckCount >= this.deckLength) {
            return;
        }
        if (!one.visible && !two.visible) {
            one.visible = true;
            this.haveCard[index].one = 1
            this.deckArray.push(id);
            this.ChangeBtnTxt(true);
        }
        else if (one.visible && !two.visible) {
            two.visible = true;
            this.haveCard[index].two = 1
            this.deckArray.push(id);
            this.ChangeBtnTxt(true);
        }
        else if (one.visible && two.visible) {
            one.visible = false;
            two.visible = false;
            this.haveCard[index].one = 0
            this.haveCard[index].two = 0
            for (let i = 0; i < 2; i++) {
                this.deckArray.splice(this.deckArray.indexOf(id), 1);
                this.ChangeBtnTxt(false);
            }
        }
    }

    ChangeBtnTxt(bool) {
        if (bool) {
            this.deckCount += 1;
        } else {
            this.deckCount -= 1;
        }
        this.startBtn.text = '开始游戏' + '(' + this.deckCount + '/' + this.deckLength + ')';
        this.ChangeArrayLabelTxt();
    }

    ChangeArrayLabelTxt() {
        this.arrayLabel.text = '[' + this.deckArray.toString() + ']';
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
}
const CardType = {
    MANTRA: 1,
    CHARACTER: 2,
    SPELL: 3,
    HERO: 4
}