<template>
    <div class="inventory-detail">
        <plain-header />
        <div class="detail-content">
            <div class="caption content">单据信息</div>
            <info>
                <p>
                    <span
                        >单据编号：<span class="bd"
                            >PDD2019071800092</span
                        ></span
                    >
                </p>
                <p>
                    <span>关联编号：<span>PDD2019071800092</span></span>
                </p>
                <p>
                    <span>区位：<span>aaa</span></span>
                </p>
                <p>
                    <span>库位：<span>默认库位</span></span>
                </p>
                <p>
                    <span
                        >日期：<span>{{
                            new Date() | dateFormat("yyyy-MM-dd hh:mm:ss")
                        }}</span></span
                    >
                </p>
                <p>
                    <span
                        >数量/金额：<span class="bd currency"
                            >0 /￥0</span
                        ></span
                    >
                </p>
                <p>
                    <span>备注：<span>哈哈哈哈</span></span>
                </p>
            </info>
            <div class="caption content">商品信息</div>
            <div class="find-stock content">
                <scanner class="scanner" />
                <div class="search">
                    <i class="icon-search" />
                    <input
                        class="search-input"
                        type="text"
                        placeholder="请录入商品条码"
                    />
                </div>
                <input class="search-num" type="number" value="1" />
            </div>
        </div>
    </div>
</template>

<script>
import PlainHeader from 'components/PlainHeader';
import Info from './components/OrderInfo';
import Scanner from 'components/Scanner';

export default {
    name: 'InventoryDetail',
    components: {
        Info,
        Scanner,
        PlainHeader
    }
};
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";

.content {
    padding: 0 30px;
}

.caption {
    height: 70px;
    font-size: 28px;
    line-height: 70px;
    background: transparent;
    @include border-1px(#c8c7cc, bottom);
}

.inventory-detail {
    flex: 1;
}

.detail-content {
    flex: 1;
}

.find-stock {
    display: flex;
    height: 120px;
    line-height: 120px;
    align-items: center;
    font-size: 28px;
    input {
        font-size: inherit;
    }
    .scanner {
        font-size: 60px;
        color: $color-default;
    }
    .search {
        .icon-search {
            color: #999;
            font-size: 32px;
            padding: 0 16px;
        }
        .search-input {
            background: transparent;
            height: 100%;
        }
        margin-left: 20px;
        background: rgba(0, 0, 0, 0.08);
        height: 72px;
        width: 440px;
        line-height: 72px;
        border-radius: 10px;
    }
    .search-num {
        margin-left: 20px;
        width: 80px;
        border-radius: 10px;
        padding: 0 10px;
        height: 50px;
        line-height: 50px;
        background: rgba(0, 0, 0, 0.03);
        color: #ff3b1b;
    }
}
</style>
