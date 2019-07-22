<template>
    <mt-tabbar
        fixed
        v-model="activeIndex"
        class="tab-bar">
        <mt-tabitem
            v-for="item in tabList"
            :key="item.url"
            :id="item.url"
            class="bar-item"
            @click.native="changeTab(item.url)"
        >
            <!-- <icon-font slot="icon" class="icon" icon="scan" /> -->
            <div class="tab-inner">
                <i :class="`icon-${item.icon}`"/>
                <span>{{ item.name }}</span>
            </div>
        </mt-tabitem>
    </mt-tabbar>
</template>

<script>
import { Tabbar, TabItem } from 'mint-ui';

export default {
    name: 'TabBar',
    data() {
        return {
            tabList: [
                {
                    url: '/cashier',
                    icon: 'cart',
                    name: '收银'
                },
                {
                    url: '/order',
                    icon: 'order',
                    name: '订单'
                },
                {
                    url: '/stock',
                    icon: 'cube',
                    name: '存货'
                },
                {
                    url: '/setting',
                    icon: 'setting',
                    name: '设置'
                },
            ],
            activeIndex: ''
        };
    },
    watch: {
        $route (to) {
            const activePath = this.tabList.find(path => to.path.startsWith(path.url)).url;
            if (activePath) {
                this.activeIndex = activePath;
            }
        }
    },
    components: {
        MtTabbar: Tabbar,
        MtTabitem: TabItem
    },
    created() {
        this.activeIndex = this.$route.path;
    },
    methods: {
        changeTab(path) {
            this.$router.push(path);
            this.activeIndex = path;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";

.tab-bar {
    font-size: 40px;
    z-index: 20;
    height: 110px;
}

.bar-item {
    display: flex;
    flex-direction: column
}

.tab-inner {
    display: flex;
    flex-direction: column;
    font-size: 28px;
    [class^="icon-"] {
        font-size: 40px;
        margin-bottom: 10px;
    }
}
</style>