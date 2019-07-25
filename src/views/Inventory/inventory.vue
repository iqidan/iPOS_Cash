<template>
    <div class="inventory">
        <plain-header>
            <span class="add-order" slot="right" @click="toAdd()">新增</span>
        </plain-header>
        
        <load-container class="inventory-content">
            <router-link
                tag="li"
                to="detail"
                append
                v-for="order in orderList"
                :key="order">
                <info class="info">
                    <p>
                        <span>单据编号：<span class="bd">PDD2019071800092</span></span>
                        <span>初始</span>
                    </p>
                    <p>
                        <span>任务编号：PDD2019071800092</span>
                    </p>
                    <p>
                        <span>区位：aaa</span>
                    </p>
                    <p>
                        <span>日期：<span>{{new Date | dateFormat('yyyy-MM-dd hh:mm:ss')}}</span></span>
                        <span>数量：<span class="bd">0</span>金额：<span class="bd">￥0</span></span>
                    </p>
                    <p>
                        <span>备注：</span>
                    </p>
                </info>
            </router-link>
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
            orderList: []
        }
    },
    methods: {
        toAdd() {
            this.$router.push('/inventory/add');
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
    }
}
</style>

