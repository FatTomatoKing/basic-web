
// 没懂这里为啥老提示找不到
import SvgIcon from './SvgIcon/index.vue';
import type { App, Component } from 'vue';

const components: { [name: string]: Component } = { SvgIcon };
export default {
    install(app: App) {
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key]);
        })
    }
}
