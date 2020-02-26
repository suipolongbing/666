/*
* name;
*/
//材料类型
var BuildType;
(function (BuildType) {
    BuildType[BuildType["duanzaoshi"] = 1] = "duanzaoshi";
    BuildType[BuildType["cuimu"] = 2] = "cuimu";
    BuildType[BuildType["qishi"] = 3] = "qishi";
    BuildType[BuildType["mixian"] = 4] = "mixian";
    BuildType[BuildType["yugang"] = 5] = "yugang";
    BuildType[BuildType["wugang"] = 6] = "wugang"; //乌钢
})(BuildType || (BuildType = {}));
var Xconfig = /** @class */ (function () {
    function Xconfig() {
    }
    Xconfig.GetMetName = function (mType) {
        var typeStr;
        switch (mType) {
            case BuildType.duanzaoshi:
                typeStr = "锻造石";
                break;
            case BuildType.cuimu:
                typeStr = "翠木";
                break;
            case BuildType.qishi:
                typeStr = "漆石";
                break;
            case BuildType.mixian:
                typeStr = "秘弦";
                break;
            case BuildType.yugang:
                typeStr = "玉钢";
                break;
            case BuildType.wugang:
                typeStr = "乌钢";
                break;
        }
        return typeStr;
    };
    Xconfig.GetMetPrice = function (mType) {
        var typeStr;
        switch (mType) {
            case BuildType.duanzaoshi:
                typeStr = "1";
                break;
            case BuildType.cuimu:
                typeStr = "2";
                break;
            case BuildType.qishi:
                typeStr = "2";
                break;
            case BuildType.mixian:
                typeStr = "2";
                break;
            case BuildType.yugang:
                typeStr = "3";
                break;
            case BuildType.wugang:
                typeStr = "3";
                break;
        }
        return typeStr;
    };
    Xconfig.GetRandomBuild = function (count) {
        for (var i = 0; i < count; i++) {
            for (var j = 0; j < Xconfig.villageData[i].villageBuildCount; j++) {
                var brm = GameMain.app.getRandom(0, Xconfig.WeaponMaxType.length - 1);
                Xconfig.villageData[i].villageBuild.push(brm);
            }
        }
    };
    Xconfig.StartBuildDeckNum = 2;
    Xconfig.BuildMaxType = 6;
    Xconfig.zeroCardName = "img_zero.png";
    Xconfig.threeCardSpacing = 20;
    Xconfig.Ij = { name: '铁剑', id: 1, price: '2', material: [BuildType.duanzaoshi] };
    Xconfig.Iq = { name: '铁枪', id: 2, price: '4', material: [BuildType.duanzaoshi, BuildType.cuimu] };
    Xconfig.Ig = { name: '铁弓', id: 3, price: '8', material: [BuildType.qishi, BuildType.mixian] };
    Xconfig.If = { name: '铁斧', id: 4, price: '4', material: [BuildType.duanzaoshi, BuildType.duanzaoshi] };
    Xconfig.Sj = { name: '钢剑', id: 5, price: '9', material: [BuildType.duanzaoshi, BuildType.duanzaoshi, BuildType.yugang] };
    Xconfig.Sq = { name: '钢枪', id: 6, price: '10', material: [BuildType.duanzaoshi, BuildType.yugang, BuildType.cuimu] };
    Xconfig.Sg = { name: '钢弓', id: 7, price: '16', material: [BuildType.qishi, BuildType.yugang, BuildType.duanzaoshi, BuildType.mixian] };
    Xconfig.Sf = { name: '钢斧', id: 8, price: '14', material: [BuildType.yugang, BuildType.yugang, BuildType.wugang] };
    Xconfig.Cq = { name: '投枪', id: 9, price: '20', material: [BuildType.duanzaoshi, BuildType.wugang, BuildType.yugang, BuildType.cuimu] };
    Xconfig.Cf = { name: '投斧', id: 10, price: '25', material: [BuildType.yugang, BuildType.yugang, BuildType.wugang, BuildType.wugang, BuildType.qishi] };
    Xconfig.WeaponMaxType = [Xconfig.Ij, Xconfig.Iq, Xconfig.Ig, Xconfig.If, Xconfig.Sj, Xconfig.Sq, Xconfig.Sg, Xconfig.Sf, Xconfig.Cq, Xconfig.Cf];
    Xconfig.HeroCoin = 20;
    Xconfig.BaseCostCoin = 1;
    Xconfig.FanPaiCount = 1;
    Xconfig.villageNum = 6;
    Xconfig.villageData = [
        { villageName: '村1', villageId: 1, villageBuildCount: 4, villageBuild: [], villageCard: [] },
        { villageName: '村2', villageId: 2, villageBuildCount: 4, villageBuild: [], villageCard: [] },
        { villageName: '村3', villageId: 3, villageBuildCount: 4, villageBuild: [], villageCard: [] },
        { villageName: '村4', villageId: 4, villageBuildCount: 4, villageBuild: [], villageCard: [] },
        { villageName: '村5', villageId: 5, villageBuildCount: 4, villageBuild: [], villageCard: [] },
        { villageName: '村6', villageId: 6, villageBuildCount: 4, villageBuild: [], villageCard: [] },
    ];
    Xconfig.LastVillageId = 1;
    Xconfig.FaPaiBaseCostList = [
        { id: 1, baseCoin: 1, fapaiCount: 0 },
        { id: 2, baseCoin: 1, fapaiCount: 0 },
        { id: 3, baseCoin: 1, fapaiCount: 0 },
        { id: 4, baseCoin: 1, fapaiCount: 0 },
        { id: 5, baseCoin: 1, fapaiCount: 0 },
        { id: 6, baseCoin: 1, fapaiCount: 0 },
    ];
    Xconfig.Id = 0;
    return Xconfig;
}());
//# sourceMappingURL=Xconfig.js.map