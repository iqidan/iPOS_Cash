<template>
    <div class="detail">
        <plain-header />
        <div class="detail-content">
            <div class="caption">订单信息</div>
            <div class="order-detail bd1">
                <span class="flex-1">订单编号：A024002019070513270</span>
                <span class="flex-half">店铺：A024</span>
                <span class="flex-half">收银员：(null)admin</span>
                <span class="flex-half">数量：5</span>
                <span class="flex-half">金额：6019</span>
                <span class="flex-half">vip：</span>
                <span class="flex-half">找零：</span>
                <span class="flex-half">备注：</span>
                <span class="flex-1">制单时间：{{(new Date) | dateFormat('yyyy-MM-dd hh:mm:ss')}}</span>
            </div>
            <div class="caption">商品信息</div>
            <div class="goods-list">
                <ul>
                    <li class="good bd1" v-for="item in [1,2,3,5,9]" :key="item">
                        <p>
                            <span>围巾</span>
                            <span class="red">￥791</span>
                        </p>
                        <p>
                            <span>条码|规格：MA151ORS52F17F | 菱格花卉色 F</span>
                            <span>x 1</span>
                        </p>
                    </li>
                </ul>
            </div>
            <div class="caption">结算信息</div>
            <div class="currency bd1">
                <span>现金支付</span>
                <span class="red">￥6019</span>
            </div>
            <div class="summary bd1">
                <span>合计</span>
                <span class="red">￥6019</span>
            </div>
            <div class="btns bd1">
                <mt-button class="btn" type="danger">终止</mt-button>
                <mt-button class="btn" type="primary" @click="pay">付款</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
// import api from '@/api';
import { Button } from 'mint-ui';
import PlainHeader from 'components/PlainHeader';

export default {
    name: 'OrderDetail',
    components: {
        PlainHeader,
        MtButton: Button
    },
    data() {
        return {
            orderId: this.$route.params.order_id
        };
    },
    methods: {
        pay() {
            this.$router.push('/settle');
        }
    },
    created() {
        // this.getOrders();
    }
};
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";

.flex-half {
    flex: 50% 0 0;
}
.flex-1 {
    flex: 100%;
}
.red {
    color: red;
}
.bd1 {
    background-color: #fff;
    @include border-1px(#c8c7cc, bottom);
    &:last-child {
        margin-bottom: 1px;
    }
}

.detail {
}
.detail-content {
    overflow: auto;
    padding-bottom: 60px;
    // background-color: #f5f5f5;
}
.detail-content > div {
    padding: 0 30px;
    font-size: 28px;
}
.caption {
    height: 70px;
    line-height: 70px;
    background-color: #eee;
    @include border-1px(#c8c7cc, bottom);
}
.detail .order-detail {
    display: flex;
    flex-wrap: wrap;
    color: #8e9093;
    font-size: 28px;
    line-height: 1.5em;
    padding: 30px 40px;
}

.detail .goods-list {
    padding: 0;
}
.good {
    height: 120px;
    display: flex;
    padding: 0 30px;
    flex-direction: column;
    justify-content: center;
    
    p {
        display: flex;
        justify-content: space-between;
    }
    p:first-child {
        font-size: 32px;
        margin-bottom: 10px;
    }
    p:last-child {
        color: #8e9093;
    }
}

.detail-content .currency,
.detail-content .summary {
    font-size: 28px;
    height: 100px;
    display: flex;
    line-height: 100px;
    color: #8e9093;
    justify-content: space-between;
}
.detail-content .summary {
    color: #000;
    font-size: 32px;
}

.detail .btns {
    display: flex;
    padding-top: 20px;
    padding-bottom: 20px;
    .btn {
        flex: 1;
        font-size: 32px;
        &:first-child {
            margin-right: 20px;
        }
    }
}
</style>