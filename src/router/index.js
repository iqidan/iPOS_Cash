import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/views/Index/index';
import Login from '@/views/Login/login';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/index',
            component: Index
        },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

export default router;
