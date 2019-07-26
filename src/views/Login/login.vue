<template>
    <div class="login">
        <label>
            店铺号
            <input type="text" v-model="shopCode">
        </label>
        <label>
            用户号
            <input type="text" v-model="userCode">
        </label>
        <label>
            密码
            <input type="password" v-model="pwd">
        </label>
        <button @click="doLogin()">登录</button>
    </div>
</template>

<script>
import api from '@/api';
import { mapState, mapActions } from 'vuex';

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
        ...mapActions(['login']),
        doLogin() {
            const canLogin = this.isInfoCorrect();
            if (!canLogin) return;
            this.login({
                shop_code: this.shopCode,
                user_code: this.userCode,
                password: this.pwd
            }).then(shopConfig => {
                this.$router.replace('/cashier');
            }).catch(err => {
                if (err) {
                    this.$toast(err.message + err.status);
                }
            });
        },
        isInfoCorrect() {
            if (this.shopCode.length < 1) {
                this.$toast('请输入店铺号!');
                return false;
            }
            if (this.userCode.length < 1) {
                this.$toast('请输入用户号!');
                return false;
            }
            if (this.pwd.length < 1) {
                this.$toast('请输入密码!');
                return false;
            }
            return true;
        }
    }
};
</script>

<style lang="scss" scoped>
.login {
    flex: 1;
}
</style>