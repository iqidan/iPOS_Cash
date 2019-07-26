<template>
    <div class="cashier">
        <search-header
            @changeFilter="selectFilterItem"
            :select-list="selectList"
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
            @sure="selectBand"
        />

        <selector-actions
            ref="guidePopup"
            title="导购员选择"
            :orderList="guideList"
            :closeOnClickModal="false"
            labelKey="UserName"
            valueKey="Id"
            @sure="selectBand"
        />
    </div>
</template>

<script>
// import api from '@/api';
import SearchHeader from 'components/SearchHeader';
import SelectorActions from 'components/SelectorActions';

export default {
    name: 'Cashier',
    components: {
        SearchHeader,
        SelectorActions,
    },
    data() {
        return {
            selectList: ['商品', '会员', '优惠券']
        };
    },
    computed: {
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
            this.$refs.brandPopup.show();
        });
    },
    methods: {
        selectFilterItem(item) {
            console.log('this is cashier page');
            console.log(item);
        },
        selectBand(band) {
            console.log(band);
            this.$refs.guidePopup.show();
        },
        selectGuide(guide) {
            console.log(guide);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";

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