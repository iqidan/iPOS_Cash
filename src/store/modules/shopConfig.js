import api from '@/api';
import BShelp from '@/utils/bshelp';

const state = {
    shopConfig: {},
    guideList: [],
    selectedGuide: null,
    selectedBrand: null,
    brandList: []
};

const getters = {};

const mutations = {
    //
    setShopConfig(state, shopConfig) {
        state.shopConfig = shopConfig;
        BShelp.setStorage('shop_config', shopConfig);
    },
    // 设置导购列表
    setGuideList(state, guideList) {
        state.guideList = guideList;
        BShelp.setStorage('guide_list', guideList);
    },
    // 设置选中导购
    setSelectedGuide(state, selectedGuide) {
        state.selectedGuide = selectedGuide;
    },
    // 设置品牌列表
    setBrandList(state, brandList) {
        state.brandList = brandList;
        BShelp.setStorage('brand_list', brandList);
    },
    // 设置选中品牌
    setSelectedBrand(state, selectedBrand) {
        state.selectedBrand = selectedBrand;
    },
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
