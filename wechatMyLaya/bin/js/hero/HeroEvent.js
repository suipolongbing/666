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
var HeroEvent = /** @class */ (function (_super) {
    __extends(HeroEvent, _super);
    function HeroEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeroEvent.REFERSH_GOLD = "REFERSH_GOLD";
    HeroEvent.FINISH_CARD = "FINISH_CARD";
    HeroEvent.START_TO_MAKU = "START_TO_MAKU";
    return HeroEvent;
}(pokerEvent.PokerEventDispatcher));
//# sourceMappingURL=HeroEvent.js.map