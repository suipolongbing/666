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
var BottomView = /** @class */ (function (_super) {
    __extends(BottomView, _super);
    function BottomView() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    BottomView.prototype.init = function () {
        this.addEvent();
    };
    BottomView.prototype.addEvent = function () {
        this.mapBtn.on(Laya.Event.MOUSE_DOWN, this, this.onEnterMap);
        this.transactionBtn.on(Laya.Event.MOUSE_DOWN, this, this.onEnterTransaction);
    };
    BottomView.prototype.onEnterMap = function () {
        GameMain.app.viewManager.onMap();
    };
    BottomView.prototype.onEnterTransaction = function () {
        GameMain.app.viewManager.onTransaction(Xconfig.LastVillageId);
    };
    return BottomView;
}(ui.bottomViewUI));
//# sourceMappingURL=BottomView.js.map