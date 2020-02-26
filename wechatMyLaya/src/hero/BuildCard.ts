/*
* 锻造材料卡;
*/
class BuildCard {

    public data: BuildData;//卡数据
    public render: BuildRender  //卡渲染体


    constructor(type: BuildType) {

        this.data = new BuildData(type);
    }
    public Dispose() {
        if (this.render != null) {
            this.render.Dispose();
        }

    }
    public CreateRender() {
        this.render = new BuildRender();
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