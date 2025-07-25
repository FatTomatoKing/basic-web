import {PageParam} from "@/api/common/type.ts";

/**
 * 搜索表单的类型定义
 * 继承自分页参数，并添加了具体的搜索字段
 */
export class AccountForm extends PageParam {
    // 将搜索字段定义为可选属性，并给予初始值
    public envName?: string = '';
    public website?: string = '';
    public username?: string = '';

    constructor(page: number, limit: number, envName?: string, website?: string, username?: string) {
        super(page, limit); // 调用父类的构造函数
        this.envName = envName;
        this.website = website;
        this.username = username;
    }
}

/**
 * 账号信息的类型定义
 * 使用属性初始化器来代替冗长的构造函数，使创建空对象更简单
 */
export class AccountInfo {
    public id: number | null = null;
    public envName: string = '';
    public website: string = '';
    public username: string = '';
    public password: string = '';
    public secretKey: string = '';
    public orderNum: number = 0;
    public description: string = '';
}
