
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import components from "@/components/index.js";
import pinia  from "@/store/index.js";


import "@/styles/index.scss";
import 'virtual:svg-icons-register'
import 'element-plus/dist/index.css'

var app = createApp(App);

app.use(router)
app.use(ElementPlus, {locale: zhCn})
app.use(components)
app.use(pinia)


app.mount('#app')
