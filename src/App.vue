<template>
    <div id="content">
        <keep-alive>
            <router-view class="child-view" :class="shown ? 'show-tab' : ''" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view class="child-view" :class="shown ? 'show-tab' : ''" v-if="!$route.meta.keepAlive" />
        <TabBar v-show="shown" />
    </div>
</template>

<script>
import TabBar from 'components/TabBar';
import constants from '@/constants/config';

export default {
    components: {
        TabBar
    },
    data() {
        return {
            tabList: constants.tabList,
            shown: false
        };
    },
    watch: {
        $route(to) {
            this.shown = Boolean(
                this.tabList.find(path => to.path === path.url)
            );
        }
    }
};
</script>

<style lang="scss">
@import "~/scss/helper.scss";

#content {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.child-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: $color-bg;
    transition-property: transform, opacity;
    transition-duration: 0.6s;
    transition-timing-function: ease-out;
    display: flex;
    flex-direction: column;
    &.show-tab {
        padding-bottom: 110px;
    }
}
.slide-left-enter {
    opacity: 0;
    transform: translate(100%, 0);
}
.slide-left-enter-active {
    z-index: 10;
}
.slide-left-leave-active {
    z-index: 0;
}
.slide-right-leave-active {
    opacity: 0;
    transform: translate(100%, 0);
    z-index: 11;
}
</style>
