<template>
    <i href="javascript:;" class="icon-scanner" />
</template>

<script>
import utils from '@/utils';

export default {
    name: 'Scanner',
    data() {
        return {
            isInScanning: true
        }
    },
    methods: {
        scan() {
            if (this.isInScanning) return;
            utils.scan(data => {
                this.isInScanning = false;
                this.$emit('scan', data);
            });
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
