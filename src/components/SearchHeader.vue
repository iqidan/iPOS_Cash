<template>
    <header class="heads content">
        <icon-font class="icon" icon="scan" />
        <search v-bind="$attrs" v-on="$listeners" class="search" />
        <div v-if="showBtn" class="cancel center">
            取消
        </div>
    </header>
</template>

<script>
import Search from './_search';

export default {
    name: 'SearchHeader',
    components: {
        Search
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

.icon {
    padding-right: 10px;
    width: 60px;
}

.search {
    flex: 1;
    height: 68px;
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