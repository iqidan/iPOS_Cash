<template>
    <div class="detail">
        <plain-header />
        <div class="detail-content">
            <div class="caption">订单信息</div>
            <div class="order-detail bd1">
                <span class="flex-1">订单编号：{{order.record_code}}</span>
                <span class="flex-half">店铺：{{order.shop_code}}</span>
                <span class="flex-half">收银员：{{order.trade_user_name}}</span>
                <span class="flex-half">数量：{{order.num}}</span>
                <span class="flex-half">金额：{{order.final_money}}</span>
                <span class="flex-half">vip：{{order.vip_code}}</span>
                <span class="flex-half">找零：{{order.change_money}}</span>
                <span class="flex-half">备注：{{order.remark}}</span>
                <span class="flex-1">制单时间：{{order.record_time}}</span>
            </div>
            <div class="caption">商品信息</div>
            <div class="goods-list">
                <ul>
                    <li class="good bd1" v-for="g in orderDetail.record_detail" :key="g.sku">
                        <p>
                            <span>{{g.goods_name}}</span>
                            <span class="red">{{g.price|currency({precision:0})}}</span>
                        </p>
                        <p>
                            <span class="line1">条码|规格：{{g.sku}} | {{g.color_name}} {{g.size_name}}</span>
                            <span>x {{g.num}}</span>
                        </p>
                    </li>
                </ul>
            </div>
            <div class="caption">结算信息</div>
            <div
                v-for="pay in orderDetail.payment"
                :key="pay.trade_type_code"
                class="currency bd1"
            >
                <span>{{pay.trade_type_name}}</span>
                <span class="red">{{pay.money|currency({precision:0})}}</span>
            </div>
            <div class="summary bd1">
                <span>合计</span>
                <span class="red">{{orderDetail.record && orderDetail.record.final_money|currency({precision:0})}}</span>
            </div>
            <div v-if="!(!orderDetail.record||!(orderDetail.record.status==1&&orderDetail.record.payState==0))&&!is_stop" class="btns bd1">
                <mt-button class="btn" type="danger">终止</mt-button>
                <mt-button class="btn" type="primary" @click="pay">付款</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
// import api from '@/api';
import PlainHeader from 'components/PlainHeader';

export default {
    name: 'OrderDetail',
    components: {
        PlainHeader
    },
    data() {
        return {
            order: this.$route.params.order || {},
            orderDetail: {},
            is_stop: false
        };
    },
    computed: {
        canNotPay() {
            return !this.orderDetail.record
                || !(this.orderDetail.record.status === 1 && this.orderDetail.record.payState === 0)
                || this.is_stop;
        }
    },
    methods: {
        pay() {
            this.$router.push('/settle');
        }
    },
    created() {
        this.$http.get_order_detail({
            record_code: this.order.record_code
        }).then(res => {
            this.orderDetail = res.data
        }).catch(() => {
            this.$toast('订单详情获取失败!');
        });
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
        .line1 {
            width: 80%;
        }
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