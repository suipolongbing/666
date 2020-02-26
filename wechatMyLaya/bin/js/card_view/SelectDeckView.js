var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var SelectDeckView = /** @class */ (function (_super) {
    __extends(SelectDeckView, _super);
    function SelectDeckView() {
        var _this = _super.call(this) || this;
        _this.isAddDataSuccess = false;
        _this.deckLength = 9;
        _this.deckCount = 0;
        _this.deckArray = [];
        _this.haveCard = [];
        return _this;
    }
    SelectDeckView.prototype.onShow = function (bool) {
        var _this = this;
        if (bool) {
            this.visible = true;
            this.AddEvent();
            this.InitList();
            Laya.timer.once(5000, this, function () {
                if (_this && !_this.isAddDataSuccess) {
                    SocketManager.Inst.AgainRequeirAllCard();
                }
            });
            this.startBtn.text = '开始游戏' + '(' + this.deckCount + '/' + this.deckLength + ')';
        }
        else {
            this.visible = false;
            this.RemoveEvent();
        }
    };
    SelectDeckView.prototype.AddEvent = function () {
        this.startBtn.on(Laya.Event.CLICK, this, this.StartGame);
    };
    SelectDeckView.prototype.RemoveEvent = function () {
        this.startBtn.off(Laya.Event.CLICK, this, this.StartGame);
    };
    SelectDeckView.prototype.InitList = function () {
        this.cardList.renderHandler = new Laya.Handler(this, this.UpdateList);
        this.cardList.vScrollBarSkin = '';
        this.cardList.scrollBar.hide = true;
    };
    //拆解数据
    SelectDeckView.prototype.AddData = function (array) {
        this.isAddDataSuccess = true;
        this.data = array.myCard;
        this.cardList.array = this.data;
        for (var i = 0; i < this.cardList.array.length; i++) {
            this.haveCard[i] = { one: 0, two: 0 };
        }
        console.log('data:', this.data);
    };
    // 渲染列表
    SelectDeckView.prototype.UpdateList = function (cell, index) {
        var cardView = cell.getChildByName('cardView');
        var selectOne = cell.getChildByName('selectOne');
        var selectTwo = cell.getChildByName('selectTwo');
        selectOne.visible = this.haveCard[index].one == 1 ? true : false;
        selectTwo.visible = this.haveCard[index].two == 1 ? true : false;
        var content = cardView.myContent;
        var name = cardView.myName;
        var star = cardView.myStar;
        var atk = cardView.myAtk;
        var life = cardView.myLife;
        var action = cardView.myAction;
        var terrainTxt1 = cardView.terrainTxt1;
        var terrainTxt2 = cardView.terrainTxt2;
        var terrainTxt3 = cardView.terrainTxt3;
        var terrainTxt4 = cardView.terrainTxt4;
        if (!!cell.dataSource['terrain']) {
            this.OperateTerrain(cell.dataSource['terrain'], terrainTxt1, terrainTxt2, terrainTxt3, terrainTxt4);
        }
        if (cell.dataSource['cardType'] == CardType.CHARACTER) {
            atk.visible = true;
            life.visible = true;
            action.visible = true;
            atk.text = cell.dataSource['attackBase'] + '';
            life.text = cell.dataSource['lifeBase'] + '';
            action.text = cell.dataSource['action'] + '';
        }
        else {
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
    };
    SelectDeckView.prototype.StartGame = function () {
        if (this.deckCount < this.deckLength) {
            console.log("牌组还没到30张，请继续添加卡牌");
            return;
        }
        SocketManager.Inst.AddCount();
        console.log("请等待");
    };
    SelectDeckView.prototype.GoToDuelView = function () {
        SocketManager.Inst.ReadyGo(this.deckArray);
        GameMain.app.viewManager.onDuel();
    };
    SelectDeckView.prototype.OnClickAddDeck = function (id, index, cv, one, two) {
        if (this.deckCount >= this.deckLength) {
            return;
        }
        if (!one.visible && !two.visible) {
            one.visible = true;
            this.haveCard[index].one = 1;
            this.deckArray.push(id);
            this.ChangeBtnTxt(true);
        }
        else if (one.visible && !two.visible) {
            two.visible = true;
            this.haveCard[index].two = 1;
            this.deckArray.push(id);
            this.ChangeBtnTxt(true);
        }
        else if (one.visible && two.visible) {
            one.visible = false;
            two.visible = false;
            this.haveCard[index].one = 0;
            this.haveCard[index].two = 0;
            for (var i = 0; i < 2; i++) {
                this.deckArray.splice(this.deckArray.indexOf(id), 1);
                this.ChangeBtnTxt(false);
            }
        }
    };
    SelectDeckView.prototype.ChangeBtnTxt = function (bool) {
        if (bool) {
            this.deckCount += 1;
        }
        else {
            this.deckCount -= 1;
        }
        this.startBtn.text = '开始游戏' + '(' + this.deckCount + '/' + this.deckLength + ')';
        this.ChangeArrayLabelTxt();
    };
    SelectDeckView.prototype.ChangeArrayLabelTxt = function () {
        this.arrayLabel.text = '[' + this.deckArray.toString() + ']';
    };
    SelectDeckView.prototype.OperateTerrain = function (data, terrainTxt1, terrainTxt2, terrainTxt3, terrainTxt4) {
        var earthCount = 0, furukiCount = 0, oceanCount = 0, volcanoCount = 0, abyssCount = 0;
        data.forEach(function (element) {
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
            terrainTxt1.text = abyssCount + '';
            terrainTxt1.color = '#000000';
        }
        else {
            if (earthCount > 0) {
                terrainTxt1.visible = true;
                terrainTxt1.text = earthCount + '';
                terrainTxt1.color = '#6c4958';
                if (volcanoCount > 0) {
                    terrainTxt2.visible = true;
                    terrainTxt2.text = volcanoCount + '';
                    terrainTxt2.color = '#cc756a';
                    if (oceanCount > 0) {
                        terrainTxt3.visible = true;
                        terrainTxt3.text = oceanCount + '';
                        terrainTxt3.color = '#b19df3';
                        if (furukiCount > 0) {
                            terrainTxt4.visible = true;
                            terrainTxt4.text = furukiCount + '';
                            terrainTxt4.color = '#1ae87d';
                        }
                    }
                    else {
                        if (furukiCount > 0) {
                            terrainTxt3.visible = true;
                            terrainTxt3.text = furukiCount + '';
                            terrainTxt3.color = '#1ae87d';
                        }
                    }
                }
                else {
                    if (oceanCount > 0) {
                        terrainTxt2.visible = true;
                        terrainTxt2.text = oceanCount + '';
                        terrainTxt2.color = '#b19df3';
                        if (furukiCount > 0) {
                            terrainTxt3.visible = true;
                            terrainTxt3.text = furukiCount + '';
                            terrainTxt3.color = '#1ae87d';
                        }
                    }
                    else {
                        if (furukiCount > 0) {
                            terrainTxt2.visible = true;
                            terrainTxt2.text = furukiCount + '';
                            terrainTxt2.color = '#1ae87d';
                        }
                    }
                }
            }
            else {
                if (volcanoCount > 0) {
                    terrainTxt1.visible = true;
                    terrainTxt1.text = volcanoCount + '';
                    terrainTxt1.color = '#cc756a';
                    if (oceanCount > 0) {
                        terrainTxt2.visible = true;
                        terrainTxt2.text = oceanCount + '';
                        terrainTxt2.color = '#b19df3';
                        if (furukiCount > 0) {
                            terrainTxt3.visible = true;
                            terrainTxt3.text = furukiCount + '';
                            terrainTxt3.color = '#1ae87d';
                        }
                    }
                    else {
                        if (furukiCount > 0) {
                            terrainTxt2.visible = true;
                            terrainTxt2.text = furukiCount + '';
                            terrainTxt2.color = '#1ae87d';
                        }
                    }
                }
                else {
                    if (oceanCount > 0) {
                        terrainTxt1.visible = true;
                        terrainTxt1.text = oceanCount + '';
                        terrainTxt1.color = '#b19df3';
                        if (furukiCount > 0) {
                            terrainTxt2.visible = true;
                            terrainTxt2.text = furukiCount + '';
                            terrainTxt2.color = '#1ae87d';
                        }
                    }
                    else {
                        if (furukiCount > 0) {
                            terrainTxt1.visible = true;
                            terrainTxt1.text = furukiCount + '';
                            terrainTxt1.color = '#1ae87d';
                        }
                    }
                }
            }
        }
    };
    return SelectDeckView;
}(ui.SelectDeckViewUI));
var CardType = {
    MANTRA: 1,
    CHARACTER: 2,
    SPELL: 3,
    HERO: 4
};
//# sourceMappingURL=SelectDeckView.js.map