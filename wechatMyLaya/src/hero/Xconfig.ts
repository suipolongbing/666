/*
* name;
*/
//材料类型
enum BuildType {
    duanzaoshi = 1, //锻造石
    cuimu = 2,//翠木
    qishi = 3,//漆石
    mixian = 4, //秘弦
    yugang = 5,//玉钢
    wugang = 6//乌钢
}
class Xconfig {
    static StartBuildDeckNum = 2;
    static BuildMaxType = 6;
    static zeroCardName = "img_zero.png";
    static threeCardSpacing = 20;

    static Ij = { name: '铁剑', id: 1, price: '2', material: [BuildType.duanzaoshi] }
    static Iq = { name: '铁枪', id: 2, price: '4', material: [BuildType.duanzaoshi, BuildType.cuimu] }
    static Ig = { name: '铁弓', id: 3, price: '8', material: [BuildType.qishi, BuildType.mixian] }
    static If = { name: '铁斧', id: 4, price: '4', material: [BuildType.duanzaoshi, BuildType.duanzaoshi] }
    static Sj = { name: '钢剑', id: 5, price: '9', material: [BuildType.duanzaoshi, BuildType.duanzaoshi, BuildType.yugang] }
    static Sq = { name: '钢枪', id: 6, price: '10', material: [BuildType.duanzaoshi, BuildType.yugang, BuildType.cuimu] }
    static Sg = { name: '钢弓', id: 7, price: '16', material: [BuildType.qishi, BuildType.yugang, BuildType.duanzaoshi, BuildType.mixian] }
    static Sf = { name: '钢斧', id: 8, price: '14', material: [BuildType.yugang, BuildType.yugang, BuildType.wugang] }
    static Cq = { name: '投枪', id: 9, price: '20', material: [BuildType.duanzaoshi, BuildType.wugang, BuildType.yugang, BuildType.cuimu] }
    static Cf = { name: '投斧', id: 10, price: '25', material: [BuildType.yugang, BuildType.yugang, BuildType.wugang, BuildType.wugang, BuildType.qishi] }
    static WeaponMaxType = [Xconfig.Ij, Xconfig.Iq, Xconfig.Ig, Xconfig.If, Xconfig.Sj, Xconfig.Sq, Xconfig.Sg, Xconfig.Sf, Xconfig.Cq, Xconfig.Cf];

    static HeroCoin: number = 20;
    static BaseCostCoin: number = 1;
    static FanPaiCount: number = 1;

    static villageNum = 6;
    static villageData = [
        { villageName: '村1', villageId: 1, villageBuildCount: 4, villageBuild: [], villageCard: [] },
        { villageName: '村2', villageId: 2, villageBuildCount: 4, villageBuild: [], villageCard: [] },
        { villageName: '村3', villageId: 3, villageBuildCount: 4, villageBuild: [], villageCard: [] },
        { villageName: '村4', villageId: 4, villageBuildCount: 4, villageBuild: [], villageCard: [] },
        { villageName: '村5', villageId: 5, villageBuildCount: 4, villageBuild: [], villageCard: [] },
        { villageName: '村6', villageId: 6, villageBuildCount: 4, villageBuild: [], villageCard: [] },
    ];

    static LastVillageId = 1;
    static FaPaiBaseCostList = [
        { id: 1, baseCoin: 1, fapaiCount: 0 },
        { id: 2, baseCoin: 1, fapaiCount: 0 },
        { id: 3, baseCoin: 1, fapaiCount: 0 },
        { id: 4, baseCoin: 1, fapaiCount: 0 },
        { id: 5, baseCoin: 1, fapaiCount: 0 },
        { id: 6, baseCoin: 1, fapaiCount: 0 },
    ];

    static Id = 0;

    static GetMetName(mType): string {
        let typeStr;
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
    }

    static GetMetPrice(mType): string {
        let typeStr;
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
    }

    static GetRandomBuild(count) {
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < Xconfig.villageData[i].villageBuildCount; j++) {
                let brm = GameMain.app.getRandom(0, Xconfig.WeaponMaxType.length - 1);
                Xconfig.villageData[i].villageBuild.push(brm);
            }
        }
    }
}