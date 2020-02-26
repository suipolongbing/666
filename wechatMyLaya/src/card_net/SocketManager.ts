/*
* name;
*/
class SocketManager {

    private static _Inst: SocketManager = null;
    public static get Inst(): SocketManager {
        if (this._Inst == null) {
            this._Inst = new SocketManager();
        }
        return this._Inst;
    }

    public socket = null;
    public userId = 0;
    public who = '';

    InitSocket(host, port) {
        this.socket = io.connect(`http://${host}:${port}`);
        this.InitEvent();
    }

    InitEvent() {
        this.socket.on("WAITE", (param) => {
            console.log("请等待")
        });
        this.socket.on("START", (param) => {
            console.log("房间号:", param.roomNumber);
            GameMain.app.viewManager.onSelectDeck();
        });
        this.socket.on("READY_GO", (param) => {
            if (GameMain.app.viewManager.sceneSelectDeck) {
                this.who = param.who
                GameMain.app.viewManager.sceneSelectDeck.GoToDuelView();
            }
        });
        this.socket.on("RECONNECT", (param) => {
            GameMain.app.viewManager.onDuel();
        });
        this.socket.on("SEND_CARD", (param) => {
            console.log("玩家开始手牌", { 'gameData': param })
            if (GameMain.app.viewManager.sceneDuel) {
                GameMain.app.viewManager.sceneDuel.duelCardDataArray = param.myCard;
                GameMain.app.viewManager.sceneDuel.DuelCard();
            }
        });
        this.socket.on("NOW_DECK", (param) => {
            console.log("玩家当前卡组", { 'gameData': param })
        });
        this.socket.on("DECK_ALL", (param) => {
            console.log("所有卡片", { 'cardAll': param })
            if (GameMain.app.viewManager.sceneSelectDeck) {
                GameMain.app.viewManager.sceneSelectDeck.AddData(param);
            }
        });
        this.socket.on("NOW_ROUND", (param) => {
            console.log("当前游戏回合", { 'round': param.roundCount, 'isFirst': param.isFirst, 'my': this.who })
            if (GameMain.app.viewManager.sceneDuel) {
                if (param.isFirst == this.who) {
                    GameMain.app.viewManager.sceneDuel.isMyRoundTime = param.roundCount % 2 == 0 ? false : true;
                } else {
                    GameMain.app.viewManager.sceneDuel.isMyRoundTime = param.roundCount % 2 != 0 ? false : true;
                }
                GameMain.app.viewManager.sceneDuel.UpdateRoundTime(param.roundCount);
            }
        });
        this.socket.on("MY_DATEILS", (param) => {
            let handCardCount = param['my']['handCardCount'];
            let deckCardCount = param['my']['deckCardCount'];
            let cemeteryCardCount = param['my']['cemeteryCardCount'];
            let extradimensionalCardCount = param['my']['extradimensionalCardCount'];
            let energy = param['my']['energy'];
            let evolution = param['my']['evolutionCount'];
            let vacancy = param['my']['vacancy'];
            let ground = param['my']['ground'];
            let movingData = param['my']['movingData'];
            let attackData = param['my']['attackData'];
            let energyBase = param['my']['energyBase'];

            console.log('my_vacancy:', energy, movingData, handCardCount, vacancy, GameMain.app.viewManager.sceneDuel.vacancyCardArray)

            if (GameMain.app.viewManager.sceneDuel) {
                GameMain.app.viewManager.sceneDuel.ChangeEvolutionTxt(true, evolution);
                GameMain.app.viewManager.sceneDuel.ChangeDeckTxt(true, deckCardCount);
                GameMain.app.viewManager.sceneDuel.ChangeExtradimensionalTxt(true, extradimensionalCardCount);
                GameMain.app.viewManager.sceneDuel.ChangeCemeteryTxt(true, cemeteryCardCount);

                GameMain.app.viewManager.sceneDuel.UpdateEnergyCount(true, energy, energyBase);

                if (ground.isPlace) {
                        for (let i = 0; i < ground.ground.length; i++) {
                            if (GameMain.app.viewManager.sceneDuel.myVacancyGroundArray[i] != ground.ground[i]) {
                                GameMain.app.viewManager.sceneDuel.myVacancyGroundArray[i] = ground.ground[i];
                                    GameMain.app.viewManager.sceneDuel.Place(true, ground.ground[i], i);
                            }
                        }
                } else {
                    if (!!movingData.isMoving) {
                        GameMain.app.viewManager.sceneDuel.Moving(movingData.characterIndex, movingData.moveIndex);
                    }
                    else {
                        for (let i = 0; i < vacancy.length; i++) {
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
        this.socket.on("OTHER_DATEILS", (param) => {
            let handCardCount = param['other']['handCardCount'];
            let deckCardCount = param['other']['deckCardCount'];
            let cemeteryCardCount = param['other']['cemeteryCardCount'];
            let extradimensionalCardCount = param['other']['extradimensionalCardCount'];
            let energy = param['other']['energy'];
            let evolution = param['other']['evolutionCount'];
            let vacancy = param['other']['vacancy'];
            let ground = param['other']['ground'];
            let movingData = param['other']['movingData'];
            let attackData = param['other']['attackData'];
            let energyBase = param['other']['energyBase'];

            console.log('other_vacancy:', energy, movingData, handCardCount, vacancy, GameMain.app.viewManager.sceneDuel.otherVacancyCardArray)

            if (GameMain.app.viewManager.sceneDuel) {
                GameMain.app.viewManager.sceneDuel.ChangeEvolutionTxt(false, evolution);
                GameMain.app.viewManager.sceneDuel.ChangeDeckTxt(false, deckCardCount);
                GameMain.app.viewManager.sceneDuel.ChangeExtradimensionalTxt(false, extradimensionalCardCount);
                GameMain.app.viewManager.sceneDuel.ChangeCemeteryTxt(false, cemeteryCardCount);

                GameMain.app.viewManager.sceneDuel.UpdateEnergyCount(false, energy, energyBase);

                GameMain.app.viewManager.sceneDuel.DuelOtherCard(handCardCount);

                if (ground.isPlace) {
                        for (let i = 0; i < ground.ground.length; i++) {
                            if (GameMain.app.viewManager.sceneDuel.otherVacancyGroundArray[i] != ground.ground[i]) {
                                GameMain.app.viewManager.sceneDuel.otherVacancyGroundArray[i] = ground.ground[i];
                                    GameMain.app.viewManager.sceneDuel.Place(false, ground.ground[i], i);
                            }
                        }
                } else {
                    if (!!movingData.isMoving) {
                        GameMain.app.viewManager.sceneDuel.OtherMoving(movingData.characterIndex, movingData.moveIndex);
                    }
                    else {
                        for (let i = 0; i < vacancy.length; i++) {
                            if (GameMain.app.viewManager.sceneDuel.otherVacancyCardArray[i] == i && vacancy[i] != i) {
                                GameMain.app.viewManager.sceneDuel.otherVacancyCardArray[i] = vacancy[i];
                                if (vacancy[i].cardType == CardType.HERO) {
                                    GameMain.app.viewManager.sceneDuel.InitHero(false, vacancy[i]);
                                }
                                else if (vacancy[i].cardType == CardType.CHARACTER) {
                                    GameMain.app.viewManager.sceneDuel.OtherSummon(vacancy[i], i);
                                }
                            }
                        };
                    }
                }
            }
        });
        this.socket.on("GAME_OVER", (param) => {
            if (GameMain.app.viewManager.sceneDuel) {
                GameMain.app.viewManager.sceneDuel.ShowGameOverLabel(param.isSuccess);
            }
        });
        this.socket.on("SEND_RESHUFFLE_START", (param) => {
            if (GameMain.app.viewManager.sceneDuel) {
                GameMain.app.viewManager.sceneDuel.ShowReshuffleCardBox(param.replaceCards);
            }
        });
        this.socket.on("BATTLE", (param) => {
            GameMain.app.viewManager.sceneDuel.Battle(param);
        });
        this.socket.on("SEND_TIP", (param) => {
            console.log('tip:', param.tip);
        });
    }

    //随机匹配
    RandomMatch() {
        this.socket.emit("CONNECT", {
            userId: this.userId
        });
    }

    //暗号匹配
    RoomMatch(roomId) {
        this.socket.emit("ROOMCONNECT", {
            userId: this.userId,
            roomId: roomId
        });
    }

    AddCount() {
        this.socket.emit("ADD", {
            userId: this.userId
        });
    }

    //重新发送查看所有卡牌请求，一般在进入房间5s后无响应再发送
    AgainRequeirAllCard() {
        this.socket.emit("AGAIN_ALLCARD", {
            userId: this.userId
        });
    }

    //选好卡组准备完成
    ReadyGo(array) {
        this.socket.emit("DUEL_GO", {
            userId: this.userId,
            deckArray: JSON.stringify(array),
            who: this.who
        });
    }

    //结束回合
    EndRoundTime() {
        this.socket.emit("END_ROUND", {
            userId: this.userId,
            who: this.who
        });
    }

    //更换初始卡牌，3张
    ChangeStartCard(array) {
        this.socket.emit("RESHUFFLE_STARTCARD", {
            userId: this.userId,
            who: this.who,
            reshuffleArray: array
        });
    }

    //召唤
    Summon(handIndex, summonIndex) {
        this.socket.emit("SUMMON", {
            userId: this.userId,
            who: this.who,
            handIndex: handIndex,
            summonIndex: summonIndex
        });
    }

    //移动
    MoveCharacter(characterIndex, moveIndex, consume) {
        console.log('MoveCharacter')
        this.socket.emit("MOVE_CHARACTER", {
            userId: this.userId,
            who: this.who,
            characterIndex: characterIndex,
            moveIndex: moveIndex,
            consume: consume
        });
    }

    //战斗
    AttackCharacter(myCharacterIndex, otherCharacterIndex) {
        console.log('AttackCharacter')
        this.socket.emit("ATTACK_CHARACTER", {
            userId: this.userId,
            who: this.who,
            myCharacterIndex: myCharacterIndex,
            otherCharacterIndex: otherCharacterIndex,
        });
    }

    //放置'地'
    PlaceGround(selectIndex, placeIndex) {
        console.log('PlaceGround')
        this.socket.emit("PLACE_GROUND", {
            userId: this.userId,
            who: this.who,
            selectIndex: selectIndex,
            placeIndex: placeIndex,
        });
    }
}
// 在 index.html 中引入socket.io, <script type="text/javascript" src="http://localhost:8080/socket.io/socket.io.js"></script>
declare class io {
    //连接
    static connect(param);
    static disconnect(param);
}