export class ResponseResult<T> {
    public code: number;
    public message: string;
    public data: T;

    static SUCCESS_CODE: number = 0;

    constructor(code: number, message: string, data: T) {
        this.code = code;
        this.data = data;
        this.message = message;
    }

    // 判断是否成功
    // 将箭头函数改为传统方法
    isSuccess(): boolean {
        return this.code === ResponseResult.SUCCESS_CODE;
    }
}

export class PageParam {
    public pageNum: number
    public pageSize: number

    constructor(pageNum: string, pageSize: string) {
        this.pageNum = pageNum
        this.pageSize = pageSize
    }
}

export class PageResult<T> {
    public list: T[];
    public total: number;

    constructor(list: T[] = [], total: number = 0) {
        this.list = list;
        this.total = total;
    }

    // 静态方法：返回空分页
    static empty<T>(): PageResult<T> {
        return new PageResult<T>([], 0);
    }

    // 静态方法：返回指定 total 的空分页
    static emptyWithTotal<T>(total: number): PageResult<T> {
        return new PageResult<T>([], total);
    }
}