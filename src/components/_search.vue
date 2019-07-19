<template>
    <div class="search">
        <div class="filters" @click.capture="popupVisible = true">
            <span class="line1">{{checked}}</span>
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
        <mt-field class="input" :placeholder="placeholder"/>
    </div>
</template>

<script>
import { Radio, Popup, Field } from 'mint-ui';

export default {
    name: 'Search',
    components: {
        MtRadio: Radio,
        MtField: Field,
        MtPopup: Popup
    },
    props: {
        selectList: { // 选项列表
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
            checked: this.selectList[0],
            popupVisible: false
        };
    },
    methods: {
        selectFilter () {
            this.popupVisible = false;
            this.$emit('changeFilter', this.checked);
        }
    }
};
</script>

<style lang="scss" scoped>
.search {
    display: flex;
    font-size: 28px;
    background-color: #e1e1e1;
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
        display: block;
        border: 10px solid transparent;
        border-top-color: #999;
    }
}

.input {
    padding-left: 20px;
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