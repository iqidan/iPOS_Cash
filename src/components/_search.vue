<template>
    <div class="search">
        <div class="filters" @click.capture="popupVisible = true">
            <span class="line1">{{checked}}</span>
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
            @keydown.enter.native="keyUp"/>
    </div>
</template>

<script>
import api from '@/api';
import { Radio, Popup, Field } from 'mint-ui';
import { mapMutations, mapActions, mapGetters, mapState } from 'vuex';

export default {
    name: 'Search',
    components: {
        MtRadio: Radio,
        MtField: Field,
        MtPopup: Popup
    },
    props: {
        selectList: { // 选项列表
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
            shop_code: state => state.shopConfig.shopConfig.shop_code
        }),
        ...mapGetters(['getSearchTypeValue']),
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
        ...mapMutations(['setType']),
        keyUp (e) {
            switch (this.getSearchTypeValue) {
                case '1':
                    this.searchGoods({sptm: this.keyWords});
                    break;
                case '2':
                    this.searchGoods({
                        vip_code: this.keyWords,
                        wkdm: '',
                        is_select_vip: '',
                        source: '6'
                    });
                    break;
                case '3':
                    this.searchGoods({coupon_code: this.keyWords});
                    break;
            }
        },
        searchGoods (param) {
            return api.search_goods(param).then(res => {
                // 首条stock ？ 添加 ： 提示
                if (res.data.data && res.data.data[0]) {
                    if(res.data.data[0].ppdm != this.selectedBrand.brand.code){
                        this.bsHelp.showMsg("不允许录入,非"+this.selectedBrand.brand.name+"品牌商品!");
                        return false;
                    }
                    return res.data.data[0];
                }
            }).then(res => {
                if (!res) {
                    return false;
                }

                return api.search_goods_by_id({
                    sptm:res.singleProductCode,
                    shop_code:this.shop_code,
                    kw_id:1
                }).then(res2 => {
                    if (res2.data.data && res2.data.data[0]) {
                        if(!res2.data.data[0].kcsl || res2.data.data[0].kcsl < 1){
                            this.$toast("该商品库存不足!");
                            return false;
                        }
                        //库存数量判断
                        let sum = 0;
                        this.goods_cart.goods.forEach((v, i) => {
                            if(v.singleProductCode == res.singleProductCode) {
                                sum += v.sl;
                            }
                        });
                        if(sum >= res2.data.data[0].kcsl){
                            this.bsHelp.showMsg("超出最大库存数,不允许添加!");
                            return;
                        }

                        res.kcsl = res2.data.data[0].kcsl;
                        return res;
                    }
                })
            }).then(res => {
                if(!res){
                    return;
                }
                res.init_price = res.dj;
                if(res.sl === undefined){
                    res.sl = 1;
                }
                res.guide = this.selectedGuide;
                // this.goods_cart.goods.push(res);
                // this.goodsCart.refersh_cart();
                this.$emit('search', res);
            });
        },
        searchVip (param) {
            // 更新信息？
            return api.search_goods(param);
        },
        searchCoupon (param) {
            return api.search_goods(param);
        },
        selectFilter () {
            this.popupVisible = false;
            this.$emit('changeFilter', this.getSearchTypeValue);
            this.setType(this.checked);
        }
    },
    created() {
    }
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