<template>
    <div class="cashier">
        <search-header
            @changeFilter="selectFilterItem"
            @search="searchGoods"
            :select-list="searchTypeList"
            :placeholder="'搜索商品'"/>

        <!-- 商品列表 start -->
        <ul class="goods-list">
            <li v-for="(good, index) in goodsCart.goods" :key="good.sku">
                <div class="good-detail">
                    <p class="good-title">
                        <span class="bd">{{good.spmc}}</span>
                        <span class="red">￥{{good.dj}}</span>
                    </p>
                    <span>规格：{{good.sku}}</span>
                    <span>参考价：{{good.gg1mc}} {{good.gg2mc}}</span>
                    <span>库存：{{good.kcsl}}</span>
                    <span>
                        导购员：
                        <select v-model="good.guide">
                            <option
                                v-for="guide in guideList"
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
        <!-- 商品列表 end -->

        <!-- 底部总计 start -->
        <div class="cashier-summary">
            <div class="content summary-content">
                <div class="content-top">
                    <span>合计：</span>
                    <span class="red">￥0.00</span>
                </div>
                <div class="content-bottom">
                    <span>数量：</span>
                    <span>0</span>
                </div>
            </div>
            <button class="btn">确定</button>
        </div>
        <!-- 底部总计 end -->

        <!-- 品牌选择 start -->
        <selector-actions
            ref="brandPopup"
            title="品牌选择"
            :orderList="brandList"
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
            :orderList="guideList"
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
import { Popup, Button } from 'mint-ui';
import SearchHeader from 'components/SearchHeader';
import SelectorActions from 'components/SelectorActions';
import { mapMutations, mapState } from 'vuex';

export default {
    name: 'Cashier',
    components: {
        MtPopup: Popup,
        MtButton: Button,
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
            edittedGoodPrice: ''
        };
    },
    computed: {
        ...mapState(['selectedBrand']),
        searchTypeList() {
            return this.$store.state.search.searchTypeList;
        },
        searchType() {
            return this.$store.state.search.searchType;
        },
        guideList () {
            return this.$store.state.shopConfig.guideList;
        },
        brandList () {
            return this.$store.state.shopConfig.brandList;
        }
    },
    mounted() {
        // api.get_user_list({
        //     ty: '2',
        //     shop_code: 'A024'
        // });
        // this.$store.commit('setGuideList', [
        //     '导购11', 'Jay', 'MJ', '陈'
        // ]);
        this.$nextTick(() => {
            this.$refs.brandPopup.turn(true);
        });
    },
    methods: {
        ...mapMutations(['setSelectedGuide', 'setSelectedBrand']),
        showActionPopup(msg) {
            this.actionVisiable = true;
            this.actionMessage = msg;
            setTimeout(() => {
                this.actionVisiable = false;
            }, 2000);
        },
        selectFilterItem(item) {
            console.log('this is cashier page');
            console.log(item);
        },
        selectBrand(brand) {
            if (!brand) {
                this.showActionPopup('请选择品牌！');
                return;
            }
            this.setSelectedBrand(brand);
            this.$refs.brandPopup.turn();
            this.$refs.guidePopup.turn(true);
        },
        selectGuide(guide) {
            if (!guide) {
                this.showActionPopup('请选择导购员！');
                return;
            }
            this.setSelectedGuide(guide);
            this.$refs.guidePopup.turn();
        },
        searchGoods(good) {
            const goodInCartIndex = this.goodsCart.goods.findIndex(g => g.sku === good.sku);
            if (goodInCartIndex >= 0) {
                this.goodsCart.goods[goodInCartIndex].sl++
            } else {
                this.goodsCart.goods.push(good);
            }
        },
        showGoodEditPannel(good) {
            this.edittedGoodPrice = '';
            this.isEditGood = true;
            this.edittingGood = good;
        },
        changeGoodNum(index, num = 0) {
            this.goodsCart.goods[index].sl += num;
        },
        changeGoodInCart() {
            this.edittingGood.dj = this.edittedGoodPrice;
            this.isEditGood = false;
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

.goods-list {
    flex: 1;
    padding-bottom: 120px;
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
    @include border-1px(#c8c7cc, bottom, top);
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
    .active {
        color: #e30107;
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