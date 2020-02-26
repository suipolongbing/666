/*
* 锻造材料卡;
*/
class CCard {

    public data: CData;//卡数据
    public render: CRender  //卡渲染体


    constructor(type: CType, no: number) {

        this.data = new CData(type, no);
    }
    public Dispose() {
        if (this.render != null) {
            this.render.Dispose();
        }

    }
    public CreateRender() {
        this.render = new CRender();
        this.render.ChangeRenderByData(this.data);

    }
    public FlushRender() {
        if (this.render == null) {
            this.CreateRender();

        }
        else {
            this.render.ChangeRenderByData(this.data);
        }

    }
}