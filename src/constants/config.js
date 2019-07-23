export default {
    version: '3.0',
    key: 'test',
    password: '2017',
    no_exchange_jsdm: 1,
    url: 'https://posuat.moco.com:9001/midtest/api/web/index.php?app_act=index/route&api=',
    gateway: 'http://192.168.156.230/api_test/index.php?app_act=mid/do_index/gateway',
    tabList: [
        {
            url: '/cashier',
            icon: 'cart',
            name: '收银'
        },
        {
            url: '/order',
            icon: 'order',
            name: '订单'
        },
        {
            url: '/stock',
            icon: 'cube',
            name: '存货'
        },
        {
            url: '/setting',
            icon: 'setting',
            name: '设置'
        },
    ]
}
