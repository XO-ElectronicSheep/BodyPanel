import Login from '../views/login/Login.vue'

const login = [
    {
        path: '/',
        redirect: '/login'//路由代理，默认进入home
    },
    {
        path: '/login',
        component: Login
    },
];

export default login;