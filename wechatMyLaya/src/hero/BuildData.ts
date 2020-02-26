/*
* name;
*/
class BuildData {

    public IsCardBack: boolean;//是否为卡背面

    public mType: BuildType;

    constructor(vType: BuildType) {
        this.mType = vType;
    }
    public SetData(data: BuildData) {
        this.mType = data.mType;
    }
    public static Getkey(type: BuildType): number//获得唯一key
    {
        return type * 1000;
    }

    public Getkey(): number//获得唯一key
    {
        return this.mType * 1000;
    }
    public Clone(): BuildData {
        return new BuildData(this.mType);
    }

    public IsDZS(): boolean {
        return this.mType == BuildType.duanzaoshi;
    }
    public IsCM(): boolean {
        return this.mType == BuildType.cuimu;
    }
    public IsQS(): boolean {
        return this.mType == BuildType.qishi;
    }
    public IsMX(): boolean {
        return this.mType == BuildType.mixian;
    }
    public IsYG(): boolean {
        return this.mType == BuildType.yugang;
    }
    public IsWG(): boolean {
        return this.mType == BuildType.wugang;
    }
}