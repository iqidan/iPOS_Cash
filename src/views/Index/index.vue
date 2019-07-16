<template>
  <div class="index">
    <h1 style="text-align:center;">hellow world!</h1>
    <router-view />
  </div>
</template>

<script>
export default {
    name: 'Index',
    components: {},
    data() {
        return {};
    },
    created() {
        this.$http.post('purview/user/get_list', {
            ty: '2',
            shop_code: 'A024'
        });
        // this.$http.get('purview/user/get_list', {
        //     ty: '2',
        //     shop_code: 'A024'
        // });
    },
    methods: {
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
  flex: 1;
}
</style>