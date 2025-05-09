import {defineStore} from "pinia";

import {LoginForm} from "@/api/user/type.ts";
import {UserState} from "@/store/modules/types/type";
import {GET_TOKEN, SET_TOKEN} from "@/utils/token";
import {constantRoute} from "@/router/routers";
import {reqLogin} from "@/api/user";


let useUserStore = defineStore("User", {

    state: () :UserState=> {
        return {
            token: GET_TOKEN(),
            menuRoutes: constantRoute
        }
    },

    actions: {
        async userLogin(loginParam: LoginForm) {
            console.log(loginParam)
            let loginResponse = await reqLogin(loginParam);
            if (loginResponse.isSuccess()) {
                this.token = loginResponse.data
                SET_TOKEN(this.token)
                return "Ok"
            } else {
                return Promise.reject("kk")
            }
        }
    },
    getters: {}
});

export default useUserStore;

