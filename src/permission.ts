import router from "@/router";
import nprogress from "nprogress"
import setting from "./setting";
import "nprogress/nprogress.css"
import pinia from "./store"
import useUserStore from "./store/modules/user"

let userStore = useUserStore(pinia);

router.beforeEach(async (to, from, next) => {

    nprogress.start();

    document.title = `${setting.title} -${to.meta.title}`;
    //next 路由的放行函数
    //to 你要访问的目标对象那个
    //from 你从哪里来的对象
    let token = userStore.token;
    let username = userStore.username;
    if (token) {
        console.log("beforeEach invoke token", token);
        if (to.path == "/login") {
            next({path: "/"})
        } else {
            console.log("beforeEach invoke2");
            if (username) {
                console.log("beforeEach invoke3", username);
                next()
            } else {
                try {
                    console.log("beforeEach invoke4", username);
                    // await 为什么要跟async 配合
                    await userStore.getUserInfo();
                    console.log("beforeEach invoke5", to.path);
                    next()
                } catch (e) {
                    // 这里调用退出接口
                    await userStore.logout();
                    next({path: "/login", redirect: to.path})
                    console.log("包错误了" + e)
                }
            }
        }
    } else {
        // 去登陆
        if (to.path == "/login") {
            console.log("beforeEach invoke47");
            next()
        } else {
            console.log("beforeEach invoke48");
            next({path: "/login", redirect: to.path})
        }
    }


})

router.afterEach((to, from) => { // 移除错误的 next 参数
    console.log(222);
    nprogress.done(); // 正常结束进度条
    // 这里不需要调用 next()
});