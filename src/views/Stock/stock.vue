<template>
    <div class="stock">
        <plain-header :showBack="false" />
        <div class="stock-content">
            <router-link to="/stock_search" tag="div" class="cell-wrap">
                <mt-cell
                    class="cell"
                    is-link
                    title="库存查询">
                    <i class="icon-search" slot="icon" />
                </mt-cell>
            </router-link>
            <router-link to="inventory" tag="div" class="cell-wrap">
                <mt-cell
                    class="cell"
                    is-link
                    title="盘点">
                    <i class="icon-order" slot="icon" />
                </mt-cell>
            </router-link>
        </div>
    </div>
</template>

<script>
import { Cell } from 'mint-ui';
import PlainHeader from 'components/PlainHeader';

export default {
    name: 'Stock',
    components: {
        PlainHeader,
        MtCell: Cell
    }
}
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";

.stock-content {
    flex: 1;
    padding-top: 30px;
    font-size: 32px;
    .cell-wrap {
        background-color: #fff;
    }
    .cell {
        @include border-1px(#c8c7cc, top, bottom);
        &:nth-child(1) {
            margin-top: 30px;
        }
        &:nth-child(2) {
            margin-top: 60px;
        }
        /deep/ .mint-cell-title {
            display: flex;
            align-items: center;
        }
    }
    i {
        color: $color-default;
        font-size: 36px;
        margin-right: 10px;
    }
}
</style>

