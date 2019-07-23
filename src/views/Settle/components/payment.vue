<template>
    <ul class="payment">
        <li
            v-for="way in payments"
            :key="way.name"
            class="center"
            :class="way.icon"
            @click="suerCurrency(way)">
            <span class="icon"></span>
            <span class="text">{{ way.name }}</span>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'Payment',
    data() {
        return {
            payments: [
                {
                    icon: 'market',
                    name: '商场购物卡',
                    value: ''
                },
                {
                    icon: 'market',
                    name: '无票微信退',
                    value: ''
                },
                {
                    icon: 'alipay',
                    name: '支付宝',
                    value: ''
                },
                {
                    icon: 'wechat',
                    name: '微信支付',
                    value: ''
                },
                {
                    icon: 'market',
                    name: '现金支付',
                    value: ''
                },
                {
                    icon: 'market',
                    name: '银联',
                    value: ''
                },
                {
                    icon: 'market',
                    name: '无票支付宝退',
                    value: ''
                }
            ]
        };
    },
    methods: {
        suerCurrency(item) {
            this.$emit('choosePayment', item);
        }
    }
};
</script>

<style lang="scss" scoped>
.payment {
    display: flex;
    flex-wrap: wrap;
    font-size: 24px;
    li {
        flex: 25% 0 0;
        flex-direction: column;
        margin-bottom: 60px;
    }
}

.text {
    color: #333;
}

.icon {
    display: block;
    width: 86px;
    height: 86px;
    background: url(../../../assets/imgs/icons.png) no-repeat;
    background-size: 800px auto;
    margin-bottom: 16px;
}

.wechat .icon {
    background-position: 0px -200px;
    &.disabled {
        background-position: 0px -100px;
    }
}

.alipay .icon {
    background-position: -100px -200px;
    &.disabled {
        background-position: -100px -100px;
    }
}

// .yhk .icon {
//     background-position: -100px -100px;
//     &.disabled {
//         background-position: -100px -50px;
//     }
// }

.market .icon {
    background-position: -300px -200px;
}

// .xjq .icon {
//     background: url(../assets/img/coupon.png) no-repeat;
//     background-size: 43px 43px;
//     margin-bottom: 4px;
//     &.disabled {
//         background-position: -150px -50px;
//     }
// }
</style>