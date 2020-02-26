var ProtoBuf = require("protobufjs");
var ProtoRoot = ProtoBuf.loadSync("./proto/awesome.proto");
var AwesomeMessage = ProtoRoot.lookupType("awesomepackage.AwesomeMessage");
var mysql = require('mysql');
const uuidv4 = require('uuid/v4');
const seedrandom = require('seedrandom');
var { Cards } = require('./constant');
var { CardType } = require('./constant');
var { CardStatus } = require('./constant');
var { CardEffect } = require('./constant');
var { shuffle } = require('./utils')
var { countX } = require('./utils')
var { OverBattleType } = require('./battle_constant')
var { canBattle } = require('./battle_constant')
var { onebattlevacancy } = require('./battle_constant')
var { twobattlevacancy } = require('./battle_constant')
var { threebattlevacancy } = require('./battle_constant')
var { GroundType } = require('./ground')


//mysql
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : '******',
//   password : '*********',
//   database : '***********'
// });
// connection.connect();
/////---------------------
///*
var message = AwesomeMessage.create(
  {
    awesomeField: 'server',
    age: 10,
    people: { age: 14, name: 'alpha_svr' }
  }
);
var errMsg = AwesomeMessage.verify(message);
if (errMsg) {
  throw Error(errMsg);
}
var buffer = AwesomeMessage.encode(message).finish();
console.log(buffer);
//var message1 = AwesomeMessage.decode(buffer);
//console.log(message1);
//*/

/////---------------------
function formatBuffer(buffer) {
  var bufferArray = Object.keys(buffer).map(function (k) {
    return buffer[k];
  })
  return new Buffer(bufferArray);
}

var io = require('socket.io')(8080);
var client;

const waitPairQueue = []; // 等待排序的队列
const waitPairQueue2 = []; // 等待排序的队列(暗号房间)
const memoryData = {}; // 缓存的房间游戏数据，key => 房间号，value => 游戏数据
const existUserGameRoomMap = {}; // 缓存用户的房间号， key => 用户标识，value => 房间号
const socketUserMap = {};

