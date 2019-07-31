import Vue from 'vue';

const filters = {
    /**
     * 
     * @param {String} fmt [日期格式] e.g. 'yyyy-MM-dd' 'yyyy-MM-dd hh:mm:ss'
     * @param {Date} date [日期对象]
     * @returns {String} - [格式化日期字符串] e.g. '2019-07-19' '2019-07-19 11:09:48'
     */
    dateFormat(date = new Date(), fmt) {
        let o = {
            'M+': date.getMonth() + 1, //月份
            'd+': date.getDate(), //日
            'h+': date.getHours(), //小时
            'm+': date.getMinutes(), //分
            's+': date.getSeconds(), //秒
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度
            S: date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                (date.getFullYear() + '').substr(4 - RegExp.$1.length)
            );
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1
                        ? o[k]
                        : ('00' + o[k]).substr(('' + o[k]).length)
                );
            }
        }
        return fmt;
    },

    /**
     * 
     * @param {Number|String} money [金额数值] - 需要转换的金额
     * @param {Number} rebate [金额倍率] - 显示结果为传入金额乘以倍率
     * @param {String} amonnt [币种符号] - 比如 ￥ $ 等
     * @param {String} delimit [每隔4位的分隔符] - 默认为'，'
     * @param {String} precision [精确到小数位数] - 默认2   e.g. 0.00
     * @returns {String} [金额字符串]
     */
    currency(money, {rebate = 1, amonnt = '￥', delimit = ',', precision = 2} = {}) {
        let num = Number(Math.abs(money));
        let integerStr = '';
        let decimalStr = '';
        let symbol = money < 0 ? '-' : '';
        let res = amonnt + symbol;
        let tempArr = [];
        if (isNaN(num)) {
            num = 0;
        }
        // 精度处理
        num = Number.prototype.toFixed.call(num, precision);
        // 倍率处理
        [integerStr, decimalStr = ''] = String(num * rebate).split('.');
        // 小数补0
        decimalStr = precision > 0 ? '.' + decimalStr.padEnd(precision, '0') : '';
        // 分隔符处理
        if (num >= 10000) {
            let i = integerStr.length;
            while (i >= 0) {
                tempArr.unshift(integerStr.slice(i-4 >= 0 ? i-4 : 0, i));
                i-=4;
            }
            integerStr = tempArr.join(delimit);
        }
        // 正负、币种处理
        res += integerStr + decimalStr;
        return res;
    }
};

for (let k in filters) {
    Vue.filter(k, filters[k]);
}