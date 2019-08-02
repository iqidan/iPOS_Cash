<template>
    <div class="cashier">
        <search-header
            @search="searchGoods"
            :select-list="search_type_list"
            :placeholder="'搜索商品'"/>

        <!-- 中心内容 start -->
        <div class="cashier-content">
            <div v-if="selected_vip" class="select-vip">
                <div class="vip-avatar center">
                    <i class="icon-user"/>
                </div>

                <div class="vip-detail">
                    <span class="bd">{{selected_vip.membercard}}</span>
                    <span>卡类型：{{selected_vip.customer_level}}</span>
                    <span>折扣：{{selected_vip.rebate}}</span>
                </div>
            </div>
            <ul class="goods-list" v-if="goodsCart.goods && goodsCart.goods.length">
                <li v-for="(good, index) in goodsCart.goods" :key="good.sku">
                    <div class="good-detail">
                        <p class="good-title">
                            <span class="bd">{{good.spmc}}</span>
                            <span class="red">{{good.dj | currency({precision: 0})}}</span>
                        </p>
                        <span>规格：{{good.sku}}</span>
                        <span>参考价：{{good.gg1mc}} {{good.gg2mc}}</span>
                        <span>库存：{{good.kcsl}}</span>
                        <span>
                            导购员：
                            <select v-model="good.guide">
                                <option
                                    v-for="guide in guide_list"
                                    :value="guide"
                                    :key="good.sku + guide.Id"
                                >
                                    {{guide.UserName}}
                                </option>
                            </select>
                        </span>
                    </div>

                    <div class="good-operation">
                        <i class="icon-edit" @click="showGoodEditPannel(good)"/>
                        <div class="num-ctrl">
                            <span @click="changeGoodNum(index, -1)">-</span>
                            <span>{{good.sl}}</span>
                            <span @click="changeGoodNum(index, 1)">+</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 中心内容 end -->

        <!-- 底部总计 start -->
        <div class="cashier-summary">
            <div class="content summary-content">
                <div class="content-top">
                    <span>合计：</span>
                    <span class="red">{{totalMoney | currency}}</span>
                </div>
                <div class="content-bottom">
                    <span>数量：</span>
                    <span>{{totalNum}}</span>
                </div>
            </div>
            <button class="btn" :class="{'active': goodsCart.goods.length}" @click="toSettle()">确定</button>
        </div>
        <!-- 底部总计 end -->

        <!-- 品牌选择 start -->
        <selector-actions
            ref="brandPopup"
            title="品牌选择"
            :orderList="brand_list"
            :closeOnClickModal="false"
            labelKey="brand.name"
            valueKey="brand.brandId"
            @sure="selectBrand"
        />
        <!-- 品牌选择 end -->

        <!-- 顶部提示alert start -->
        <selector-actions
            ref="guidePopup"
            title="导购员选择"
            :orderList="guide_list"
            :closeOnClickModal="false"
            labelKey="UserName"
            valueKey="Id"
            @sure="selectGuide"
        />
        <!-- 顶部提示alert start -->

        <!-- 编辑商品信息弹框 start -->
        <mt-popup
            v-model="isEditGood"
            position="bottom"
            class="edit-pop"
        >
            <p class="exist">
                <i class="icon-exist" @click="isEditGood = false"/>
            </p>
            <div class="edit-content">
                <div class="good-detail">
                    <p class="good-title">
                        <span class="bd">{{edittingGood.spmc}}</span>
                        <span class="red">￥{{edittingGood.dj}}</span>
                    </p>
                    <span>规格：{{edittingGood.sku}}</span>
                    <span>规格：{{edittingGood.gg1mc}} {{edittingGood.gg2mc}}</span>
                    <span>库存：{{edittingGood.kcsl}}</span>
                </div>

                <div class="price">
                    <span class="bd">单价</span>
                    <input type="text" :placeholder="edittingGood.dj" v-model="edittedGoodPrice">
                </div>

                <mt-button class="sure" type="primary" size="large" @click="changeGoodInCart()">确定</mt-button>
            </div>
        </mt-popup>
        <!-- 编辑商品信息弹框 end -->
    </div>
</template>

<script>
// import api from '@/api';
import bshelp from '@/utils/bshelp';
import { Popup, MessageBox } from 'mint-ui';
import SearchHeader from 'components/SearchHeader';
import SelectorActions from 'components/SelectorActions';
import { mapMutations, mapState } from 'vuex';

