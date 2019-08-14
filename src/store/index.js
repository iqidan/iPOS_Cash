import Vue from 'vue';
import Vuex from 'vuex';
import BShelp from '@/utils/bshelp';
import api from '@/api';
import vip from './modules/vip';

Vue.use(Vuex);

// 整理接口格式
function formatShopConfig(config = {}) {
    const data = config.data;
    const brand = config.brand.data.rows;
    const user = config.user.data;
    const { session, zdkzb } = data;

    const shopConfig = {
        token: session.token,
        user_code: session.userCode,
        user_id: session.userId,
        user_role: session.userRole,
        user_name: session.userName,
        channel_id: session.channelId,
        user: user,
        channel: session.channel,
        org_code: session.channel.accountChannel.code,
        shop_code: session.channel.code || '1002',
        shop_id: user ? user.shopId : '32',
        shop_name: session.channel.name,
        shop_push_id: zdkzb.send_message_id, // 发送消息id
        is_send_message: zdkzb.is_send_message, // 是否发送消息
        send_message_phone: zdkzb.send_message_phone, // 发送消息的手机号
        brand: brand, // 品牌列表
        update_vip: data.update_vip, // 会员信息采集(身高体重),enable: 1弹框输入 0不弹框 control: 1强制输入 0可选输入
        account_channel_id: session.channel.accountChannelId,
        merchant_code: 'MOco_test', // 商户号
    };
    return shopConfig;
}

const state = {
    shop_config: {},
    token: '',
    brand_list: [],
    selected_brand: {},
    guide_list: [],
    selected_guide: {}
};

const getters = {};

const mutations = {
    // 设置shop config
    set_shop_config(state, shopConfig) {
        state.shop_config = shopConfig;
        BShelp.setStorage('shop_config', shopConfig);
    },
    // 设置品牌列表
    set_brand_list(state, brand_list) {
        state.brand_list = brand_list;
        BShelp.setStorage('brand_list', brand_list);
    },
    // 设置选中品牌
    set_selected_brand(state, brand) {
        state.selected_brand = brand;
        BShelp.setStorage('selected_brand', brand);
    },
    // 导购列表
    set_guide_list(state, guide_list) {
        state.guide_list = guide_list;
        BShelp.setStorage('guide_list', guide_list);
    },
    // 设置选中导购
    set_selected_guide(state, guide) {
        state.selected_guide = guide;
        BShelp.setStorage('selected_guide', guide);
    },
    // 设置token
    set_token(state, token) {
        state.token = token;
        BShelp.setStorage('token', token);
    }
};

const actions = {
    login({ commit }, param) {
        return api.login(param).then(res => {
            let config = formatShopConfig(res);
            commit('set_shop_config', config);
            commit('set_token', config.token);
            commit('set_brand_list', config.brand);
        });
    },
    get_guide_list({ commit }, params) {
        return api.get_user_list(params).then(res => {
            commit('set_guide_list', res.data.data);
        });
    }
};


export default new Vuex.Store({
    // 任何修改都只能通过 mutations
    strict: true,
    state,
    getters,
    mutations,
    actions,
    modules: {
        // authorize,
        // shopConfig,
        // search,
        vip
    }
})
