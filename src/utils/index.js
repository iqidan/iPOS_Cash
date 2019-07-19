export default {
    // 调起扫码
    scan(callback) {
        if (BSAPP && typeof BSAPP.scan === 'function') {
            BSAPP.scan(function (res) {
                callback(res, null);
            });
        }
    },
    
};