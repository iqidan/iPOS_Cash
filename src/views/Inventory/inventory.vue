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
                        <span>{{order.is_sure|inventoryStatus}}</span>
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
    },
    filters: {
        inventoryStatus(is_sure) {
            let status = String(is_sure);
            let res = '';
            switch (status) {
                case '0':
                    res = '初始';
                    break;
                case '1':
                    res = '提交';
                    break;
                case '2':
                    res = '审核';
                    break;
                case '3':
                    res = '执行';
                    break;
                case '5':
                    res = '盈亏';
                    break;
                case '6':
                    res = '验收';
                    break;
                case '7':
                    res = '发出';
                    break;
                case '8':
                    res = '完成';
                    break;
                case '9':
                    res = '终止';
                    break;
                case '10':
                    res = '确认';
                    break;
                case '12':
                    res = '入库';
                    break;
                case '14':
                    res = '差异处理';
                    break;
                case '15':
                    res = '差异处理完成';
                    break;
                default:
                    res = '';
                    break;
            }
            return res;
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

