//专用于创建整个应用的路由器
import { createRouter, createWebHistory } from 'vue-router';
/* import login from './login.js' */
import Login from '../views/login/Login.vue'
//创建并暴露一个路由器
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login'//路由代理，默认进入home
        },
        {
            path: '/login',
            component: Login
        }
    ]
})

export default router;