import {PageParam} from "@/api/common/type";


export class BrandForm extends PageParam{

}


export class BrandEntity {
    constructor(id: number, tmName: string, logoUrl: string) {
        this.id = id;
        this.tmName = tmName;
        this.logoUrl = logoUrl;
    }

    public id: number
    public tmName: string
    public logoUrl: string
}