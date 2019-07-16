import Vue from 'vue';
import App from './App';
import router from './router/index';
import 'reset-css';
import '~/scss/global.scss';
import http from './api';

Vue.config.productionTip = false;
Vue.prototype.$http = http;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
