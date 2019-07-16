<template>
    <div class="login">
        <button @click="login">登录</button>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            shopCode: 'A024',
            userCode: 'A02405',
            pwd: 'a123456',
            isSave: true
        };
    },
    methods: {
        login() {
            this.$router.push('/index');
            // this.$http
            //     .post('base/shop/shop_login_pos', {
            //         shop_code: this.shopCode,
            //         user_code: this.userCode,
            //         password: this.pwd
            //     })
            //     .then(res => {
            //         if (res.data.status === 1) {
            //             this.$router.push('/index');
            //         }
            //     });
        }
    }
};
</script>

<style lang="scss" scoped>
.login {
    flex: 1;
}
</style>