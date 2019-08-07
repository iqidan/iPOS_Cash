<template>
    <div class="order">
        <search-header
            :showBtn="true"
            :select-list="selectList"
            :placeholder="'请输入小票单号'"
        />
        <load-container class="list-wrap">
                <!-- tag="li"
                :to="`detail/${item}`"
                append -->
            <li
                class="cell"
                v-for="item in orderList"
                :key="item.record_code"
                @click="toDetail(item)"
            >
                <div class="cell-level">
                    <span class="l">单据编号：{{item.record_code}}</span>
                    <span
                        :class="{'yellow':item.payState==0&&item.status!=9,'green':item.payState!=0, 'red':item.status==9}"
                        class="status">
                        {{item.status==9? "已作废" : (item.payState==0?'未付款':'')}}
                    </span>
                </div>
                <div class="cell-level">
                    <span class="l">{{item.record_time}}</span>
                    <div>
                        <span>数量：{{item.num}} 金额：</span>
                        <span class="money">{{item.final_money|currency}}</span>
                    </div>
                </div>
            </li>
        </load-container>
    </div>
</template>

<script>
import api from '@/api';
import SearchHeader from 'components/SearchHeader';
import LoadContainer from 'components/LoadContainer';
import { mapState } from 'vuex';

export default {
    name: 'Order',
    components: {
        SearchHeader,
        LoadContainer
    },
    data() {
        return {
            filters: {
                page: 0,
                page_size: 15
            },
            selectList: ['所有', '未完成'],
            hasNoMore: false,
            orderList: []
        };
    },
    computed: {
        ...mapState({
            shop_config: 'shop_config',
            shop_code: state => state.shopConfig.shop_config.shopCode
        })
    },
    methods: {
        /**
         * @param {Boolean} isRefresh [是否重置列表(刷新)]
         */
        getOrders(isRefresh = false) {
            if (isRefresh) {
                this.filters.page = 1;
            } else {
                this.filters.page++;
            }
            return api.get_order_list(this.filters).then(res => {
                const hasNoMore = res.data.page >= res.data.page_count;
                return [res.data.data, hasNoMore];
            });
        },
        pullRefresh() {
            return this.getOrders(true).then(([list, hasNoMore]) => {
                this.orderList = list || [];
                return hasNoMore;
            });
        },
        loadMore() {
            return this.getOrders().then(([list, hasNoMore]) => {
                this.orderList = this.orderList.concat(list || []);
                return hasNoMore;
            });
        },
        toDetail(order) {
            this.$router.push({
                name: 'OrderDetail',
                params: {
                    order
                }
            });
        }
    },
    created() {
        console.log(this.shop_config);
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
                &.red {
                    color: #ff3b1b;
                }

                &.green {
                    color: #21b94e;
                }

                &.yellow {
                    color: #f6a623;
                }

            }
            .money {
                color: #444;
            }
        }
    }
}

</style>