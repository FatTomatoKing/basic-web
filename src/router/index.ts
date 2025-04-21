import {createRouter, createWebHashHistory} from 'vue-router'
import {constantRoute} from "@/router/routers.ts";


const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: constantRoute,
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})
export default router
