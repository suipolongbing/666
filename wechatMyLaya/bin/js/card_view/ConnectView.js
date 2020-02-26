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
var ConnectView = /** @class */ (function (_super) {
    __extends(ConnectView, _super);
    function ConnectView() {
        return _super.call(this) || this;
    }
    ConnectView.prototype.onShow = function (bool) {
        if (bool) {
            this.visible = true;
            this.AddEvent();
        }
        else {
            this.visible = false;
            this.RemoveEvent();
        }
    };
    ConnectView.prototype.onClosed = function () {
        console.log("666");
    };
    ConnectView.prototype.AddEvent = function () {
        this.randomMatchBtn.on(Laya.Event.CLICK, this, this.MatchRandom);
        this.roomMatchBtn.on(Laya.Event.CLICK, this, this.MatchRoom);
    };
    ConnectView.prototype.RemoveEvent = function () {
        this.randomMatchBtn.off(Laya.Event.CLICK, this, this.MatchRandom);
        this.roomMatchBtn.off(Laya.Event.CLICK, this, this.MatchRoom);
    };
    ConnectView.prototype.MatchRoom = function () {
        var xxx;
        if (this.roomNumberTxt.text.length > 0) {
            xxx = Number(this.roomNumberTxt.text);
        }
        else {
            return;
        }
        SocketManager.Inst.RoomMatch(xxx);
    };
    ConnectView.prototype.MatchRandom = function () {
        SocketManager.Inst.RandomMatch();
    };
    return ConnectView;
}(ui.ConnectViewUI));
//# sourceMappingURL=ConnectView.js.map