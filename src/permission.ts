
import router from "@/router";
import nprogress from "nprogress"
import "nprogress/nprogress.css"


router.beforeEach((to, from, next) => {
    //to 你要访问的目标对象那个
    console.log(to);
    //from 你从哪里来的对象
    console.log(111)
    //next 路由的放行函数
    nprogress.start();
    next()
})

router.afterEach((to, from, next) => {
    console.log(222)
    nprogress.done();
    next()
})