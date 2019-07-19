import Vue from 'vue';
import Router from 'vue-router';

import Cashier from '@/views/Cashier/cashier';
import Login from '@/views/Login/login';
import Transfer from 'views/transfer';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/cashier'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        // Cashier
        {
            path: '/cashier',
            component: Transfer,
            children: [
                {
                    path: '',
                    name: 'Cashier',
                    meta: {
                        keepAlive: true,
                    },
                    component: Cashier
                },
                {
                    path: 'test',
                    component: () => import('views/Cashier/test')
                }
            ]
        },
        // Order
        {
            path: '/order',
            component: Transfer,
            children: [
                {
                    path: '',
                    name: 'Order',
                    component: () => import('views/Order/order')
                },
                {
                    path: 'detail/:order_id',
                    name: 'OrderDetail',
                    component: () => import('views/Order/detail')
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
