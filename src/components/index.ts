
// 没懂这里为啥老提示找不到
// @ts-expect-error - Module resolution issue will be fixed later
import SvgIcon from '@/components/SvgIcon/index.vue'

//全局对象
const allPlugins: any = { SvgIcon }
//对外暴露插件对象
export default {
    //务必叫做install方法
    install(app: any) {
        //注册项目全部的全局组件
        Object.keys(allPlugins).forEach((key) => {
            //注册为全局组件
            app.component(key, allPlugins[key])
        })

    }
}
