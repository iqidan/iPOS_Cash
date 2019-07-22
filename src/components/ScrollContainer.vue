<template>
    <div
        class="scroll-container"
        infinite-scroll-disabled="hasNoMoreData"
        v-infinite-scroll="loadMore">
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'ScrollContainer',
    data () {
        return {
            hasNoMoreData: false,
            filters: {
                shop_code: this.$bus.shopConfig.shopCode,
                page: 1,
                page_size: 10
            },
            lists: this.list
        }
    },
    props: {
        list: {
            type: Array,
            default: []
        }
    },
    methods: {
        loadMore() {
            console.log('=======');
            this.hasNoMoreData = true;
            this.$parent.loadMore(this.filters).then(list => {
                this.filters.page++;
                this.lists = [...this.lists, ...list];
                this.hasNoMoreData = Boolean(hasNoMore);
            }).catch(() => {
                this.hasNoMoreData = false;
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.scroll-container {
    flex: 1;
    overflow: auto;
}
</style>