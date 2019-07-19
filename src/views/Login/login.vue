<template>
    <div class="login">
        <Heads
            :showBtn="true"
            :select-list="selectList"
            :placeholder="'搜索商品'"/>
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
        <button @click="login()">登录</button>
    </div>
</template>

<script>
import api from '@/api';
import Heads from 'components/Heads';

export default {
    name: 'Login',
    components: {
        Heads
    },
    data() {
        return {
            shopCode: 'A024',
            userCode: 'A02405',
            pwd: 'a123456',
            isSave: true,
            selectList: [
                '所有', '未完成'
            ]
        };
    },
    methods: {
        login() {
            const canLogin = this.isInfoCorrect();
            if (!canLogin) return;
            api.login({
                shop_code: this.shopCode,
                user_code: this.userCode,
                password: this.pwd
            }).then(res => {
                if (res.data.status === 1) {
                    let shopConfig = this.formatShopConfig(res.data);
                    if (this.isSave) {
                        shopConfig.password = this.pwd;
                    } else {
                        shopConfig.password = '';
                    }
                    this.$router.replace('/index');
                } else {
                    this.$toast(res.data.message + res.data.status);
                }
            });
        },
        formatShopConfig(config = {}) {
            const data = config.data;
            const { session, zdkzb } = data;

            const shopConfig = {
                token: session.token,
                userCode: session.userCode,
                userId: session.userId,
                userRole: session.userRole,
                userName: session.userName,
                channelId: session.channelId,
                user: config.user.data,
                channel: session.channel,
                orgCode: session.channel.accountChannel.code,
                shopCode: session.channel.code,
                shopName: session.channel.name,
                shopPushId: zdkzb.send_message_id,
                isSendMessage: zdkzb.is_send_message,
                sendMessagePhone: zdkzb.send_message_phone,
                brand: config.brand.data.rows, // 品牌
                update_vip: data.update_vip // 会员信息采集(身高体重),enable: 1弹框输入 0不弹框 control: 1强制输入 0可选输入
            };
            return shopConfig;
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