<template>
    <mt-loadmore
        ref="scroller"
        class="wrapper"
        :top-method="pullRefresh"
        @top-status-change="handleTopChange"
    >
        <ul>
            <li v-for="item in list" :key="item">
                {{item}}
            </li>
        </ul>
    </mt-loadmore>
</template>

<script>
import { Loadmore } from 'mint-ui';

export default {
    name: 'Test',
    components: {
        MtLoadmore: Loadmore
    },
    data() {
        return {
            list: [1,2,4,5,9,0,23,29,14, 'a', 'b', 'c', 'd', 'e', 'f', 's'],

            topStatus: ''
        }
    },
    methods: {
      handleTopChange(status) {
          this.topStatus = status;
      },
      pullRefresh() {
          setTimeout(() => {
              this.$refs.scroller.onTopLoaded();
          }, 3000);
      }
    },
}
</script>

<style lang="scss" scoped>
.wrapper {
    flex: 1;
    overflow: auto;
}

li {
    height: 100px;
    line-height: 100px;
    border: 1px solid #999;
    background-color: #fff;
    margin-bottom: 30px;
    &:nth-child(odd) {
        background-color: lightgreen;
    }
}
</style>
