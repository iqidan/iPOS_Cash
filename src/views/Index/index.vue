<template>
  <div class="index">
    <h1 style="text-align:center;">hellow world!</h1>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Index",
  components: {
  },
  data() {
    return {
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~/scss/mixin.scss";
@import "~/scss/var.scss";

.index {
  display: flex;
  font-size: 28px;
  flex-direction: column;
  width: 750px;
}
</style>