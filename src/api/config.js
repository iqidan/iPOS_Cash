import axios from 'axios';
import MD5 from 'js-md5';
import qs from 'querystring';
import config from '@/constants/config';
import { Toast, Indicator } from 'mint-ui';
import BShelp from '@/utils/bshelp';

/**
 * 生成接口公共参数
 * @returns {Object} - [包括sign、token、key、version、time、no_exchange_jsdm]
 */
function generateParams() {
    // TODO:
    const token = BShelp.getStorage('token');
    const { version, key, password, no_exchange_jsdm } = config;

    const date = new Date();
    const timeStamp = Math.floor(date.getTime() / 1000);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month > 10 ? month : '0' + month;
    day = day > 10 ? day : '0' + day;

    const signStr = key + password + year + '-' + month + '-' + day;
    const sign = MD5(signStr);

    return {
        sign,
        token,
        key,
        version,
        no_exchange_jsdm,
        time: timeStamp
    };
}

// 多个请求并发时，以最晚结束的状态为准，关闭loading状态
class Loading {
    constructor () {
        this.stacks = 0;
        this.ctx = Indicator;
    }

    close () {
        this.stacks--;
        if (this.stacks <= 0) {
            this.stacks = 0;
            this.ctx.close();
        }
    }

    open () {
        if (this.stacks === 0) {
            this.ctx.open({
                spinnerType: 'fading-circle'
            });
        }
        this.stacks++;
    }
}

// 本地/线上地址区分处理
const isDebug = ['192.168', 'localhost'].some(ip => location.host.includes(ip));
const urlPrefix = isDebug ? config.url : config.gateway;
const loading = new Loading();

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
    },
    transformRequest: [
        function(data) {
            return qs.stringify(Object.assign(generateParams(), data));
        }
    ]
});

// 请求拦截
axiosInstance.interceptors.request.use(
    function(config) {
        if (!config.noLoading) loading.open();
        config.url = urlPrefix + config.url;
        return config;
    },
    function(error) {
        Toast('请求失败，请稍后再试');
        loading.close();
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function(response) {
        loading.close();
        if (response.data.status === 1) {
            return response.data;
        } else {
            return Promise.reject(response.data);
        }
    },
    function() {
        loading.close();
        Toast('响应失败，请稍后再试');
        return Promise.reject();
    }
);

/**
 * @param {String} url [请求路径]
 * @param {Object} data [请求参数] - post请求体
 * @param {Object} params [请求参数] - get请求(地址栏)
 * @param {Object|Undefined} config [axios配置] - 可覆盖默认配置
 *                              - config.isLogin [为1是登录接口]
 *                              - config.noLoading [为1则不显示loading菊花图]
 * @returns {Promise} [回调参数为接口数据]
 */
const http = {
    post: function(url, data, config = {}) {
        // 登录接口参数格式不同
        if (config.isLogin) {
            return axiosInstance.post(url, data, config);
        } else {
            return axiosInstance.post(url, {
                dataContent: JSON.stringify([data])
            }, config);
        }
    },
    get: function(url, params, config = {}) {
        return axiosInstance.get(url, params, config);
    }
};

export default http;
