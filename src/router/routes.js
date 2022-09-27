// 路由
export default [
    {
        path: "/",
        redirect: "/map",
    },
    {
        path: '/map',
        component: () => import('../views/MapView.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/PersonView.vue')
    },

]


