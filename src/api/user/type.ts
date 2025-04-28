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



class SysRole {
    roleId: number
    roleName: number

    constructor(roleId: number, roleName: number) {
        this.roleId = roleId;
        this.roleName = roleName;
    }
}

interface User {
    id: number,
    username: string,
    nickname: string,
    password: string,
    twoFactorAuthKey: string,
    created: string,
    updated: string,
    deptId: number,
    parentId: number,
    roleId: number,
    userType: string,
    email: string,
    phonenumber: string,
    sex: string,
    avatar: string,
    status: string,
    delFlag: string,
    loginIp: string,
    loginDate: string,
    pwdUpdateDate: string,
    remark: string,
    createBy: string,

    salt: string,
    desc: string,
    roles: SysRole[],
    roleIds: number[],
    postIds: number[],
    buttons: string[],
    routers: string[],
    token: string
}


export class UserResponseData {
    code: number
    data: User

    constructor(code: number, data: User) {
        this.code = code
        this.data = data
    }
}
