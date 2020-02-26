/*
* 锻造材料卡;
*/
var BuildCard = /** @class */ (function () {
    function BuildCard(type) {
        this.data = new BuildData(type);
    }
    BuildCard.prototype.Dispose = function () {
        if (this.render != null) {
            this.render.Dispose();
        }
    };
    BuildCard.prototype.CreateRender = function () {
        this.render = new BuildRender();
        this.render.ChangeRenderByData(this.data);
    };
    BuildCard.prototype.FlushRender = function () {
        if (this.render == null) {
            this.CreateRender();
        }
        else {
            this.render.ChangeRenderByData(this.data);
        }
    };
    return BuildCard;
}());
//# sourceMappingURL=BuildCard.js.map