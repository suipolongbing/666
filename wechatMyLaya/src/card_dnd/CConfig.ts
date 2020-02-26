/*
* name;
*/
class CConfig {

    static StartBuildDeckNum = 54;
    static enemyCount = 9;
    static weaponCount = 6;
    static shiledCount = 5;
    static cureCount = 3;

    static GetT1Desc(mType, no): string {
        let typeStr;
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
    }

    static GetT2Name(mType, no): string {
        let typeStr;
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
    }

    static GetT3Hp(mType, no): string {
        let typeStr;
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
    }

    static EnemyIllustration(vNo: number, type: number) {
        let rname;
        let rhp;
        let rdesc;
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
        } else if (type == 1) {
            return rname;
        } else {
            return rhp;
        }
    }


    static WeaponIllustration(vNo: number, type: number) {
        let rname;
        let rhp;
        let rdesc;
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
        } else if (type == 1) {
            return rname;
        } else {
            return rhp;
        }
    }

    static ShieldIllustration(vNo: number, type: number) {
        let rname;
        let rhp;
        let rdesc;
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
        } else if (type == 1) {
            return rname;
        } else {
            return rhp;
        }
    }

    static CrueIllustration(vNo: number, type: number) {
        let rname;
        let rhp;
        let rdesc;
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
        } else if (type == 1) {
            return rname;
        } else {
            return rhp;
        }
    }
}
enum CType {
    Enemy = 1, //敌人
    Weapon = 2, //武器
    Shiled = 3, //盾牌
    Player = 4, //玩家
    Skill = 5, //技能
    Treasure = 6, //宝物
    Cure = 7 //药剂
}
enum CEnemyNo {
    LanYuYa = 1, //孤高-蓝羽鸦
    DuDuYa = 2, //漆黑-渡渡鸦
    GangHuoYa = 3, //猩红-钢火鸦
    LongLongXia = 4, //深海-隆隆虾
    DengShuiMu = 5, //深海-灯水母
    JuChiSha = 6, //深海-巨齿鲨
    TieWeiXie = 7, //红岩-铁尾蝎
    ChiHuoYi = 8, //幼小-赤火蚁
    WangDaQian = 9//沼泽-王大钳
}
enum CWeaponNo {
    JuDaJian = 1, //骑士-巨大剑
    SuoYingCi = 2, //虚空-梭影刺
    QiGongJu = 3, //盗贼-七工具
    ChangGangQiang = 4, //守卫-长杆枪
    PoChengNu = 5, //王家-破城弩
    FengRenQiang = 6, //十杰-风刃枪
}
enum CShiledNo {
    XiaoPiDun = 1, //守卫-小皮盾
    GangWenDun = 2, //雷霆-钢纹盾
    QiShiDun = 3, //王家-骑士盾
    ChiReDun = 4, //烈阳-炽热盾
    JuDaDun = 5, //食王-巨大盾
}
enum CCureNo {
    HongLeiDi = 1, //精灵-红泪滴
    HongYaoShui = 2, //草塔-红药水
    HuiShengFu = 3, //无名-回生符
}
