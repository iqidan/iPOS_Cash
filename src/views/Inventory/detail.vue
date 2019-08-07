<template>
    <div class="inventory-detail">
        <plain-header />
        <div class="detail-content">
            <div class="caption content">单据信息</div>
            <info>
                <p>
                    <span>单据编号：<span class="bd">{{record.record_code}}</span></span>
                </p>
                <p>
                    <span>关联编号：<span>{{record.record_code}}</span></span>
                </p>
                <p>
                    <span>区位：<span>{{record.quwei}}</span></span>
                </p>
                <p>
                    <span>库位：<span>{{record.kwmc}}</span></span>
                </p>
                <p>
                    <span>日期：<span>{{record.record_time}}</span></span
                    >
                </p>
                <p>
                    <span>数量/金额：<span class="bd currency">{{record.num}} / &yen;{{record.money?record.money:0}}</span></span>
                </p>
                <p>
                    <span>备注：<span>{{record.remark}}</span></span>
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

            <ul class="good-list">
                <li class="content" v-for="g in record_detail" :key="g.sku">
                    <p class="bold">{{g.goods_name}}<p>
                    <p>条码：{{g.sku}}</p>
                    <p>规格：{{g.color_name}} {{g.size_name}}
                    </p>
                    <p>价格：&yen;{{g.price}}
                    <span class="num">{{g.num}}</span>
                    </p>
                </li>
            </ul>
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
    },
    data() {
        return {
            record: this.$route.params.record,
            record_detail: [],
            params: {
                shop_code: this.$store.state.shopConfig.shop_code,
                record_code: this.$route.params.record.record_code,
                show_type: 0,
                page: 1,
                size: 15,
                record_id:this.$route.params.record.record_id
            }
        }
    },
    created() {
        this.getInventoryList();
    },
    methods: {
        getInventoryList() {
            this.$http.get_stock_check_detail(this.params).then(res => {
                this.record_detail = res.data.record_detail;
            });
        }
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
    display: flex;
    flex-direction: column;
}

.find-stock {
    display: flex;
    height: 120px;
    line-height: 120px;
    align-items: center;
    font-size: 28px;
    @include border-1px(#c8c7cc, bottom);
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

.good-list {
    font-size: 28px;
    color: #8e9093;
    line-height: 1.5;
    li {
        background-color: #fff;
        padding-top: 20px;
        padding-bottom: 20px;
        @include border-1px(#c8c7cc, bottom);
        .num {
            float: right;
            color: #444;
        }
    }
}
</style>
