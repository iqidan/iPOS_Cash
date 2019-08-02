<template>
    <div class="settle">
        <plain-header>
            <template slot="back">取消</template>
        </plain-header>
        <div class="settle-content">
            <ul class="money-summary">
                <li class="center">
                    <span>应收: </span>
                    <span class="red">￥400.00</span>
                </li>
                <li class="center">
                    <span>实收: </span>
                    <span class="red">￥0.00</span>
                </li>
                <li class="center">
                    <span>找零: </span>
                    <span class="red">{{10000.111 | currency}}</span>
                </li>
            </ul>
        </div>
        <div class="choose-pay content">
            <div class="choose-subtitle">
                请选择支付方式
            </div>
            <payments class="payments content" @choosePayment="choosePayment"/>
        </div>
        <div class="dashboard">
            <div class="summary content">
                <span>合计：<span class="red">￥1000.00</span></span>
                <span>数量：0</span>
            </div>
            <mt-button class="btn reset" type="primary">重置</mt-button>
            <mt-button class="btn pay" type="danger">结算</mt-button>
        </div>

        <mt-popup v-model="showPopup" position="bottom" class="sure-popup">
            <ul>
                <li class="content">
                    <span>代收金额</span>
                    <span class="red">￥950.00</span>
                </li>
                <li class="content">
                    <span>付款金额</span>
                    <input type="text" value="￥950.00">
                </li>
                <li class="content">
                    <span>找零金额</span>
                    <span>￥0.00</span>
                </li>
            </ul>
        </mt-popup>
    </div>
</template>

<script>
// import api from '@/api';
import { Popup } from 'mint-ui';
import PlainHeader from 'components/PlainHeader';
import Payments from './components/payment';

export default {
    name: 'Settle',
    components: {
        Payments,
        PlainHeader,
        MtPopup: Popup
    },
    data() {
        return {
            showPopup: false,
            payWays: []
        };
    },
    methods: {
        choosePayment(payment) {
            console.log(payment);
            this.showPopup = true;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";
.choose-pay {
    background-color: #fff;
}
.content {
    padding: 0 30px;
}

.red {
    color: red;
}
.settle {
    flex: 1;
    position: relative;
}

.money-summary {
    display: flex;
    height: 120px;
    line-height: 120px;
    background-color: #fff;
    align-items: center;
    margin-bottom: 20px;
    justify-content: space-evenly;
    li {
        height: 60%;
        padding-right: 20px;
        text-align: center;
        &:not(:last-child) {
            @include border-1px(#ddd, right);
        }
    }
}

.choose-subtitle {
    padding-top: 10px;
    font-size: 28px;
    text-align: center;
    height: 80px;
    line-height: 80px;
    @include border-1px(rgba(0, 0, 0, 0.3), bottom);
}
.payments {
    padding-top: 30px;
}

.dashboard {
    display: flex;
    height: 120px;
    font-size: 32px;
    width: 100%;
    left: 0;
    bottom: 0;
    @include border-1px(rgba(0, 0, 0, 0.3), top);
    position: absolute !important;
    .summary {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-right: 0;
        > span:first-child {
            font-weight: 500;
            font-size: 40px;
            margin-bottom: 20px;
        }
        > span:last-child {
            font-size: 28px;
        }
    }
    .btn {
        color: #fff;
        height: 100%;
        border-radius: 0;
        &.reset {
            width: 150px;
            background-color: #f6a623;
        }
        &.pay {
            width: 200px;
        }
    }
}

.sure-popup {
    font-size: 32px;
    width: 100%;
    li {
        height: 100px;
        line-height: 100px;
        display: flex;
        justify-content: flex-start;
        span:first-child {
            margin-right: 40px;
        }
        input {
            font-size: 32px;
        }
    }
}
</style>