/*
* name;
*/
class ConnectView extends ui.ConnectViewUI {
    constructor() {
        super();
    }

    onShow(bool) {
        if (bool) {
            this.visible = true;
            this.AddEvent();
        } else {
            this.visible = false;
            this.RemoveEvent();
        }
    }

    onClosed() {
        console.log("666")
    }

    AddEvent() {
        this.randomMatchBtn.on(Laya.Event.CLICK, this, this.MatchRandom);
        this.roomMatchBtn.on(Laya.Event.CLICK, this, this.MatchRoom);
    }

    RemoveEvent() {
        this.randomMatchBtn.off(Laya.Event.CLICK, this, this.MatchRandom);
        this.roomMatchBtn.off(Laya.Event.CLICK, this, this.MatchRoom);
    }

    MatchRoom() {
        var xxx;
        if (this.roomNumberTxt.text.length > 0) {
            xxx = Number(this.roomNumberTxt.text);
        } else {
            return;
        }

        SocketManager.Inst.RoomMatch(xxx);
    }

    MatchRandom() {
        SocketManager.Inst.RandomMatch();
    }
}