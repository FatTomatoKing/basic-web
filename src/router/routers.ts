export const constantRoute = [
    {
        path: '/login',
        name: 'login', // 命名路由
        component: () => import('@/views/login/index.vue'),
        meta:{
            title: "登陆",
            hidden: true,
            icon: "Promotion"
        }
    },
    {
        // 登陆成功展示数据的路由
        path: '/',
        name: 'layout',
        component: () => import('@/layout/index.vue'),
        redirect: "/home",
        meta:{
            title: "",
            hidden: false,
            icon: ""
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home/index.vue'),
                meta:{
                    title: "首页",
                    hidden: false,
                    icon: "HomeFilled"
                }
            }
        ]
    },
    {
        path: '/screen',
        name: 'screen',
        component: () => import('@/views/screen/index.vue'),
        meta:{
            title: "数据大屏",
            hidden: false,
            icon: "Platform"
        }
    },
    {
        // 登陆成功展示数据的路由
        path: '/404',
        name: '404',
        component: () => import('@/views/404/index.vue'),
        meta:{
            title: "404",
            hidden: true,
            icon: "NotFound"
        }
    },
    {
        // 登陆成功展示数据的路由
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
            title: '任意路由',
            hidden: true,
            icon: "WarnTriangleFilled"
        }
    },
    {
        path: '/acl',
        name: 'Acl',
        component: () => import('@/layout/index.vue'),
        meta:{
            title: "权限管理",
            hidden: false,
            icon: "Lock"
        },
        redirect: "/acl/user",
        children: [
            {
                path:'/acl/user',
                component: () => import('@/views/acl/user/index.vue'),
                name:'User',
                meta:{
                    title: "用户管理",
                    hidden: false,
                    icon: "User"
                }
            },
            {
                path:'/acl/role',
                component: () => import('@/views/acl/role/index.vue'),
                name:'Role',
                meta:{
                    title: "角色管理",
                    hidden: false,
                    icon: "UserFilled"
                }
            },
            {
                path:'/acl/permission',
                component: () => import('@/views/acl/permission/index.vue'),
                name:'Permission',
                meta:{
                    title: "菜单管理",
                    hidden: false,
                    icon: "Grid"
                }
            }
        ]
    },
    {
        path: '/product',
        name: 'Product',
        component: () => import('@/layout/index.vue'),
        meta:{
            title: "商品管理",
            hidden: false,
            icon: "Goods"
        },
        redirect: "/product/trademark",
        children: [
            {
                path:'/product/trademark',
                component: () => import('@/views/product/trademark/index.vue'),
                name:'Trademark',
                meta:{
                    title: "品牌管理",
                    hidden: false,
                    icon: "Trophy"
                }
            },
            {
                path:'/product/attr',
                component: () => import('@/views/product/attr/index.vue'),
                name:'Attr',
                meta:{
                    title: "属性管理",
                    hidden: false,
                    icon: "ChromeFilled"
                }
            },
            {
                path:'/product/sku',
                component: () => import('@/views/product/spu/index.vue'),
                name:'Sku',
                meta:{
                    title: "Spu管理",
                    hidden: false,
                    icon: "Calendar"
                }
            },
            {
                path:'/product/spu',
                component: () => import('@/views/product/sku/index.vue'),
                name:'Spu',
                meta:{
                    title: "Sku管理",
                    hidden: false,
                    icon: "Orange"
                }
            }
        ]

    },
    {
        path: '/resource',
        name: 'Resource',
        component: () => import('@/layout/index.vue'),
        meta:{
            title: "资源管理",
            hidden: false,
            icon: "Goods"
        },
        redirect: "/resource/account",
        children: [
            {
                path:'/resource/account',
                component: () => import('@/views/resource/account/index.vue'),
                name:'account',
                meta:{
                    title: "账号管理",
                    hidden: false,
                    icon: "Trophy"
                }
            }
        ]

    }
]
