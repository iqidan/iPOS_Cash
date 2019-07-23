<template>
    <mt-popup
        class="select-pop"
        v-model="popupVisible"
        popup-transition="popup-fade"
    >
        <div class="pop-title">任务单号</div>
        <mt-radio
            class="item-list"
            v-model="orderChecked"
            align="right"
            :options="orderList"
        />
        <div class="btns">
            <mt-button
                v-if="showCancel"
                class="btn"
                type="default"
                @click="popupVisible = false"
            >取消</mt-button>
            <mt-button class="btn" type="default">确定</mt-button>
        </div>
    </mt-popup>
</template>

<script>
import { Popup, Radio, Button } from 'mint-ui';

export default {
    name: 'SelectorActions',
    components: {
        MtRadio: Radio,
        MtButton: Button,
        MtPopup: Popup
    },
    props: {
        showCancel: {
            type: Boolean,
            default: () => true
        },
        orderList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            popupVisible: false,
            orderChecked: ''
        };
    },
    created() {
        this.orderChecked = this.orderList[0];
    },
    methods: {
        toggle () {
            this.popupVisible = !this.popupVisible;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";

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
            &::after {
                display: none;
            }
            &:active {
                background-color: #e9e9e9;
            }
        }
    }
}
</style>
