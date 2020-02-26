/*
* name;
*/
var SocketManager = /** @class */ (function () {
    function SocketManager() {
        this.socket = null;
        this.userId = 0;
        this.who = '';
    }
    Object.defineProperty(SocketManager, "Inst", {
        get: function () {
            if (this._Inst == null) {
                this._Inst = new SocketManager();
            }
            return this._Inst;
        },
        enumerable: true,
        configurable: true
    });
    SocketManager.prototype.InitSocket = function (host, port) {
        this.socket = io.connect("http://" + host + ":" + port);
        this.InitEvent();
    };
    SocketManager.prototype.InitEvent = function () {
        var _this = this;
        this.socket.on("WAITE", function (param) {
            console.log("请等待");
        });
        this.socket.on("START", function (param) {
            console.log("房间号:", param.roomNumber);
            GameMain.app.viewManager.onSelectDeck();
        });
        this.socket.on("READY_GO", function (param) {
            if (GameMain.app.viewManager.sceneSelectDeck) {
                _this.who = param.who;
                GameMain.app.viewManager.sceneSelectDeck.GoToDuelView();
            }
        });
        this.socket.on("RECONNECT", function (param) {
            GameMain.app.viewManager.onDuel();
        });
        this.socket.on("SEND_CARD", function (param) {
            console.log("玩家开始手牌", { 'gameData': param });
            if (GameMain.app.viewManager.sceneDuel) {
                GameMain.app.viewManager.sceneDuel.duelCardDataArray = param.myCard;
                GameMain.app.viewManager.sceneDuel.DuelCard();
            }
        });
        this.socket.on("NOW_DECK", function (param) {
            console.log("玩家当前卡组", { 'gameData': param });
        });
        this.socket.on("DECK_ALL", function (param) {
            console.log("所有卡片", { 'cardAll': param });
            if (GameMain.app.viewManager.sceneSelectDeck) {
                GameMain.app.viewManager.sceneSelectDeck.AddData(param);
            }
        });
        this.socket.on("NOW_ROUND", function (param) {
            console.log("当前游戏回合", { 'round': param.roundCount, 'isFirst': param.isFirst, 'my': _this.who });
            if (GameMain.app.viewManager.sceneDuel) {
                if (param.isFirst == _this.who) {
                    GameMain.app.viewManager.sceneDuel.isMyRoundTime = param.roundCount % 2 == 0 ? false : true;
                }
                else {
                    GameMain.app.viewManager.sceneDuel.isMyRoundTime = param.roundCount % 2 != 0 ? false : true;
                }
                GameMain.app.viewManager.sceneDuel.UpdateRoundTime(param.roundCount);
            }
        });
        this.socket.on("MY_DATEILS", function (param) {
            var handCardCount = param['my']['handCardCount'];
            var deckCardCount = param['my']['deckCardCount'];
            var cemeteryCardCount = param['my']['cemeteryCardCount'];
            var extradimensionalCardCount = param['my']['extradimensionalCardCount'];
            var energy = param['my']['energy'];
            var evolution = param['my']['evolutionCount'];
            var vacancy = param['my']['vacancy'];
            var ground = param['my']['ground'];
            var movingData = param['my']['movingData'];
            var attackData = param['my']['attackData'];
            var energyBase = param['my']['energyBase'];
            console.log('my_vacancy:', energy, movingData, handCardCount, vacancy, GameMain.app.viewManager.sceneDuel.vacancyCardArray);
            if (GameMain.app.viewManager.sceneDuel) {
                GameMain.app.viewManager.sceneDuel.ChangeEvolutionTxt(true, evolution);
                GameMain.app.viewManager.sceneDuel.ChangeDeckTxt(true, deckCardCount);
                GameMain.app.viewManager.sceneDuel.ChangeExtradimensionalTxt(true, extradimensionalCardCount);
                GameMain.app.viewManager.sceneDuel.ChangeCemeteryTxt(true, cemeteryCardCount);
                GameMain.app.viewManager.sceneDuel.UpdateEnergyCount(true, energy, energyBase);
                if (ground.isPlace) {
                    for (var i = 0; i < ground.ground.length; i++) {
                        if (GameMain.app.viewManager.sceneDuel.myVacancyGroundArray[i] != ground.ground[i]) {
                            GameMain.app.viewManager.sceneDuel.myVacancyGroundArray[i] = ground.ground[i];
                            GameMain.app.viewManager.sceneDuel.Place(true, ground.ground[i], i);
                        }
                    }
                }
                else {
                    if (!!movingData.isMoving) {
                        GameMain.app.viewManager.sceneDuel.Moving(movingData.characterIndex, movingData.moveIndex);
                    }
                    else {
                        for (var i = 0; i < vacancy.length; i++) {
                            if (GameMain.app.viewManager.sceneDuel.vacancyCardArray[i] == i && vacancy[i] != i) {
                                GameMain.app.viewManager.sceneDuel.vacancyCardArray[i] = vacancy[i];
                                if (vacancy[i].cardType == CardType.HERO) {
                                    GameMain.app.viewManager.sceneDuel.InitHero(true, vacancy[i]);
                                }
                                else if (vacancy[i].cardType == CardType.CHARACTER) {
                                    GameMain.app.viewManager.sceneDuel.Summon(vacancy[i], i);
                                }
                            }
                        }
                    }
                }
            }
        });
        this.socket.on("OTHER_DATEILS", function (param) {
            var handCardCount = param['other']['handCardCount'];
            var deckCardCount = param['other']['deckCardCount'];
            var cemeteryCardCount = param['other']['cemeteryCardCount'];
            var extradimensionalCardCount = param['other']['extradimensionalCardCount'];
            var energy = param['other']['energy'];
            var evolution = param['other']['evolutionCount'];
            var vacancy = param['other']['vacancy'];
            var ground = param['other']['ground'];
            var movingData = param['other']['movingData'];
            var attackData = param['other']['attackData'];
            var energyBase = param['other']['energyBase'];
            console.log('other_vacancy:', energy, movingData, handCardCount, vacancy, GameMain.app.viewManager.sceneDuel.otherVacancyCardArray);
            if (GameMain.app.viewManager.sceneDuel) {
                GameMain.app.viewManager.sceneDuel.ChangeEvolutionTxt(false, evolution);
                GameMain.app.viewManager.sceneDuel.ChangeDeckTxt(false, deckCardCount);
                GameMain.app.viewManager.sceneDuel.ChangeExtradimensionalTxt(false, extradimensionalCardCount);
                GameMain.app.viewManager.sceneDuel.ChangeCemeteryTxt(false, cemeteryCardCount);
                GameMain.app.viewManager.sceneDuel.UpdateEnergyCount(false, energy, energyBase);
                GameMain.app.viewManager.sceneDuel.DuelOtherCard(handCardCount);
                if (ground.isPlace) {
                    for (var i = 0; i < ground.ground.length; i++) {
                        if (GameMain.app.viewManager.sceneDuel.otherVacancyGroundArray[i] != ground.ground[i]) {
                            GameMain.app.viewManager.sceneDuel.otherVacancyGroundArray[i] = ground.ground[i];
                            GameMain.app.viewManager.sceneDuel.Place(false, ground.ground[i], i);
                        }
                    }
                }
                else {
                    if (!!movingData.isMoving) {
                        GameMain.app.viewManager.sceneDuel.OtherMoving(movingData.characterIndex, movingData.moveIndex);
                    }
                    else {
                        for (var i = 0; i < vacancy.length; i++) {
                            if (GameMain.app.viewManager.sceneDuel.otherVacancyCardArray[i] == i && vacancy[i] != i) {
                                GameMain.app.viewManager.sceneDuel.otherVacancyCardArray[i] = vacancy[i];
                                if (vacancy[i].cardType == CardType.HERO) {
                                    GameMain.app.viewManager.sceneDuel.InitHero(false, vacancy[i]);
                                }
                                else if (vacancy[i].cardType == CardType.CHARACTER) {
                                    GameMain.app.viewManager.sceneDuel.OtherSummon(vacancy[i], i);
                                }
                            }
                        }
                        ;
                    }
                }
            }
        });
        this.socket.on("GAME_OVER", function (param) {
            if (GameMain.app.viewManager.sceneDuel) {
                GameMain.app.viewManager.sceneDuel.ShowGameOverLabel(param.isSuccess);
            }
        });
        this.socket.on("SEND_RESHUFFLE_START", function (param) {
            if (GameMain.app.viewManager.sceneDuel) {
                GameMain.app.viewManager.sceneDuel.ShowReshuffleCardBox(param.replaceCards);
            }
        });
        this.socket.on("BATTLE", function (param) {
            GameMain.app.viewManager.sceneDuel.Battle(param);
        });
        this.socket.on("SEND_TIP", function (param) {
            console.log('tip:', param.tip);
        });
    };
    //随机匹配
    SocketManager.prototype.RandomMatch = function () {
        this.socket.emit("CONNECT", {
            userId: this.userId
        });
    };
    //暗号匹配
    SocketManager.prototype.RoomMatch = function (roomId) {
        this.socket.emit("ROOMCONNECT", {
            userId: this.userId,
            roomId: roomId
        });
    };
    SocketManager.prototype.AddCount = function () {
        this.socket.emit("ADD", {
            userId: this.userId
        });
    };
    //重新发送查看所有卡牌请求，一般在进入房间5s后无响应再发送
    SocketManager.prototype.AgainRequeirAllCard = function () {
        this.socket.emit("AGAIN_ALLCARD", {
            userId: this.userId
        });
    };
    //选好卡组准备完成
    SocketManager.prototype.ReadyGo = function (array) {
        this.socket.emit("DUEL_GO", {
            userId: this.userId,
            deckArray: JSON.stringify(array),
            who: this.who
        });
    };
    //结束回合
    SocketManager.prototype.EndRoundTime = function () {
        this.socket.emit("END_ROUND", {
            userId: this.userId,
            who: this.who
        });
    };
    //更换初始卡牌，3张
    SocketManager.prototype.ChangeStartCard = function (array) {
        this.socket.emit("RESHUFFLE_STARTCARD", {
            userId: this.userId,
            who: this.who,
            reshuffleArray: array
        });
    };
    //召唤
    SocketManager.prototype.Summon = function (handIndex, summonIndex) {
        this.socket.emit("SUMMON", {
            userId: this.userId,
            who: this.who,
            handIndex: handIndex,
            summonIndex: summonIndex
        });
    };
    //移动
    SocketManager.prototype.MoveCharacter = function (characterIndex, moveIndex, consume) {
        console.log('MoveCharacter');
        this.socket.emit("MOVE_CHARACTER", {
            userId: this.userId,
            who: this.who,
            characterIndex: characterIndex,
            moveIndex: moveIndex,
            consume: consume
        });
    };
    //战斗
    SocketManager.prototype.AttackCharacter = function (myCharacterIndex, otherCharacterIndex) {
        console.log('AttackCharacter');
        this.socket.emit("ATTACK_CHARACTER", {
            userId: this.userId,
            who: this.who,
            myCharacterIndex: myCharacterIndex,
            otherCharacterIndex: otherCharacterIndex,
        });
    };
    //放置'地'
    SocketManager.prototype.PlaceGround = function (selectIndex, placeIndex) {
        console.log('PlaceGround');
        this.socket.emit("PLACE_GROUND", {
            userId: this.userId,
            who: this.who,
            selectIndex: selectIndex,
            placeIndex: placeIndex,
        });
    };
    SocketManager._Inst = null;
    return SocketManager;
}());
//# sourceMappingURL=SocketManager.js.map