io.on('connection', function (socket) {
  client = socket

  socket.on('CONNECT', function () {
    let args = Array.prototype.slice.call(arguments); // 将arguments转为真数组
    const { userId } = args[0];
    console.log('userId:', userId)
    socketUserMap[socket] = userId;

    //游戏开始后，才允许断线重连
    if (existUserGameRoomMap[userId]) {
      let roomNumber = existUserGameRoomMap[userId];
      let who = memoryData[roomNumber]['one'].userId == userId ? 'one' : 'two';
      memoryData[roomNumber][who].socket = socket;
      memoryData[roomNumber][who].socket.emit("RECONNECT", {
        memberId: who,
        roomNumber: roomNumber,
      });

      memoryData[roomNumber][who]["cards"] = [];
      for (let i = 0; i < memoryData[roomNumber][who]["handCards"].length; i++) {
        memoryData[roomNumber][who]["cards"].push(memoryData[roomNumber][who]["handCards"][i])
      }
      sendCards(roomNumber, who)
      sendRounds(roomNumber, who);
    }
    else {
      socket.emit("WAITE");

      //如果队列没有人，把自己加进队列，然后继续等待
      if (waitPairQueue.length === 0) {
        waitPairQueue.push({
          userId, socket
        });
        socket.emit("WAITE");
      } else {
        //如果队列有人，选出第一个和自己匹配
        let waitPlayer = waitPairQueue.splice(0, 1)[0];
        if (waitPlayer.userId == userId) {
          return;
        }
        let roomNumber = uuidv4(); // 生成房间号码

        let seed = Math.floor(Math.random() * 10000);

        waitPlayer.roomNumber = roomNumber;
        memoryData[roomNumber] = {
          "one": waitPlayer,
          "two": {
            userId, socket, roomNumber
          },
          seed, //存随机数种子 
          rand: seedrandom(seed),
          selectOne: 0, //第一个用户是否准备完成
          selectTwo: 0, //第二个用户是否准备完成
          isFirst: 'not', //当前先手用户
          roundCount: 0, //当前回合数
          streamBureau: 0 //为2时流局，房间消失
        };
        //存储两个用户的房间号
        existUserGameRoomMap[userId] = roomNumber;
        existUserGameRoomMap[waitPlayer.userId] = roomNumber;
        // 进入房间
        socket.join(roomNumber);
        waitPlayer.socket.join(roomNumber);

        // 游戏初始化完成，发送游戏初始化数据
        waitPlayer.socket.emit("START", {
          memberId: "one",
          roomNumber: roomNumber,
        });
        socket.emit("START", {
          memberId: "two",
          roomNumber: roomNumber,
        });

        initCard(roomNumber);
      }
    }
  });

  socket.on('ROOMCONNECT', function () {
    let args = Array.prototype.slice.call(arguments); // 将arguments转为真数组

    const { userId } = args[0];
    const { roomId } = args[0];
    console.log("args", userId, roomId);

    socket.emit("WAITE");

    //如果队列没有人，把自己加进队列，然后继续等待
    if (waitPairQueue2.length === 0) {
      waitPairQueue2.push({
        userId, roomId, socket
      });
      socket.emit("WAITE");
    } else {
      //如果队列有人，选出和暗号一致的
      for (var i = 0; i < waitPairQueue2.length; i++) {
        console.log("waitPairQueue2", waitPairQueue2[i]['roomId']);
        if (waitPairQueue2[i]['roomId'] == roomId) {
          let waitPlayer = waitPairQueue2.splice(i, 1)[0];
          if (waitPlayer.userId == userId) {
            return;
          }
          let roomNumber = uuidv4(); // 生成房间号码
          waitPlayer.roomNumber = roomNumber;
          memoryData[roomNumber] = {
            "one": waitPlayer,
            "two": {
              userId, socket, roomNumber
            },
            count: 0
          };
          //存储两个用户的房间号
          existUserGameRoomMap[userId] = roomNumber;
          existUserGameRoomMap[waitPlayer.userId] = roomNumber;
          // 进入房间
          socket.join(roomNumber);
          waitPlayer.socket.join(roomNumber);

          // 游戏初始化完成，发送游戏初始化数据
          waitPlayer.socket.emit("START", {
            count: 0,
            memberId: "one",
            roomNumber: roomNumber,
          });
          socket.emit("START", {
            count: 0,
            memberId: "two",
            roomNumber: roomNumber,
          });
        }
      }
    }
  });

  socket.on("ADD", function () {
    let args = Array.prototype.slice.call(arguments);
    let roomNumber = existUserGameRoomMap[args[0].userId];
    console.log("add", roomNumber)
    if (memoryData[roomNumber]["one"].userId == args[0].userId) {
      memoryData[roomNumber].selectOne = 1;
    }
    if (memoryData[roomNumber]["two"].userId == args[0].userId) {
      memoryData[roomNumber].selectTwo = 1;
    }
    if (memoryData[roomNumber].selectOne == 1 && memoryData[roomNumber].selectTwo == 1) {
      memoryData[roomNumber]["one"].socket.emit("READY_GO", {
        who: "one"
      });
      memoryData[roomNumber]["two"].socket.emit("READY_GO", {
        who: "two"
      });
    }
  })

  socket.on('AGAIN_ALLCARD', function () {

  });

  socket.on('DUEL_GO', function () {
    let args = Array.prototype.slice.call(arguments);
    let roomNumber = existUserGameRoomMap[args[0].userId];
    let deckArray = JSON.parse(args[0].deckArray);
    let who = args[0].who;
    console.log("DUEL_GO:", deckArray, who)
    firstDealCard(roomNumber, deckArray, who)
  });

  socket.on('END_ROUND', function () {
    let args = Array.prototype.slice.call(arguments);
    let roomNumber = existUserGameRoomMap[args[0].userId];
    let who = args[0].who;
    console.log("END_ROUND:", who)
    endRound(roomNumber, who)
  });

  socket.on('RESHUFFLE_STARTCARD', function () {
    let args = Array.prototype.slice.call(arguments);
    let roomNumber = existUserGameRoomMap[args[0].userId];
    let who = args[0].who;
    let reshuffleArray = args[0].reshuffleArray;
    console.log("RESHUFFLE_STARTCARD:", who, reshuffleArray)
    reshuffleCard(roomNumber, who, true, reshuffleArray)
  });

  socket.on('SUMMON', function () {
    let args = Array.prototype.slice.call(arguments);
    let roomNumber = existUserGameRoomMap[args[0].userId];
    let who = args[0].who;
    let handIndex = args[0].handIndex;
    let summonIndex = args[0].summonIndex;
    outCard(roomNumber, who, handIndex, summonIndex)
  });

  socket.on('MOVE_CHARACTER', function () {
    let args = Array.prototype.slice.call(arguments);
    let roomNumber = existUserGameRoomMap[args[0].userId];
    let who = args[0].who;
    let characterIndex = args[0].characterIndex;
    let moveIndex = args[0].moveIndex;
    moveCharacter(roomNumber, who, characterIndex, moveIndex)
  });

  socket.on('ATTACK_CHARACTER', function () {
    let args = Array.prototype.slice.call(arguments);
    let roomNumber = existUserGameRoomMap[args[0].userId];
    let who = args[0].who;
    let myCharacterIndex = args[0].myCharacterIndex;
    let otherCharacterIndex = args[0].otherCharacterIndex;
    attackCharacter(roomNumber, who, myCharacterIndex, otherCharacterIndex)
  });

  socket.on('PLACE_GROUND', function () {
    let args = Array.prototype.slice.call(arguments);
    let roomNumber = existUserGameRoomMap[args[0].userId];
    let who = args[0].who;
    let selectIndex = args[0].selectIndex;
    let placeIndex = args[0].placeIndex;
    console.log("PLACE_GROUND:", selectIndex, placeIndex)
    placeGround(roomNumber, who, selectIndex, placeIndex)
  });


  //如果双方都断开连接，清除房间和缓存
  socket.on("disconnect", function () {
    console.log('OnClose', socketUserMap[socket])
    let userId = socketUserMap[socket];
    socketUserMap[socket] = null;
    if (existUserGameRoomMap[userId]) {
      let roomNumber = existUserGameRoomMap[userId];
      memoryData[roomNumber]['streamBureau'] += 1;
      if (memoryData[roomNumber]['streamBureau'] >= 2) {
        existUserGameRoomMap[userId] = null;
        memoryData[roomNumber] = null;
      }
    }
  });
  // socket.on("login", OnLogin);
});

console.log('server is started, port: ' + '8080');

