import {defineStore} from "pinia";

import {reqLogin} from "@/api/user/index.ts"
import {LoginForm} from "@/api/user/type.ts";


let useUserStore = defineStore("User", {

    state: () => {
        return {token: localStorage.getItem("TOKEN")}
    },

    actions: {
        async userLogin(loginParam: LoginForm) {
            console.log(loginParam)
            let loginResponse = await reqLogin(loginParam);
            if (loginResponse.isSuccess()) {
                this.token = loginResponse.data
                localStorage.setItem("TOKEN", loginResponse.data)
                return "Ok"
            } else {
                return Promise.reject(loginResponse.message)
            }
        }
    },
    getters: {}
});

export default useUserStore;

