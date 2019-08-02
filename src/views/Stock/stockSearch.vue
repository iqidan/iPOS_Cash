<template>
    <div class="stock">
        <plain-header />
        <div class="stock-search-content">
            <div class="search-cell">
                <span>商品</span>
                <input type="text" />
                <scanner class="scanner" />
            </div>

            <mt-button class="query-btn" type="primary">查询</mt-button>
        </div>
    </div>
</template>

<script>
import Scanner from 'components/Scanner';
import PlainHeader from 'components/PlainHeader';

export default {
    name: 'Stock',
    components: {
        Scanner,
        PlainHeader
    }
};
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";
.stock-search-content {
    flex: 1;
    padding-top: 30px;
    .search-cell {
        padding: 0 30px;
        display: flex;
        font-size: 34px;
        height: 100px;
        line-height: 100px;
        background-color: transparent;
        @include border-1px(#c8c7cc, top, bottom);
        input {
            flex: 1;
            align-self: stretch;
        }
        .scanner {
            color: $color-default;
            font-size: 48px;
        }
    }
    .query-btn {
        width: 90%;
        display: block;
        margin: 0 auto;
        margin-top: 60px;
        font-size: 32px;
    }
}
</style>

