<template>
    <div class="login">
        <div class="logo"></div>

        <mt-field
            class="label"
            label="店铺代码"
            placeholder="请输入店铺代码"
            v-model="shopCode"
        />

        <mt-field
            class="label"
            label="用户代码"
            placeholder="请输入用户代码"
            v-model="userCode"
        />

        <mt-field
            class="label"
            label="密码"
            placeholder="请输入密码"
            v-model="password"
            type="password"
        />

        <label class="label remember-pwd">
            <input type="checkbox" v-model="isSave">
            记住密码
        </label>

        <mt-button
            class="label"
            type="danger"
            size="large"
            @click="doLogin()"
        >登录</mt-button>
    </div>
</template>

<script>
// import api from '@/api';
import { Field, Switch, MessageBox } from 'mint-ui';
import { mapActions } from 'vuex';

export default {
    name: 'Login',
    components: {
        MtField: Field,
        MtSwitch: Switch
    },
    data() {
        return {
            shopCode: 'A024',
            userCode: 'A02405',
            password: 'a123456',
            isSave: true
        };
    },
    methods: {
        ...mapActions(['login', 'get_guide_list']),
        doLogin() {
            const canLogin = this.isInfoCorrect();
            if (!canLogin) return;
            this.login({
                shop_code: this.shopCode,
                user_code: this.userCode,
                password: this.password
            })
                .then(() => {
                    this.$router.replace('/cashier');
                    this.get_guide_list({
                        ty: 2,
                        shop_code: this.shopCode
                    });
                })
                .catch(err => {
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
            if (this.password.length < 1) {
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
    font-size: 28px;
    flex: 1;
    align-items: center;
    background-image: url(../../assets/imgs/bg_red.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: 0 0;
}
.logo {
    width: 160px;
    height: 160px;
    background-image: url(../../assets/imgs/ico.png);
    background-size: 100%;
    background-position: center center;
    margin: 60px 0;
}
.label {
    width: 65%;
    margin-bottom: 40px;
    border-radius: 8px;
}
/deep/ .label.mint-field .mint-cell-title {
    width: 160px;
}
.remember-pwd {
    display: flex;
    align-items: center;
    input {
        width: 32px;
        height: 32px;
    }
}
</style>