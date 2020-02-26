/*
* name;
*/
var CData = /** @class */ (function () {
    function CData(vType, vNo) {
        this.mBleedRound = 0; //流血回合
        this.mPoisoningRound = 0; //中毒回合
        this.mPoisoningIndicator = 0; //中毒指示器
        this.mBurnRound = 0; //灼烧回合
        this.mTeleportRound = 0; //折越回合
        this.mType = vType;
        this.mNo = vNo;
    }
    CData.prototype.SetData = function (data) {
        this.mType = data.mType;
        this.mType = data.mNo;
    };
    CData.prototype.SetAtk = function (value) {
        this.mAtk = value;
    };
    CData.prototype.SetHp = function (value) {
        this.mHp = value;
    };
    CData.prototype.SetShield = function (value) {
        this.mShield = value;
    };
    CData.Getkey = function (type) {
        return type * 1000;
    };
    CData.prototype.Getkey = function () {
        return this.mType * 1000;
    };
    CData.prototype.Clone = function () {
        return new CData(this.mType, this.mNo);
    };
    CData.prototype.IsEnemy = function () {
        return this.mType == CType.Enemy;
    };
    CData.prototype.IsWeapon = function () {
        return this.mType == CType.Weapon;
    };
    CData.prototype.IsShiled = function () {
        return this.mType == CType.Shiled;
    };
    CData.prototype.IsPlayer = function () {
        return this.mType == CType.Player;
    };
    CData.prototype.IsSkill = function () {
        return this.mType == CType.Skill;
    };
    CData.prototype.IsTreasure = function () {
        return this.mType == CType.Treasure;
    };
    CData.prototype.IsCure = function () {
        return this.mType == CType.Cure;
    };
    return CData;
}());
//# sourceMappingURL=CData.js.map