import http from './config';

export default {
    /**
     * 登录
     * @param {String} shop_code [店铺代码]
     * @param {String} user_code [用户代码]
     * @param {String} password [密码]
     */
    login(params) {
        return http.post('base/shop/shop_login_pos', params, { isLogin: 1 });
    },

    //搜索商品
    search_goods(params) {
        return http.post(
            'stock/dim_allocate_order_record/phone_search_good',
            params
        );
    },
    // 根据id查找商品
    search_goods_by_id(params) {
        return http.post('stock/dim_allocate_order_record/find_by_id', params);
    },
    // 搜索会员
    search_vip(params) {
        return http.post('crm/vip/get_qtsy_vip&route=crm', params);
    },
    search_coupons(params) {
        return http.post('crm/vip/check_coupon&route=crm', params);
    },
    //查询邻店
    get_friend_shop(params) {
        return http.post('index/route&api=base/shop/get_friend_shop_u', {
            shop_code: this.shopInfo.shop_code,
            ...params
        });
    },
    //查询库存
    get_goods_stock(params) {
        return http.post('base/goods/get_goods_inv', params);
    },
    //查询店铺
    get_shop(params) {
        return http.post('base/shop/get_list', params);
    },

    //查询横调出库列表
    get_stock_out_list(params) {
        return http.post(
            'stock/stm_store_shift_record/shift_out_get_list',
            params
        );
    },

    //查询横调出库详情
    get_stock_out_detail(params) {
        return http.post(
            'stock/stm_store_shift_record/shift_out_get_detail',
            params
        );
    },

    //新增横调出库单
    add_stock_out_record(params) {
        return http.post('stock/stm_store_shift_record/add_by_pos', params);
    },

    //查询盘点单列表
    get_stock_check_list(params) {
        return http.post('stock/stm_take_stock_record/get_list', params);
    },

    //查询盘点单详情
    get_stock_check_detail(params) {
        return http.post('stock/stm_take_stock_record/get_detail', params);
    },

    //新增盘点单
    add_stock_check_record(params) {
        return http.post('stock/stm_take_stock_record/add_by_app', params);
    },

    //更新库存明细数据
    update_stock_detail(params) {
        return http.post('stock/stm_take_stock_record/update_detail', params);
    },

    //查询盘点任务单列表
    get_stock_task_list(params) {
        return http.post('stock/stm_take_stock_task_record/get_list', params);
    },

    //获取盘点任务单号(本店查询)
    get_stock_tast_local_lsit(params) {
        return http.post('base/system/pan_dian_task_search_local', params);
    },

    //查询横调入库列表
    get_stock_in_list(params) {
        return http.post(
            'stock/stm_store_shift_record/shift_in_get_list',
            params
        );
    },

    //查询横调入库详情
    get_stock_in_detail(params) {
        return http.post(
            'stock/stm_store_shift_record/shift_in_get_detail',
            params
        );
    },

    //横调入库单入库
    stock_in(params) {
        return http.post('stock/stm_store_shift_record/store_in', params);
    },

    //获取店员
    get_user_list(params) {
        return http.post('purview/user/get_list', params);
    },

    //获取单据类型
    get_record_type(params) {
        return http.post('base/system/get_record_type', params);
    },

    //获取单据编号
    get_record_code(params) {
        return http.post('base/shop/get_record_code', params);
    },

    // 获取订单列表
    get_order_list(params) {
        return http.post('pos/pos/get_receipt_list', params);
    },

    update_vip(params) {
        return http.post('crm/vip/update_vip&route=crm', params);
    }
};
