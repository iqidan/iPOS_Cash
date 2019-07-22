<template>
    <mt-header class="head" v-bind="$attrs" :title="title">
        <div class="back" slot="left">
            <icon-font icon="scan" />
            返回
        </div>
    </mt-header>
</template>

<script>
import { Header } from 'mint-ui';

export default {
    name: 'PlainHeader',
    components: {
        MtHeader: Header
    },
    data() {
        return {
            title: ''
        };
    },
    created() {
        console.log(this.$route);
        if (this.$route.meta.title) {
            this.title = this.$route.meta.title;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";

.head {
    display: flex;
    height: 100px;
    background-color: #fff;
    @include border-1px(#c8c7cc, bottom);
    color: $color-default;
    .back {
        display: flex;
        height: 100%;
    }
    /deep/ .mint-header-title {
        color: #000;
        font-weight: bold;
        font-size: 34px;
        height: 100px;
        line-height: 100px;
    }
}
</style>