export default {
    name: 'Cashier',
    components: {
        MtPopup: Popup,
        SearchHeader,
        SelectorActions,
    },
    data() {
        return {
            actionMessage: '',
            actionVisiable: false,
            isEditGood: false,
            goodsCart: {
                goods: []
            },
            edittingGood: {},
            edittedGoodPrice: '',
            totalNum: 0,
            totalMoney: 0
        };
    },
    computed: {
        ...mapState({
            selected_brand: state => state.shopConfig.selected_brand,
            selected_vip: state => state.vip.selected_vip,
            search_type_list: state => state.search.search_type_list,
            guide_list: state => state.shopConfig.guide_list,
            brand_list: state => state.shopConfig.brand_list
        })
    },
    mounted() {
        // api.get_user_list({
        //     ty: '2',
        //     shop_code: 'A024'
        // });
        // this.$store.commit('set_guide_list', [
        //     '导购11', 'Jay', 'MJ', '陈'
        // ]);
        this.$nextTick(() => {
            this.$refs.brandPopup.turn(true);
        });
    },
    methods: {
        ...mapMutations(['set_selected_guide', 'set_selected_brand']),
        // 弹框显示
        showActionPopup(msg) {
            this.actionVisiable = true;
            this.actionMessage = msg;
            setTimeout(() => {
                this.actionVisiable = false;
            }, 2000);
        },
        // 选择品牌弹框确定
        selectBrand(brand) {
            if (!brand) {
                this.showActionPopup('请选择品牌！');
                return;
            }
            this.set_selected_brand(brand);
            this.$refs.brandPopup.turn();
            this.$refs.guidePopup.turn(true);
        },
        // 选择导购员弹框确定
        selectGuide(guide) {
            if (!guide) {
                this.showActionPopup('请选择导购员！');
                return;
            }
            this.set_selected_guide(guide);
            this.$refs.guidePopup.turn();
        },
        // 搜索商品
        searchGoods(good) {
            const goodInCartIndex = this.goodsCart.goods.findIndex(g => g.sku === good.sku);
            if (goodInCartIndex >= 0) {
                this.goodsCart.goods[goodInCartIndex].sl++
            } else {
                this.goodsCart.goods.push(good);
            }
            this.refreshCart();
        },
        // 显示编辑弹框
        showGoodEditPannel(good) {
            this.edittedGoodPrice = '';
            this.isEditGood = true;
            this.edittingGood = good;
        },
        // 修改商品数量
        changeGoodNum(index, num = 0) {
            // this.goodsCart.goods[index].sl += num;
            // this.refreshCart()
            let sum = 0;
            this.goodsCart.goods.forEach(v => {
                if (v.singleProductCode === this.goodsCart.goods[index].singleProductCode) {
                    sum += v.sl;
                }
            });
            if (sum + num > this.goodsCart.goods[index].kcsl) {
                this.$toast('超出库存数, 不允许增加!');
                return;
            }

            if (this.goodsCart.goods[index].sl + num * 1 > 0) {
                this.goodsCart.goods[index].sl += num * 1;
                this.refreshCart();
            }else {
                MessageBox.confirm('确认删除此商品吗', '提示').then(() => {
                    this.goodsCart.goods.splice(index, 1);
                    this.refreshCart();
                }).catch(() => {});
            }
        },
        // 弹框改变选中商品信息
        changeGoodInCart() {
            this.edittingGood.dj
                = this.goodsCart.goods.find(good => this.edittingGood.sku === good.sku).dj
                = this.edittedGoodPrice;
            this.isEditGood = false;
            this.refreshCart();
        },
        // 刷新购物车
        refreshCart() {
            this.totalNum = 0;
            this.totalMoney = 0;
            this.goodsCart.goods.forEach(good => {
                this.totalNum = good.sl;
                this.totalMoney = good.sl * good.dj;
            });
        },
        // 跳转到settle(结算)页面
        toSettle() {
            if (!this.goodsCart.goods.length) return;
            const selectedVIP = this.selected_vip;
            if (selectedVIP) {
                this.$http.get_vip_coupon({
                    vpdm: selectedVIP.vip_code_unique,
                    customer_code: selectedVIP.customer_sn,
                    brand_code: this.selected_brand.brand.code
                }).then(res => {
                    this.couponSelect(res.data.data);
                }).catch(err => {
                    this.$toast('获取优惠券失败!');
                    this.promotionActive([], []);
                });
            }
        },
        // 选择优惠券
        couponSelect(coupons){
            if(!coupons || coupons.length < 1){
                this.promotionActive([], [], false);
                return;
            }

            let couponList = [];
            let couponArr = [];
            coupons.forEach((v, i) => {
                if(v.coupondetailtype != 50){//手机端支持50类型的优惠券
                    return ;
                }
                let startDate = v.validfrom || v.gaintime;
                let endDate = v.validto || v.overduetime;
                let tempCoupon = {
                    brand: v.brandid,
                    couponCode: v.couponid,
                    couponId: v.coupondetailno,
                    endDate: bshelp.timeStamp2String(new Date(endDate), 'datetime'),
                    startDate: bshelp.timeStamp2String(new Date(startDate), 'datetime'),
                    description: v.description,
                    money: v.money,
                    discount: v.discount,
                    coupondetailtype: v.coupondetailtype,
                    subject: v.subject,

                };
                // if(v.coupondetailtype == 50){
                tempCoupon.avaliableQuata = tempCoupon.money;
                // }
                couponList.push(tempCoupon);
            });

            if(!is_active){//需要筛选?
                if(couponList.length < 1){//没有符合类型的优惠券?
                    return this.promotionActive([], [], false);
                }

                return this.promotionActive(couponList, [], true);
            }

            // 组装coupons选择列表数据
            coupons.forEach((v, i) => {
                let tempCoupon = v;
                // if(v.coupondetailtype == 50){
                tempCoupon.avaliableQuata = v.money;
                // }
                couponList.push(tempCoupon);
                couponArr.push({
                    checked: false,
                    disabled:false,
                    coupondetailtype:v.coupondetailtype,
                    label: v.subject+ " | 折扣/金额:" + (v.discount?v.discount:v.money) + " | "+ tempCoupon.startDate+"~"+tempCoupon.endDate+"",
                    id:v.couponId,
                    value: v.couponId
                });
            });

            this.$router.push({
                name: 'CouponSelect',
                params: {
                    coupon_list: coupons
                }
            });
        },
        // 使用促销
        promotionActive() {
            // TODO:
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";
.good-title {
    display: flex;
    justify-content: space-between;
    font-size: 32px;
    font-weight: 500;
}
.bd {
    color: #000;
}
.red {
    color: red;
}
.good-detail {
    flex: 1;
    color: #8e9093;
    font-size: 28px;
    display: flex;
    flex-direction: column;
    padding-right: 20px;
}

.action-popup {
    width: 100%;
    height: 100px;
    line-height: 100px;
    font-size: 32px;
    text-align: center;
    background-color: rgba(0,0,0,.7);
    backface-visibility: hidden;
    color: #fff;
}

.cashier {
    display: flex;
    font-size: 28px;
    flex-direction: column;
    flex: 1;
    position: relative;
}

.cashier-content {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 120px;
}

.select-vip {
    color: #8e9093;
    font-size: 24px;
    line-height: 2;
    display: flex;
    padding: 20px 0;
    background-color: #fff;
    @include border-1px(#c8c7cc, bottom);
    margin-bottom: 40px;
    .vip-avatar {
        width: 140px;
        .icon-user {
            text-align: center;
            color: #fff;
            width: 72px;
            height: 72px;
            font-size: 40px;
            line-height: 72px;
            border-radius: 50%;
            background-color: #000;
        }
    }
    .vip-detail {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}

.goods-list {
    &:not(:first-child) {
        @include border-1px(#c8c7cc, top);
    }
    line-height: 1.6;
    li {
        display: flex;
        padding: 20px 30px;
        background-color: #fff;
        @include border-1px(#c8c7cc, bottom);
        &:not(:last-child) {
            margin-bottom: 40px;
        }
    }
    .good-operation {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        .icon-edit {
            font-size: 32px;
            margin-bottom: 16px;
        }
        .num-ctrl {
            display: flex;
            height: 60px;
            line-height: 60px;
            @include border-1px(#c8c7cc, left);
            span {
                text-align: center;
                flex: 1;
                width: 60px;
                @include border-1px(#c8c7cc, top, right, bottom);
                &:nth-child(2) {
                    width: 80px;
                }
            }
        }
    }
}

.cashier-summary {
    left: 0;
    bottom: 110px;
    width: 100%;
    height: 120px;
    display: flex;
    @include border-1px(#c8c7cc, top);
    position: absolute;
}

.summary-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .content-top {
        font-weight: 500;
        font-size: 40px;
        padding-bottom: 12px;
    }
    .content-bottom {
        font-size: 30px;
    }
    .red {
        color: red;
    }
}

.btn {
    width: 200px;
    font-size: 36px;
    color: #fff;
    background-color: #d0d0d0;
    &.active {
        background-color: #e30107;
    }
}

.edit-pop {
    height: 600px;
    width: 100%;
    background: #fff;
    .exist {
        font-size: 28px;
        text-align: right;
        height: 60px;
        line-height: 60px;
        .icon-exist {
            display: inline-block;
            height: 100%;
            padding: 0 20px;
        }
    }
    .edit-content {
        line-height: 1.6;
        padding: 0 32px;
    }
    .good-detail {
        flex-direction: row;
        flex-wrap: wrap;
        padding: 20px 0;
        @include border-1px(#c8c7cc, bottom);
        .good-title {
            flex: 100%;
        }
        > span {
            flex: 50% 0 0;
            &:nth-of-type(even) {
                text-align: right;
            }
        }
    }
    .price {
        color: #8e9093;
        font-size: 32px;
        padding: 30px 0;
        display: flex;
        align-items: center;
        line-height: 1;
        @include border-1px(#c8c7cc, bottom);
        input {
            flex: 1;
            font-size: inherit;
        }
        .bd {
            padding-right: 40px;
        }
    }
    .sure {
        border-radius: 0;
        position: absolute;
        left: 0;
        bottom: 0;
    }
    
}
</style>