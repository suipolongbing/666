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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var BattleViewUI = /** @class */ (function (_super) {
        __extends(BattleViewUI, _super);
        function BattleViewUI() {
            return _super.call(this) || this;
        }
        BattleViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.BattleViewUI.uiView);
        };
        BattleViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "purple.png", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Image", "props": { "y": 357, "x": 562, "width": 146, "var": "deckslot4", "skin": "card_img.png", "rotation": -1, "height": 208 } }, { "type": "Image", "props": { "y": 361, "x": 399, "width": 146, "var": "deckslot3", "skin": "card_img.png", "rotation": -2, "height": 208 } }, { "type": "Image", "props": { "y": 361, "x": 236, "width": 146, "var": "deckslot2", "skin": "card_img.png", "rotation": 3, "height": 208 } }, { "type": "Image", "props": { "y": 364, "x": 41, "width": 146, "var": "deckslot1", "skin": "card_img.png", "rotation": -4, "height": 208 } }, { "type": "Image", "props": { "y": 682, "x": 30, "width": 146, "var": "weaponslot1", "skin": "card_img.png", "height": 208 } }, { "type": "Image", "props": { "y": 682, "x": 209, "width": 146, "var": "weaponslot2", "skin": "card_img.png", "height": 208 } }, { "type": "Image", "props": { "y": 682, "x": 394, "width": 146, "var": "skillslot1", "skin": "card_img.png", "height": 208 } }, { "type": "Image", "props": { "y": 682, "x": 573, "width": 146, "var": "skillslot2", "skin": "card_img.png", "height": 208 } }, { "type": "Image", "props": { "y": 944, "x": 302, "width": 146, "var": "playerslot", "skin": "card_img.png", "height": 208 } }, { "type": "Label", "props": { "y": 178, "x": 606.046875, "var": "jumpover", "text": "跳过", "fontSize": 50, "font": "SimHei", "color": "#ffffff", "bold": true } }, { "type": "Label", "props": { "y": 178, "x": 41, "var": "remaininglevel", "text": "剩余卡牌:54", "fontSize": 50, "font": "SimHei", "color": "#ffffff", "bold": true } }] };
        return BattleViewUI;
    }(View));
    ui.BattleViewUI = BattleViewUI;
})(ui || (ui = {}));
(function (ui) {
    var bottomViewUI = /** @class */ (function (_super) {
        __extends(bottomViewUI, _super);
        function bottomViewUI() {
            return _super.call(this) || this;
        }
        bottomViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.bottomViewUI.uiView);
        };
        bottomViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 100 }, "child": [{ "type": "Label", "props": { "y": 25, "x": 324, "var": "mapBtn", "text": "地图", "fontSize": 50, "font": "Helvetica", "color": "#ffffff", "bold": true } }, { "type": "Label", "props": { "y": 25, "x": 75, "var": "transactionBtn", "text": "交易", "fontSize": 50, "font": "Helvetica", "color": "#ffffff", "bold": true } }] };
        return bottomViewUI;
    }(View));
    ui.bottomViewUI = bottomViewUI;
})(ui || (ui = {}));
(function (ui) {
    var CCardUI = /** @class */ (function (_super) {
        __extends(CCardUI, _super);
        function CCardUI() {
            return _super.call(this) || this;
        }
        CCardUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.CCardUI.uiView);
        };
        CCardUI.uiView = { "type": "View", "props": {}, "child": [{ "type": "Image", "props": { "width": 146, "skin": "card_img.png", "height": 208 }, "child": [{ "type": "Image", "props": { "y": 141, "x": 9, "width": 128, "skin": "bottom_desc.png", "height": 58 }, "child": [{ "type": "Label", "props": { "y": 29, "x": 11, "wordWrap": true, "width": 106, "text": "对所有敌人造成1点伤害", "fontSize": 10, "font": "Helvetica", "color": "#15e2c9", "bold": true, "anchorY": 0.5 } }] }, { "type": "Image", "props": { "y": 98, "x": 9, "width": 128, "skin": "top_name.png", "rotation": 0, "height": 28 }, "child": [{ "type": "Label", "props": { "y": 14, "x": 11, "text": "黑塔——秘语箭", "fontSize": 12, "font": "SimSun", "color": "#ec9a98", "bold": true, "anchorY": 0.5 } }] }, { "type": "Image", "props": { "y": 116, "x": 44, "skin": "Item_Bubble.png", "scaleY": 1.5, "scaleX": 1.5 }, "child": [{ "type": "Label", "props": { "y": 13, "x": 13, "text": "9", "fontSize": 18, "font": "SimHei", "color": "#eaff00", "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }] }] }] };
        return CCardUI;
    }(View));
    ui.CCardUI = CCardUI;
})(ui || (ui = {}));
(function (ui) {
    var ConnectViewUI = /** @class */ (function (_super) {
        __extends(ConnectViewUI, _super);
        function ConnectViewUI() {
            return _super.call(this) || this;
        }
        ConnectViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.ConnectViewUI.uiView);
        };
        ConnectViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Label", "props": { "y": 534, "x": 275, "var": "randomMatchBtn", "text": "随机匹配", "fontSize": 50, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 750, "x": 275, "var": "roomMatchBtn", "text": "房间匹配", "fontSize": 50, "color": "#ffffff" } }, { "type": "TextInput", "props": { "y": 650, "x": 0, "width": 750, "var": "roomNumberTxt", "promptColor": "#afa1a1", "prompt": "请输入暗号", "height": 100, "fontSize": 50, "color": "#d2c4c4", "align": "center" } }] };
        return ConnectViewUI;
    }(View));
    ui.ConnectViewUI = ConnectViewUI;
})(ui || (ui = {}));
(function (ui) {
    var DuelCardUI = /** @class */ (function (_super) {
        __extends(DuelCardUI, _super);
        function DuelCardUI() {
            return _super.call(this) || this;
        }
        DuelCardUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.DuelCardUI.uiView);
        };
        DuelCardUI.uiView = { "type": "View", "props": {}, "child": [{ "type": "Label", "props": { "width": 146, "height": 208, "color": "#ffffff", "bgColor": "#48645e", "alpha": 1 } }, { "type": "Image", "props": { "width": 146, "skin": "card_img.png", "height": 208 }, "child": [{ "type": "Image", "props": { "y": 141, "x": 9, "width": 128, "skin": "bottom_desc.png", "height": 58 }, "child": [{ "type": "Label", "props": { "y": 31, "x": 64, "wordWrap": true, "width": 106, "var": "myContent", "valign": "middle", "text": "对所有敌人造成1点伤害", "height": 40, "fontSize": 10, "font": "Helvetica", "color": "#15e2c9", "bold": true, "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }] }, { "type": "Image", "props": { "y": 103, "x": 9, "width": 128, "skin": "top_name.png", "rotation": 0, "height": 28 }, "child": [{ "type": "Label", "props": { "y": 14, "x": 63, "var": "myName", "text": "黑塔秘语箭", "fontSize": 12, "font": "SimSun", "color": "#ec9a98", "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Label", "props": { "y": 14, "x": 10, "var": "myStar", "text": "9", "fontSize": 18, "font": "SimHei", "color": "#eaff00", "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "var": "myAtk", "text": "9", "left": -4, "fontSize": 30, "font": "SimHei", "color": "#eaff00", "bottom": -8, "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "var": "myLife", "text": "9", "right": -4, "fontSize": 30, "font": "SimHei", "color": "#eaff00", "bottom": -8, "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 14, "x": 136, "var": "myAction", "text": "9", "fontSize": 18, "font": "SimHei", "color": "#eaff00", "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 28, "x": 10, "visible": false, "var": "terrainTxt1", "text": "9", "fontSize": 12, "font": "SimHei", "color": "#eaff00", "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 40, "x": 10, "visible": false, "var": "terrainTxt2", "text": "9", "fontSize": 12, "font": "SimHei", "color": "#eaff00", "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 52, "x": 10, "visible": false, "var": "terrainTxt3", "text": "9", "fontSize": 12, "font": "SimHei", "color": "#eaff00", "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 64, "x": 10, "visible": false, "var": "terrainTxt4", "text": "9", "fontSize": 12, "font": "SimHei", "color": "#eaff00", "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }] }] };
        return DuelCardUI;
    }(View));
    ui.DuelCardUI = DuelCardUI;
})(ui || (ui = {}));
(function (ui) {
    var DuelCardBackUI = /** @class */ (function (_super) {
        __extends(DuelCardBackUI, _super);
        function DuelCardBackUI() {
            return _super.call(this) || this;
        }
        DuelCardBackUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.DuelCardBackUI.uiView);
        };
        DuelCardBackUI.uiView = { "type": "View", "props": {}, "child": [{ "type": "Label", "props": { "width": 146, "height": 208, "color": "#ffffff", "bgColor": "#48645e", "alpha": 1 } }, { "type": "Image", "props": { "y": 104, "x": 73, "width": 146, "skin": "back.png", "rotation": 180, "height": 208, "anchorY": 0.5, "anchorX": 0.5 } }] };
        return DuelCardBackUI;
    }(View));
    ui.DuelCardBackUI = DuelCardBackUI;
})(ui || (ui = {}));
(function (ui) {
    var DuelViewUI = /** @class */ (function (_super) {
        __extends(DuelViewUI, _super);
        function DuelViewUI() {
            return _super.call(this) || this;
        }
        DuelViewUI.prototype.createChildren = function () {
            View.regComponent("ui.HexViewUI", ui.HexViewUI);
            View.regComponent("Text", laya.display.Text);
            View.regComponent("ui.DuelCardUI", ui.DuelCardUI);
            _super.prototype.createChildren.call(this);
            this.createView(ui.DuelViewUI.uiView);
        };
        DuelViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "bg", "top": 0, "skin": "purple.png", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Box", "props": { "y": 646, "x": 107, "var": "mycheckerboard" }, "child": [{ "type": "HexView", "props": { "y": 206, "x": 348, "var": "myhex4", "runtime": "ui.HexViewUI" } }, { "type": "HexView", "props": { "y": 206, "x": 209, "var": "myhex0", "runtime": "ui.HexViewUI" } }, { "type": "HexView", "props": { "y": 206, "x": 70, "var": "myhex1", "runtime": "ui.HexViewUI" } }, { "type": "HexView", "props": { "y": 103, "var": "myhex5", "runtime": "ui.HexViewUI" } }, { "type": "HexView", "props": { "y": 103, "x": 140, "var": "myhex2", "runtime": "ui.HexViewUI" } }, { "type": "HexView", "props": { "y": 103, "x": 280, "var": "myhex3", "runtime": "ui.HexViewUI" } }, { "type": "HexView", "props": { "y": 103, "x": 420, "var": "myhex9", "runtime": "ui.HexViewUI" } }, { "type": "HexView", "props": { "x": 70, "var": "myhex6", "runtime": "ui.HexViewUI" } }, { "type": "HexView", "props": { "x": 209, "var": "myhex7", "runtime": "ui.HexViewUI" } }, { "type": "HexView", "props": { "x": 348, "var": "myhex8", "runtime": "ui.HexViewUI" } }] }, { "type": "Box", "props": { "y": 188, "x": 107, "var": "enemycheckerboard" }, "child": [{ "type": "HexView", "props": { "y": 206, "x": 348, "var": "otherhex8", "runtime": "ui.HexViewUI" } }, { "type": "HexView", "props": { "y": 206, "x": 209, "var": "otherhex7", "runtime": "ui.HexViewUI" } }, { "type": "HexView", "props": { "y": 206, "x": 70, "var": "otherhex6", "runtime": "ui.HexViewUI" } }, { "type": "HexView", "props": { "y": 103, "var": "otherhex5", "runtime": "ui.HexViewUI" } }, { "type": "HexView", "props": { "y": 103, "x": 140, "var": "otherhex2", "runtime": "ui.HexViewUI" } }, { "type": "HexView", "props": { "y": 103, "x": 280, "var": "otherhex3", "runtime": "ui.HexViewUI" } }, { "type": "HexView", "props": { "y": 103, "x": 420, "var": "otherhex9", "runtime": "ui.HexViewUI" } }, { "type": "HexView", "props": { "x": 70, "var": "otherhex1", "runtime": "ui.HexViewUI" } }, { "type": "HexView", "props": { "x": 209, "var": "otherhex0", "runtime": "ui.HexViewUI" } }, { "type": "HexView", "props": { "x": 348, "var": "otherhex4", "runtime": "ui.HexViewUI" } }] }, { "type": "Box", "props": { "y": 524, "x": 0, "width": 750, "var": "atributeBox", "height": 88 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 150, "var": "earthBox" }, "child": [{ "type": "Image", "props": { "var": "earth", "skin": "duel/qipan/timg.png", "scaleY": 0.5, "scaleX": 0.5 }, "child": [{ "type": "Text", "props": { "y": 50, "x": 72, "wordWrap": true, "valign": "middle", "text": "大地", "fontSize": 50, "font": "SimHei", "color": "#6c4958", "bold": true, "align": "center" } }] }] }, { "type": "Box", "props": { "y": 0, "x": 480, "var": "furukiBox" }, "child": [{ "type": "Image", "props": { "y": 0.000005225005223768863, "var": "furuki", "skin": "duel/qipan/timg.png", "scaleY": 0.5, "scaleX": 0.5, "rotation": 180, "anchorY": 1, "anchorX": 1 }, "child": [{ "type": "Text", "props": { "y": 155, "x": 122, "wordWrap": true, "valign": "middle", "text": "古木", "scaleY": -1, "scaleX": -1, "fontSize": 50, "font": "SimHei", "color": "#1ae87d", "bold": true, "align": "center" } }] }] }, { "type": "Box", "props": { "y": 0, "x": 370, "var": "oceanBox" }, "child": [{ "type": "Image", "props": { "var": "ocean", "skin": "duel/qipan/timg.png", "scaleY": 0.5, "scaleX": 0.5 }, "child": [{ "type": "Text", "props": { "y": 50, "x": 72, "wordWrap": true, "valign": "middle", "text": "海洋", "fontSize": 50, "font": "SimHei", "color": "#b19df3", "bold": true, "align": "center" } }] }] }, { "type": "Box", "props": { "y": 0, "x": 260, "var": "volcanoBox" }, "child": [{ "type": "Image", "props": { "y": 0.000005225005223768863, "var": "volcano", "skin": "duel/qipan/timg.png", "scaleY": 0.5, "scaleX": 0.5, "rotation": 180, "anchorY": 1, "anchorX": 1 }, "child": [{ "type": "Text", "props": { "y": 155, "x": 122, "wordWrap": true, "valign": "middle", "text": "火山", "scaleY": -1, "scaleX": -1, "fontSize": 50, "font": "SimHei", "color": "#cc756a", "bold": true, "align": "center" } }] }] }] }, { "type": "Image", "props": { "y": 568, "x": 6, "var": "roundImg", "skin": "gear.png", "scaleY": 0.35, "scaleX": 0.35, "rotation": 11, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 568, "x": 41, "var": "roundCount", "text": "1", "fontSize": 70, "font": "SimSun", "color": "#00ffff", "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Box", "props": { "y": 456.9, "x": 596, "var": "otherEnergyBox" }, "child": [{ "type": "Image", "props": { "y": 65, "x": 65, "var": "otherEnergyImg1", "skin": "gear.png", "scaleY": 0.2, "scaleX": 0.2, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 65, "x": 65, "var": "otherEnergyCount1", "text": "10/10", "fontSize": 38, "font": "SimHei", "color": "#d47978", "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 173, "x": 96, "var": "otherEnergyImg2", "skin": "gear.png", "scaleY": 0.15, "scaleX": 0.15, "rotation": 14, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 173, "x": 96, "var": "otherEnergyCount2", "text": "10/10", "fontSize": 28, "font": "SimHei", "color": "#ffffff", "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Box", "props": { "y": 463.5978037435509, "x": 600, "var": "myEnergyBox" }, "child": [{ "type": "Image", "props": { "y": 157.4021962564491, "x": 65, "var": "myEnergyImg1", "skin": "gear.png", "scaleY": 0.2, "scaleX": 0.2, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 157.4, "x": 65, "var": "myEnergyCount1", "text": "10/10", "fontSize": 38, "font": "SimHei", "color": "#ffffff", "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 49, "x": 97, "var": "myEnergyImg2", "skin": "gear.png", "scaleY": 0.15, "scaleX": 0.15, "rotation": -12, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 49, "x": 97, "var": "myEnergyCount2", "text": "10/10", "fontSize": 28, "font": "SimHei", "color": "#d47978", "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Box", "props": { "y": 1041, "x": 0, "width": 750, "var": "myHandCardBox", "height": 234 } }, { "type": "Image", "props": { "y": 1041, "x": -253, "var": "myDuelCardPoint" } }, { "type": "Box", "props": { "y": -138, "x": 0, "width": 750, "var": "otherHandCardBox", "height": 234 } }, { "type": "Image", "props": { "y": -138, "x": 985, "var": "otherDuelCardPoint" } }, { "type": "Box", "props": { "y": 970, "width": 750, "var": "myDetailsBox" }, "child": [{ "type": "Label", "props": { "y": 10, "x": -10, "var": "myEvolutionTxt", "text": "进化点数：未解锁", "left": 10, "fontSize": 20, "font": "SimSun", "color": "#00ffff", "bold": true, "anchorY": 0.5 } }, { "type": "Label", "props": { "y": 40, "x": -10, "var": "myDeckTxt", "text": "卡组：25/30", "left": 10, "fontSize": 20, "font": "SimSun", "color": "#00ffff", "bold": true, "anchorY": 0.5 } }, { "type": "Label", "props": { "y": 10, "x": -10, "var": "myExtradimensionalTxt", "text": "异次元：5", "right": 10, "fontSize": 20, "font": "SimSun", "color": "#00ffff", "bold": true, "anchorY": 0.5 } }, { "type": "Label", "props": { "y": 40, "x": -10, "var": "myCemeteryTxt", "text": "墓地：5", "right": 10, "fontSize": 20, "font": "SimSun", "color": "#00ffff", "bold": true, "anchorY": 0.5 } }] }, { "type": "Box", "props": { "y": 117, "x": 0, "width": 750, "var": "otherDetailsBox" }, "child": [{ "type": "Label", "props": { "y": 11, "x": -10, "var": "otherEvolutionTxt", "text": "进化点数：未解锁", "left": 10, "fontSize": 20, "font": "SimSun", "color": "#00ffff", "bold": true, "anchorY": 0.5 } }, { "type": "Label", "props": { "y": 40, "x": -10, "var": "otherDeckTxt", "text": "卡组：25/30", "left": 10, "fontSize": 20, "font": "SimSun", "color": "#00ffff", "bold": true, "anchorY": 0.5 } }, { "type": "Label", "props": { "y": 10, "x": -10, "var": "otherExtradimensionalTxt", "text": "异次元：5", "right": 10, "fontSize": 20, "font": "SimSun", "color": "#00ffff", "bold": true, "anchorY": 0.5 } }, { "type": "Label", "props": { "y": 40, "x": -10, "var": "otherCemeteryTxt", "text": "墓地：5", "right": 10, "fontSize": 20, "font": "SimSun", "color": "#00ffff", "bold": true, "anchorY": 0.5 } }] }, { "type": "Box", "props": { "var": "explainBox", "top": 0, "right": 0, "left": 0, "bottom": 0 }, "child": [{ "type": "DuelCard", "props": { "y": 116.5, "x": 15.5, "var": "explainCard", "scaleY": 2, "scaleX": 2, "runtime": "ui.DuelCardUI" } }] }, { "type": "Box", "props": { "var": "gameOverBox", "top": 0, "right": 0, "left": 0, "bottom": 0 }, "child": [{ "type": "Label", "props": { "x": 0, "top": 0, "right": 0, "left": 0, "color": "#000000", "bottom": 0, "bgColor": "#000000", "alpha": 0.5 } }, { "type": "Label", "props": { "x": 375, "text": "游戏结束", "fontSize": 100, "font": "SimHei", "color": "#ffffff", "centerY": -50, "bold": true, "anchorX": 0.5 } }, { "type": "Label", "props": { "x": 375, "var": "overLabel", "text": "你胜利了！", "fontSize": 100, "font": "SimHei", "color": "#ffffff", "centerY": 100, "bold": true, "anchorX": 0.5 } }] }, { "type": "Box", "props": { "var": "myTimeBox", "top": 0, "right": 0, "left": 0, "bottom": 0 }, "child": [{ "type": "Label", "props": { "y": -617, "x": -170, "top": 0, "right": 0, "left": 0, "color": "#000000", "bottom": 0, "bgColor": "#000000", "alpha": 0.5 } }, { "type": "Label", "props": { "y": 667, "x": 375, "var": "myTimeLabel", "text": "我方回合", "fontSize": 100, "font": "SimHei", "color": "#ffffff", "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Box", "props": { "var": "reshuffleCardBox", "top": 0, "right": 0, "left": 0, "bottom": 0 }, "child": [{ "type": "Label", "props": { "y": 0, "x": 0, "top": 0, "right": 0, "left": 0, "color": "#000000", "bottom": 0, "bgColor": "#000000", "alpha": 0.5 } }, { "type": "Box", "props": { "x": 0, "width": 750, "height": 487, "centerY": 0 }, "child": [{ "type": "DuelCard", "props": { "y": 17, "x": 24, "var": "reshuffleCard1", "scaleY": 1.5, "scaleX": 1.5, "runtime": "ui.DuelCardUI" }, "child": [{ "type": "Image", "props": { "y": 60, "x": 13, "visible": false, "var": "reshuffleOk1", "skin": "yesicon.png" } }] }, { "type": "DuelCard", "props": { "y": 17, "x": 266, "var": "reshuffleCard2", "scaleY": 1.5, "scaleX": 1.5, "runtime": "ui.DuelCardUI" }, "child": [{ "type": "Image", "props": { "y": 60, "x": 13, "visible": false, "var": "reshuffleOk2", "skin": "yesicon.png" } }] }, { "type": "DuelCard", "props": { "y": 17, "x": 507, "var": "reshuffleCard3", "scaleY": 1.5, "scaleX": 1.5, "runtime": "ui.DuelCardUI" }, "child": [{ "type": "Image", "props": { "y": 60, "x": 13, "visible": false, "var": "reshuffleOk3", "skin": "yesicon.png" } }] }, { "type": "Label", "props": { "y": 413, "x": 324, "var": "reshuffleChangeBtn", "text": "更换", "fontSize": 50, "font": "SimHei", "color": "#ffffff", "bold": true } }] }] }, { "type": "Box", "props": { "y": 235, "x": 287, "var": "outCardBox" }, "child": [{ "type": "DuelCard", "props": { "y": 420, "var": "myOutCard", "scaleY": 1.2, "scaleX": 1.2, "runtime": "ui.DuelCardUI" } }, { "type": "DuelCard", "props": { "var": "otherOutCard", "scaleY": 1.2, "scaleX": 1.2, "runtime": "ui.DuelCardUI" } }] }] };
        return DuelViewUI;
    }(View));
    ui.DuelViewUI = DuelViewUI;
})(ui || (ui = {}));
(function (ui) {
    var HexMaskUI = /** @class */ (function (_super) {
        __extends(HexMaskUI, _super);
        function HexMaskUI() {
            return _super.call(this) || this;
        }
        HexMaskUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.HexMaskUI.uiView);
        };
        HexMaskUI.uiView = { "type": "View", "props": { "width": 115, "height": 97 }, "child": [{ "type": "Image", "props": { "y": -11.5, "x": -2.5, "skin": "duel/qipan/bg2.png", "scaleY": 1.5, "scaleX": 1.5 } }] };
        return HexMaskUI;
    }(View));
    ui.HexMaskUI = HexMaskUI;
})(ui || (ui = {}));
(function (ui) {
    var HexSummonUI = /** @class */ (function (_super) {
        __extends(HexSummonUI, _super);
        function HexSummonUI() {
            return _super.call(this) || this;
        }
        HexSummonUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.HexSummonUI.uiView);
        };
        HexSummonUI.uiView = { "type": "View", "props": { "width": 115, "height": 97 }, "child": [{ "type": "Image", "props": { "y": -11.5, "x": -2.5, "skin": "duel/qipan/bg.png", "scaleY": 1.5, "scaleX": 1.5 } }, { "type": "Label", "props": { "y": 84, "x": 27, "var": "atk", "text": "5", "fontSize": 24, "font": "SimHei", "color": "#eaff00", "bold": true, "bgColor": "#000000", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 84, "x": 86, "var": "hp", "text": "5", "fontSize": 24, "font": "SimHei", "color": "#ff3d00", "bold": true, "bgColor": "#000000", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 86, "x": 57, "var": "action", "text": "1", "fontSize": 20, "font": "SimHei", "color": "#00eaff", "bold": true, "blendMode": "lighter", "bgColor": "#000000", "anchorY": 0.5, "anchorX": 0.5 } }] };
        return HexSummonUI;
    }(View));
    ui.HexSummonUI = HexSummonUI;
})(ui || (ui = {}));
(function (ui) {
    var HexViewUI = /** @class */ (function (_super) {
        __extends(HexViewUI, _super);
        function HexViewUI() {
            return _super.call(this) || this;
        }
        HexViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.HexViewUI.uiView);
        };
        HexViewUI.uiView = { "type": "View", "props": { "width": 115, "height": 97 }, "child": [{ "type": "Image", "props": { "y": -11.5, "x": -2.5, "skin": "duel/qipan/bg.png", "scaleY": 1.5, "scaleX": 1.5, "name": "ground" } }] };
        return HexViewUI;
    }(View));
    ui.HexViewUI = HexViewUI;
})(ui || (ui = {}));
(function (ui) {
    var MapViewUI = /** @class */ (function (_super) {
        __extends(MapViewUI, _super);
        function MapViewUI() {
            return _super.call(this) || this;
        }
        MapViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.MapViewUI.uiView);
        };
        MapViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 344, "x": 317, "var": "village1", "skin": "sign.png" }, "child": [{ "type": "Label", "props": { "y": 130, "x": 0, "width": 30, "var": "completion11", "valign": "middle", "text": "4", "fontSize": 30, "font": "SimHei", "color": "#84ff00", "bold": true, "align": "center" } }, { "type": "Label", "props": { "y": 55, "x": 96, "var": "name1", "text": "村一", "fontSize": 40, "font": "SimSun", "color": "#ffffff", "bold": true, "align": "left" } }, { "type": "Label", "props": { "y": 130, "x": 30, "width": 30, "var": "completion12", "valign": "middle", "text": "4", "fontSize": 30, "font": "SimHei", "color": "#ffffff", "bold": true, "align": "center" } }, { "type": "Label", "props": { "y": 130, "x": 60, "width": 30, "var": "completion13", "valign": "middle", "text": "4", "fontSize": 30, "font": "SimHei", "color": "#b5abff", "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 527, "x": 130, "var": "village2", "skin": "sign.png" }, "child": [{ "type": "Label", "props": { "y": 130, "x": 0, "width": 30, "var": "completion21", "valign": "middle", "text": "4", "fontSize": 30, "font": "SimHei", "color": "#84ff00", "bold": true, "align": "center" } }, { "type": "Label", "props": { "y": 44, "x": 111, "var": "name2", "text": "村二", "fontSize": 40, "font": "SimSun", "color": "#ffffff", "bold": true, "align": "left" } }, { "type": "Label", "props": { "y": 130, "x": 30, "width": 30, "var": "completion22", "valign": "middle", "text": "4", "fontSize": 30, "font": "SimHei", "color": "#ffffff", "bold": true, "align": "center" } }, { "type": "Label", "props": { "y": 130, "x": 60, "width": 30, "var": "completion23", "valign": "middle", "text": "4", "fontSize": 30, "font": "SimHei", "color": "#b5abff", "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 748, "x": 540, "var": "village3", "skin": "sign.png" }, "child": [{ "type": "Label", "props": { "y": 130, "x": 0, "width": 30, "var": "completion31", "valign": "middle", "text": "4", "fontSize": 30, "font": "SimHei", "color": "#84ff00", "bold": true, "align": "center" } }, { "type": "Label", "props": { "y": 65, "x": -86, "var": "name3", "text": "村三", "fontSize": 40, "font": "SimSun", "color": "#ffffff", "bold": true, "align": "left" } }, { "type": "Label", "props": { "y": 130, "x": 30, "width": 30, "var": "completion32", "valign": "middle", "text": "4", "fontSize": 30, "font": "SimHei", "color": "#ffffff", "bold": true, "align": "center" } }, { "type": "Label", "props": { "y": 130, "x": 60, "width": 30, "var": "completion33", "valign": "middle", "text": "4", "fontSize": 30, "font": "SimHei", "color": "#b5abff", "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 194, "x": 540, "var": "village4", "skin": "sign.png" }, "child": [{ "type": "Label", "props": { "y": 130, "x": 0, "width": 30, "var": "completion41", "valign": "middle", "text": "4", "fontSize": 30, "font": "SimHei", "color": "#84ff00", "bold": true, "align": "center" } }, { "type": "Label", "props": { "y": 60, "x": -87, "var": "name4", "text": "村四", "fontSize": 40, "font": "SimSun", "color": "#ffffff", "bold": true, "align": "left" } }, { "type": "Label", "props": { "y": 130, "x": 30, "width": 30, "var": "completion42", "valign": "middle", "text": "4", "fontSize": 30, "font": "SimHei", "color": "#ffffff", "bold": true, "align": "center" } }, { "type": "Label", "props": { "y": 130, "x": 60, "width": 30, "var": "completion43", "valign": "middle", "text": "4", "fontSize": 30, "font": "SimHei", "color": "#b5abff", "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 995, "x": 220, "var": "village5", "skin": "sign.png" }, "child": [{ "type": "Label", "props": { "y": 130, "x": 0, "width": 30, "var": "completion51", "valign": "middle", "text": "4", "fontSize": 30, "font": "SimHei", "color": "#84ff00", "bold": true, "align": "center" } }, { "type": "Label", "props": { "y": 52, "x": 113, "var": "name5", "text": "村五", "fontSize": 40, "font": "SimSun", "color": "#ffffff", "bold": true, "align": "left" } }, { "type": "Label", "props": { "y": 130, "x": 30, "width": 30, "var": "completion52", "valign": "middle", "text": "4", "fontSize": 30, "font": "SimHei", "color": "#ffffff", "bold": true, "align": "center" } }, { "type": "Label", "props": { "y": 130, "x": 60, "width": 30, "var": "completion53", "valign": "middle", "text": "4", "fontSize": 30, "font": "SimHei", "color": "#b5abff", "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 121, "x": 167, "var": "village6", "skin": "sign.png" }, "child": [{ "type": "Label", "props": { "y": 130, "x": 0, "width": 30, "var": "completion61", "valign": "middle", "text": "4", "fontSize": 30, "font": "SimHei", "color": "#84ff00", "bold": true, "align": "center" } }, { "type": "Label", "props": { "y": 55, "x": 105, "var": "name6", "text": "村六", "fontSize": 40, "font": "SimSun", "color": "#ffffff", "bold": true, "align": "left" } }, { "type": "Label", "props": { "y": 130, "x": 30, "width": 30, "var": "completion62", "valign": "middle", "text": "4", "fontSize": 30, "font": "SimHei", "color": "#ffffff", "bold": true, "align": "center" } }, { "type": "Label", "props": { "y": 130, "x": 60, "width": 30, "var": "completion63", "valign": "middle", "text": "4", "fontSize": 30, "font": "SimHei", "color": "#b5abff", "bold": true, "align": "center" } }] }] };
        return MapViewUI;
    }(View));
    ui.MapViewUI = MapViewUI;
})(ui || (ui = {}));
(function (ui) {
    var MergeCardUI = /** @class */ (function (_super) {
        __extends(MergeCardUI, _super);
        function MergeCardUI() {
            return _super.call(this) || this;
        }
        MergeCardUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.MergeCardUI.uiView);
        };
        MergeCardUI.uiView = { "type": "View", "props": { "width": 110, "height": 160 }, "child": [{ "type": "Image", "props": { "x": 0, "width": 110, "var": "mc1", "skin": "weapon_white.png", "height": 160 }, "child": [{ "type": "Label", "props": { "y": 114, "x": 55, "var": "weaname", "text": "label", "fontSize": 24, "font": "Microsoft YaHei", "color": "#4c33d1", "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 138, "x": 55, "var": "weaprice", "text": "20", "fontSize": 18, "font": "Microsoft YaHei", "color": "#d64240", "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "List", "props": { "y": 0, "x": 0, "width": 110, "var": "wealist", "spaceX": 3, "repeatY": 3, "repeatX": 2, "height": 109 }, "child": [{ "type": "Box", "props": { "y": 0, "width": 53, "renderType": "render", "height": 34 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 53, "var": "weaimg", "skin": "tuoyuan.png", "name": "weaimg", "height": 34 }, "child": [{ "type": "Label", "props": { "y": 9, "x": 26, "var": "weamaterial", "text": "label", "name": "weamaterial", "fontSize": 14, "font": "Arial", "color": "#79af5e", "bold": true, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 8, "x": 14, "var": "weagou", "skin": "yesicon.png", "scaleY": 0.2, "scaleX": 0.2, "name": "weagou" } }] }] }] }, { "type": "Label", "props": { "y": 103, "x": 0, "width": 110, "height": 0.5, "bgColor": "#000000" } }] }, { "type": "Label", "props": { "y": 1, "x": 18, "var": "mc2", "text": "收集中...", "fontSize": 16, "font": "SimHei", "color": "#d1cbcb", "bold": true } }, { "type": "Image", "props": { "y": 20, "x": 0, "var": "mc3" } }] };
        return MergeCardUI;
    }(View));
    ui.MergeCardUI = MergeCardUI;
})(ui || (ui = {}));
(function (ui) {
    var PlayerCardUI = /** @class */ (function (_super) {
        __extends(PlayerCardUI, _super);
        function PlayerCardUI() {
            return _super.call(this) || this;
        }
        PlayerCardUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.PlayerCardUI.uiView);
        };
        PlayerCardUI.uiView = { "type": "View", "props": {}, "child": [{ "type": "Image", "props": { "width": 146, "skin": "card_img.png", "height": 208 }, "child": [{ "type": "Image", "props": { "y": 176, "x": 9, "width": 128, "skin": "top_name.png", "rotation": 0, "height": 28 }, "child": [{ "type": "Label", "props": { "y": 14, "x": 64, "var": "playername", "text": "玩家", "fontSize": 12, "font": "SimSun", "color": "#ec9a98", "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 179, "x": -14, "skin": "Item_Bubble.png", "scaleY": 1.5, "scaleX": 1.5 }, "child": [{ "type": "Label", "props": { "y": 13, "x": 13, "var": "playeratk", "text": "9", "fontSize": 18, "font": "SimHei", "color": "#eaff00", "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 184, "x": 126, "skin": "tileset_icons_02.png", "scaleY": 2, "scaleX": 2 }, "child": [{ "type": "Label", "props": { "y": 6, "x": 8, "var": "playerhp", "text": "20", "fontSize": 10, "font": "SimHei", "color": "#eaff00", "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 97, "x": 66, "var": "shiled", "skin": "power.png", "scaleY": 1.05, "scaleX": 1.05, "anchorY": 0.5, "anchorX": 0.5, "alpha": 0.3 } }, { "type": "Label", "props": { "y": 205, "x": 73, "var": "shieldCount", "text": "10", "fontSize": 55, "font": "SimHei", "color": "#eaff00", "bold": true, "anchorX": 0.5 } }] }] };
        return PlayerCardUI;
    }(View));
    ui.PlayerCardUI = PlayerCardUI;
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var challengeUI = /** @class */ (function (_super) {
            __extends(challengeUI, _super);
            function challengeUI() {
                return _super.call(this) || this;
            }
            challengeUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.challengeUI.uiView);
            };
            challengeUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Button", "props": { "y": -50, "x": 5, "width": 765, "skin": "UI/button.png", "height": 1402, "alpha": 0 } }, { "type": "Sprite", "props": { "y": 366, "x": 33, "width": 708, "height": 514 }, "child": [{ "type": "Image", "props": { "y": -216, "x": -8, "width": 716, "skin": "UI/introduction_play_ruban.png", "height": 916, "sizeGrid": "50,100,50,100" } }, { "type": "Image", "props": { "y": -191, "x": 29, "width": 638, "skin": "UI/bg.png", "height": 884, "sizeGrid": "32,9,6,12" }, "child": [{ "type": "Rect", "props": { "y": 340, "x": 0, "width": 638, "lineWidth": 1, "height": 546, "fillColor": "#2677a4" } }, { "type": "Image", "props": { "y": -1, "x": 566, "var": "CloseButton", "skin": "UI/anniu_guanbi.png" } }] }] }, { "type": "List", "props": { "y": 524, "x": 98, "width": 602, "var": "weekName", "spaceY": 10, "spaceX": 35, "repeatY": 1, "repeatX": 7, "height": 370 }, "child": [{ "type": "Box", "props": { "name": "render" }, "child": [{ "type": "Label", "props": { "width": 50, "text": "1", "strokeColor": "#346ebb", "stroke": 2, "name": "text", "height": 50, "fontSize": 30, "color": "#346ebb", "centerY": 0, "centerX": 0 } }] }] }, { "type": "List", "props": { "y": 591, "x": 106, "width": 602, "var": "days", "spaceY": 10, "spaceX": 35, "repeatY": 6, "repeatX": 7, "height": 360 }, "child": [{ "type": "Box", "props": { "name": "render" }, "child": [{ "type": "Label", "props": { "y": 0, "x": 0, "width": 50, "text": "1", "strokeColor": "#346ebb", "stroke": 2, "name": "text", "height": 50, "fontSize": 35, "color": "#675f0e", "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }, { "type": "Image", "props": { "y": -6, "x": 2, "width": 50, "skin": "UI/Checkmark.png", "scaleY": 0.8, "scaleX": 0.8, "name": "doneImg", "height": 50, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": -5, "x": 2, "width": 50, "skin": "UI/select.png", "name": "selectIMG", "height": 50, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": -5, "x": 2, "width": 50, "skin": "UI/select.png", "name": "ClickIMG", "height": 50, "anchorY": 0.5, "anchorX": 0.5, "alpha": 0 } }] }] }, { "type": "Button", "props": { "y": 952, "x": 258, "width": 232, "var": "startChallenge", "skin": "UI/button.png", "name": "startChallenge", "labelStrokeColor": "#346ebb", "labelStroke": 2, "labelSize": 30, "labelFont": "SimHei", "label": "开始游戏", "height": 71 } }, { "type": "Text", "props": { "y": 422, "x": 297, "width": 168, "var": "monthText", "text": "十一月", "height": 70, "fontSize": 50, "font": "Microsoft YaHei", "color": "#346ebb", "bold": true, "align": "center" } }, { "type": "Button", "props": { "y": 438, "x": 82, "width": 68, "var": "preMonth", "strokeColors": "#346ebb", "skin": "UI/button.png", "labelStrokeColor": "#346ebb", "labelStroke": 2, "labelSize": 30, "label": "<", "height": 46 } }, { "type": "Button", "props": { "y": 436, "x": 611, "width": 68, "var": "nextMonth", "skin": "UI/button.png", "labelStrokeColor": "#346ebb", "labelStroke": 2, "labelSize": 30, "label": ">", "height": 46 } }, { "type": "Text", "props": { "y": 294, "x": 109, "width": 345, "var": "today", "text": "2018年11月8日", "height": 38, "fontSize": 55, "font": "Microsoft YaHei", "color": "#346ebb", "align": "center" } }, { "type": "Image", "props": { "y": -1, "x": -5, "width": 713, "var": "CloseButton2", "skin": "UI/anniu_guanbi.png", "height": 176, "alpha": 0 } }] };
            return challengeUI;
        }(Dialog));
        poker.challengeUI = challengeUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var ConfirmAutoPlayUI = /** @class */ (function (_super) {
            __extends(ConfirmAutoPlayUI, _super);
            function ConfirmAutoPlayUI() {
                return _super.call(this) || this;
            }
            ConfirmAutoPlayUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.ConfirmAutoPlayUI.uiView);
            };
            ConfirmAutoPlayUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Sprite", "props": { "y": 103, "x": 0, "width": 750 }, "child": [{ "type": "Image", "props": { "y": 275, "x": 51, "width": 647, "skin": "UI/bg_1.png", "height": 472 } }, { "type": "Button", "props": { "y": 601, "x": 243, "var": "shareWechat", "stateNum": 1, "skin": "UI/share.png", "name": "shareWechat", "labelSize": 30, "labelFont": "SimHei", "labelColors": "#346ebb", "labelBold": true } }, { "type": "Image", "props": { "y": 253, "x": 614, "var": "CloseBTN", "skin": "UI/btn_0.png" } }, { "type": "Image", "props": { "y": 329, "x": 304, "skin": "UI/bg_2_text.png" } }, { "type": "Image", "props": { "y": 435, "x": 167, "skin": "UI/bg_3_text.png" } }] }] };
            return ConfirmAutoPlayUI;
        }(Dialog));
        poker.ConfirmAutoPlayUI = ConfirmAutoPlayUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var ConfirmShowCardUI = /** @class */ (function (_super) {
            __extends(ConfirmShowCardUI, _super);
            function ConfirmShowCardUI() {
                return _super.call(this) || this;
            }
            ConfirmShowCardUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.ConfirmShowCardUI.uiView);
            };
            ConfirmShowCardUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Sprite", "props": { "y": 79, "x": 212 }, "child": [{ "type": "Image", "props": { "y": 275, "x": -160, "width": 647, "skin": "UI/chunbai_diban.png", "height": 472, "sizeGrid": "36,152,37,142" } }, { "type": "Text", "props": { "y": 432, "x": -72, "width": 411, "text": "使用道具,将所有暗牌解锁？", "height": 114, "fontSize": 40, "font": "SimHei", "color": "#d28908", "bold": true } }, { "type": "Button", "props": { "y": 582, "x": -13, "width": 169, "var": "GoldUse", "skin": "UI/button.png", "name": "GoldUse", "labelSize": 30, "labelFont": "SimHei", "labelColors": "#346ebb", "labelBold": true, "label": "10金币使用", "height": 59 } }, { "type": "Image", "props": { "y": 299, "x": 364, "var": "CloseBTN", "skin": "UI/anniu_guanbi.png" } }, { "type": "Button", "props": { "y": 582, "x": 180, "width": 169, "var": "videoUse", "skin": "UI/button.png", "name": "videoUse", "labelSize": 30, "labelFont": "SimHei", "labelColors": "#346ebb", "labelBold": true, "label": "看视频使用", "height": 59 } }] }] };
            return ConfirmShowCardUI;
        }(Dialog));
        poker.ConfirmShowCardUI = ConfirmShowCardUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var gameBottomUI = /** @class */ (function (_super) {
            __extends(gameBottomUI, _super);
            function gameBottomUI() {
                return _super.call(this) || this;
            }
            gameBottomUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.gameBottomUI.uiView);
            };
            gameBottomUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 148, "centerX": 0, "bottom": 0 }, "child": [{ "type": "Image", "props": { "skin": "UI/bg_bottom.png" } }, { "type": "Sprite", "props": { "y": -85, "x": 40, "name": "newgame" }, "child": [{ "type": "Image", "props": { "y": 100, "x": 0, "var": "showPopup", "skin": "UI/add.png", "name": "showPopup" } }] }, { "type": "Sprite", "props": { "y": -59, "x": -224, "width": 100, "visible": false, "name": "auto" }, "child": [{ "type": "Image", "props": { "y": 86, "var": "autoPlay", "skin": "UI/auto.png", "name": "autoPlay" } }, { "type": "Label", "props": { "y": 191, "var": "autoPlayText", "text": "自动", "fontSize": 25, "font": "SimHei", "color": "#348ff8", "centerX": 0, "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Sprite", "props": { "y": -85, "x": 638, "name": "back" }, "child": [{ "type": "Image", "props": { "y": 100, "x": 0, "var": "back", "skin": "UI/back.png", "name": "back" } }] }, { "type": "Sprite", "props": { "y": -85, "x": 399, "name": "tips" }, "child": [{ "type": "Image", "props": { "y": 100, "x": 0, "var": "showTips", "skin": "UI/tip.png" } }] }, { "type": "Sprite", "props": { "y": -85, "x": 518, "name": "showHiddenCard" }, "child": [{ "type": "Image", "props": { "y": 100, "x": 0, "var": "showHiddenCard", "skin": "UI/mingpai.png", "name": "showHiddenCard" } }] }, { "type": "Sprite", "props": { "y": -85, "x": 279, "name": "rules" }, "child": [{ "type": "Image", "props": { "y": 100, "x": 0, "var": "rules", "skin": "UI/rule.png", "name": "rules" } }] }, { "type": "Sprite", "props": { "y": -85, "x": 160, "name": "set" }, "child": [{ "type": "Image", "props": { "y": 100, "x": 0, "var": "set", "skin": "UI/btn_6.png", "name": "set" } }] }] };
            return gameBottomUI;
        }(Dialog));
        poker.gameBottomUI = gameBottomUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var gamePopupUI = /** @class */ (function (_super) {
            __extends(gamePopupUI, _super);
            function gamePopupUI() {
                return _super.call(this) || this;
            }
            gamePopupUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.gamePopupUI.uiView);
            };
            gamePopupUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 400, "centerX": 0, "bottom": 100 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 751, "var": "CloseBTN", "skin": "UI/bg_tab.png", "name": "CloseBTN", "height": 400, "alpha": 0, "sizeGrid": "25,27,20,26" } }, { "type": "Sprite", "props": { "y": 15, "x": -3, "var": "endGame" }, "child": [{ "type": "Image", "props": { "y": -8, "x": 0, "width": 204, "var": "EndGame", "skin": "UI/Popsbtn.png", "height": 79 } }, { "type": "Label", "props": { "y": 9, "x": 52, "text": "结束游戏", "fontSize": 25, "font": "Microsoft YaHei", "color": "#346ebb", "bold": true } }] }, { "type": "Sprite", "props": { "y": 175, "x": 15, "name": "reTry" }, "child": [{ "type": "Image", "props": { "y": -8, "x": 0, "var": "RETRY", "skin": "UI/btn_again.png" } }] }, { "type": "Sprite", "props": { "y": 271, "x": 15, "name": "newGame" }, "child": [{ "type": "Image", "props": { "y": -8, "x": 0, "var": "NEWGame", "skin": "UI/btn_new.png" } }] }] };
            return gamePopupUI;
        }(Dialog));
        poker.gamePopupUI = gamePopupUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var gameTopUI = /** @class */ (function (_super) {
            __extends(gameTopUI, _super);
            function gameTopUI() {
                return _super.call(this) || this;
            }
            gameTopUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.gameTopUI.uiView);
            };
            gameTopUI.uiView = { "type": "Dialog", "props": { "y": 0, "width": 750, "top": 0, "height": 40, "centerX": 0 }, "child": [{ "type": "Text", "props": { "y": -4, "x": 388, "var": "TimeCount", "text": "01:11", "name": "TimeCount", "fontSize": 37, "font": "Microsoft YaHei", "color": "#ffffff" } }, { "type": "Sprite", "props": { "y": -633, "x": 415, "visible": false, "scaleY": 0.7, "scaleX": 0.7, "name": "challenge" }, "child": [{ "type": "Image", "props": { "width": 268, "var": "challenge", "skin": "UI/Popsbtn.png", "height": 143 }, "child": [{ "type": "Label", "props": { "width": 180, "text": "每日挑战", "height": 84, "fontSize": 45, "font": "Microsoft YaHei", "color": "#346ebb", "centerY": 0, "centerX": 0, "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }] }] }, { "type": "Sprite", "props": { "y": -633, "x": 572, "visible": false, "scaleY": 0.7, "scaleX": 0.7, "name": "setting" }, "child": [{ "type": "Image", "props": { "width": 268, "var": "setting", "skin": "UI/Popsbtn.png", "height": 143 }, "child": [{ "type": "Label", "props": { "width": 100, "text": "设置", "height": 84, "fontSize": 50, "font": "Microsoft YaHei", "color": "#346ebb", "centerY": 0, "centerX": 0, "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }] }] }, { "type": "Sprite", "props": { "y": -633, "x": 730, "visible": false, "scaleY": 0.7, "scaleX": 0.7, "name": "shop" }, "child": [{ "type": "Image", "props": { "width": 268, "var": "shop", "skin": "UI/Popsbtn.png", "height": 143 }, "child": [{ "type": "Label", "props": { "width": 100, "text": "商城", "height": 84, "fontSize": 50, "font": "Microsoft YaHei", "color": "#346ebb", "centerY": 0, "centerX": 0, "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }] }] }, { "type": "Box", "props": { "y": -639, "x": 905, "visible": false, "var": "money" }, "child": [{ "type": "Text", "props": { "y": 39, "x": 134, "width": 116, "var": "GoldText", "text": "999999", "name": "GoldText", "height": 42, "fontSize": 33, "font": "Microsoft YaHei", "color": "#ffffff" } }, { "type": "Text", "props": { "y": 47, "x": 109, "text": "X", "name": "x", "fontSize": 23, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true } }, { "type": "Image", "props": { "skin": "UI/gold.png" } }] }] };
            return gameTopUI;
        }(Dialog));
        poker.gameTopUI = gameTopUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var pokerTableUI = /** @class */ (function (_super) {
            __extends(pokerTableUI, _super);
            function pokerTableUI() {
                return _super.call(this) || this;
            }
            pokerTableUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.pokerTableUI.uiView);
            };
            pokerTableUI.uiView = { "type": "View", "props": { "x": 0, "width": 750, "top": 0, "height": 1334 }, "child": [{ "type": "Sprite", "props": { "y": 95, "x": 51, "width": 637, "name": "BackGround", "height": 411 }, "child": [{ "type": "Image", "props": { "y": -99, "x": -404, "width": 1500, "var": "BGImg", "skin": "login/bk.jpg", "height": 1766, "alpha": 0.7 } }, { "type": "Rect", "props": { "y": -97, "x": -88, "width": 908, "lineWidth": 1, "height": 1723, "fillColor": "#172c4c" } }] }, { "type": "Sprite", "props": { "y": 1282, "x": 185, "width": 50, "name": "message", "mouseThrough": false, "mouseEnabled": false, "hitTestPrior": false, "height": 50 }, "child": [{ "type": "Text", "props": { "y": -204, "x": -144, "var": "message", "text": "这是一条提示信息", "name": "message", "mouseThrough": false, "mouseEnabled": false, "hitTestPrior": false, "fontSize": 30, "font": "SimHei", "color": "#ffffff", "alpha": 0, "align": "left" } }] }, { "type": "Sprite", "props": { "y": 334, "x": 63, "width": 656, "name": "PokerTable", "height": 627 }, "child": [{ "type": "Sprite", "props": { "y": 32, "x": -48, "var": "Line1", "scaleY": 1, "scaleX": 1, "name": "Line1" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": 32, "x": 56, "var": "Line2", "scaleY": 1, "scaleX": 1, "name": "Line2" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": 32, "x": 160, "var": "Line3", "scaleY": 1, "scaleX": 1, "name": "Line3" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": 32, "x": 264, "var": "Line4", "scaleY": 1, "scaleX": 1, "name": "Line4" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": 32, "x": 367, "var": "Line5", "scaleY": 1, "scaleX": 1, "name": "Line5" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": 32, "x": 471, "var": "Line6", "scaleY": 1, "scaleX": 1, "name": "Line6" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": 32, "x": 575, "var": "Line7", "scaleY": 1, "scaleX": 1, "name": "Line7" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": -141, "x": 388, "var": "ThreeCard", "scaleY": 1, "scaleX": 1, "name": "ThreeCard" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": -141, "x": 575, "var": "StartCard", "scaleY": 1, "scaleX": 1, "name": "StartCard" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": -141, "x": -48, "var": "Deck1", "scaleY": 1, "scaleX": 1, "name": "Deck1" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": -141, "x": 56, "var": "Deck2", "scaleY": 1, "scaleX": 1, "name": "Deck2" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": -141, "x": 160, "var": "Deck3", "scaleY": 1, "scaleX": 1, "name": "Deck3" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": -141, "x": 264, "var": "Deck4", "scaleY": 1, "scaleX": 1, "name": "Deck4" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": -699, "x": -436, "var": "tutorialMask", "name": "tutorialMask", "mouseThrough": true, "mouseEnabled": true, "hitTestPrior": true, "alpha": 0.5 }, "child": [{ "type": "Rect", "props": { "y": 0, "x": 0, "width": 1380, "lineWidth": 0, "lineColor": "#000000", "height": 2153, "fillColor": "#000000" } }] }, { "type": "Sprite", "props": { "y": 0, "x": 0, "scaleY": 1, "scaleX": 1, "name": "tutorialCardSpr" }, "child": [{ "type": "Sprite", "props": { "var": "tutorialCardSpr1", "name": "tutorialCardSpr1" } }] }, { "type": "Sprite", "props": { "y": 10, "x": 10, "scaleY": 1, "scaleX": 1, "name": "tutorialCardSpr" }, "child": [{ "type": "Sprite", "props": { "var": "tutorialCardSpr2", "name": "tutorialCardSpr2" } }] }, { "type": "Sprite", "props": { "y": -126, "x": 3, "var": "LineMove", "scaleY": 1, "scaleX": 1, "name": "LineMove", "mouseThrough": false, "mouseEnabled": false, "hitTestPrior": false } }, { "type": "Sprite", "props": { "y": 0, "x": 0, "var": "LineTips", "scaleY": 1, "scaleX": 1, "name": "LineTips", "mouseThrough": false, "mouseEnabled": false, "hitTestPrior": false, "alpha": 0.8 } }] }] };
            return pokerTableUI;
        }(View));
        poker.pokerTableUI = pokerTableUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var settingPopupUI = /** @class */ (function (_super) {
            __extends(settingPopupUI, _super);
            function settingPopupUI() {
                return _super.call(this) || this;
            }
            settingPopupUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.settingPopupUI.uiView);
            };
            settingPopupUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 1000, "x": 64, "skin": "UI/bg_1.png", "scaleY": -1 } }, { "type": "Sprite", "props": { "y": 256, "x": 87 } }, { "type": "Text", "props": { "y": 542, "x": 890, "var": "lefthandText", "text": "左手习惯", "fontSize": 30, "font": "SimHei", "color": "#5077aa" } }, { "type": "Text", "props": { "y": 577, "x": 890, "var": "timerText", "text": "计时器", "fontSize": 30, "font": "SimHei", "color": "#5077aa" } }, { "type": "Text", "props": { "y": 612, "x": 890, "var": "threecardOnce", "text": "一次发三张", "fontSize": 30, "font": "SimHei", "color": "#5077aa" } }, { "type": "Text", "props": { "y": 648, "x": 889, "var": "lasvigasMode", "text": "维加斯模式", "fontSize": 30, "font": "SimHei", "color": "#5077aa" } }, { "type": "Text", "props": { "y": 507, "x": 892, "var": "soundText", "text": "音效", "height": 30, "fontSize": 30, "font": "SimHei", "color": "#5077aa" } }, { "type": "Sprite", "props": { "y": 591, "x": 479, "var": "timerSwitch", "name": "switch" }, "child": [{ "type": "Image", "props": { "skin": "UI/1.png", "name": "state1" } }, { "type": "Image", "props": { "skin": "UI/2.png", "name": "state2" } }, { "type": "Image", "props": { "skin": "UI/3.png", "name": "state3" } }] }, { "type": "Sprite", "props": { "y": 481, "x": 479, "var": "lefthandSwitch", "name": "switch" }, "child": [{ "type": "Image", "props": { "skin": "UI/1.png", "name": "state1" } }, { "type": "Image", "props": { "skin": "UI/2.png", "name": "state2" } }, { "type": "Image", "props": { "skin": "UI/3.png", "name": "state3" } }] }, { "type": "Sprite", "props": { "y": 700, "x": 479, "var": "threecardSwitch", "name": "switch" }, "child": [{ "type": "Image", "props": { "skin": "UI/1.png", "name": "state1" } }, { "type": "Image", "props": { "skin": "UI/2.png", "name": "state2" } }, { "type": "Image", "props": { "skin": "UI/3.png", "name": "state3" } }] }, { "type": "Sprite", "props": { "y": 809, "x": 479, "var": "vigasSwitch", "name": "switch" }, "child": [{ "type": "Image", "props": { "skin": "UI/1.png", "name": "state1" } }, { "type": "Image", "props": { "skin": "UI/2.png", "name": "state2" } }, { "type": "Image", "props": { "skin": "UI/3.png", "name": "state3" } }] }, { "type": "Sprite", "props": { "y": 372, "x": 479, "var": "soundSwitch", "name": "switch" }, "child": [{ "type": "Image", "props": { "skin": "UI/1.png", "name": "state1" } }, { "type": "Image", "props": { "skin": "UI/2.png", "name": "state2" } }, { "type": "Image", "props": { "skin": "UI/3.png", "name": "state3" } }] }, { "type": "Image", "props": { "y": 592, "x": 198, "width": 412, "var": "timerBTN", "skin": "UI/Popsbtn.png", "height": 72, "alpha": 0 } }, { "type": "Image", "props": { "y": 479, "x": 187, "width": 426, "var": "lefthandBTN", "skin": "UI/Popsbtn.png", "height": 84, "alpha": 0 } }, { "type": "Image", "props": { "y": 361, "x": 197, "width": 413, "var": "soundBTNImg", "skin": "UI/Popsbtn.png", "height": 83, "alpha": 0 } }, { "type": "Image", "props": { "y": 681, "x": 164, "width": 429, "var": "ThreeCardBTN", "skin": "UI/Popsbtn.png", "height": 80, "alpha": 0 } }, { "type": "Image", "props": { "y": 804, "x": 165, "width": 419, "var": "VigasBTN", "skin": "UI/Popsbtn.png", "height": 71, "alpha": 0 } }, { "type": "Image", "props": { "y": 244, "x": 605, "var": "CloseBTN", "skin": "UI/btn_0.png" } }, { "type": "Image", "props": { "y": -123, "x": 9, "width": 524, "var": "CloseBTN2", "skin": "UI/anniu_guanbi.png", "scaleY": 0.5, "scaleX": 0.5, "height": 74, "alpha": 0 } }, { "type": "Image", "props": { "y": 490, "x": 166, "skin": "UI/bg_3.png" } }, { "type": "Image", "props": { "y": 599, "x": 166, "skin": "UI/bg_4.png" } }, { "type": "Image", "props": { "y": 707, "x": 166, "skin": "UI/bg_5.png" } }, { "type": "Image", "props": { "y": 816, "x": 166, "skin": "UI/bg_6text.png" } }, { "type": "Image", "props": { "y": 381, "x": 166, "skin": "UI/sound_1.png" } }, { "type": "Image", "props": { "y": 453, "x": 132, "skin": "UI/bg_7.png" } }, { "type": "Image", "props": { "y": 562, "x": 132, "skin": "UI/bg_7.png" } }, { "type": "Image", "props": { "y": 672, "x": 132, "skin": "UI/bg_7.png" } }, { "type": "Image", "props": { "y": 793, "x": 132, "skin": "UI/bg_7.png" } }] };
            return settingPopupUI;
        }(View));
        poker.settingPopupUI = settingPopupUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var ShopUI = /** @class */ (function (_super) {
            __extends(ShopUI, _super);
            function ShopUI() {
                return _super.call(this) || this;
            }
            ShopUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.ShopUI.uiView);
            };
            ShopUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Sprite", "props": { "y": 71, "x": 3 }, "child": [{ "type": "Image", "props": { "y": -155, "x": -133, "width": 1000, "skin": "UI/img_bg_bluefelt_thumb.png", "height": 2000 } }] }, { "type": "Sprite", "props": { "y": 241, "x": -25 }, "child": [{ "type": "Image", "props": { "y": -16, "x": 69, "width": 670, "skin": "UI/chunbai_diban.png", "height": 1089, "sizeGrid": "36,152,37,142" } }, { "type": "Tab", "props": { "y": 14, "x": 136, "var": "tab", "skin": "UI/tab.png", "selectedIndex": 0, "scaleY": 0.85, "scaleX": 0.85, "name": "tab", "labels": "背景,牌面,牌背", "labelSize": 36, "labelPadding": "0", "labelFont": "SimHei", "labelColors": "#ffffff,#ffffff,#ffffff" } }, { "type": "Label", "props": { "y": -53, "x": 54, "var": "BackBTN", "text": "< 返回", "name": "BackBTN", "fontSize": 40, "font": "Microsoft YaHei", "color": "#a8dff9" } }, { "type": "Label", "props": { "y": -53, "x": 54, "var": "CloseBTN", "text": "< 返回", "name": "CloseBTN", "fontSize": 40, "font": "Microsoft YaHei", "color": "#a8dff9" } }] }, { "type": "Text", "props": { "y": 175, "x": 316, "text": "商城", "strokeColor": "#7d97ea", "stroke": 1, "fontSize": 50, "font": "SimHei", "color": "#ffffff" } }, { "type": "ViewStack", "props": { "y": 335, "x": 67, "width": 690, "var": "viewstack", "selectedIndex": 0, "name": "viewstack", "height": 981 }, "child": [{ "type": "List", "props": { "y": -10, "x": 39, "width": 617, "var": "listBG", "vScrollBarSkin": "UI/vscroll.png", "spaceX": 3, "name": "item0", "height": 933 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 274, "renderType": "render", "name": "render", "height": 318 }, "child": [{ "type": "Rect", "props": { "y": 259, "x": -2, "width": 273, "lineWidth": 1, "height": 51, "fillColor": "#273755" } }, { "type": "Image", "props": { "y": 0, "x": -2, "width": 909, "skin": "UI/Bg_6.png", "scaleY": 0.3, "scaleX": 0.3, "name": "icon1", "height": 881 } }, { "type": "Image", "props": { "y": 56, "x": 58, "skin": "UI/cardskin1.png", "scaleY": 0.6, "scaleX": 0.6, "name": "cardShow" } }, { "type": "Button", "props": { "y": 209, "x": 3, "width": 125, "skin": "UI/btn_3.png", "name": "buy", "labelSize": 25, "labelFont": "SimHei", "labelColors": "#ffffff", "label": "1元", "height": 43 } }, { "type": "Button", "props": { "y": 209, "x": 133, "width": 131, "skin": "UI/btn_3.png", "name": "try", "labelSize": 25, "labelFont": "SimHei", "labelColors": "#ffffff", "label": "体验", "height": 43 } }, { "type": "Label", "props": { "y": 264, "text": "国王背景", "name": "name", "fontSize": 25, "font": "Microsoft YaHei", "color": "#fdfdfd", "centerX": 0, "align": "center" } }, { "type": "Button", "props": { "y": 207, "x": 35, "width": 181, "skin": "UI/btn_3.png", "name": "use", "labelSize": 25, "labelFont": "SimHei", "labelColors": "#ffffff", "label": "使用", "height": 46 } }, { "type": "Text", "props": { "y": 213, "x": 72, "text": "正在使用", "name": "using", "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true } }, { "type": "Rect", "props": { "y": -1, "x": -2, "width": 273, "lineWidth": 1, "height": 263, "fillColor": "#346ebb" } }] }] }, { "type": "List", "props": { "y": -9, "x": 36, "width": 617, "var": "listCard", "vScrollBarSkin": "UI/vscroll.png", "spaceX": 5, "name": "item1", "height": 933 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 269, "renderType": "render", "name": "render", "height": 318 }, "child": [{ "type": "Image", "props": { "y": 262, "x": -2, "width": 270, "skin": "UI/background.png", "scaleY": -1, "height": 265 } }, { "type": "Rect", "props": { "y": 261, "x": 1, "width": 265, "lineWidth": 1, "height": 43, "fillColor": "#273755" } }, { "type": "Image", "props": { "y": 181, "x": 168, "skin": "UI/img_card_c01.png", "rotation": -20, "name": "icon1", "anchorY": 1, "anchorX": 1 } }, { "type": "Image", "props": { "y": 36, "x": 88, "skin": "UI/img_card_c01.png", "name": "icon2" } }, { "type": "Image", "props": { "y": 224, "x": 223, "skin": "UI/img_card_c01.png", "rotation": 10, "name": "icon3", "anchorY": 1, "anchorX": 1 } }, { "type": "Button", "props": { "y": 209, "x": -3, "width": 131, "skin": "UI/btn_3.png", "name": "buy", "labelSize": 25, "labelFont": "SimHei", "labelColors": "#ffffff", "label": "1元", "height": 43 } }, { "type": "Button", "props": { "y": 209, "x": 133, "width": 131, "skin": "UI/btn_3.png", "name": "try", "labelSize": 25, "labelFont": "SimHei", "labelColors": "#ffffff", "label": "体验", "height": 43 } }, { "type": "Label", "props": { "y": 266, "text": "国王背景", "name": "name", "fontSize": 25, "font": "Microsoft YaHei", "color": "#fdfdfd", "centerX": 0, "align": "center" } }, { "type": "Button", "props": { "y": 207, "x": 35, "width": 181, "skin": "UI/btn_3.png", "name": "use", "labelSize": 25, "labelFont": "SimHei", "labelColors": "#ffffff", "label": "使用", "height": 46 } }, { "type": "Text", "props": { "y": 208, "x": 78, "text": "正在使用", "name": "using", "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true } }] }] }, { "type": "List", "props": { "y": -10, "x": 41, "width": 617, "var": "listCardBack", "vScrollBarSkin": "UI/vscroll.png", "spaceX": 1, "name": "item2", "height": 933 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 270, "renderType": "render", "name": "render", "height": 305 }, "child": [{ "type": "Image", "props": { "y": 262, "x": 0, "width": 268, "skin": "UI/background.png", "scaleY": -1, "height": 265 } }, { "type": "Rect", "props": { "y": 259, "x": -1, "width": 270, "lineWidth": 1, "height": 43, "fillColor": "#273755" } }, { "type": "Image", "props": { "y": 187, "x": 170, "skin": "UI/img_card_c01.png", "rotation": -20, "name": "icon1", "anchorY": 1, "anchorX": 1 } }, { "type": "Image", "props": { "y": 42, "x": 90, "skin": "UI/img_card_c01.png", "name": "icon2" } }, { "type": "Image", "props": { "y": 230, "x": 225, "skin": "UI/img_card_c01.png", "rotation": 10, "name": "icon3", "anchorY": 1, "anchorX": 1 } }, { "type": "Button", "props": { "y": 209, "x": -3, "width": 131, "skin": "UI/btn_3.png", "name": "buy", "labelSize": 25, "labelFont": "SimHei", "labelColors": "#ffffff", "label": "1元", "height": 43 } }, { "type": "Button", "props": { "y": 209, "x": 133, "width": 131, "skin": "UI/btn_3.png", "name": "try", "labelSize": 25, "labelFont": "SimHei", "labelColors": "#ffffff", "label": "体验", "height": 43 } }, { "type": "Label", "props": { "y": 264, "text": "国王背景", "name": "name", "fontSize": 25, "font": "Microsoft YaHei", "color": "#fdfdfd", "centerX": -20, "align": "center" } }, { "type": "Button", "props": { "y": 207, "x": 35, "width": 181, "skin": "UI/btn_3.png", "name": "use", "labelSize": 25, "labelFont": "SimHei", "labelColors": "#ffffff", "label": "使用", "height": 46 } }, { "type": "Text", "props": { "y": 210, "x": 74, "text": "正在使用", "name": "using", "fontSize": 30, "font": "Microsoft YaHei", "color": "#f7f8f4", "bold": true } }] }] }] }, { "type": "Text", "props": { "y": 195, "x": 632, "width": 116, "var": "GoldText", "text": "999999", "name": "GoldText", "height": 42, "fontSize": 33, "font": "Microsoft YaHei", "color": "#ffffff" } }, { "type": "Text", "props": { "y": 203, "x": 607, "text": "X", "name": "x", "fontSize": 23, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true } }, { "type": "Image", "props": { "y": 156, "x": 498, "skin": "UI/gold.png" } }, { "type": "Sprite", "props": { "y": 626, "x": 242, "width": 50, "name": "message", "mouseThrough": false, "mouseEnabled": false, "hitTestPrior": false, "height": 50 }, "child": [{ "type": "Text", "props": { "y": -6, "x": -7, "var": "message", "text": "这是一条提示信息", "name": "message", "mouseThrough": false, "mouseEnabled": false, "hitTestPrior": false, "fontSize": 30, "font": "SimHei", "color": "#ffffff", "alpha": 0, "align": "left" } }] }] };
            return ShopUI;
        }(View));
        poker.ShopUI = ShopUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var StartGameUI = /** @class */ (function (_super) {
            __extends(StartGameUI, _super);
            function StartGameUI() {
                return _super.call(this) || this;
            }
            StartGameUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.StartGameUI.uiView);
            };
            StartGameUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Rect", "props": { "y": 2, "x": -27, "width": 800, "lineWidth": 1, "height": 2111, "fillColor": "#346ebb" } }, { "type": "Text", "props": { "y": 358, "x": 111, "text": "经典接龙升级版", "strokeColor": "#eac77d", "stroke": 1, "fontSize": 80, "font": "SimHei", "color": "#ffffff", "blendMode": "lighter" } }, { "type": "Button", "props": { "y": 930, "x": 258, "width": 242, "var": "shop", "strokeColors": "#346ebb", "skin": "UI/button.png", "name": "shop", "labelStrokeColor": "#346ebb", "labelStroke": 2, "labelSize": 40, "labelFont": "SimHei", "label": "商城", "height": 118 } }, { "type": "Button", "props": { "y": 755, "x": 259, "width": 240, "var": "startGame", "skin": "UI/button.png", "name": "startGame", "labelStrokeColor": "#346ebb", "labelStroke": 2, "labelSize": 40, "labelFont": "SimHei", "label": "开始游戏", "height": 115 } }] };
            return StartGameUI;
        }(View));
        poker.StartGameUI = StartGameUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var tutorialUI = /** @class */ (function (_super) {
            __extends(tutorialUI, _super);
            function tutorialUI() {
                return _super.call(this) || this;
            }
            tutorialUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.tutorialUI.uiView);
            };
            tutorialUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 550, "centerX": 0, "bottom": 0 }, "child": [{ "type": "Image", "props": { "y": 408, "x": 60, "width": 663, "skin": "UI/introduction_play_ruban.png", "scaleY": -1, "height": 262, "sizeGrid": "50,100,50,100" } }, { "type": "Label", "props": { "y": 175, "x": 75, "width": 439, "var": "tutorialDesc", "text": "新手指引文本", "strokeColor": "#668ab0", "stroke": 1, "name": "tutorialDesc", "height": 198, "fontSize": 35, "font": "SimHei", "color": "#ffffff", "bold": false } }, { "type": "Sprite", "props": { "y": 329, "x": 516, "width": 185, "height": 61 }, "child": [{ "type": "Image", "props": { "var": "QuitTutorial", "skin": "UI/btn_1.png" } }] }] };
            return tutorialUI;
        }(Dialog));
        poker.tutorialUI = tutorialUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var WinUI = /** @class */ (function (_super) {
            __extends(WinUI, _super);
            function WinUI() {
                return _super.call(this) || this;
            }
            WinUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.WinUI.uiView);
            };
            WinUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Button", "props": { "y": 0, "x": 0, "width": 741, "skin": "UI/button.png", "label": "label", "height": 1316, "alpha": 0 } }, { "type": "Sprite", "props": { "y": 199, "x": 92 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "UI/result_3.png" } }, { "type": "Text", "props": { "y": 354, "x": 276, "var": "timeCount", "text": "00:25", "name": "timeCount", "fontSize": 35, "color": "#ffffff", "bold": true } }, { "type": "Button", "props": { "y": 540, "x": 151, "var": "startNewgame", "stateNum": 1, "skin": "UI/result_2.png", "name": "startNewgame", "labelSize": 30, "labelFont": "Microsoft YaHei", "labelColors": "#d28908", "labelBold": true } }, { "type": "Image", "props": { "y": 345, "x": 187, "skin": "UI/result_1.png" } }, { "type": "Button", "props": { "y": 693, "x": 151, "visible": false, "var": "shareBtn", "stateNum": 1, "skin": "UI/share.png", "labelSize": 30, "labelFont": "Microsoft YaHei", "labelColors": "#d28908", "labelBold": true } }] }] };
            return WinUI;
        }(Dialog));
        poker.WinUI = WinUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var SelectDeckViewUI = /** @class */ (function (_super) {
        __extends(SelectDeckViewUI, _super);
        function SelectDeckViewUI() {
            return _super.call(this) || this;
        }
        SelectDeckViewUI.prototype.createChildren = function () {
            View.regComponent("ui.DuelCardUI", ui.DuelCardUI);
            _super.prototype.createChildren.call(this);
            this.createView(ui.SelectDeckViewUI.uiView);
        };
        SelectDeckViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "purple.png", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Label", "props": { "y": 1207, "var": "startBtn", "text": "开始游戏", "fontSize": 50, "font": "SimHei", "color": "#ffffff", "centerX": 0, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 45, "x": 375, "text": "请挑选卡牌组成卡组", "fontSize": 50, "font": "SimHei", "color": "#ffffff", "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 1269, "x": 375, "var": "arrayLabel", "fontSize": 30, "font": "SimHei", "color": "#ad9696", "centerX": -1, "anchorX": 0.5 } }, { "type": "List", "props": { "y": 127, "x": 27, "width": 695, "var": "cardList", "spaceY": 60, "spaceX": 30, "repeatY": 3, "repeatX": 3, "height": 1062 }, "child": [{ "type": "Box", "props": { "x": 10, "renderType": "render" }, "child": [{ "type": "DuelCard", "props": { "scaleY": 1.4, "scaleX": 1.4, "name": "cardView", "runtime": "ui.DuelCardUI" } }, { "type": "Image", "props": { "y": 0, "x": 40, "skin": "yesicon.png", "scaleY": 0.5, "scaleX": 0.5, "name": "selectOne" } }, { "type": "Image", "props": { "y": 0, "x": 104, "skin": "yesicon.png", "scaleY": 0.5, "scaleX": 0.5, "name": "selectTwo" } }] }] }] };
        return SelectDeckViewUI;
    }(View));
    ui.SelectDeckViewUI = SelectDeckViewUI;
})(ui || (ui = {}));
(function (ui) {
    var shopPTableUI = /** @class */ (function (_super) {
        __extends(shopPTableUI, _super);
        function shopPTableUI() {
            return _super.call(this) || this;
        }
        shopPTableUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.shopPTableUI.uiView);
        };
        shopPTableUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Sprite", "props": { "y": -3, "x": 0, "width": 750, "name": "PokerTable", "height": 1334 }, "child": [{ "type": "Sprite", "props": { "y": 442, "x": 180, "width": 102, "scaleY": 1, "scaleX": 1, "name": "ThreeCard", "height": 152 } }, { "type": "Sprite", "props": { "y": 442, "x": 410, "width": 102, "scaleY": 1, "scaleX": 1, "name": "StartCard", "height": 152 } }, { "type": "Sprite", "props": { "y": 668, "x": 150, "width": 102, "visible": true, "scaleY": 1, "scaleX": 1, "name": "Deck1", "height": 152 } }, { "type": "Sprite", "props": { "y": 668, "x": 254, "width": 102, "visible": true, "scaleY": 1, "scaleX": 1, "name": "Deck2", "height": 152 } }, { "type": "Sprite", "props": { "y": 668, "x": 358, "width": 102, "visible": true, "scaleY": 1, "scaleX": 1, "name": "Deck3", "height": 152 } }, { "type": "Sprite", "props": { "y": 668, "x": 462, "width": 102, "visible": true, "scaleY": 1, "scaleX": 1, "name": "Deck4", "height": 152 } }, { "type": "Sprite", "props": { "y": 214, "x": 106, "width": 110, "visible": true, "scaleY": 1, "scaleX": 1, "name": "Build1", "height": 160 } }, { "type": "Sprite", "props": { "y": 214, "x": 230, "width": 110, "visible": true, "scaleY": 1, "scaleX": 1, "name": "Build2", "height": 160 } }, { "type": "Sprite", "props": { "y": 214, "x": 354, "width": 110, "visible": true, "scaleY": 1, "scaleX": 1, "name": "Build3", "height": 160 } }, { "type": "Sprite", "props": { "y": 214, "x": 478, "width": 110, "visible": true, "scaleY": 1, "scaleX": 1, "name": "Build4", "height": 160 } }, { "type": "Label", "props": { "y": 127, "x": 300, "var": "earncoin", "text": "200", "fontSize": 50, "font": "SimSun", "color": "#ffffff", "bold": true, "anchorY": 0.5 }, "child": [{ "type": "Image", "props": { "y": 25, "x": -30, "width": 48, "skin": "coin.png", "height": 48, "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 504, "x": 0, "width": 120, "var": "trashcan", "height": 180 }, "child": [{ "type": "Image", "props": { "y": 100, "x": 60, "skin": "trashcan.png", "scaleY": 0.5, "scaleX": 0.5, "anchorY": 0.58, "anchorX": 0.5 } }] }, { "type": "Label", "props": { "y": 518, "x": 590, "var": "costcoin", "text": "1", "fontSize": 40, "font": "SimSun", "color": "#ffffff", "bold": true, "anchorY": 0.5 }, "child": [{ "type": "Image", "props": { "y": 20, "x": -30, "width": 36, "skin": "coin.png", "height": 36, "anchorY": 0.5, "anchorX": 0.5 } }] }] }] };
        return shopPTableUI;
    }(View));
    ui.shopPTableUI = shopPTableUI;
})(ui || (ui = {}));
(function (ui) {
    var wx;
    (function (wx) {
        var loginUI = /** @class */ (function (_super) {
            __extends(loginUI, _super);
            function loginUI() {
                return _super.call(this) || this;
            }
            loginUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.wx.loginUI.uiView);
            };
            loginUI.uiView = { "type": "View", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "child": [{ "type": "Image", "props": { "var": "bk", "top": 0, "skin": "login/bk.jpg", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Image", "props": { "y": 460, "x": 375, "visible": false, "var": "logo", "skin": "login/logo.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 800, "x": 375, "visible": false, "var": "btnStar", "skin": "login/star.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 600, "x": 375, "visible": false, "var": "login", "skin": "login/bk2.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 288, "x": 225, "var": "btnStar2", "skin": "login/login.png", "anchorY": 0, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 300, "x": 115, "skin": "login/bg_2.png" } }, { "type": "Image", "props": { "y": 991, "var": "prg", "skin": "new/prg2.png", "centerX": 0, "bottom": 300 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 30.6, "var": "prg2", "skin": "new/prg1.png", "sizeGrid": "0,30,0,30", "height": 43 } }] }] };
            return loginUI;
        }(View));
        wx.loginUI = loginUI;
    })(wx = ui.wx || (ui.wx = {}));
})(ui || (ui = {}));
(function (ui) {
    var YUI = /** @class */ (function (_super) {
        __extends(YUI, _super);
        function YUI() {
            return _super.call(this) || this;
        }
        YUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.YUI.uiView);
        };
        YUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 343, "x": 148, "width": 456, "skin": "purple.png", "height": 455, "alpha": 0.9 } }, { "type": "Image", "props": { "y": 570, "x": 375, "width": 740, "skin": "grid (1).png", "height": 740, "anchorY": 0.5, "anchorX": 0.5, "alpha": 0.05 } }, { "type": "Image", "props": { "y": 570, "x": 375, "width": 440, "skin": "board.png", "sizeGrid": "4,4,4,4", "height": 440, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 501, "x": 241, "skin": "sign.png", "scaleY": 0.5, "scaleX": 0.5 } }, { "type": "Box", "props": { "y": 533, "x": 264, "width": 74, "var": "lpBox", "height": 74, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "var": "lp1", "top": 0, "skin": "loop1.png", "rotation": 0, "right": 0, "left": 0, "bottom": 0, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "var": "lp2", "top": 0, "skin": "loop2.png", "right": 0, "left": 0, "bottom": 0, "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 607, "x": 337, "width": 52.3, "skin": "stone.png", "height": 50, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 508, "x": 245, "width": 38, "skin": "lock.png", "height": 48 } }, { "type": "Image", "props": { "y": 607, "x": 409.3, "width": 52.3, "skin": "stone.png", "height": 50, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 607, "x": 484, "width": 52.3, "skin": "stone.png", "height": 50, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 677, "x": 337, "width": 52.3, "skin": "stone.png", "height": 50, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 677, "x": 409.3, "width": 52.3, "skin": "stone.png", "height": 50, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 677, "x": 484, "width": 52.3, "skin": "stone.png", "height": 50, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 752, "x": 338, "width": 52.3, "skin": "stone.png", "height": 50, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 752, "x": 409.3, "width": 52.3, "skin": "stone.png", "height": 50, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 752, "x": 484, "width": 52.3, "skin": "stone.png", "height": 50, "anchorY": 0.5, "anchorX": 0.5 } }] };
        return YUI;
    }(View));
    ui.YUI = YUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map