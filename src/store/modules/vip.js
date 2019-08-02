// vip相关数据

const state = {
    selected_vip: null,
    selected_coupons: []
};

const mutations = {
    set_selected_vip(state, vip) {
        state.selected_vip = vip;
    },
    set_selected_coupons(state, coupons) {
        state.selected_coupons = coupons;
    }
};

const getters = {
};

const actions = {
};

export default {
    state,
    getters,
    mutations,
    actions
};
