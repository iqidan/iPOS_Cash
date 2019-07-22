<template>
    <div class="order">
        <search-header
            :showBtn="true"
            :select-list="selectList"
            :placeholder="'请输入小票单号'"
        />
        <ul
            class="list-wrap"
            infinite-scroll-disabled="allLoaded"
            v-infinite-scroll="pullUpLoadMore">
            <router-link
                tag="li"
                class="cell"
                v-for="(item, index) in orderList"
                :to="`detail/${item}`"
                append
                :key="index * 3 + item"
            >
                <div class="cell-level">
                    <span class="l">单据编号：A024002019071900130</span>
                    <span class="status">未付款</span>
                </div>
                <div class="cell-level">
                    <span class="l">2019-07-19 14:33:45</span>
                    <div>
                        <span>数量：1 金额：</span
                        ><span class="money">￥1000</span>
                    </div>
                </div>
            </router-link>
            <li class="load-status">
                <div class="loading" v-show="loading&&!allLoaded">
                    <mt-spinner
                        class="circle"
                        type="fading-circle"
                        color="#488aff"
                        :size="24">
                    </mt-spinner>
                    <span class="text">加载中...</span>
                </div>
                <span v-show="allLoaded" class="no-more">没有更多数据</span>
            </li>
        </ul>
        </div>
</template>

<script>
import api from '@/api';
import { Cell, Loadmore, Spinner } from 'mint-ui';
import SearchHeader from 'components/SearchHeader';
import ScrollContainer from 'components/ScrollContainer';

export default {
    name: 'Order',
    components: {
        SearchHeader,
        ScrollContainer,
        MtCell: Cell,
        MtSpinner: Spinner,
        MtLoadmore: Loadmore
    },
    data() {
        return {
            filters: {
                shop_code: this.$bus.shopConfig.shopCode,
                page: 1,
                page_size: 10
            },
            selectList: ['所有', '未完成'],
            loading: false,
            allLoaded: false,
            orderList: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
        };
    },
    methods: {
        getOrders() {
            this.loading = true;
            return api.get_order_list(this.filters).then(res => {
                this.loading = false;
                this.orderList = [...this.orderList, ...res.data.data];
                this.filters.page++;
                if (this.orderList.length >= res.data.count) {
                    this.allLoaded = true;
                }
            }).catch(() => {
                this.loading = false;
            });
        },
        async pullDownRefresh() {
            return await new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.orderList = this.orderList.map(e =>
                        new Date().getTime()
                    );
                    setTimeout(() => {
                        this.$refs.loadMore.onTopLoaded();
                    }, 1000);
                    resolve('hahhh');
                }, 3000);
            });
        },
        async pullUpLoadMore() {
            if (this.loading) return;
            return await new Promise((resolve, reject) => {
                this.loading = true;
                setTimeout(() => {
                    this.orderList.push(
                        new Date().getTime(),
                        new Date().getTime(),
                        new Date().getTime()
                    );
                    this.loading = false;
                    if (this.orderList.length > 20) {
                        this.allLoaded = true;
                    }
                    console.log('>>>>>>>> ' + this.orderList.length);
                    resolve('hahhh');
                }, 3000);
            });
        }
    },
    created() {
        // this.getOrders();
    }
};
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";

.order-content {
}
.list-wrap {
    flex: 1;
    overflow-y: scroll;
    .cell {
        font-size: 28px;
        color: #8e9093;
        height: 140px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 30px;
        &:not(:first-child, :last-child) {
            @include border-1px(#c8c7cc, bottom);
        }
        .cell-level {
            display: flex;
            &:first-child {
                margin-bottom: 26px;
            }
            .l {
                flex: 1;
            }
            .status {
                color: #f6a623;
            }
            .money {
                color: #444;
            }
        }
    }
}
.load-status {
    display: flex;
    height: 140px;
    text-align: center;
    .loading {
        flex: 1;
        display: flex;
        color: $color-default;
        align-items: center;
        justify-content: center;
        .circle {
            display: flex;
        }
    }
    .text {
        margin-left: 20px;
    }
    /deep/ .mint-spinner-fading-circle {
        display: inline-block;
    }
    .no-more {
        color: #999;
        height: 140px;
        line-height: 140px;
        flex: 1;
        text-align: center;
    }
}
</style>