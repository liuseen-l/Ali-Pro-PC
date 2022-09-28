// 路由
export default [
  {
    path: "/",
    redirect: "/map",
  },
  {
    path: '/map',
    component: () => import('../views/MapView.vue'),
    children: [
      {
        path: 'recommand',
        name: 'recommand',
        component: () => import('../components/mapView/MapRecommand.vue')
      },
      {
        path: 'chat',
        name: 'chat',
        component: () => import('../components/mapView/MapChat.vue')
      },
      {
        path: "",
        redirect: "recommand",
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/PersonView.vue')
  },
]


