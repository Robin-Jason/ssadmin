import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('../views/HomeView.vue'),
        name: 'home'
      },
      // 新增游戏相关路由
      {
        path: 'game-selection',
        component: () => import('../views/GameSelection.vue')
      },
      {
        path: 'game/sudoku',
        component: () => import('../views/Game/Sudoku.vue')
      },
      {
        path: 'game/memory',
        component: () => import('../views/Game/Memory.vue')
      },
      // {
      //   path: 'game/chess',
      //   component: () => import('../views/Game/Chess.vue')
      // },
      {
        path: 'game/story',
        component: () => import('../views/Game/Story.vue')
      },
      // 聊天页面路由
      {
        path: 'chat',
        component: () => import('../views/ChatWithAI.vue')
      },
    ]
  },
  {
    path: '/rbac',
    component: Layout,
    children: [
      {
        path: 'user/list',
        component: () => import('../views/User/List.vue')
      },
      {
        path: 'user/add',
        component: () => import('../views/User/Add.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
]

// 防止连续点击多次路由报错
let routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router