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
        <mt-field
            class="input"
            v-model="keyWords"
            :placeholder="placeholder"
            @keydown.enter.native="searchGoods"/>
    </div>
</template>

<script>
import { Radio, Popup, Field } from 'mint-ui';
import { mapMutations, mapActions, mapGetters } from 'vuex';

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
    computed: {
        ...mapGetters(['getSearchTypeValue']),
    },
    data() {
        return {
            checked: this.$store.state.search.selectedSearchType,
            keyWords: '',
            popupVisible: false
        };
    },
    methods: {
        ...mapMutations(['setType']),
        ...mapActions(['search']),
        searchGoods (e) {
            let param = {};
            switch (this.getSearchTypeValue) {
                case '1':
                    param = {
                        sptm: this.keyWords
                    }
                    break;
                case '2':
                    param = {
                        vip_code: this.keyWords,
                        wkdm: '',
                        is_select_vip: '',
                        source: '6'
                    }
                    break;
                case '3':
                    param = {
                        coupon_code: this.keyWords
                    }
                    break;
            }
            this.search(param).then(res => {
                this.$emit('search', res);
            });
        },
        selectFilter () {
            this.popupVisible = false;
            this.$emit('changeFilter', this.getSearchTypeValue);
            this.setType(this.checked);
        }
    },
    created() {
    }
};
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";

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
        @include triangle(10px, #999, top);
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