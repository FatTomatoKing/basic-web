import {PageParam} from "@/api/common/type";


export class AccountForm extends PageParam {

}


export class AccountInfo {
    constructor(id: number,
                envName: string,
                website: string,
                username: string,
                password: string,
                secretKey: string,
                orderNum: number,
                description: string
    ) {
        this.id = id;
        this.envName = envName;
        this.website = website;
        this.username = username;
        this.password = password;
        this.secretKey = secretKey;
        this.orderNum = orderNum;
        this.description = description;
    }

    public id: number
    public envName: string
    public website: string
    public username: string
    public password: string
    public secretKey: string
    public orderNum: number
    public description: string
}
