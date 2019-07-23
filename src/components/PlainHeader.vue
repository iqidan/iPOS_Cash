<template>
    <mt-header class="head" v-bind="$attrs" :title="title" fixed>
        <div class="back" slot="left" @click="$router.back()">
            <!-- <icon-font icon="scan" /> -->
            <i class="icon-back"/>
            <slot name="back">返回</slot>
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
    position: fixed;
    color: $color-default;
    .back {
        display: flex;
        height: 100%;
        font-size: 34px;
        .icon-back {
            font-size: 40px;
            font-weight: bold;
        }
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