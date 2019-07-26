import api from '@/api';

const state = {
    shopConfig: {},
    guideList: [],
    brandList: []
};

const getters = {};

const mutations = {
    setShopConfig(state, shopConfig) {
        state.shopConfig = shopConfig;
    },
    setGuideList(state, guideList) {
        state.guideList = guideList;
    },
    setBrandList(state, brandList) {
        state.brandList = brandList;
    }
};

const actions = {
    // 显示选择导购员弹框
    showGuideListPopup({ commit }, params) {
        return api.get_user_list(params).then(res => {
            commit('setGuideList', res.data.data);
        });
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
