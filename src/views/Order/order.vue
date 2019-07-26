<template>
    <div class="order">
        <search-header
            :showBtn="true"
            :select-list="selectList"
            :placeholder="'请输入小票单号'"
        />
        <load-container class="list-wrap">
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
                shop_code: this.shopConfig.shopCode,
                page: 1,
                page_size: 10
            },
            selectList: ['所有', '未完成'],

            orderList: []
        };
    },
    computed: {
        ...mapState('authorize', ['shopConfig'])
    },
    methods: {
        getOrders() {
            return api.get_order_list(this.filters).then(res => {
                this.filters.page++;
                if (this.orderList.length >= res.count) {
                    this.allLoaded = true;
                }
            });
        },
        pullRefresh() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.orderList = new Array(10).fill('1').map(() => Math.floor(Math.random()*1000000));
                    resolve();
                }, 2000);
            });
        },
        loadMore() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.orderList.push(...new Array(10).fill('1').map(() => Math.floor(Math.random()*1000000)));
                    resolve();
                }, 2000);
            });
        }
    },
    created() {
        console.log(this.shopConfig);
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

</style>