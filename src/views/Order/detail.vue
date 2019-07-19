<template>
    <div class="detail">
        <h3>detail: {{orderId}}</h3>
    </div>
</template>

<script>
import api from '@/api';
import Heads from 'components/Heads';

export default {
    name: 'OrderDetail',
    components: {
    },
    data() {
        return {
            orderId: this.$route.params.order_id
        };
    },
    methods: {
    },
    created() {
        // this.getOrders();
    }
};
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";

</style>