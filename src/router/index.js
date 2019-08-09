import Vue from 'vue';
import Router from 'vue-router';

import Cashier from '@/views/Cashier/cashier';
import Login from '@/views/Login/login';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
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
            path: '/coupon/select',
            name: 'CouponSelect',
            meta: {
                title: '促销优惠选择'
            },
            component: () => import('views/Coupon/select')
        },
        // Order(订单)
        {
            path: '/order',
            name: 'Order',
            meta: {
                keepAlive: true,
                title: '订单'
            },
            component: () => import('views/Order/order')
        },
        {
            path: '/order/detail',
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
        },
        // stock(存货)
        {
            path: '/stock',
            name: 'Stock',
            meta: {
                title: '存货'
            },
            component: () => import('views/Stock/stock')
        },
        {
            path: '/stock_search',
            name: 'StockSearch',
            meta: {
                title: '库存查询'
            },
            component: () => import('views/Stock/stockSearch')
        },
        // inventory(盘点单)
        {
            path: '/inventory',
            name: 'Inventory',
            meta: {
                title: '盘点单',
                keepAlive: true
            },
            component: () => import('views/Inventory/inventory')
        },
        {
            path: '/inventory/add',
            name: 'AddInventory',
            meta: {
                title: '新增盘点单'
            },
            component: () => import('views/Inventory/add')
        },
        {
            path: '/inventory/detail',
            name: 'InventoryDetail',
            meta: {
                title: '盘点单详情'
            },
            component: () => import('views/Inventory/detail')
        },
        // setting (设置)
        {
            path: '/setting',
            name: 'Setting',
            meta: {
                title: '设置'
            },
            component: () => import('views/Setting/setting')
        },
        {
            path: '*',
            redirect: '/login'
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        if (to.meta.keepAlive) {
            return { x: 0, y: to.meta.y || 0 }
        } else {
            return { x: 0, y: 0 }
        }
    }
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

export default router;
