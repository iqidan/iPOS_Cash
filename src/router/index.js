import Vue from 'vue';
import Router from 'vue-router';

import Cashier from '@/views/Cashier/cashier';
import Login from '@/views/Login/login';

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
            meta: {
                title: '收银台登录'
            },
            component: Login
        },
        // Cashier(首页)
        {
            path: '/cashier',
            name: 'Cashier',
            meta: {
                title: '收银台',
                keepAlive: true
            },
            component: Cashier
        },
        {
            path: '/cashier/test',
            name: 'Test',
            component: () => import('views/Cashier/test')
        },
        // Order(订单)
        {
            path: '/order',
            name: 'Order',
            component: () => import('views/Order/order')
        },
        {
            path: '/order/detail/:order_id',
            name: 'OrderDetail',
            meta: {
                title: '订单详情'
            },
            component: () => import('views/Order/detail')
        },
        // settle(结算)
        {
            path: '/settle',
            name: 'Settle',
            meta: {
                title: '结算'
            },
            component: () => import('views/Settle/settle')
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

export default router;
