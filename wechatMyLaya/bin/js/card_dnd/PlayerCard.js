var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var PlayerCard = /** @class */ (function (_super) {
    __extends(PlayerCard, _super);
    function PlayerCard() {
        var _this = _super.call(this) || this;
        _this.curAtk = 0;
        _this.curHp = 0;
        _this.shieldcount = 0;
        _this.playerType = CType.Player;
        return _this;
    }
    PlayerCard.create = function (view) {
        if (PlayerCard.mSelf == null) {
            PlayerCard.mSelf = new PlayerCard();
        }
        view.addChild(PlayerCard.mSelf);
        PlayerCard.mSelf.init();
        return PlayerCard.mSelf;
    };
    PlayerCard.prototype.init = function () {
        this.playeratk.text = CPlayerConfig.initialAtk + '';
        this.playerhp.text = CPlayerConfig.initialHp + '';
        this.curAtk = CPlayerConfig.initialAtk;
        this.curHp = CPlayerConfig.initialHp;
        this.showShiled(false);
    };
    PlayerCard.prototype.costHp = function (value) {
        if (this.shieldcount > 0 && value < 0) {
            if (this.shieldcount + value >= 0) {
                this.shieldcount += value;
            }
            else {
                value += this.shieldcount;
                this.shieldcount = 0;
                this.showShiled(false);
            }
        }
        this.curHp += value;
        if (this.curHp >= CPlayerConfig.initialHp) {
            this.curHp = CPlayerConfig.initialHp;
        }
        this.playerhp.text = this.curHp + '';
        this.judgeDead();
    };
    PlayerCard.prototype.liftAtk = function (value) {
        this.curAtk += value;
        this.playeratk.text = this.curAtk + '';
    };
    PlayerCard.prototype.resumeAtk = function () {
        this.curAtk = CPlayerConfig.initialAtk;
        this.playeratk.text = this.curAtk + '';
    };
    PlayerCard.prototype.showShiled = function (bool, count) {
        if (count === void 0) { count = 0; }
        this.shiled.visible = bool;
        this.shieldCount.visible = bool;
        if (bool) {
            this.shieldRotate();
            this.shieldcount += count;
            this.shieldCount.text = this.shieldcount + '';
        }
        else {
            Laya.Tween.clearAll(this.shiled);
        }
    };
    PlayerCard.prototype.costShield = function (value) {
        this.shieldcount += value;
        this.shieldCount.text = this.shieldcount + '';
        if (this.shieldcount <= 0) {
            this.shieldcount = 0;
            this.showShiled(false);
        }
    };
    //护盾的旋转
    PlayerCard.prototype.shieldRotate = function (rot) {
        if (rot === void 0) { rot = 0; }
        this.shiled.rotation = rot;
        Laya.Tween.to(this.shiled, {
            rotation: -360 + rot
        }, 5000, null, Laya.Handler.create(this, function (rot) {
            this.shieldRotate(rot);
        }, [rot]));
    };
    PlayerCard.prototype.judgeDead = function () {
        if (this.curHp <= 0) {
            //游戏失败
        }
    };
    return PlayerCard;
}(ui.PlayerCardUI));
//# sourceMappingURL=PlayerCard.js.map