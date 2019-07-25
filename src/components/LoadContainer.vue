<template>
    <mt-loadmore
        ref="scroller"
        class="wrapper"
        :top-method="pullRefresh"
        @top-status-change="handleTopChange"
    >
        <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-distance="50"
            infinite-scroll-disabled="noMore"
        >
            <slot />
        </ul>

        <div v-show="loading" class="page-infinite-loading center">
            <mt-spinner class="circle" type="fading-circle" :size="20"></mt-spinner>
            <span class="mint-loadmore-text">加载中...</span>
        </div>
        <div v-show="noMore && !loading" class="no-more">
            没有更多了
        </div>
    </mt-loadmore>
</template>

<script>
import { Loadmore, Spinner } from 'mint-ui';

export default {
    name: 'LoadContainer',
    components: {
        MtSpinner: Spinner,
        MtLoadmore: Loadmore
    },
    data() {
        return {
            ctx: null,
            topStatus: '',

            noMore: false,
            loading: false
        }
    },
    created() {
        // this.pullRefresh();
    },
    mounted() {
        this.ctx = this.$refs.scroller;
    },
    methods: {
        handleTopChange(status) {
            this.topStatus = status;
        },
        pullRefresh() {
            this.$parent.pullRefresh().then(noMore => {
                this.noMore = Boolean(noMore);
            }).finally(() => {
                this.ctx.onTopLoaded();
            });
        },
        loadMore() {
            this.noMore = true;
            this.loading = true;
            this.$parent.loadMore().then(noMore => {
                this.noMore = Boolean(noMore);
            }).finally(() => {
                this.loading = false;
            });
        }
    },
}
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";

.wrapper {
    flex: 1;
    overflow: auto;
}

.page-infinite-loading {
    text-align: center;
    height: 100px;
    line-height: 100px;
}
.no-more {
    color: #999;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
</style>
