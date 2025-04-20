import {App} from "vue";
import SvgIcon from "./SvgIcon/index.vue"

const allPlugins = {
    SvgIcon
}
export default {
    install: (app: App) => {
        Object.keys(allPlugins).forEach(key=>{
            console.log("这个是啥"+key)
            app.component(key,allPlugins[key])
        })

    }
}