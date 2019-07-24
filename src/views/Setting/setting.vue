<template>
    <div class="setting">
        <div class="setting-content">
            <mt-button
                class="exit-btn"
                type="danger"
                size="large"
                @click="exit()"
            >退出登录</mt-button>
        </div>
    </div>
</template>

<script>
import { Button, MessageBox } from 'mint-ui';

export default {
    name: 'Setting',
    components: {
        MtButton: Button
    },
    methods: {
        exit() {
            MessageBox({
                message: '确认退出登录？',
                showCancelButton: true
            }).then((action) => {
                if (action === 'confirm') {
                    this.$router.replace('/login');
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.setting-content {
    flex: 1;
    display: flex;
    flex-direction: column-reverse;
}

.exit-btn {
    font-size: 32px;
    display: block;
    margin: 0 auto;
    width: 80%;
    margin-bottom: 80px;
}
</style>
