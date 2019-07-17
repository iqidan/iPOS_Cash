import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/views/Index/index';
import Login from '@/views/Login/login';
import Transfer from 'views/transfer';

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
        // index页面
        {
            path: '/index',
            component: Transfer,
            children: [
                {
                    path: '',
                    component: Index
                },
                {
                    path: 'test',
                    component: () => import('views/Index/test')
                }
            ]
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
