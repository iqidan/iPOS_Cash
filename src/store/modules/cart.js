const search_goods = function(keyWords) {
    return api
        .search_goods({ sptm: keyWords })
        .then(res => {
            if (res.data.data && res.data.data[0]) {
                if (res.data.data[0].ppdm !== this.selected_brand.brand.code) {
                    this.$toast(`不允许录入,非${this.selected_brand.brand.name}品牌商品!`);
                    return false;
                }
                return res.data.data[0];
            } else {
                
            }
        })
        .then(res => {
            if (!res) {
                return false;
            }

            return api
                .search_goods_by_id({
                    sptm: res.singleProductCode,
                    shop_code: this.shop_code,
                    kw_id: 1
                })
                .then(res2 => {
                    if (res2.data.data && res2.data.data[0]) {
                        if (!res2.data.data[0].kcsl || res2.data.data[0].kcsl < 1) {
                            this.$toast('该商品库存不足!');
                            return false;
                        }
                        //库存数量判断
                        let sum = 0;
                        this.goods_cart.goods.forEach(good => {
                            if (good.singleProductCode === res.singleProductCode) {
                                sum += good.sl;
                            }
                        });
                        if (sum >= res2.data.data[0].kcsl) {
                            this.$toast('超出最大库存数,不允许添加!');
                            return;
                        }

                        res.kcsl = res2.data.data[0].kcsl;
                        return res;
                    }
                });
        })
        .then(res => {
            if (!res) {
                return;
            }
            res.init_price = res.dj;
            if (res.sl === undefined) {
                res.sl = 1;
            }
            res.guide = this.selected_guide;
            // this.goods_cart.goods.push(res);
            // this.goodsCart.refersh_cart();
            this.$emit('search', res);
        });
}
const search_vip = function(keyWords) {
    if (!keyWords || keyWords.length < 3) {
        this.$toast('请输入会员号!');
        return;
    }
    return api
        .search_vip({
            vip_code: keyWords,
            wkdm: '',
            is_select_vip: '',
            source: '6'
        })
        .then(res => {
            let is_vip_of_current_brand = false; // 是当前品牌vip
            if (res.status === 1) {
                let member = res.data;
                is_vip_of_current_brand = member.brands.some(v => {
                    if (v.brandid === this.selected_brand.brand.code) {
                        this.selected_brand.customer_level = v.loyaltytieridname;
                        this.selected_brand.customer_level_id = v.loyaltytierid;
                        member.membercard = v.membercard;
                        member.customer_level = v.loyaltytieridname;
                        return true;
                    }
                    return false;
                });
                if (is_vip_of_current_brand) {
                    let typeList = [{ code: '00', name: '普通会员' }];
                    if (member.ifstaff) {
                        typeList.push({ code: '10', name: '员工' });
                    }
                    if (member.svip) {
                        typeList.push({ code: '20', name: 'SVIP' });
                    }
                    member.typeList = typeList;
                    member.type = typeList[0];
                    this.set_selected_vip(member);
                    this.vip_check(member);
                } else {
                    this.$toast(
                        '该会员不属于' +
                            this.selected_brand.brand.name +
                            '品牌会员!'
                    );
                }
            } else {
                this.$toast('未查找到该会员');
            }
        });
}
const search_coupon = function(keyWords) {
    return api.search_coupons({ coupon_code: keyWords });
}

const state = {

}

const actions = {
    on_cart_search() {
        switch (this.getSearchTypeValue) {
            case '1':
                this.searchGoods();
                break;
            case '2':
                this.searchVip();
                break;
            case '3':
                this.searchCoupon();
                break;
        }
    }
}

export default {
    state,
    actions
}