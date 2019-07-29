<template>
    <div class="cashier">
        <search-header
            @changeFilter="selectFilterItem"
            @search="searchGoods"
            :select-list="searchTypeList"
            :placeholder="'搜索商品'"/>
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

        <selector-actions
            ref="brandPopup"
            title="品牌选择"
            :orderList="brandList"
            :closeOnClickModal="false"
            labelKey="brand.name"
            valueKey="brand.brandId"
            @sure="selectBrand"
        />

        <selector-actions
            ref="guidePopup"
            title="导购员选择"
            :orderList="guideList"
            :closeOnClickModal="false"
            labelKey="UserName"
            valueKey="Id"
            @sure="selectGuide"
        />

        <mt-popup
            v-model="actionVisiable"
            position="top"
            :modal="false"
            class="action-popup"
        >
            <p>{{actionMessage}}</p>
        </mt-popup>
    </div>
</template>

<script>
// import api from '@/api';
import { Popup } from 'mint-ui';
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
            actionVisiable: false
        };
    },
    computed: {
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
            // this.$refs.brandPopup.turn(true);
        });
        console.log(this.$store.state.search)
        console.log(this.searchTypeList)
        console.log(this.searchType)
        console.log(this.setSelectedGuide)
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
        searchGoods(searchResult) {
            console.log(searchResult.data.data);// list
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";

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
</style>