<template>
    <div class="stock">
        <plain-header />
        <div class="stock-search-content">
            <div class="search-cell">
                <span>商品</span>
                <input type="text" v-model="good_code"/>
                <scanner class="scanner" @scan="scan"/>
            </div>

            <mt-button class="query-btn" type="primary" @click="search">查询</mt-button>

            <ul class="goods-list">
                <li v-for="good in search_result" :key="good.Sku">
                    <div class="good-img">
                        <img onerror="this.style.display='none';" :src="`${url}pos/image/goods_code&goods_code=${good.spdm}`">
                    </div>
                    <div class="info">
                        <p>
                            <span>{{good.spmc}} </span>
                            <span :class="{green:good.sl>0, red:good.sl<0}">{{good.sl||0}}</span>
                        </p>
                        <p class="line1">规格：{{good.gg1mc}} {{good.gg2mc}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Scanner from 'components/Scanner';
import PlainHeader from 'components/PlainHeader';
import { mapState } from 'vuex';
import config from '@/constants/config';

export default {
    name: 'Stock',
    components: {
        Scanner,
        PlainHeader
    },
    data() {
        return {
            url: config.url,
            good_code: '',
            shop_list: [],
            selected_shop: [],
            search_result: []
        }
    },
    computed: {
        ...mapState({
            shop_config: state => state.shop_config,
            shop_code: state => state.shop_config.shop_code
        })
    },
    created() {
        // 获取友好店铺列表
        // this.$http.get_friend_shop().catch(res => {
        //     this.shop_list = res.data.data;
        // });

        // this.$http.get_shop({
        //     zddm: this.shop_code
        // }).then(res => {
        //     if (res.data.data.length) {
        //         let shop = {
        //             Id: res.data.data[0].distributor_id,
        //             friend_shop_code: res.data.data[0].distributor_code,
        //             friend_shop_name: res.data.data[0].distributor_name
        //         };
        //         this.shop_list.unshift(shop);
        //         this.selected_shop = [shop];
        //     }
        // })
    },
    methods: {
        scan(data) {
            this.good_code = data.data;
            this.search();
        },
        search() {
            if (!this.good_code) {
                this.$toast('请录入商品');
                return;
            }
            this.$http.search_goods({
                sptm: this.good_code
            }).then(res => {
                if (res.data.length) {
                    this.good_code = res.data[0].spdm;
                }
                return this.good_code;
            }).then(
                good_code => this.$http.get_friend_shop_goods({
                    goods_code: good_code,
                    zd_id_str: this.shop_config.shop_id
                }).then(res => {
                    let all_result = [];
                    res.data.forEach(v =>{
                        all_result.push({
                            spdm: v.GoodsCode,
                            spmc: v.GoodsName,
                            gg1dm: v.ColorCode,
                            gg1mc: v.ColorName,
                            gg2dm: v.SizeCode,
                            gg2mc: v.SizeName,
                            sl: v.SkuNum,
                            shop_code: v.ShopCode,
                            shop_name: v.ShopName
                        });
                    });
                    this.search_result = all_result;
                })
            ).catch(() =>{
                this.$toast('未查找到商品');
            })
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";
.green {
    color: #21b94e;
}
.red {
    color: #f00;
}
.stock-search-content {
    flex: 1;
    padding-top: 30px;
    .search-cell {
        padding: 0 30px;
        display: flex;
        font-size: 34px;
        height: 100px;
        line-height: 100px;
        background-color: #fff;
        @include border-1px(#c8c7cc, top, bottom);
        input {
            flex: 1;
            z-index: 1;
            align-self: center;
            height: 90px;
            padding: 0 0 0 40px;
        }
        .scanner {
            z-index: 1;
            color: $color-default;
            font-size: 48px;
        }
    }
    .query-btn {
        width: 90%;
        display: block;
        margin: 0 auto;
        margin-top: 60px;
        font-size: 32px;
    }

    .goods-list {
        padding-top: 40px;
        li {
            height: 140px;
            display: flex;
            padding: 0 32px;
            background-color: #fff;
            align-items: center;
            @include border-1px(#c8c7cc, top);
            &:last-child {
                @include border-1px(#c8c7cc, top, bottom);
            }
            .good-img {
                width: 114px;
                height: 114px;
                margin-right: 32px;
                background-image: url(../../assets/imgs/404.jpg);
                background-size: contain;
                background-repeat: no-repeat;
            }
            .info {
                flex: 1;
                line-height: 1.5;
                display: flex;
                flex-direction: column;
                justify-content: center;
                p:first-child {
                    font-size: 34px;
                    display: flex;
                    justify-content: space-between;
                }
                p:last-child {
                    font-size: 28px;
                    color: #8e9093;
                }
            }
        }
    }
}
</style>

