export default {
    // 调起扫码
    scan(callback) {
        if (BSAPP && typeof BSAPP.scan === 'function') {
            BSAPP.scan(function (res) {
                callback(res, null);
            });
        }
    },
    
    // 传入 key
    getKey(obj, ks) {
        if (!ks) return obj;
        const kList = ks.split('.');
        return kList.reduce((o, k) => {
            return o[k];
        }, obj);
    }
};