var OnLogin = function (data) {
  console.log('Onlogin1:' + data)
  data = formatBuffer(data)
  //console.log('Onlogin2:' + data)
  client.emit('login', buffer);
  var message = AwesomeMessage.decode(data);
  console.log(message.awesomeField + '\n' + message.age + '\n' + message.people.name + '\n' + message.people.age);
  /*
  var  addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(1,?,?,?,?)';
  var  addSqlParams = ['alpha_node', 'https://c.runoob.com','23453', 'CN'];
  connection.query(addSql,addSqlParams,function (err, result) {
      if(err){
       console.log('[INSERT ERROR] - ',err.message);
       return;
      }
      console.log('--------------------------INSERT----------------------------');
      console.log('INSERT ID:',result);
      console.log('------------------------------------------------------------\n');
  });
  */
  var sql = 'SELECT * FROM websites where Id=1';
  // connection.query(sql, function (err, result) {
  //   if (err) {
  //     console.log('[SELECT ERROR] - ', err.message);
  //     return;
  //   }
  //   console.log('--------------------------SELECT----------------------------');
  //   console.log(result);
  //   console.log('------------------------------------------------------------\n');
  // });
}

var initCard = function (roomNumber) {
  //挑选卡组
  selectDeck(roomNumber, memoryData[roomNumber]["one"], memoryData[roomNumber]["two"]);
}

