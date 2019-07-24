<template>
    <div class="add-inventory">
        <plain-header :showBack="false" />

        <div class="add-inventory-content">
            <div class="caption content">新增信息</div>

            <ul class="order-info">
                <li class="content">
                    <span>任务单号</span>
                    <span class="select-order" @click="selectOrder()"
                        >PDRWD2019071800155<i
                    /></span>
                </li>
                <li class="content">
                    <span>盘点日期<span class="l">2019/7/18</span></span>
                </li>
                <li class="content">
                    <span>盘点类型<span class="l">商品范围抽盘</span></span>
                </li>
                <li class="content">
                    <span>区位</span>
                    <input class="l" type="text">
                </li>
                <li class="content">
                    <span>备注</span>
                    <input class="l" type="text">
                </li>
            </ul>

            <div class="operation">
                <mt-button type="primary">确认</mt-button>
                <mt-button type="danger" @click="$router.back()">取消</mt-button>
            </div>
        </div>
        <selector-actions ref="selector" :orderList="orderList"/>
    </div>
</template>

<script>
import SelectorActions from 'components/SelectorActions';
import PlainHeader from 'components/PlainHeader';
import { Button } from 'mint-ui';

export default {
    name: 'Inventory',
    components: {
        PlainHeader,
        SelectorActions,
        MtButton: Button
    },
    data() {
        return {
            orderChecked: '',
            orderList: []
        };
    },
    methods: {
        selectOrder() {
            this.orderList = ['1','2'];
            this.$refs.selector.toggle();
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";

.content {
    padding: 0 30px;
}
.add-inventory {
    padding-top: 100px;
}
.order-info {
    font-size: 32px;
    background-color: #fff;
    li {
        height: 100px;
        display: flex;
        line-height: 100px;
        justify-content: space-between;
        align-items: center;
        @include border-1px(#c8c7cc, bottom);
        i {
            margin: 10px 0 0 10px;
            @include triangle(10px, #999, top);
        }
        .l {
            display: inline-block;
            padding-left: 40px;
        }
        input {
            flex: 1;
            font-size: inherit;
            align-self: stretch;
        }
    }
    .select-order {
        display: flex;
        align-items: center;
    }
}
.caption {
    height: 70px;
    font-size: 28px;
    line-height: 70px;
    background: transparent;
    @include border-1px(#c8c7cc, bottom);
}

.operation {
    display: flex;
    left: 0;
    bottom: 0;
    width: 100%;
    justify-content: space-evenly;
    @include border-1px(#c8c7cc, top);
    position: absolute;
    padding: 20px 0;
    background-color: #fff;
    button {
        font-size: 32px;
        width: 300px;
    }
}

</style>
