import Vue from 'vue';
import Vuex from 'vuex';

import authorize from './modules/authorize';
import shopConfig from './modules/shopConfig';
import search from './modules/search';

Vue.use(Vuex);

export default new Vuex.Store({
    // 任何修改都只能通过 mutations
    strict: true,
    modules: {
        authorize,
        shopConfig,
        search
    }
})
