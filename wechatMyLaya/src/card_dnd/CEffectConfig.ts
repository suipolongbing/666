/*
* name;
*/
class CEffectConfig {
    /**
     * 加血
     * @param player 玩家
     * @param value 加的血量
     */
    static AddHp(player: PlayerCard, value) {
        player.costHp(value);
    }

    /**
     * 持续性加血
     * @param player 玩家
     * @param value 加的血量
     */
    static ContinuedAddHp(player: PlayerCard, value) {
        if (CPlayerConfig.continuedaddRound <= 0)
            return;
        CPlayerConfig.continuedaddRound -= 1;
        player.costHp(value);
    }

    /**
     * 加血量上限
     * @param player 玩家
     * @param value 加的血量
     */
    static HpGain(player: PlayerCard, value) {
        CPlayerConfig.initialHp += value;
        player.costHp(value);
    }

    /**
     * 加攻击力上限
     * @param player 玩家
     * @param value 加的攻击力
     */
    static AtkGain(player: PlayerCard, value) {
        CPlayerConfig.initialAtk += value;
        player.liftAtk(value);
    }

    /**
     * 加护甲，没有会创建一个护甲
     * @param player 玩家
     * @param value 增加的护甲
     */
    static ArmGain(player: PlayerCard, value) {
        player.showShiled(true, value);
    }

    /**
     * 飞弹||普通伤害计算，怪物死亡返回true，否则返回false
     * @param card 怪物卡
     * @param value 伤害值
     */
    static Missile(card: CCard, value): boolean {
        card.render.SetHp(card.data, card.data.mHp - value);
        if (card.data.mHp <= 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 流血，怪物死亡返回true，否则返回false
     * @param card 怪物卡
     * @param percentage 百分比
     */
    static Bleed(card: CCard, percentage): boolean {
        if (card.data.mBleedRound <= 0)
            return;
        let value;
        value = percentage * card.data.mHp;
        card.data.mBleedRound -= 1;
        value = Math.ceil(value) < 1 ? 1 : Math.ceil(value);
        card.render.SetHp(card.data, card.data.mHp - value);
        if (card.data.mHp <= 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 中毒，怪物死亡返回true，否则返回false
     * @param card 怪物卡
     * @param percentage 百分比
     */
    static Poisoning(card: CCard, percentage): boolean {
        if (card.data.mPoisoningRound <= 0)
            return;
        let value;
        card.data.mPoisoningIndicator += 1;
        value = percentage * card.data.mCompleteHp * card.data.mPoisoningIndicator;
        card.data.mPoisoningRound -= 1;
        value = Math.ceil(value) < 1 ? 1 : Math.ceil(value);
        card.render.SetHp(card.data, card.data.mHp - value);
        if (card.data.mHp <= 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 灼烧，怪物死亡返回true，否则返回false
     * @param card 怪物卡
     * @param value 伤害值
     */
    static Burn(card: CCard, value, isEndless): boolean {
        if (isEndless) {
            if (card.data.mPoisoningRound <= 0)
                return;
            card.data.mBurnRound -= 1;
        }
        value = Math.ceil(value) < 1 ? 1 : Math.ceil(value);
        card.render.SetHp(card.data, card.data.mHp - value);
        if (card.data.mHp <= 0) {
            return true;
        } else {
            return false;
        }
    }
}
//武器卡和技能卡的基础特效
enum CEffect {
    addhp, //回血，恢复玩家x点生命值
    continuedaddhp, //持续回血，每次发牌恢复玩家x点生命值
    hpgain, //血量增益，提升玩家基础血量
    atkgain, //攻击增益，提升玩家基础攻击力
    armgain, //护甲增益，提升玩家护甲
    missile, //飞弹，对x个怪物造成x点伤害
    bleed, //流血，每次发牌造成怪物当前生命值x%的伤害，持续回合由卡片决定
    poisoning, //中毒，每次发牌叠加一层中毒计数器，并造成当前中毒层数 * 怪物总生命值x%的伤害，持续回合由卡片决斗
    burn, //灼烧，每次发牌造成怪物当前玩家攻击力的伤害
    teleport, //折越，移除怪物至异次元，之后的第二次发牌该怪物加入发牌列表
    penetrate, //贯穿，根据怪物的护甲提升武器攻击力，每x点护甲提升x点攻击力，无视怪物护甲
    sniper, //狙击，攻击怪物进行伤害结算时，玩家不会受到伤害
    explosion, //爆炸，攻击怪物结算伤害后，如果怪物没有被击败，就会直接破坏这张怪物卡
    sacrifice, //献祭，扣除玩家当前生命值的50%
    bucklehp, //扣血，扣除玩家x点生命值
}