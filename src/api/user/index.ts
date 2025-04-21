import {request} from "@/utils/request"
import {loginForm, loginResponseData, userResponseData} from "@/api/user/type";

enum API {
    LOGIN_URL = "/user/login",
    USER_URL = "/system/user/getInfo"
}

export const reqLogin = (data: loginForm) => request.post<any, loginResponseData>(API.LOGIN_URL, data)

export const reqUserInfo = () => request.get<any, userResponseData>(API.USER_URL)

