<template>
    <div class="inventory">
        <plain-header>
            <span class="add-order" slot="right" @click="toAdd()">新增</span>
        </plain-header>
        
        <ul class="inventory-content">
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
        </ul>
    </div>
</template>

<script>
import PlainHeader from 'components/PlainHeader';
import Info from './components/OrderInfo';

export default {
    name: 'Inventory',
    components: {
        Info,
        PlainHeader
    },
    data() {
        return {
            orderList: [1,2,3,5]
        }
    },
    methods: {
        toAdd() {
            this.$router.push('/inventory/add');
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

