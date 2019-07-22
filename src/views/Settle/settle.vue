<template>
    <div class="settle">
        <plain-header />
        <h1>test</h1>
    </div>
</template>

<script>
// import api from '@/api';
import PlainHeader from 'components/PlainHeader';

export default {
    name: 'Settle',
    components: {
        PlainHeader
    },
    data() {
        return {
        };
    },
    methods: {
    }
};
</script>

<style lang="scss" scoped>
.settle {
    flex: 1;
}
</style>