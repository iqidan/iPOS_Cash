<template>
    <mt-popup
        class="select-pop"
        v-model="popupVisible"
        :closeOnClickModal="closeOnClickModal"
        popup-transition="popup-fade"
    >
        <div class="pop-title">{{title}}</div>
        <mt-radio
            class="item-list"
            v-model="orderChecked"
            align="right"
            :options="shownList"
        />
        <div class="btns">
            <mt-button
                v-if="showCancel"
                class="btn"
                type="default"
                @click="popupVisible = false"
            >取消</mt-button>
            <mt-button class="btn" type="default" @click="sure">确定</mt-button>
        </div>
    </mt-popup>
</template>

<script>
import { Popup, Radio, Button } from 'mint-ui';
import utils from '@/utils';

export default {
    name: 'SelectorActions',
    components: {
        MtRadio: Radio,
        MtButton: Button,
        MtPopup: Popup
    },
    props: {
        title: {
            type: String,
            default: () => ''
        },
        closeOnClickModal: {
            type: Boolean,
            default: () => true
        },
        showCancel: {
            type: Boolean,
            default: () => false
        },
        orderList: {
            type: Array,
            default: () => []
        },
        // 对象中对应显示名称的key值
        labelKey: {
            type: String,
            required: true
        },
        // 对应value的key值
        valueKey: {
            type: String,
            required: true
        }
    },
    computed: {
        // 显示列表数据
        shownList () {
            return this.orderList.map(item => {
                return {
                    value: utils.getKey(item, this.valueKey) + '',
                    label: utils.getKey(item, this.labelKey) + '',
                    origin: item
                }
            });
        }
    },
    data() {
        return {
            popupVisible: false,
            orderChecked: ''
        };
    },
    created() {
        if (this.shownList[0]) {
            this.orderChecked = utils.getKey(this.orderList[0], this.valueKey) + ''
        } else {
            this.orderChecked = '';
        }
    },
    methods: {
        turn (bol = false) {
            this.popupVisible = bol;
        },
        sure () {
            this.$emit('sure', this.orderList.find(e => utils.getKey(e, this.valueKey) == this.orderChecked));
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
        overflow-y: auto;
        max-height: 400px;
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
