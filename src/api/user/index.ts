import {request} from "@/utils/request"
import type {LoginForm, UserResponseData} from "@/api/user/type";
import {ResponseResult} from "@/api/common/type.ts";

enum API {
    LOGIN_URL = "/user/login",
    USER_URL = "/system/user/getInfo"
}

export const reqLogin = (data: LoginForm) => request.post<any, ResponseResult<string>>(API.LOGIN_URL, data)

export const reqUserInfo = () => request.get<any, UserResponseData>(API.USER_URL)

