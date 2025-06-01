import {request} from "@/utils/request"
import type {LoginForm, AuthResponse} from "@/api/user/type";
import {ResponseResult} from "@/api/common/type.ts";



enum API {
    LOGIN_URL = "/user/login",
    USER_URL = "/system/online/getInfo"
}

export const reqLogin = (data: LoginForm) => request.post<any, ResponseResult<string>>(API.LOGIN_URL, data)

export const getUserInfo = () => request.get<any, AuthResponse>(API.USER_URL)

