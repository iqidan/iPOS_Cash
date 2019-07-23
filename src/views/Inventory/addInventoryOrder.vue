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
                    <input type="text">
                </li>
                <li class="content">
                    <span>备注</span>
                    <input type="text">
                </li>
            </ul>

            <div class="operation">
                <mt-button type="primary">确认</mt-button>
                <mt-button type="danger">取消</mt-button>
            </div>
        </div>

        <mt-popup
            class="select-pop"
            v-model="popupVisible"
            popup-transition="popup-fade">
            <div class="pop-title">任务单号</div>
            <mt-radio
                class="item-list"
                v-model="orderChecked"
                align="right"
                :options="orderList"
            />
            <div class="btns">
                <mt-button class="btn" type="default" @click="popupVisible = false">取消</mt-button>
                <mt-button class="btn" type="default">确定</mt-button>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import PlainHeader from 'components/PlainHeader';
import { Popup, Radio, Button } from 'mint-ui';

export default {
    name: 'Inventory',
    components: {
        PlainHeader,
        MtRadio: Radio,
        MtButton: Button,
        MtPopup: Popup
    },
    data() {
        return {
            popupVisible: false,
            orderChecked: '',
            orderList: []
        };
    },
    methods: {
        selectOrder() {
            this.orderList = ['1','2'];
            this.popupVisible = true;
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

.select-pop {
    width: 500px;
    overflow: hidden;
    background-color: #f8f8f8;
    border-radius: 26px;
    color: $color-default;
    .pop-title {
        color: #000;
        font-size: 34px;
        font-weight: bold;
        text-align: center;
        height: 120px;
        line-height: 90px;
        @include border-1px(#b8bbbf, bottom);
    }
    .item-list {
        font-size: 28px;
        @include border-1px(#b8bbbf, bottom);
    }
    .btns {
        display: flex;
        .btn {
            flex: 1;
            border-radius: 0;
            background-color: #f8f8f8;
            &::after{
                display: none;
            }
            &:active {
                background-color: #e9e9e9;
            }
        }
    }
}

</style>
