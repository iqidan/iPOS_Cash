import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        shopConfig: {}
    },
    getters: {
        getShopConfig (state) {
            return state.shopConfig;
        }
    },
    mutations: {
        setShopConfig (state, config) {
            state.shopConfig = config;
            localStorage.setItem('bskey_shop', JSON.stringify(config));
        }
    },
    actions: {}
});

export default store;
