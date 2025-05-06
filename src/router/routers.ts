export const constantRoute = [
    {
        path: '/login',
        name: 'login', // 命名路由
        component: () => import('@/views/login/index.vue')
    },
    {
        // 登陆成功展示数据的路由
        path: '/',
        name: 'layout',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home/index.vue'),
            },
        ]
    },
    {
        // 登陆成功展示数据的路由
        path: '/404',
        name: '404',
        component: () => import('@/views/404/index.vue')
    },
    {
        // 登陆成功展示数据的路由
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any'
    }
]
