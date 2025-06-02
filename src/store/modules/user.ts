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
                return Promise.reject("kk")
            }
        },
        async getUserInfo(token: string) {
            let userResponseData = await getUserInfo(token);
            if (userResponseData.code == 200) {
                this.username = userResponseData.user.username
                this.avatar = userResponseData.user.avatar
                console.log("获取到的用户名称" + this.username)
            }
        },
        async logout() {
            let logoutResult = await logout()
            if (logoutResult.code == ResponseResult.SUCCESS_CODE) {
                this.username="";
                this.avatar = "";
                REMOVE_TOKEN
            }
        }
    },
    getters: {}
});

export default useUserStore;

