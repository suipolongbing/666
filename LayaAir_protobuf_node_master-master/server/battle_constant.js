//战斗结束之后的类型
const OverBattleType = {
    MY: 1, //我赢了
    OTHER: 2, //你赢了
    DRAW: 3, //平局
    PERISH_TOGETHER: 4 //同归于尽
}
const onebattlevacancy = [6, 7, 8];
var twobattlevacancy = [5, 2, 3, 9];
var threebattlevacancy = [1, 0, 4];
function canBattle(myIndex, otherIndex){
    if(onebattlevacancy.indexOf(myIndex) >= 0 && (onebattlevacancy.indexOf(otherIndex) >= 0 || twobattlevacancy.indexOf(otherIndex) >= 0)){
        return true;
    }
    if(threebattlevacancy.indexOf(myIndex) >= 0 && (threebattlevacancy.indexOf(otherIndex) >= 0 || twobattlevacancy.indexOf(otherIndex) >= 0)){
        return true;
    }
    if(twobattlevacancy.indexOf(myIndex) >= 0){
        return true;
    }
    return false;
}
module.exports = {
    OverBattleType,
    canBattle,
    onebattlevacancy,
    twobattlevacancy,
    threebattlevacancy
}