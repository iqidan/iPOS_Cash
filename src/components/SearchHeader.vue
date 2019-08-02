<template>
    <header class="heads content">
        <scanner class="scanner"/>
        <search v-bind="$attrs" v-on="$listeners" class="search" />
        <div v-if="showBtn" class="cancel center">
            取消
        </div>
    </header>
</template>

<script>
import Search from './_search';
import Scanner from './Scanner';

export default {
    name: 'SearchHeader',
    components: {
        Search,
        Scanner
    },
    props: {
        showBtn: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/scss/helper.scss';

.heads {
    display: flex;
    height: 100px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    background-color: #f4f4f4;
    @include border-1px(#c8c7cc, bottom);
}

.scanner {
    padding-right: 10px;
    font-size: 60px;
    color: #5c5c5c;
}

.search {
    flex: 1;
    height: 68px;
    line-height: 68px;
    border-radius: 34px;
    margin-left: 10px;
}

.cancel {
    width: 100px;
    font-size: 28px;
    padding-left: 20px;
    align-self: stretch;
    color: $color-default;
}
</style>