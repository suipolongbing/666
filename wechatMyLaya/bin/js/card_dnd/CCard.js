/*
* 锻造材料卡;
*/
var CCard = /** @class */ (function () {
    function CCard(type, no) {
        this.data = new CData(type, no);
    }
    CCard.prototype.Dispose = function () {
        if (this.render != null) {
            this.render.Dispose();
        }
    };
    CCard.prototype.CreateRender = function () {
        this.render = new CRender();
        this.render.ChangeRenderByData(this.data);
    };
    CCard.prototype.FlushRender = function () {
        if (this.render == null) {
            this.CreateRender();
        }
        else {
            this.render.ChangeRenderByData(this.data);
        }
    };
    return CCard;
}());
//# sourceMappingURL=CCard.js.map