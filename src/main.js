
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

var app = createApp(App);

app.use(router)
app.use(ElementPlus, {locale: zhCn})

import 'virtual:svg-icons-register'

app.mount('#app')
