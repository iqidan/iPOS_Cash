<template>
  <div class="index">
    <Heads :select-list="selectList" :showFilters="showFilters"/>
    <div class="cashier-summary"></div>
  </div>
</template>

<script>
import api from '@/api';
import Heads from 'components/Heads';

export default {
    name: 'Index',
    components: {
      Heads
    },
    data() {
        return {
            showFilters: false,
            selectList: [
                '全部',
                '会员',
                '号码'
            ]
        };
    },
    created() {
        // api.get_user_list({
        //     ty: '2',
        //     shop_code: 'A024'
        // });
    },
    methods: {
        selectFilterItem (item) {
            console.log('this is index page');
            console.log(item);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";

.index {
  display: flex;
  font-size: 28px;
  flex-direction: column;
  flex: 1;
  position: relative;
}

.cashier-summary {
    left: 0;
    bottom: 110px;
    width: 100%;
    height: 120px;
    background-color: lightgreen;
    @include border-1px(#c8c7cc, bottom, top);
    position: absolute;
}
</style>