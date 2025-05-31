import {defineStore} from "pinia";
import {ref} from "vue";

let useSetting = defineStore("Fold",{


    state: ()=>{
        return {
            fold : ref(false),
            refresh: ref(true)
        };
    },
    actions: {
        changeIcon (){
            this.fold = !this.fold;
        }
    },
})

export default useSetting;
