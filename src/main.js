
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
var app = createApp(App);

app.use(router)
app.use(ElementPlus, {locale: zhCn})

import 'virtual:svg-icons-register'
app.component('svg-icon', SvgIcon)
app.mount('#app')
