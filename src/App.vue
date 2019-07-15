<template>
<transition name="slide">
  <router-view />
</transition>
</template>

<script>
export default {
};
</script>

<style lang="scss">
#app {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
