import {defineStore} from "pinia";

import {reqLogin} from "@/api/user/index.ts"
import {LoginForm} from "@/api/user/type.ts";
import {UserState} from "@/store/modules/types/tyoe";
import {GET_TOKEN, SET_TOKEN} from "@/utils/token";


let useUserStore = defineStore("User", {

    state: () :UserState=> {
        return {token: GET_TOKEN}
    },

    actions: {
        async userLogin(loginParam: LoginForm) {
            console.log(loginParam)
            let loginResponse = await reqLogin(loginParam);
            if (loginResponse.isSuccess()) {
                this.token = loginResponse.data
                SET_TOKEN(loginResponse.data)
                return "Ok"
            } else {
                return Promise.reject(loginResponse.message)
            }
        }
    },
    getters: {}
});

export default useUserStore;

