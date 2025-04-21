export interface loginForm {
    username: string,
    password: string
    code: number
}

interface dataType {
    token: string
}

export interface loginResponseData {
    code: number
    data: dataType
}

interface sysRole {
    roleId: number
    roleName: number
}

interface user {
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
    roles: sysRole[],
    roleIds: number[],
    postIds: number[],
    buttons: string[],
    routers: string[],
    token: string
}


export interface userResponseData {
    code: number
    data: user
}
