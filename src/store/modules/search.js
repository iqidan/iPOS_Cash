// 搜索功能相关数据

import api from '@/api';

const PAY_STATUS = [
    {
        label: '商品',
        value: '商品',
        unique: '1'
    },
    {
        label: '会员',
        value: '会员',
        unique: '2' 
    },
    {
        label: '优惠券',
        value: '优惠券',
        unique: '3'
    }
];

const state = {
    searchTypeList: PAY_STATUS,
    selectedSearchType: '商品'
};

const mutations = {
    setType(state, value) {
        state.selectedSearchType = value;
    }
};

const getters = {
    getSearchTypeValue(state) {
        let res = state.searchTypeList.filter(type => {
            return type.value === state.selectedSearchType
        })[0];
        return res.unique;
    }
};

const actions = {
    search({ commit, state }, param) {
        return api
            .search_goods(param)
            .then(res => {
                return res;
            })
            .catch(() => {
                /** */
            });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
