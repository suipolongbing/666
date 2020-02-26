/*
* name;
*/
var CEffectConfig = /** @class */ (function () {
    function CEffectConfig() {
    }
    /**
     * 加血
     * @param player 玩家
     * @param value 加的血量
     */
    CEffectConfig.AddHp = function (player, value) {
        player.costHp(value);
    };
    /**
     * 持续性加血
     * @param player 玩家
     * @param value 加的血量
     */
    CEffectConfig.ContinuedAddHp = function (player, value) {
        if (CPlayerConfig.continuedaddRound <= 0)
            return;
        CPlayerConfig.continuedaddRound -= 1;
        player.costHp(value);
    };
    /**
     * 加血量上限
     * @param player 玩家
     * @param value 加的血量
     */
    CEffectConfig.HpGain = function (player, value) {
        CPlayerConfig.initialHp += value;
        player.costHp(value);
    };
    /**
     * 加攻击力上限
     * @param player 玩家
     * @param value 加的攻击力
     */
    CEffectConfig.AtkGain = function (player, value) {
        CPlayerConfig.initialAtk += value;
        player.liftAtk(value);
    };
    /**
     * 加护甲，没有会创建一个护甲
     * @param player 玩家
     * @param value 增加的护甲
     */
    CEffectConfig.ArmGain = function (player, value) {
        player.showShiled(true, value);
    };
    /**
     * 飞弹||普通伤害计算，怪物死亡返回true，否则返回false
     * @param card 怪物卡
     * @param value 伤害值
     */
    CEffectConfig.Missile = function (card, value) {
        card.render.SetHp(card.data, card.data.mHp - value);
        if (card.data.mHp <= 0) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 流血，怪物死亡返回true，否则返回false
     * @param card 怪物卡
     * @param percentage 百分比
     */
    CEffectConfig.Bleed = function (card, percentage) {
        if (card.data.mBleedRound <= 0)
            return;
        var value;
        value = percentage * card.data.mHp;
        card.data.mBleedRound -= 1;
        value = Math.ceil(value) < 1 ? 1 : Math.ceil(value);
        card.render.SetHp(card.data, card.data.mHp - value);
        if (card.data.mHp <= 0) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 中毒，怪物死亡返回true，否则返回false
     * @param card 怪物卡
     * @param percentage 百分比
     */
    CEffectConfig.Poisoning = function (card, percentage) {
        if (card.data.mPoisoningRound <= 0)
            return;
        var value;
        card.data.mPoisoningIndicator += 1;
        value = percentage * card.data.mCompleteHp * card.data.mPoisoningIndicator;
        card.data.mPoisoningRound -= 1;
        value = Math.ceil(value) < 1 ? 1 : Math.ceil(value);
        card.render.SetHp(card.data, card.data.mHp - value);
        if (card.data.mHp <= 0) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 灼烧，怪物死亡返回true，否则返回false
     * @param card 怪物卡
     * @param value 伤害值
     */
    CEffectConfig.Burn = function (card, value, isEndless) {
        if (isEndless) {
            if (card.data.mPoisoningRound <= 0)
                return;
            card.data.mBurnRound -= 1;
        }
        value = Math.ceil(value) < 1 ? 1 : Math.ceil(value);
        card.render.SetHp(card.data, card.data.mHp - value);
        if (card.data.mHp <= 0) {
            return true;
        }
        else {
            return false;
        }
    };
    return CEffectConfig;
}());
//武器卡和技能卡的基础特效
var CEffect;
(function (CEffect) {
    CEffect[CEffect["addhp"] = 0] = "addhp";
    CEffect[CEffect["continuedaddhp"] = 1] = "continuedaddhp";
    CEffect[CEffect["hpgain"] = 2] = "hpgain";
    CEffect[CEffect["atkgain"] = 3] = "atkgain";
    CEffect[CEffect["armgain"] = 4] = "armgain";
    CEffect[CEffect["missile"] = 5] = "missile";
    CEffect[CEffect["bleed"] = 6] = "bleed";
    CEffect[CEffect["poisoning"] = 7] = "poisoning";
    CEffect[CEffect["burn"] = 8] = "burn";
    CEffect[CEffect["teleport"] = 9] = "teleport";
    CEffect[CEffect["penetrate"] = 10] = "penetrate";
    CEffect[CEffect["sniper"] = 11] = "sniper";
    CEffect[CEffect["explosion"] = 12] = "explosion";
    CEffect[CEffect["sacrifice"] = 13] = "sacrifice";
    CEffect[CEffect["bucklehp"] = 14] = "bucklehp";
})(CEffect || (CEffect = {}));
//# sourceMappingURL=CEffectConfig.js.map