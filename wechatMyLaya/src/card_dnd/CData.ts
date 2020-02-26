/*
* name;
*/
class CData {

    public IsCardBack: boolean;//是否为卡背面

    public mType: CType;
    public mNo: number;
    public mHp: number;
    public mCompleteHp: number;
    public mAtk: number;
    public mShield: number;
    public mBleedRound = 0; //流血回合
    public mPoisoningRound = 0; //中毒回合
    public mPoisoningIndicator = 0; //中毒指示器
    public mBurnRound = 0; //灼烧回合
    public mTeleportRound = 0; //折越回合

    constructor(vType: CType, vNo: number) {
        this.mType = vType;
        this.mNo = vNo;

    }
    public SetData(data: CData) {
        this.mType = data.mType;
        this.mType = data.mNo;
    }

    public SetAtk(value) {
        this.mAtk = value;
    }

    public SetHp(value) {
        this.mHp = value;
    }

    public SetShield(value) {
        this.mShield = value;
    }

    public

    public static Getkey(type: CType): number//获得唯一key
    {
        return type * 1000;
    }

    public Getkey(): number//获得唯一key
    {
        return this.mType * 1000;
    }
    public Clone(): CData {
        return new CData(this.mType, this.mNo);
    }

    public IsEnemy(): boolean {
        return this.mType == CType.Enemy;
    }
    public IsWeapon(): boolean {
        return this.mType == CType.Weapon;
    }
    public IsShiled(): boolean {
        return this.mType == CType.Shiled;
    }
    public IsPlayer(): boolean {
        return this.mType == CType.Player;
    }
    public IsSkill(): boolean {
        return this.mType == CType.Skill;
    }
    public IsTreasure(): boolean {
        return this.mType == CType.Treasure;
    }
    public IsCure(): boolean {
        return this.mType == CType.Cure;
    }
}