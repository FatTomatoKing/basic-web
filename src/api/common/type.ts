
export class ResponseResult<T> {
    public code: number;
    public message: string;
    public data: T;

    static SUCCESS_CODE = 0;

    constructor(code: number, data: T, message: string) {
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
