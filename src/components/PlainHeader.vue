<template>
    <mt-header class="head" v-bind="$attrs" :title="title" fixed>
        <div class="back" slot="left" @click="$router.back()" v-if="showBack">
            <i class="icon-back"/>
            <slot name="back">返回</slot>
        </div>
        <slot slot="right" name="right"></slot>
    </mt-header>
</template>

<script>
import { Header } from 'mint-ui';

export default {
    name: 'PlainHeader',
    components: {
        MtHeader: Header
    },
    props: {
        showBack: {
            type: Boolean,
            default: true
        }
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
    font-size: 34px;
    .back {
        display: flex;
        height: 100%;
        .icon-back {
            font-size: 40px;
            font-weight: bold;
        }
    }
    /deep/ .mint-header-title {
        color: #000;
        font-weight: bold;
        height: 100px;
        line-height: 100px;
    }
}
</style>