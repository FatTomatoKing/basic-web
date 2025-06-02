import {defineStore} from "pinia";

import {LoginForm} from "@/api/user/type.ts";
import {UserState} from "@/store/modules/types/type";
import {GET_TOKEN, SET_TOKEN, REMOVE_TOKEN} from "@/utils/token";
import {constantRoute} from "@/router/routers";
import {getUserInfo, logout, reqLogin} from "@/api/user";
import {ResponseResult} from "@/api/common/type";


let useUserStore = defineStore("User", {

    state: (): UserState => {
        return {
            token: GET_TOKEN(),
            menuRoutes: constantRoute,
            username: "",
            avatar: "",
        }
    },

    actions: {
        async userLogin(loginParam: LoginForm) {
            console.log(loginParam)
            let loginResponse = await reqLogin(loginParam);
            if (loginResponse.code == ResponseResult.SUCCESS_CODE) {
                this.token = loginResponse.data
                SET_TOKEN(this.token)
                return "Ok"
            } else {
                return Promise.reject("登陆失败")
            }
        },
        async getUserInfo() {
            let userResponseData = await getUserInfo();
            if (userResponseData.code == 200) {
                this.username = userResponseData.user.username
                this.avatar = userResponseData.user.avatar
                return "ok"
            } else {
                return Promise.reject(userResponseData.message)
            }
        },
        async logout() {
            let logoutResult = await logout()
            console.log(logoutResult)
            if (logoutResult.code == ResponseResult.SUCCESS_CODE) {
                console.log("退出登录成功")
                this.token = "";
                this.username = "";
                this.avatar = "";
                REMOVE_TOKEN()
                console.log(GET_TOKEN())
                return "Ok"
            } else {
                console.log("退出登录失败")
                return Promise.reject(logoutResult.message)
            }
        }
    },
    getters: {}
});

export default useUserStore;

