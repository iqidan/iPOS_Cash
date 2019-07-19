<template>
    <mt-tabbar fixed v-model="activeIndex" class="tab-bar">
        <mt-tabitem
            v-for="item in tabList"
            :key="item"
            :id="item"
            class="bar-item"
            @click.native="changeTab(item)"
        >
            <icon-font slot="icon" class="icon" icon="scan" />
            {{ item }}
        </mt-tabitem>
    </mt-tabbar>
</template>

<script>
import { Tabbar, TabItem } from 'mint-ui';

export default {
    name: 'TabBar',
    data() {
        return {
            tabList: ['/cashier', '/order', '/stock', '/setting'],
            activeIndex: ''
        };
    },
    watch: {
        $route (to, from) {
            const activePath = this.tabList.find(path => to.path.startsWith(path));
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
.tab-bar {
    font-size: 40px;
    z-index: 20;
    height: 110px;
}

.bar-item {
    display: flex;
    flex-direction: column
}
</style>