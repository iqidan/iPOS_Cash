import api from '@/api';
import BShelp from '@/utils/bshelp';

const formatShopConfig = (config = {}) => {
    const data = config.data;
    const { session, zdkzb } = data;

    const shopConfig = {
        token: session.token,
        userCode: session.userCode,
        userId: session.userId,
        userRole: session.userRole,
        userName: session.userName,
        channelId: session.channelId,
        user: config.user.data,
        channel: session.channel,
        orgCode: session.channel.accountChannel.code,
        shopCode: session.channel.code,
        shopName: session.channel.name,
        shopPushId: zdkzb.send_message_id,
        isSendMessage: zdkzb.is_send_message,
        sendMessagePhone: zdkzb.send_message_phone,
        brand: config.brand.data.rows, // 品牌
        update_vip: data.update_vip // 会员信息采集(身高体重),enable: 1弹框输入 0不弹框 control: 1强制输入 0可选输入
    };
    return shopConfig;
}

const state = {
    isSave: false,
    token: ''
};

// 一般用来过滤state中数据，类似 computed 生命周期
const getters = {
};

// mutations 只能存在同步代码，用来改变 state 数据
const mutations = {
    setToken(state, token) {
        state.token = token;
        BShelp.setStorage('token', token);
    }
};

// actions 存放异步操作，用来提交 mutations
const actions = {
    login({ commit }, param) {
        return api.login(param).then(res => {
            const config = formatShopConfig(res);
            commit('setToken', config.token);
            commit('set_shop_config', config);
            commit('set_brand_list', config.brand);
        });
    }
};

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
};
