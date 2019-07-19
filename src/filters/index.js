export default {
    /**
     * 
     * @param {String} fmt [日期格式] e.g. 'yyyy-MM-dd' 'yyyy-MM-dd hh:mm:ss'
     * @param {Date} date [日期对象]
     * @returns {String} - [格式化日期字符串] e.g. '2019-07-19' '2019-07-19 11:09:48'
     */
    dateFormat(fmt, date = new Date()) {
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
    }
};