var firstDealCard = function (roomNumber, deckArray, who) {
  console.log("firstDealCard:", roomNumber, deckArray, who)
  // 利用filter方法来遍历是否有相同的元素   可以根据等于-1   或者不等于-1 来获取相同或者不同的元素 
  let deck = [];
  deckArray.filter(function (v) {
    return Cards.filter((s) => {
      if (s.id == v) {
        deck.push(s);
      }
    });
  });
  // 初始卡组
  memoryData[roomNumber][who]["deckCards"] = deckArray;
  // 初始手牌
  memoryData[roomNumber][who]["handCards"] = [];
  // 初始能量
  memoryData[roomNumber][who]["energy"] = 3;
  // 所有的能量
  memoryData[roomNumber][who]["energyBase"] = 3;
  // 初始墓地卡牌
  memoryData[roomNumber][who]["cemeteryCards"] = [];
  // 初始异次元卡牌
  memoryData[roomNumber][who]["extradimensionalCards"] = [];
  // 初始进化点数
  memoryData[roomNumber][who]["evolution"] = 0;
  // 我方信息
  memoryData[roomNumber][who]["my"] = {};
  // 对方信息
  memoryData[roomNumber][who]["other"] = {};
  // 初始化大哥大
  memoryData[roomNumber][who]["hero"] = {
    name: "大哥大",
    cost: 10,
    terrain: [GroundType.EARTH],
    cardType: CardType.HERO,
    skillCost: 2,
    skillContent: `这是第1张牌`,
    attack: 1,
    life: 20,
    action: 1,
    actionBase: 1,
    attackBase: 1,
    lifeBase: 20,
    type: ["英雄族"],
    isAttack: 0,
    isMove: 0,
    isLaunch: 0,
    status: CardStatus.NORMAL,
    effect: CardEffect.KONG,
    statusRound: 0,
  };
  // 场上可供召唤的空位
  memoryData[roomNumber][who]["vacancy"] = [memoryData[roomNumber][who]["hero"], 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // 场上可供放置的空地
  memoryData[roomNumber][who]["ground"] = [memoryData[roomNumber][who]["hero"].terrain[0], GroundType.NONE, GroundType.NONE, GroundType.NONE, GroundType.NONE, GroundType.NONE, GroundType.NONE, GroundType.NONE, GroundType.NONE, GroundType.NONE];
  console.log("remainingcard0:", deck.length)
  // 往卡牌数组添加序列号属性，洗牌，然后赋给甲板
  memoryData[roomNumber][who]["remainingCards"] = shuffle(memoryData[roomNumber].rand, deck.map((item, index) => Object.assign({ k: who == "one" ? "one" : "two" + `-${index}` }, item)));
  // 甲板，卡组里遗留的卡
  let remainingCards = memoryData[roomNumber][who]["remainingCards"];
  // 决定出牌先后顺序
  if (memoryData[roomNumber]['isFirst'] == 'not') {
    let rm = Math.random() * 1;
    memoryData[roomNumber]['isFirst'] = rm > 0.5 ? "one" : "two";
  }
  if (who == memoryData[roomNumber]['isFirst']) {
    Object.assign(memoryData[roomNumber][who], {
      // 要发送给客户端的卡牌
      cards: [
        getNextCard(remainingCards, roomNumber, who),
        getNextCard(remainingCards, roomNumber, who),
        getNextCard(remainingCards, roomNumber, who),
        // getNextCard(remainingCards, roomNumber, who),
      ],
    });
    Object.assign(memoryData[roomNumber][who], {
      // 对方具体信息
      other: {
        handCardCount: 3,
        deckCardCount: deckArray.length - 3,
        cemeteryCardCount: 0,
        extradimensionalCardCount: 0,
        evolutionCount: 0,
        energy: 3,
        energyBase: 3,
        vacancy: memoryData[roomNumber][who]['vacancy'],
        ground: { isPlace: false, ground: memoryData[roomNumber][who]['ground'] },
        movingData: {},
      },
      // 己方具体信息
      my: {
        handCardCount: memoryData[roomNumber][who]["handCards"].length,
        deckCardCount: memoryData[roomNumber][who]["remainingCards"].length,
        cemeteryCardCount: memoryData[roomNumber][who]["cemeteryCards"].length,
        extradimensionalCardCount: memoryData[roomNumber][who]["extradimensionalCards"].length,
        evolutionCount: memoryData[roomNumber][who]["evolution"],
        energy: memoryData[roomNumber][who]["energy"],
        energyBase: memoryData[roomNumber][who]["energyBase"],
        vacancy: memoryData[roomNumber][who]['vacancy'],
        ground: { isPlace: false, ground: memoryData[roomNumber][who]['ground'] },
        movingData: {},
      }
    });
    console.log("remainingcard1:", memoryData[roomNumber][who]["remainingCards"].length)
  } else {
    Object.assign(memoryData[roomNumber][who], {
      // 要发送给客户端的卡牌
      cards: [
        getNextCard(remainingCards, roomNumber, who),
        getNextCard(remainingCards, roomNumber, who),
        getNextCard(remainingCards, roomNumber, who),
        // getNextCard(remainingCards, roomNumber, who),
        // getNextCard(remainingCards, roomNumber, who),
      ],
    });
    Object.assign(memoryData[roomNumber][who], {
      // 对方具体信息
      other: {
        handCardCount: 3,
        deckCardCount: deckArray.length - 3,
        cemeteryCardCount: 0,
        extradimensionalCardCount: 0,
        evolutionCount: 0,
        energy: 4,
        energyBase: 4,
        vacancy: memoryData[roomNumber][who]['vacancy'],
        ground: { isPlace: false, ground: memoryData[roomNumber][who]['ground'] },
        movingData: {},
      },
      // 己方具体信息
      my: {
        handCardCount: memoryData[roomNumber][who]["handCards"].length,
        deckCardCount: memoryData[roomNumber][who]["remainingCards"].length,
        cemeteryCardCount: memoryData[roomNumber][who]["cemeteryCards"].length,
        extradimensionalCardCount: memoryData[roomNumber][who]["extradimensionalCards"].length,
        evolutionCount: memoryData[roomNumber][who]["evolution"],
        energy: memoryData[roomNumber][who]["energy"],
        energyBase: memoryData[roomNumber][who]["energyBase"],
        vacancy: memoryData[roomNumber][who]['vacancy'],
        ground: { isPlace: false, ground: memoryData[roomNumber][who]['ground'] },
        movingData: {},
      }
    });
    console.log("remainingcard2:", memoryData[roomNumber][who]["remainingCards"].length)
  }

  //发送卡牌
  sendCards(roomNumber, who);

  //初始化我方信息
  sendMyDetails(roomNumber, who, true)
  //初始化对方信息
  sendOtherDetails(roomNumber, who, true)
  //是否需要更换初始手牌
  sendReshuffleStart(roomNumber, who);
}

var sendReshuffleStart = function (roomNumber, who) {
  memoryData[roomNumber][who].socket.emit("SEND_RESHUFFLE_START", {
    replaceCards: memoryData[roomNumber][who]["handCards"],
  })
}
//洗牌
var reshuffleCard = function (roomNumber, who, isStart, reshuffleArray) {
  if (isStart) {

    console.log("更换前的卡牌:", memoryData[roomNumber][who]["cards"].length,
      memoryData[roomNumber][who]["handCards"].length,
      memoryData[roomNumber][who]["remainingCards"].length,
      reshuffleArray.length)

    //初始发3张牌后洗牌，洗完牌再发送双方信息
    for (let i = reshuffleArray.length - 1; i >= 0; i--) {
      if (reshuffleArray[i] == 1) {
        var card = memoryData[roomNumber][who]["handCards"].splice(i, 1)[0];
        memoryData[roomNumber][who]["remainingCards"].push(card);
        memoryData[roomNumber][who]["cards"].splice(i, 1);
      }
    }

    memoryData[roomNumber][who]["remainingCards"] = shuffle(memoryData[roomNumber].rand, memoryData[roomNumber][who]["remainingCards"])

    let shouldSendCardCount = memoryData[roomNumber][who]["cards"].length;
    memoryData[roomNumber][who]["cards"] = [];
    for (let i = 0; i < reshuffleArray.length - shouldSendCardCount; i++) {
      memoryData[roomNumber][who]["cards"].push(getNextCard(memoryData[roomNumber][who]["remainingCards"], roomNumber, who));
    }

    console.log("更换后的卡牌:", memoryData[roomNumber][who]["cards"].length,
      memoryData[roomNumber][who]["handCards"].length,
      memoryData[roomNumber][who]["remainingCards"].length)

    //发送卡牌
    sendCards(roomNumber, who);
    //初始回合数=1 发送回合数和双方信息
    memoryData[roomNumber]['roundCount'] = 1;
    sendRounds(roomNumber, who);
  } else {
    //普通洗牌
  }
}

// 获取下一张卡
var getNextCard = function (remainingCards, roomNumber, who, isToHand = true) {
  if (remainingCards.length > 0) {
    var card = remainingCards.splice(0, 1)[0];
    if (isToHand) {
      // 添加手牌
      memoryData[roomNumber][who]["handCards"].push(card);
      console.log('ToHandCard', card)
    }
    return card;
  } else {
    return null
  }
}

var sendCards = function (roomNumber, id) {
  if (id) {
    // let otherId = id === "one" ? "two" : "one";
    memoryData[roomNumber][id].socket.emit("SEND_CARD", {
      myCard: memoryData[roomNumber][id].cards
    })
  } else {
    sendCards(roomNumber, "one");
    sendCards(roomNumber, "two");
  }
}

var sendStartDeck = function (roomNumber, id) {
  if (id) {
    // let otherId = id === "one" ? "two" : "one";
    memoryData[roomNumber][id].socket.emit("DECK_ALL", {
      myCard: memoryData[roomNumber][id].alldeck
    })
  } else {
    sendStartDeck(roomNumber, "one");
    sendStartDeck(roomNumber, "two");
  }
}

function selectDeck(roomNumber, first, second) {
  let firstDeck = Cards.map((item, index) => Object.assign({ k: `one-${index}` }, item));
  let secondDeck = Cards.map((item, index) => Object.assign({ k: `two-${index}` }, item));
  Object.assign(first, {
    alldeck: firstDeck
  });
  Object.assign(second, {
    alldeck: secondDeck
  });
  sendStartDeck(roomNumber);
}

var sendRounds = function (roomNumber, id) {
  if (memoryData[roomNumber]['roundCount'] % 2 == 0) {
    //双数，后手方回合
    addEnergy(roomNumber, id, !(memoryData[roomNumber]['isFirst'] == id))
  } else {
    //单数，先手方回合
    addEnergy(roomNumber, id, memoryData[roomNumber]['isFirst'] == id)
  }
  memoryData[roomNumber][id].socket.emit("NOW_ROUND", {
    isFirst: memoryData[roomNumber]['isFirst'],
    roundCount: memoryData[roomNumber]['roundCount'],
    // energy: memoryData[roomNumber][id]['energy']
  });
  //发送我方信息
  sendMyDetails(roomNumber, id)
  //发送对方信息
  sendOtherDetails(roomNumber, id)
}

var addEnergy = function (roomNumber, id, isAdd) {
  memoryData[roomNumber][id]['energyBase'] = isAdd ? memoryData[roomNumber][id]['energyBase'] + 1 : memoryData[roomNumber][id]['energyBase']
  if (memoryData[roomNumber][id]['energyBase'] >= 10) {
    memoryData[roomNumber][id]['energyBase'] = 10;
  }
  console.log("energyyyyyyyyyy:", id, isAdd, memoryData[roomNumber][id]["energy"])
  if (!isAdd) {
    return;
  }
  memoryData[roomNumber][id]["energy"] = memoryData[roomNumber][id]["energyBase"];
}

var endRound = function (roomNumber, id) {
  let other = id == 'one' ? 'two' : 'one'
  memoryData[roomNumber][other]['cards'] = [];
  // 一方结束回合，轮到下一方，下一方发一张牌
  // 如果无牌可抽，失败
  if (memoryData[roomNumber][other]["remainingCards"] == 0) {
    gameOver(roomNumber, other);
    return;
  }
  memoryData[roomNumber][other]['cards'].push(getNextCard(memoryData[roomNumber][other]["remainingCards"], roomNumber, other))
  setTimeout(function () {
    //延迟执行
    sendCards(roomNumber, other);
  }, 1400);
  memoryData[roomNumber]['roundCount'] += 1;

  //恢复生物可攻击和可移动状态
  for (let i = 0; i < memoryData[roomNumber][id]['vacancy'].length; i++) {
    if (memoryData[roomNumber][id]['vacancy'][i] != i) {
      if (memoryData[roomNumber][id]['vacancy'][i].isMove == 1 && memoryData[roomNumber][id]['vacancy'][i].status != CardStatus.STOP) {
        memoryData[roomNumber][id]['vacancy'][i].isMove = 0;
      }
      if (memoryData[roomNumber][id]['vacancy'][i].isAttack == 1 && memoryData[roomNumber][id]['vacancy'][i].status != CardStatus.TERROR) {
        memoryData[roomNumber][id]['vacancy'][i].isAttack = 0;
      }
    }
  }

  sendRounds(roomNumber, other, memoryData[roomNumber]['roundCount']);
  sendRounds(roomNumber, id, memoryData[roomNumber]['roundCount']);
}

var sendMyDetails = function (roomNumber, who, isFirstStage = false, movingData = {}, isPlace = false) {
  console.log("mydetails:", memoryData[roomNumber][who]["handCards"], memoryData[roomNumber][who]["remainingCards"],
    memoryData[roomNumber][who]["cemeteryCards"], memoryData[roomNumber][who]["extradimensionalCards"],
    memoryData[roomNumber][who]["evolution"], memoryData[roomNumber][who]["energy"], memoryData[roomNumber][who]["vacancy"])
  if (!isFirstStage) {
    memoryData[roomNumber][who]["my"] =
    {
      handCardCount: memoryData[roomNumber][who]["handCards"].length,
      deckCardCount: memoryData[roomNumber][who]["remainingCards"].length,
      cemeteryCardCount: memoryData[roomNumber][who]["cemeteryCards"].length,
      extradimensionalCardCount: memoryData[roomNumber][who]["extradimensionalCards"].length,
      evolutionCount: memoryData[roomNumber][who]["evolution"],
      energy: memoryData[roomNumber][who]["energy"],
      energyBase: memoryData[roomNumber][who]["energyBase"],
      vacancy: memoryData[roomNumber][who]['vacancy'],
      ground: { isPlace: isPlace, ground: memoryData[roomNumber][who]['ground'] },
      movingData: movingData,
    }
  } else {
    memoryData[roomNumber][who]["my"]['energy'] = memoryData[roomNumber][who]["energy"];
  }
  memoryData[roomNumber][who].socket.emit("MY_DATEILS", {
    my: memoryData[roomNumber][who]['my'],
  })
}

var sendOtherDetails = function (roomNumber, who, isFirstStage = false, movingData = {}, isPlace = false) {
  let other = who == 'one' ? 'two' : 'one';
  console.log("otherdetails:", memoryData[roomNumber][other]["handCards"], memoryData[roomNumber][other]["remainingCards"],
    memoryData[roomNumber][other]["cemeteryCards"], memoryData[roomNumber][other]["extradimensionalCards"],
    memoryData[roomNumber][other]["evolution"], memoryData[roomNumber][other]["energy"], memoryData[roomNumber][other]["vacancy"])
  if (!isFirstStage) {
    memoryData[roomNumber][who]["other"] =
    {
      handCardCount: memoryData[roomNumber][other]["handCards"].length,
      deckCardCount: memoryData[roomNumber][other]["remainingCards"].length,
      cemeteryCardCount: memoryData[roomNumber][other]["cemeteryCards"].length,
      extradimensionalCardCount: memoryData[roomNumber][other]["extradimensionalCards"].length,
      evolutionCount: memoryData[roomNumber][other]["evolution"],
      energy: memoryData[roomNumber][other]["energy"],
      energyBase: memoryData[roomNumber][other]["energyBase"],
      vacancy: memoryData[roomNumber][other]['vacancy'],
      ground: { isPlace: isPlace, ground: memoryData[roomNumber][other]['ground'] },
      movingData: movingData,
    }
  }
  memoryData[roomNumber][who].socket.emit("OTHER_DATEILS", {
    other: memoryData[roomNumber][who]['other'],
  });
}

var gameOver = function (roomNumber, who) {
  let other = who == 'one' ? 'two' : 'one';
  memoryData[roomNumber][who].socket.emit("GAME_OVER", {
    isSuccess: false,
  })
  memoryData[roomNumber][other].socket.emit("GAME_OVER", {
    isSuccess: true,
  })
}

/*
 * 召唤
 * handIndex 第几张手牌
 * summonIndex 召唤到场上哪个空位
 */
var outCard = function (roomNumber, who, handIndex, summonIndex) {
  let other = who == 'one' ? 'two' : 'one';
  if (memoryData[roomNumber][who]['handCards'][handIndex].cost <= memoryData[roomNumber][who]["energy"]) {
    if (!!memoryData[roomNumber][who]['handCards'][handIndex].terrain && memoryData[roomNumber][who]['handCards'][handIndex].terrain.length > 0) {
      if (countX(memoryData[roomNumber][who]['handCards'][handIndex].terrain, GroundType.FURUKI) <= countX(memoryData[roomNumber][who]["ground"], GroundType.FURUKI) &&
        countX(memoryData[roomNumber][who]['handCards'][handIndex].terrain, GroundType.NONE) <= countX(memoryData[roomNumber][who]["ground"], GroundType.NONE) &&
        countX(memoryData[roomNumber][who]['handCards'][handIndex].terrain, GroundType.OCEAN) <= countX(memoryData[roomNumber][who]["ground"], GroundType.OCEAN) &&
        countX(memoryData[roomNumber][who]['handCards'][handIndex].terrain, GroundType.EARTH) <= countX(memoryData[roomNumber][who]["ground"], GroundType.EARTH) &&
        countX(memoryData[roomNumber][who]['handCards'][handIndex].terrain, GroundType.VOLCANO) <= countX(memoryData[roomNumber][who]["ground"], GroundType.VOLCANO)) {
        if (memoryData[roomNumber][who]['handCards'][handIndex].terrain.indexOf(memoryData[roomNumber][who]["ground"][summonIndex]) == -1) {
          memoryData[roomNumber][who].socket.emit("SEND_TIP", {
            tip: "必须放置在正确的地上",
          })
          return;
        }
      } else {
        memoryData[roomNumber][who].socket.emit("SEND_TIP", {
          tip: "没有足够的地",
        })
        return;
      }
    }
    switch (memoryData[roomNumber][who]['handCards'][handIndex].cardType) {
      case CardType.CHARACTER:
        if (memoryData[roomNumber][who]['vacancy'][summonIndex] == summonIndex) {
          memoryData[roomNumber][who]["energy"] -= memoryData[roomNumber][who]['handCards'][handIndex].cost;
          var card = memoryData[roomNumber][who]['handCards'].splice(handIndex, 1)[0];
          memoryData[roomNumber][who]['vacancy'][summonIndex] = card;
          //发送我方信息
          sendMyDetails(roomNumber, who)
          //发送对方信息
          sendOtherDetails(roomNumber, other)
        } else {
          memoryData[roomNumber][who].socket.emit("SEND_TIP", {
            tip: "场上没有空位可以召唤",
          })
        }
        break;
      case CardType.MANTRA:
        break;
      case CardType.SPELL:
        break;
    }
  } else {
    memoryData[roomNumber][who].socket.emit("SEND_TIP", {
      tip: "没有足够的能量",
    })
  }
}

/*
 * 移动
 * characterIndex 移动的生物Index
 * moveIndex 目的地Index
 */
var moveCharacter = function (roomNumber, who, characterIndex, moveIndex) {
  let other = who == 'one' ? 'two' : 'one';
  var card = memoryData[roomNumber][who]['vacancy'][characterIndex];
  if (memoryData[roomNumber][who]['vacancy'][moveIndex] == moveIndex &&
    card.status != CardStatus.STOP && card.isMove == 0 && card.isAttack == 0) {
    // memoryData[roomNumber][who]["energy"] -= consume;
    memoryData[roomNumber][who]['vacancy'][moveIndex] = card;
    memoryData[roomNumber][who]['vacancy'][characterIndex] = characterIndex;
    card.isMove = 1;

    let movingData = { isMoving: true, characterIndex: characterIndex, moveIndex: moveIndex };
    //发送我方信息
    sendMyDetails(roomNumber, who, false, movingData);
    //发送对方信息
    sendOtherDetails(roomNumber, other, false, movingData);
  } else {
    if (memoryData[roomNumber][who]['vacancy'][moveIndex] != moveIndex) {
      memoryData[roomNumber][who].socket.emit("SEND_TIP", {
        tip: "这个地块已有生物",
      })
    }
    // else if (memoryData[roomNumber][who]["energy"] < consume) {
    //   memoryData[roomNumber][who].socket.emit("SEND_TIP", {
    //     tip: "没有足够的能量",
    //   })
    // }
    else if (card.status == CardStatus.STOP) {
      memoryData[roomNumber][who].socket.emit("SEND_TIP", {
        tip: "止步状态无法移动",
      })
    }
    else if (card.isMove == 1) {
      memoryData[roomNumber][who].socket.emit("SEND_TIP", {
        tip: "已经移动过了",
      })
    }
    else if (card.isAttack == 1) {
      memoryData[roomNumber][who].socket.emit("SEND_TIP", {
        tip: "发动攻击宣言无法移动",
      })
    }
  }
}

/*
 * 攻击
 * myCharacterIndex 发动攻击的生物Index
 * otherCharacterIndex 被攻击的生物Index
 */
var attackCharacter = function (roomNumber, who, myCharacterIndex, otherCharacterIndex) {
  let other = who == 'one' ? 'two' : 'one';
  let overType = 0;
  let overOtherType = 0;
  if (memoryData[roomNumber][who]['vacancy'][myCharacterIndex] != myCharacterIndex &&
    memoryData[roomNumber][other]['vacancy'][otherCharacterIndex] != otherCharacterIndex &&
    memoryData[roomNumber][who]['vacancy'][myCharacterIndex].status != CardStatus.TERROR && memoryData[roomNumber][who]['vacancy'][myCharacterIndex].isMove == 0 && memoryData[roomNumber][who]['vacancy'][myCharacterIndex].isAttack == 0 &&
    canBattle(myCharacterIndex, otherCharacterIndex)) {

    //存在嘲讽的生物
    //如果嘲讽生物在第一排
    let oneTauntArray = onebattlevacancy.some((element) => {
      memoryData[roomNumber][other]['vacancy'][element] != element && memoryData[roomNumber][other]['vacancy'][element].isTaunt
    })
    //如果嘲讽生物在第二排
    let twoTauntArray = twobattlevacancy.some((element) => {
      memoryData[roomNumber][other]['vacancy'][element] != element && memoryData[roomNumber][other]['vacancy'][element].isTaunt
    })
    //如果嘲讽生物在第三排
    let threeTauntArray = threebattlevacancy.some((element) => {
      memoryData[roomNumber][other]['vacancy'][element] != element && memoryData[roomNumber][other]['vacancy'][element].isTaunt
    })
    //第一排有嘲讽生物且攻击的不是嘲讽生物
    if (oneTauntArray.length > 0) {
      if (oneTauntArray.indexOf(otherCharacterIndex) < 0) {
        memoryData[roomNumber][who].socket.emit("SEND_TIP", {
          tip: "不能攻击非嘲讽生物",
        })
        return;
      }
    }else{
      //第一排没有嘲讽生物，第二排有嘲讽生物且攻击的不是第二排和第三排的嘲讽生物
      if (twoTauntArray.length > 0) {
        if (onebattlevacancy.indexOf(otherCharacterIndex) < 0) {
          if(twoTauntArray.indexOf(otherCharacterIndex) < 0){
            memoryData[roomNumber][who].socket.emit("SEND_TIP", {
              tip: "不能攻击第二排，第三排的非嘲讽生物",
            })
            return;
          }
        }
      }else{
        //第一第二排没有嘲讽生物，第三排有嘲讽生物且攻击的不是第三排的嘲讽生物
        if (threeTauntArray.length > 0) {
          if (threebattlevacancy.indexOf(otherCharacterIndex) >= 0 && threeTauntArray.indexOf(otherCharacterIndex) < 0) {
            memoryData[roomNumber][who].socket.emit("SEND_TIP", {
              tip: "不能攻击第三排的非嘲讽生物",
            })
            return;
          } 
        }
      }
    }

    memoryData[roomNumber][other]['vacancy'][otherCharacterIndex]['life'] -= memoryData[roomNumber][who]['vacancy'][myCharacterIndex]['attack'];
    memoryData[roomNumber][who]['vacancy'][myCharacterIndex]['life'] -= memoryData[roomNumber][other]['vacancy'][otherCharacterIndex]['attack'];
    memoryData[roomNumber][who]['vacancy'][myCharacterIndex].isAttack = 1;

    if(memoryData[roomNumber][who]['vacancy'][myCharacterIndex].onAttack){
      memoryData[roomNumber][who]['vacancy'][myCharacterIndex].onAttack({
        myGameData: memoryData[roomNumber][who],
        otherGameData: memoryData[roomNumber][other],
        myCard: memoryData[roomNumber][who]['vacancy'][myCharacterIndex],
        otherCard: memoryData[roomNumber][other]['vacancy'][otherCharacterIndex],
      })
    }

    if(memoryData[roomNumber][other]['vacancy'][otherCharacterIndex].onBeAttack){
      memoryData[roomNumber][other]['vacancy'][otherCharacterIndex].onBeAttack({
        myGameData: memoryData[roomNumber][other],
        otherGameData: memoryData[roomNumber][who],
        myCard: memoryData[roomNumber][other]['vacancy'][otherCharacterIndex],
        otherCard: memoryData[roomNumber][who]['vacancy'][myCharacterIndex],
      })
    }

    for(let i = memoryData[roomNumber][who]['vacancy'].length - 1; i >= 0; i--){
      let card = memoryData[roomNumber][who]['vacancy'][i];
      if(card.life <= 0){
        if(card.onEnd){
          card.onEnd({
            myGameData: memoryData[roomNumber][who],
            otherGameData: memoryData[roomNumber][other],
            myCard: card,
          })
        }

        memoryData[roomNumber][who]['vacancy'][i] = i;
      }
    }

    for(let i = memoryData[roomNumber][other]['vacancy'].length - 1; i >= 0; i--){
      let card = memoryData[roomNumber][other]['vacancy'][i];
      if(card.life <= 0){
        if(card.onEnd){
          card.onEnd({
            myGameData: memoryData[roomNumber][other],
            otherGameData: memoryData[roomNumber][who],
            myCard: card,
          })
        }

        memoryData[roomNumber][other]['vacancy'][i] = i;
      }
    }

    // let oterHurt = memoryData[roomNumber][other]['vacancy'][otherCharacterIndex]['life'] - memoryData[roomNumber][who]['vacancy'][myCharacterIndex]['attack'];
    // let myHurt = memoryData[roomNumber][who]['vacancy'][myCharacterIndex]['life'] - memoryData[roomNumber][other]['vacancy'][otherCharacterIndex]['attack'];
    // memoryData[roomNumber][other]['vacancy'][otherCharacterIndex]['life'] = oterHurt;
    // memoryData[roomNumber][who]['vacancy'][myCharacterIndex]['life'] = myHurt;

    // if (oterHurt > 0 && myHurt <= 0) {//对方生物有血，己方生物没血
    //   overType = OverBattleType.OTHER
    //   overOtherType = OverBattleType.MY
    //   memoryData[roomNumber][who]['vacancy'][myCharacterIndex] = myCharacterIndex;
    // }
    // else if (oterHurt > 0 && myHurt > 0) {//对方生物有血，己方生物有血
    //   overType = OverBattleType.DRAW
    //   overOtherType = OverBattleType.DRAW
    // }
    // else if (oterHurt <= 0 && myHurt > 0) {//对方生物没血，己方生物有血
    //   overType = OverBattleType.MY
    //   overOtherType = OverBattleType.OTHER
    //   memoryData[roomNumber][other]['vacancy'][otherCharacterIndex] = otherCharacterIndex;
    // }
    // else if (oterHurt <= 0 && myHurt <= 0) {//对方生物没血，己方生物没血
    //   overType = OverBattleType.PERISH_TOGETHER
    //   overOtherType = OverBattleType.PERISH_TOGETHER
    //   memoryData[roomNumber][who]['vacancy'][myCharacterIndex] = myCharacterIndex;
    //   memoryData[roomNumber][other]['vacancy'][otherCharacterIndex] = otherCharacterIndex;
    // }
    console.log('endbattlehp:', memoryData[roomNumber][other]['vacancy'][otherCharacterIndex], memoryData[roomNumber][who]['vacancy'][myCharacterIndex])
    memoryData[roomNumber][who].socket.emit("BATTLE", {
      myCharacterIndex: myCharacterIndex,
      otherCharacterIndex: otherCharacterIndex,
      overBattleType: overType,
      myBattleVacancy: memoryData[roomNumber][who]['vacancy'][myCharacterIndex],
      otherBattleVacancy: memoryData[roomNumber][other]['vacancy'][otherCharacterIndex]
    })
    memoryData[roomNumber][other].socket.emit("BATTLE", {
      myCharacterIndex: otherCharacterIndex,
      otherCharacterIndex: myCharacterIndex,
      overBattleType: overOtherType,
      myBattleVacancy: memoryData[roomNumber][other]['vacancy'][otherCharacterIndex],
      otherBattleVacancy: memoryData[roomNumber][who]['vacancy'][myCharacterIndex]
    })
  } else {
    console.log('出错--')
    if (memoryData[roomNumber][who]['vacancy'][myCharacterIndex] == myCharacterIndex ||
      memoryData[roomNumber][other]['vacancy'][otherCharacterIndex] == otherCharacterIndex) {
      memoryData[roomNumber][who].socket.emit("SEND_TIP", {
        tip: "出错，没有选择角色",
      })
    }
    else if (memoryData[roomNumber][who]['vacancy'][myCharacterIndex].status == CardStatus.TERROR) {
      memoryData[roomNumber][who].socket.emit("SEND_TIP", {
        tip: "恐惧状态无法移动",
      })
    }
    else if (memoryData[roomNumber][who]['vacancy'][myCharacterIndex].isMove == 1) {
      memoryData[roomNumber][who].socket.emit("SEND_TIP", {
        tip: "已移动无法发动攻击宣言",
      })
    }
    else if (memoryData[roomNumber][who]['vacancy'][myCharacterIndex].isAttack == 1) {
      memoryData[roomNumber][who].socket.emit("SEND_TIP", {
        tip: "已经发动过攻击宣言了",
      })
    }
  }
}

/* 放置'地'
 * selectIndex 选择的'地';
 * placeIndex 放置在场上哪个位置
 */
var placeGround = function (roomNumber, who, selectIndex, placeIndex) {
  let other = who == 'one' ? 'two' : 'one';
  if (memoryData[roomNumber][who]['ground'][placeIndex] != selectIndex) {
    memoryData[roomNumber][who]['ground'][placeIndex] = selectIndex;
    //发送我方信息
    sendMyDetails(roomNumber, who, false, {}, true)
    //发送对方信息
    sendOtherDetails(roomNumber, other, false, {}, true)
  } else {
    memoryData[roomNumber][who].socket.emit("SEND_TIP", {
      tip: "同样的地，无需更换",
    })
  }
}



