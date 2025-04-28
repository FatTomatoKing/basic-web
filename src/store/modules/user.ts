import {defineStore} from "pinia";

import {reqLogin} from "@/api/user/index.ts"
import {LoginForm} from "@/api/user/type.ts";


let useUserStore = defineStore("User", {

    state: () => {
        return {}
    },

    actions: {
        async userLogin(loginParam: LoginForm) {
            console.log(loginParam)
            let loginResponse= await reqLogin(loginParam);
            console.log(loginResponse.data)
        }
    },
    getters: {}
});

export default useUserStore;

