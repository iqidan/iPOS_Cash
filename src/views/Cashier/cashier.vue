<template>
    <div class="cashier">
        <Heads
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
    </div>
</template>

<script>
import api from '@/api';
import Heads from 'components/Heads';

export default {
    name: 'Cashier',
    components: {
        Heads
    },
    data() {
        return {
            selectList: ['商品', '会员', '优惠券']
        };
    },
    created() {
        // api.get_user_list({
        //     ty: '2',
        //     shop_code: 'A024'
        // });
    },
    methods: {
        selectFilterItem(item) {
            console.log('this is cashier page');
            console.log(item);
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