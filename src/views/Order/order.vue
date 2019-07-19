<template>
    <div class="order">
        <Heads
            :showBtn="true"
            :select-list="selectList"
            :placeholder="'请输入小票单号'"
        />
        <mt-loadmore
            :top-method="pullDownRefresh"
            :bottom-method="pullUpLoadMore"
            ref="loadMore"
            class="order-content"
            :bottomPullText="'上拉加载'"
            :bottomDropText="'释放加载'"
            :bottomAllLoaded="noMoreOrder"
            @top-status-change="handleTopChange"
            @bottom-status-change="handleBottomChange"
        >
            <ul class="list-wrap">
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
            </ul>
        </mt-loadmore>
    </div>
</template>

<script>
import api from '@/api';
import { Cell, Loadmore } from 'mint-ui';
import Heads from 'components/Heads';

export default {
    name: 'Order',
    components: {
        Heads,
        MtCell: Cell,
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
            noMoreOrder: false,
            orderList: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
        };
    },
    methods: {
        getOrders() {
            return api.get_order_list(this.filters).then(res => {
                this.orderList = [...this.orderList, ...res.data.data];
                this.filters.page++;
                if (this.orderList.length >= res.data.count) {
                    this.noMoreOrder = true;
                }
            });
        },
        handleTopChange(status) {
            console.log(
                '%c top >>>>>> ' + status,
                'background:lightgreen;border-radius:10px;'
            );
        },
        handleBottomChange(status) {
            console.log(
                '%c bottom ====== ' + status,
                'background:lightblue;border-radius:10px;'
            );
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
            return await new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.orderList.push(
                        new Date().getTime(),
                        new Date().getTime(),
                        new Date().getTime()
                    );
                    setTimeout(() => {
                        this.$refs.loadMore.onBottomLoaded();
                    }, 1000);
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
    flex: 1;
    overflow-y: scroll;
}
.list-wrap {
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
</style>