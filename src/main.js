import Vue from 'vue';
import App from './App';
import router from './router/index';
import 'reset-css';
import '~/scss/global.scss';
import http from './api';
import store from './store';
import { Toast, Indicator, InfiniteScroll } from 'mint-ui';
import '@/filters';

import _icon from 'components/_icon';

Vue.component('icon-font', _icon);
Vue.use(InfiniteScroll);

Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.$loading = Indicator;
Vue.prototype.$toast = Toast;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
