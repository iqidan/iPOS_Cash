<template>
    <div class="search">
        <div class="filters" @click.capture="popupVisible = true">
            <span class="line1">{{ checkedItem.label }}</span>
            <i class="triangle"></i>

            <mt-popup class="filter-list" v-model="popupVisible">
                <mt-radio
                    class="item-list"
                    v-model="checked"
                    align="right"
                    :options="selectList"
                    @change="selectFilter"
                />
            </mt-popup>
        </div>
        <!-- <input class="input" type="text" placeholder="请输入小票单号" /> -->
        <mt-field
            class="input"
            v-model="keyWords"
            :placeholder="placeholder"
            @keyup.enter.native="keyUp"
        />
    </div>
</template>

<script>
import { Radio, Popup, Field, MessageBox } from 'mint-ui';

export default {
    name: 'Search',
    components: {
        MtRadio: Radio,
        MtField: Field,
        MtPopup: Popup
    },
    props: {
        // 选项列表
        selectList: {
            type: Array,
            required: true
        },
        placeholder: {
            type: String,
            default: '请输入搜索内容'
        }
    },
    data() {
        return {
            checked: this.selectList[0].value,
            keyWords: '',
            popupVisible: false
        };
    },
    computed: {
        checkedItem() {
            const checkedItem = this.selectList.find(item => item.value === this.checked);
            return checkedItem || {};
        }
    },
    methods: {
        // enter搜索事件
        keyUp() {
            this.$emit('search', this.keyWords);
        },
        // 搜索框左侧的搜索维度
        selectFilter() {
            this.popupVisible = false;
            this.$emit('filterChange', this.checkedItem);
        }
    },
    created() {}
};
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";

.search {
    display: flex;
    font-size: 28px;
    background-color: #e1e1e1;
    /deep/ .mint-radiolist-title {
        display: none;
    }
}

.filters {
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 10px;
    width: 120px;
    position: relative;
    span {
        text-align: center;
        flex: 1 0 0;
    }
    i {
        margin-top: 12px;
        @include triangle(10px, #999, top);
    }
}

.input {
    flex: 1;
    min-height: auto;
    border-radius: inherit;
    background-color: inherit;
    display: flex;
    align-items: center;
    /deep/ input {
        font-size: 28px;
        line-height: 28px;
        background-color: #e1e1e1;
    }
}

.filter-list {
    top: 224px;
    left: 220px;
    border-radius: 10px;
    background-color: #fff;
    &::before {
        content: "";
        position: absolute;
        top: -20px;
        left: 50%;
        display: block;
        transform: translateX(-50%);
        border: 10px solid transparent;
        border-bottom-color: #fff;
    }
    .item-list {
        border-radius: inherit;
        overflow: hidden;
    }
    .filter-item {
        height: 100px;
        line-height: 100px;
    }
}
</style>