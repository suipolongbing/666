/*
* name;
*/
var BuildData = /** @class */ (function () {
    function BuildData(vType) {
        this.mType = vType;
    }
    BuildData.prototype.SetData = function (data) {
        this.mType = data.mType;
    };
    BuildData.Getkey = function (type) {
        return type * 1000;
    };
    BuildData.prototype.Getkey = function () {
        return this.mType * 1000;
    };
    BuildData.prototype.Clone = function () {
        return new BuildData(this.mType);
    };
    BuildData.prototype.IsDZS = function () {
        return this.mType == BuildType.duanzaoshi;
    };
    BuildData.prototype.IsCM = function () {
        return this.mType == BuildType.cuimu;
    };
    BuildData.prototype.IsQS = function () {
        return this.mType == BuildType.qishi;
    };
    BuildData.prototype.IsMX = function () {
        return this.mType == BuildType.mixian;
    };
    BuildData.prototype.IsYG = function () {
        return this.mType == BuildType.yugang;
    };
    BuildData.prototype.IsWG = function () {
        return this.mType == BuildType.wugang;
    };
    return BuildData;
}());
//# sourceMappingURL=BuildData.js.map