import Vue from 'vue';
import App from './App';
import router from './router/index';
import 'reset-css';
import '~/scss/global.scss';
import http from './api';
import bus from './store';
import { Toast, Indicator, InfiniteScroll } from 'mint-ui';

import _icon from 'components/_icon';
Vue.component('icon-font', _icon);
Vue.use(InfiniteScroll);

Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.$loading = Indicator;
Vue.prototype.$toast = Toast;
Vue.prototype.$bus = bus;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
