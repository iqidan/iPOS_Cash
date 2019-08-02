import api from '@/api';
import BShelp from '@/utils/bshelp';

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
        state.shop_config = shopConfig;
        BShelp.setStorage('shop_config', shopConfig);
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
