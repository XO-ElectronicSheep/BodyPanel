//专用于创建整个应用的路由器
import { createRouter, createWebHashHistory } from 'vue-router';
import Forward from '../views/my_forward/Forward.vue'
import Texts from '../components/Texts.vue'
import Users from '../components/Users.vue'
import Login from '../views/login/Login.vue'

//创建并暴露一个路由器
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login' //路由代理，默认进入home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/forward',
            component: Forward,
            children: [ //使用嵌套路由
                {
                    path: '',
                    component: Texts
                },
                {
                    path: 'users',
                    component: Users
                },
            ]
        }
    ]
})

export default router;
