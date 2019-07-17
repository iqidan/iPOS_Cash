<template>
  <div class="test">
      <h1>test page!</h1>
  </div>
</template>

<script>
import api from '@/api';

export default {
    name: 'Test'
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
  flex: 1;
}
</style>