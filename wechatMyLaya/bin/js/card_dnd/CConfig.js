/*
* name;
*/
var CConfig = /** @class */ (function () {
    function CConfig() {
    }
    CConfig.GetT1Desc = function (mType, no) {
        var typeStr;
        switch (mType) {
            case CType.Enemy:
                typeStr = CConfig.EnemyIllustration(no, 0);
                break;
            case CType.Weapon:
                typeStr = CConfig.WeaponIllustration(no, 0);
                break;
            case CType.Shiled:
                typeStr = CConfig.ShieldIllustration(no, 0);
                break;
            case CType.Player:
                break;
            case CType.Treasure:
                break;
            case CType.Cure:
                typeStr = CConfig.CrueIllustration(no, 0);
                break;
        }
        return typeStr;
    };
    CConfig.GetT2Name = function (mType, no) {
        var typeStr;
        switch (mType) {
            case CType.Enemy:
                typeStr = CConfig.EnemyIllustration(no, 1);
                break;
            case CType.Weapon:
                typeStr = CConfig.WeaponIllustration(no, 1);
                break;
            case CType.Shiled:
                typeStr = CConfig.ShieldIllustration(no, 1);
                break;
            case CType.Player:
                break;
            case CType.Treasure:
                break;
            case CType.Cure:
                typeStr = CConfig.CrueIllustration(no, 1);
                break;
        }
        console.log('ttt:', mType, no, typeStr);
        return typeStr;
    };
    CConfig.GetT3Hp = function (mType, no) {
        var typeStr;
        switch (mType) {
            case CType.Enemy:
                typeStr = CConfig.EnemyIllustration(no, 2);
                break;
            case CType.Weapon:
                typeStr = CConfig.WeaponIllustration(no, 2);
                break;
            case CType.Shiled:
                typeStr = CConfig.ShieldIllustration(no, 2);
                break;
            case CType.Player:
                break;
            case CType.Treasure:
                break;
            case CType.Cure:
                typeStr = CConfig.CrueIllustration(no, 2);
                break;
        }
        return typeStr;
    };
    CConfig.EnemyIllustration = function (vNo, type) {
        var rname;
        var rhp;
        var rdesc;
        switch (vNo) {
            case CEnemyNo.LanYuYa:
                rdesc = "";
                rname = "孤高——蓝羽鸦";
                rhp = 5;
                break;
            case CEnemyNo.DuDuYa:
                rdesc = "";
                rname = "漆黑——渡渡鸦";
                rhp = 7;
                break;
            case CEnemyNo.GangHuoYa:
                rdesc = "";
                rname = "猩红——钢火鸦";
                rhp = 6;
                break;
            case CEnemyNo.LongLongXia:
                rdesc = "";
                rname = "深海——隆隆虾";
                rhp = 2;
                break;
            case CEnemyNo.DengShuiMu:
                rdesc = "";
                rname = "深海——灯水母";
                rhp = 4;
                break;
            case CEnemyNo.JuChiSha:
                rdesc = "";
                rname = "深海——巨齿鲨";
                rhp = 9;
                break;
            case CEnemyNo.TieWeiXie:
                rdesc = "";
                rname = "红岩——铁尾蝎";
                rhp = 8;
                break;
            case CEnemyNo.ChiHuoYi:
                rdesc = "";
                rname = "幼小——赤火蚁";
                rhp = 1;
                break;
            case CEnemyNo.WangDaQian:
                rdesc = "";
                rname = "沼泽——王大钳";
                rhp = 3;
                break;
        }
        if (type == 0) {
            return rdesc;
        }
        else if (type == 1) {
            return rname;
        }
        else {
            return rhp;
        }
    };
    CConfig.WeaponIllustration = function (vNo, type) {
        var rname;
        var rhp;
        var rdesc;
        switch (vNo) {
            case CWeaponNo.JuDaJian:
                rdesc = "";
                rname = "骑士——巨大剑";
                rhp = 8;
                break;
            case CWeaponNo.SuoYingCi:
                rdesc = "";
                rname = "虚空——梭影刺";
                rhp = 6;
                break;
            case CWeaponNo.QiGongJu:
                rdesc = "";
                rname = "盗贼——七工具";
                rhp = 5;
                break;
            case CWeaponNo.ChangGangQiang:
                rdesc = "";
                rname = "守卫——长杆枪";
                rhp = 4;
                break;
            case CWeaponNo.PoChengNu:
                rdesc = "";
                rname = "王家——破城弩";
                rhp = 7;
                break;
            case CWeaponNo.FengRenQiang:
                rdesc = "";
                rname = "十杰——风刃枪";
                rhp = 9;
                break;
        }
        if (type == 0) {
            return rdesc;
        }
        else if (type == 1) {
            return rname;
        }
        else {
            return rhp;
        }
    };
    CConfig.ShieldIllustration = function (vNo, type) {
        var rname;
        var rhp;
        var rdesc;
        switch (vNo) {
            case CShiledNo.XiaoPiDun:
                rdesc = "";
                rname = "守卫——小皮盾";
                rhp = 3;
                break;
            case CShiledNo.GangWenDun:
                rdesc = "";
                rname = "雷霆——钢纹盾";
                rhp = 4;
                break;
            case CShiledNo.QiShiDun:
                rdesc = "";
                rname = "王家——骑士盾";
                rhp = 5;
                break;
            case CShiledNo.ChiReDun:
                rdesc = "";
                rname = "烈阳——炽热盾";
                rhp = 6;
                break;
            case CShiledNo.JuDaDun:
                rdesc = "";
                rname = "食王——巨大盾";
                rhp = 7;
                break;
        }
        if (type == 0) {
            return rdesc;
        }
        else if (type == 1) {
            return rname;
        }
        else {
            return rhp;
        }
    };
    CConfig.CrueIllustration = function (vNo, type) {
        var rname;
        var rhp;
        var rdesc;
        switch (vNo) {
            case CCureNo.HongLeiDi:
                rdesc = "";
                rname = "精灵——红泪滴";
                rhp = 8;
                break;
            case CCureNo.HongYaoShui:
                rdesc = "";
                rname = "草塔——红药水";
                rhp = 4;
                break;
            case CCureNo.HuiShengFu:
                rdesc = "";
                rname = "无名——回生符";
                rhp = 12;
                break;
        }
        if (type == 0) {
            return rdesc;
        }
        else if (type == 1) {
            return rname;
        }
        else {
            return rhp;
        }
    };
    CConfig.StartBuildDeckNum = 54;
    CConfig.enemyCount = 9;
    CConfig.weaponCount = 6;
    CConfig.shiledCount = 5;
    CConfig.cureCount = 3;
    return CConfig;
}());
var CType;
(function (CType) {
    CType[CType["Enemy"] = 1] = "Enemy";
    CType[CType["Weapon"] = 2] = "Weapon";
    CType[CType["Shiled"] = 3] = "Shiled";
    CType[CType["Player"] = 4] = "Player";
    CType[CType["Skill"] = 5] = "Skill";
    CType[CType["Treasure"] = 6] = "Treasure";
    CType[CType["Cure"] = 7] = "Cure"; //药剂
})(CType || (CType = {}));
var CEnemyNo;
(function (CEnemyNo) {
    CEnemyNo[CEnemyNo["LanYuYa"] = 1] = "LanYuYa";
    CEnemyNo[CEnemyNo["DuDuYa"] = 2] = "DuDuYa";
    CEnemyNo[CEnemyNo["GangHuoYa"] = 3] = "GangHuoYa";
    CEnemyNo[CEnemyNo["LongLongXia"] = 4] = "LongLongXia";
    CEnemyNo[CEnemyNo["DengShuiMu"] = 5] = "DengShuiMu";
    CEnemyNo[CEnemyNo["JuChiSha"] = 6] = "JuChiSha";
    CEnemyNo[CEnemyNo["TieWeiXie"] = 7] = "TieWeiXie";
    CEnemyNo[CEnemyNo["ChiHuoYi"] = 8] = "ChiHuoYi";
    CEnemyNo[CEnemyNo["WangDaQian"] = 9] = "WangDaQian"; //沼泽-王大钳
})(CEnemyNo || (CEnemyNo = {}));
var CWeaponNo;
(function (CWeaponNo) {
    CWeaponNo[CWeaponNo["JuDaJian"] = 1] = "JuDaJian";
    CWeaponNo[CWeaponNo["SuoYingCi"] = 2] = "SuoYingCi";
    CWeaponNo[CWeaponNo["QiGongJu"] = 3] = "QiGongJu";
    CWeaponNo[CWeaponNo["ChangGangQiang"] = 4] = "ChangGangQiang";
    CWeaponNo[CWeaponNo["PoChengNu"] = 5] = "PoChengNu";
    CWeaponNo[CWeaponNo["FengRenQiang"] = 6] = "FengRenQiang";
})(CWeaponNo || (CWeaponNo = {}));
var CShiledNo;
(function (CShiledNo) {
    CShiledNo[CShiledNo["XiaoPiDun"] = 1] = "XiaoPiDun";
    CShiledNo[CShiledNo["GangWenDun"] = 2] = "GangWenDun";
    CShiledNo[CShiledNo["QiShiDun"] = 3] = "QiShiDun";
    CShiledNo[CShiledNo["ChiReDun"] = 4] = "ChiReDun";
    CShiledNo[CShiledNo["JuDaDun"] = 5] = "JuDaDun";
})(CShiledNo || (CShiledNo = {}));
var CCureNo;
(function (CCureNo) {
    CCureNo[CCureNo["HongLeiDi"] = 1] = "HongLeiDi";
    CCureNo[CCureNo["HongYaoShui"] = 2] = "HongYaoShui";
    CCureNo[CCureNo["HuiShengFu"] = 3] = "HuiShengFu";
})(CCureNo || (CCureNo = {}));
//# sourceMappingURL=CConfig.js.map