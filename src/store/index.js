import Vue from 'vue';

const store = new Vue({
    data: {
        shopConfig: {}
    },
    created() {
        this.setShopConfig(this.getLocalConfig());
    },
    methods: {
        setShopConfig (config = {}) {
            this.shopConfig = config;
            localStorage.setItem('bskey_shop', JSON.stringify(config))
        },
        getLocalConfig () {
            const configStr = localStorage.getItem('bskey_shop') || '{}';
            return JSON.parse(configStr);
        }
    }
});

export default store;
