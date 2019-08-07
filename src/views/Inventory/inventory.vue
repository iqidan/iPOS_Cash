<template>
    <div class="inventory">
        <plain-header>
            <span class="add-order" slot="right" @click="toAdd()">新增</span>
        </plain-header>
        
        <load-container class="inventory-content">
            <li
                v-for="order in orderList"
                :key="order.record_code"
                @click="toDetail(order)"
            >
                <info class="info">
                    <p>
                        <span>单据编号：<span class="bd">{{order.record_code}}</span></span>
                        <span>{{order.status_str}}</span>
                    </p>
                    <p>
                        <span>任务编号：{{order.task_code}}</span>
                    </p>
                    <p>
                        <span>区位：{{order.quwei}}</span>
                    </p>
                    <p>
                        <span>日期：<span>{{order.lastchanged}}</span></span>
                        <span>数量：<span class="bd">{{order.num}}</span>金额：<span class="bd">{{(order.money?order.money:0)|currency({precision:0})}}</span></span>
                    </p>
                    <p>
                        <span>备注：{{order.remark}}</span>
                    </p>
                </info>
            </li>
        </load-container>
    </div>
</template>

<script>
import PlainHeader from 'components/PlainHeader';
import Info from './components/OrderInfo';
import LoadContainer from 'components/LoadContainer';
import { mapState } from 'vuex';

const TEMP_DATA = {"task_id":"acad80a09ed2411cbc7ecdf6e1e9bb26","task_code":"PDRWD2019042400010","record_code":"PDD2019042400005","record_id":"a03ef4dff5784012b52f9394a481acfd","num":2,"money":470,"lastchanged":"2019-04-24 00:00:00","is_sure":1,"cp":"","cpcs":null,"kw_id":null,"kwmc":"默认库位","quwei":"B区","remark":null,"dczy":null}

export default {
    name: 'Inventory',
    components: {
        Info,
        PlainHeader,
        LoadContainer
    },
    data() {
        return {
            params: {
                page: 0,
                page_size: 15,
                store_code: this.$store.state.shopConfig.shop_config.shop_code,
                record_code: ''
            },
            orderList: []
        }
    },
    methods: {
        toAdd() {
            this.$router.push('/inventory/add');
        },
        toDetail(record) {
            this.$router.push({
                name: 'InventoryDetail',
                params: {
                    record
                }
            });
        },
        getInventoryList(isRefresh = false) {
            if (isRefresh) {
                this.params.page = 1;
            } else {
                this.params.page++;
            }
            this.hasNoMore = true;
            return this.$http.get_stock_check_list(this.params).then(res => {
                const hasNoMore = res.data.page >= res.data.page_count;
                this.hasNoMore = hasNoMore;
                return res.data.data;
            }).catch(() => {
                this.params.page--;
                this.hasNoMore = false;
            });
        },
        pullRefresh() {
            return this.getInventoryList(true).then(list => {
                this.orderList = list;
                return this.hasNoMore;
            })
        },
        loadMore() {
            return this.getInventoryList().then(list => {
                this.orderList = this.orderList.concat(list || []);
                return this.hasNoMore;
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";

.inventory {
    flex: 1;
    font-size: 28px;
    .inventory-content {
        flex: 1;
    }
    .info {
        height: 100%;
        .bd {
            font-size: 28px;
        }
    }
}
</style>

