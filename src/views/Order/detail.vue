<template>
    <div class="detail">
        <plain-header />
        <h3>detail: {{orderId}}</h3>
    </div>
</template>

<script>
import api from '@/api';
import PlainHeader from 'components/PlainHeader';

export default {
    name: 'OrderDetail',
    components: {
        PlainHeader
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