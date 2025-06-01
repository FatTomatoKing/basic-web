export class LoginForm {
    public username: string
    public password: string
    public code: number

    constructor(username: string, password: string, code: number) {
        this.username = username
        this.password = password
        this.code = code
    }
}




// 响应结果类型
export interface AuthResponse {
    code: number;
    permissions: string[];
    roles: string[];
    message: string;
    user: UserInfo;
}

// 用户信息类型
export interface UserInfo {
    id: number;
    username: string;
    nickname: string;
    twoFactorAuthKey: string;
    created: number; // 时间戳格式
    email: string;
    phonenumber: string;
    sex: string;
    avatar: string;
    status: string;
    delFlag: string;
    loginIp: string;
    remark: string;
    createBy: string;
    dept: DeptInfo;
    roles: RoleInfo[];
    admin: boolean;
    userId: number;
}

// 部门信息类型
export interface DeptInfo {
    children: any[]; // 如果子部门结构相同，可以改为 DeptInfo[]
}

// 角色信息类型
export interface RoleInfo {
    roleId: number;
    roleName: string;
    roleKey: string;
    roleSort: number;
    dataScope: string;
    menuCheckStrictly: boolean;
    deptCheckStrictly: boolean;
    status: string;
    flag: boolean;
    admin: boolean;
}
