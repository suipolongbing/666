/*
* name;
*/
class PlayerCard extends ui.PlayerCardUI {
    constructor() {
        super();
        this.playerType = CType.Player;
    }

    public static mSelf;
    public playerType;
    public curAtk = 0;
    public curHp = 0;
    public shieldcount = 0;

    public static create(view): PlayerCard {
        if (PlayerCard.mSelf == null) {
            PlayerCard.mSelf = new PlayerCard();
        }
        view.addChild(PlayerCard.mSelf);
        PlayerCard.mSelf.init();
        return PlayerCard.mSelf;
    }

    init() {
        this.playeratk.text = CPlayerConfig.initialAtk + '';
        this.playerhp.text = CPlayerConfig.initialHp + '';
        this.curAtk = CPlayerConfig.initialAtk;
        this.curHp = CPlayerConfig.initialHp;
        this.showShiled(false);
    }

    costHp(value) {
        if (this.shieldcount > 0 && value < 0) {
            if (this.shieldcount + value >= 0) {
                this.shieldcount += value;
            } else {
                value += this.shieldcount;
                this.shieldcount = 0;
                this.showShiled(false);
            }
        }
        this.curHp += value;
        if(this.curHp >= CPlayerConfig.initialHp){
            this.curHp = CPlayerConfig.initialHp
        }
        this.playerhp.text = this.curHp + '';
        this.judgeDead();
    }

    liftAtk(value) {
        this.curAtk += value;
        this.playeratk.text = this.curAtk + '';
    }

    resumeAtk() {
        this.curAtk = CPlayerConfig.initialAtk;
        this.playeratk.text = this.curAtk + '';
    }

    showShiled(bool, count = 0) {
        this.shiled.visible = bool;
        this.shieldCount.visible = bool;
        if (bool) {
            this.shieldRotate();
            this.shieldcount += count;
            this.shieldCount.text = this.shieldcount + '';
        } else {
            Laya.Tween.clearAll(this.shiled);
        }
    }

    costShield(value) {
        this.shieldcount += value;
        this.shieldCount.text = this.shieldcount + '';
        if (this.shieldcount <= 0) {
            this.shieldcount = 0;
            this.showShiled(false);
        }
    }

    //护盾的旋转
    private shieldRotate(rot: number = 0): void {
        this.shiled.rotation = rot;
        Laya.Tween.to(this.shiled,
            {
                rotation: -360 + rot
            }, 5000, null, Laya.Handler.create(this, function (rot) {
                this.shieldRotate(rot);
            }, [rot]));
    }

    judgeDead() {
        if (this.curHp <= 0) {
            //游戏失败
        }
    }
}