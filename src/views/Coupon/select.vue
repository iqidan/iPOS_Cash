<template>
    <div class="coupon-select">
        <plain-header />
        <mt-checklist
            class="select-list"
            v-model="selectedCoupon"
            :options="coupons"
        />

        <div class="btns">
            <mt-button type="primary" size="large">确认</mt-button>
            <mt-button type="danger" size="large">取消</mt-button>
        </div>
    </div>
</template>

<script>
import PlainHeader from 'components/PlainHeader';
import { Checklist } from 'mint-ui';
import { mapMutations } from 'vuex';

export default {
    name: 'CouponSelect',
    components: {
        PlainHeader,
        MtChecklist: Checklist
    },
    data() {
        return {
            selectedCoupon: [],
            coupons: []
        }
    },
    created() {
        console.log(this.$route);
        let count = 20;
        while (count--) {
            this.coupons.unshift({
                label: `测试卡券${count}`,
                value: String(count)
            });
        }
    },
    methods: {
        ...mapMutations([
            'set_selected_coupons'
        ]),
        sure() {
            if (!this.selectedCoupon.length) {
                return this.$toast('请选择优惠券');
            }
            this.set_selected_coupons(this.selectedCoupon);
            this.$router.back();
        },
        cancel() {
            this.$router.back();
        }
    }
}
</script>

<style lang="scss" scoped>
.select-list {
    flex: 1;
    overflow-y: auto;
}
.btns {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    button {
        &:first-child {
            margin-right: 5%;
        }
        // border-radius: 0;
        flex: 40% 0 0;
    }
}
</style>