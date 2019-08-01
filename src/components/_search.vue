<template>
    <div class="search">
        <div class="filters" @click.capture="popupVisible = true">
            <span class="line1">{{ checked }}</span>
            <i class="triangle"></i>

            <mt-popup class="filter-list" v-model="popupVisible">
                <mt-radio
                    class="item-list"
                    v-model="checked"
                    align="right"
                    :options="selectList"
                    @change="selectFilter"
                />
            </mt-popup>
        </div>
        <!-- <input class="input" type="text" placeholder="请输入小票单号" /> -->
        <mt-field
            class="input"
            v-model="keyWords"
            :placeholder="placeholder"
            @keyup.enter.native="keyUp"
        />
    </div>
</template>

<script>
import api from '@/api';
import { Radio, Popup, Field, MessageBox } from 'mint-ui';
import { mapMutations, mapGetters, mapState } from 'vuex';

export default {
    name: 'Search',
    components: {
        MtRadio: Radio,
        MtField: Field,
        MtPopup: Popup
    },
    props: {
        // 选项列表
        selectList: {
            type: Array,
            required: true
        },
        placeholder: {
            type: String,
            default: '请输入搜索内容'
        }
    },
    computed: {
        ...mapState({
            selectedBrand: state => state.shopConfig.selectedBrand,
            selectedGuide: state => state.shopConfig.selectedGuide,
            shop_code: state => state.shopConfig.shopConfig.shop_code,
            selected_vip: state => state.vip.selected_vip,
            update_vip_list: state => state.shopConfig.shopConfig.update_vip
        }),
        ...mapGetters(['getSearchTypeValue'])
    },
    data() {
        return {
            checked: this.$store.state.search.selectedSearchType,
            keyWords: '',
            popupVisible: false,
            goods_cart: {
                goods: []
            }
        };
    },
    methods: {
        ...mapMutations(['setType', 'set_selected_vip']),
        // enter搜索事件
        keyUp() {
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
        },
        searchGoods() {
            return api
                .search_goods({ sptm: this.keyWords })
                .then(res => {
                    if (res.data.data && res.data.data[0]) {
                        if (res.data.data[0].ppdm !== this.selectedBrand.brand.code) {
                            this.$toast(`不允许录入,非${this.selectedBrand.brand.name}品牌商品!`);
                            return false;
                        }
                        return res.data.data[0];
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
                    res.guide = this.selectedGuide;
                    // this.goods_cart.goods.push(res);
                    // this.goodsCart.refersh_cart();
                    this.$emit('search', res);
                });
        },
        searchVip() {
            const keyword = this.keyWords;
            if (!keyword || keyword.length < 3) {
                this.$toast('请输入会员号!');
                return;
            }
            return api
                .search_vip({
                    vip_code: keyword,
                    wkdm: '',
                    is_select_vip: '',
                    source: '6'
                })
                .then(res => {
                    let is_vip_of_current_brand = false; // 是当前品牌vip
                    if (res.status === 1) {
                        let member = res.data;
                        is_vip_of_current_brand = member.brands.some(v => {
                            if (v.brandid === this.selectedBrand.brand.code) {
                                this.selectedBrand.customer_level =
                                    v.loyaltytieridname;
                                this.selectedBrand.customer_level_id =
                                    v.loyaltytierid;
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
                                    this.selectedBrand.brand.name +
                                    '品牌会员!'
                            );
                        }
                    } else {
                        this.$toast('未查找到该会员');
                    }
                });
        },
        searchCoupon() {
            return api.search_coupons({ coupon_code: this.keyWords });
        },
        selectFilter() {
            this.popupVisible = false;
            this.$emit('changeFilter', this.getSearchTypeValue);
            this.setType(this.checked);
        },
        //检查vip相关信息
        vip_check(vip) {
            let getHeight = () => MessageBox.prompt('请录入会员身高', '提示', {
                inputPlaceholder: '请录入身高(CM)',
                inputType: 'number',
                showCancelButton: updateVip.control !== 1,
                closeOnClickModal: false
            })
                .then(({ value }) => {
                    if (value < 1 || value > 300) {
                        this.$toast('请输入会员身高(CM)');
                        return Promise.reject();
                    } else {
                        return value;
                    }
                }).catch(err => {
                    if (!err) return getHeight();
                });

            let getWeight = () => MessageBox.prompt('请录入会员体重', '提示', {
                inputPlaceholder: '请录入体重(KG)',
                inputType: 'number',
                showCancelButton: updateVip.control !== 1,
                closeOnClickModal: false
            })
                .then(({ value }) => {
                    if (value < 1 || value > 500) {
                        this.$toast('请输入会员体重(KG)');
                        return Promise.reject();
                    } else {
                        return value;
                    }
                }).catch(err => {
                    if (!err) return getHeight();
                });

            let updateVipArr = this.update_vip_list,
                updateVip = null;

            updateVipArr.some(v => {
                if (v.brand === this.selectedBrand.brand.code) {
                    updateVip = v;
                    return true;
                }

                return false;
            });

            if (updateVip === null) {
                return;
            }

            if (!updateVip || updateVip.enable !== 1 || (vip.collectheight && vip.collectweight)) {
                return;
            }

            Promise.all([getHeight(), getWeight()]).then(([height, weight]) => {
                console.log('=============');
                console.log(height);
                console.log(height);
            });
            // this.$http.update_vip({
            //     vip_code:this.selected_vip.vip_code,
            //     collectheight:Number(height),
            //     collectweight:Number(value)
            // })
        }
    },
    created() {}
};
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";

.search {
    display: flex;
    font-size: 28px;
    background-color: #e1e1e1;
}

.filters {
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 10px;
    width: 120px;
    position: relative;
    span {
        text-align: center;
        flex: 1 0 0;
    }
    i {
        margin-top: 12px;
        @include triangle(10px, #999, top);
    }
}

.input {
    padding-left: 20px;
    flex: 1;
    min-height: auto;
    border-radius: inherit;
    background-color: inherit;
    display: flex;
    align-items: center;
    /deep/ input {
        font-size: 28px;
        line-height: 28px;
        background-color: #e1e1e1;
    }
}

.filter-list {
    top: 224px;
    left: 220px;
    border-radius: 10px;
    background-color: #fff;
    &::before {
        content: "";
        position: absolute;
        top: -20px;
        left: 50%;
        display: block;
        transform: translateX(-50%);
        border: 10px solid transparent;
        border-bottom-color: #fff;
    }
    .item-list {
        border-radius: inherit;
        overflow: hidden;
    }
    .filter-item {
        height: 100px;
        line-height: 100px;
    }
}
</style>