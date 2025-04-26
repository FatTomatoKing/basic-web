
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import components from "@/components/index.js"
import '@/styles/index.scss'
import 'virtual:svg-icons-register'
var app = createApp(App);

app.use(router)

app.use(ElementPlus, {locale: zhCn})
app.use(components)




app.mount('#app')
