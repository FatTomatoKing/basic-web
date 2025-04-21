import {request} from "@/utils/request"
import type {LoginForm, loginResponseData, userResponseData} from "@/api/user/type";

enum API {
    LOGIN_URL = "/user/login",
    USER_URL = "/system/user/getInfo"
}

export const reqLogin = (data: LoginForm) => request.post<any, loginResponseData>(API.LOGIN_URL, data)

export const reqUserInfo = () => request.get<any, userResponseData>(API.USER_URL)

