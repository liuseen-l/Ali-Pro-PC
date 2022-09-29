// 路由
export default [
  {
    path: "/",
    redirect: "/person",
  },
  {
    path: '/map',
    name: 'map',
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
    path: '/person',
    name: 'person',
    component: () => import('../views/PersonView.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../components/personView/PersonLogin.vue')
      },
      // {
      //   path: 'register',
      //   name: 'register',
      //   component: () => import('../components/personView/PersonRegister.vue')
      // },
      {
        path: "",
        redirect: "login",
      }
    ]
  },
]


