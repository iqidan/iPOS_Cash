<template>
    <div id="content">
        <keep-alive>
            <router-view class="child-view" v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view class="child-view" v-if="!$route.meta.keepAlive"/>
        <TabBar />
    </div>
</template>

<script>
import TabBar from 'components/TabBar';

export default {
    components: {
        TabBar
    }
};
</script>

<style lang="scss">
@import '~/scss/helper.scss';

#content {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: $color-bg;
}

.child-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    transition-property: transform, opacity;
    transition-duration: 0.6s;
    transition-timing-function: ease-out;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    padding-bottom: 110px;
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
