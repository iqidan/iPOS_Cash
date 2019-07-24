<template>
    <div class="inventory">
        <plain-header>
            <span class="add-order" slot="right" @click="toAdd()">新增</span>
        </plain-header>
        
        <ul class="inventory-content">
            <li
                v-for="order in orderList"
                :key="order"
                class="content">
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
            </li>
        </ul>
    </div>
</template>

<script>
import PlainHeader from 'components/PlainHeader';

export default {
    name: 'Inventory',
    components: {
        PlainHeader
    },
    data() {
        return {
            orderList: [1,2,3,5]
        }
    },
    methods: {
        toAdd() {
            this.$router.push('/add_inventory');
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";
.bd {
    font-size: 32px;
    color: #555;
}
.inventory {
    flex: 1;
    color: #8e9093;
    font-size: 28px;
    line-height: 42px;
    .inventory-content {
        flex: 1;
    }
    li {
        height: 250px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #fff;
        @include border-1px(#c8c7cc, bottom);
        p {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
}
</style>

