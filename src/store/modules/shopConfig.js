import api from '@/api';
import BShelp from '@/utils/bshelp';

function formatShopConfig (config) {
    return {
        // shop_code: 'CSD01',
        shop_code: config.shopCode || '1002', // '1002',
        shop_name: config.shopName,
        shop_id: config.user ? config.user.shopId : '32',
        // user_code: config.userCode || urlParams.job_card || '1002_000',
        user_code: config.userCode || '1002_000',
        user_name: config.userName || '默认店长',
        org_code: config.orgCode,
        channel_id: config.channelId,
        brand: config.brand,
        merchant_code: 'MOco_test', // 商户号
        send_message_id: config.shopPushId, // 发送消息id
        is_send_message: config.isSendMessage, // 是否发送消息
        send_message_phone: config.sendMessagePhone, // 发送消息的手机号
        accountChannelId: config.channel.accountChannelId,
        update_vip: config.update_vip //会员信息采集(身高体重),enable: 1弹框输入 0不弹框 control: 1强制输入 0可选输入
    };
}

const state = {
    shop_config: {},
    guide_list: [],
    selected_guide: null,
    selected_brand: null,
    brand_list: []
};

const getters = {};

const mutations = {
    //
    set_shop_config(state, shopConfig) {
        let config = formatShopConfig(shopConfig);
        state.shop_config = config;
        BShelp.setStorage('shop_config', config);
    },
    // 设置导购列表
    set_guide_list(state, guideList) {
        state.guide_list = guideList;
        BShelp.setStorage('guide_list', guideList);
    },
    // 设置选中导购
    set_selected_guide(state, selected_guide) {
        state.selected_guide = selected_guide;
    },
    // 设置品牌列表
    set_brand_list(state, brandList) {
        state.brand_list = brandList;
        BShelp.setStorage('brand_list', brandList);
    },
    // 设置选中品牌
    set_selected_brand(state, selected_brand) {
        state.selected_brand = selected_brand;
    },
};

const actions = {
    // 显示选择导购员弹框
    show_guide_list_popup({ commit }, params) {
        return api.get_user_list(params).then(res => {
            commit('set_guide_list', res.data.data);
        });
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
