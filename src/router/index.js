import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/login/Login';
import Home from '../views/home/Home';


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        //登录页
        {path: '/', name: 'Login', component: Login,},
        //主页及各级功能页
        {
            path: '/home', name: 'Home', component: Home,
            children : [
                {path: '/system', name: '系统配置',},
            ]
        }
    ],
});
