<template>
    <div class="inventory-detail">
        <plain-header />
        <div class="detail-content">
            <div class="caption content">单据信息</div>
            <info>
                <p>
                    <span>单据编号：<span class="bd">{{record.record_code}}</span></span>
                </p>
                <p>
                    <span>关联编号：<span>{{record.record_code}}</span></span>
                </p>
                <p>
                    <span>区位：<span>{{record.quwei}}</span></span>
                </p>
                <p>
                    <span>库位：<span>{{record.kwmc}}</span></span>
                </p>
                <p>
                    <span>日期：<span>{{record.record_time}}</span></span
                    >
                </p>
                <p>
                    <span>数量/金额：<span class="bd currency">{{record.num}} / &yen;{{record.money?record.money:0}}</span></span>
                </p>
                <p>
                    <span>备注：<span>{{record.remark}}</span></span>
                </p>
            </info>
            <div class="caption content">商品信息</div>
            <div v-if="!!record.is_sure === false && !!record_task.is_stop !== true" class="find-stock content">
                <scanner class="scanner"/>
                <div class="search">
                    <i class="icon-search" />
                    <input
                        class="search-input"
                        type="text"
                        placeholder="请录入商品条码"
                    />
                </div>
                <input class="search-num" type="number" value="1" />
            </div>

            <load-container class="good-list">
                <li
                    class="content"
                    v-for="g in record_detail"
                    :key="g.sku"
                    @click="editGood(g)"
                >
                    <p class="bold">{{g.goods_name}}<p>
                    <p>条码：{{g.sku}}</p>
                    <p>规格：{{g.color_name}} {{g.size_name}}
                    </p>
                    <p>价格：&yen;{{g.price}}
                    <span class="num">{{g.num}}</span>
                    </p>
                </li>
            </load-container>
        </div>
    </div>
</template>

<script>
import PlainHeader from 'components/PlainHeader';
import LoadContainer from 'components/LoadContainer';
import Info from './components/OrderInfo';
import Scanner from 'components/Scanner';
import { MessageBox } from 'mint-ui';

export default {
    name: 'InventoryDetail',
    components: {
        Info,
        Scanner,
        PlainHeader,
        LoadContainer
    },
    data() {
        return {
            record: this.$route.params.record,
            record_detail: [],
            record_task: {},
            params: {
                shop_code: this.$store.state.shopConfig.shop_code,
                record_code: this.$route.params.record.record_code,
                show_type: 0,
                page: 0,
                size: 15,
                record_id:this.$route.params.record.record_id
            },
            hasNoMore: false,
            accountChannelId: this.$store.state.shopConfig.shop_config.accountChannelId
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        // 更新商品库存信息
        updateGoodStock(good, isEdit = false) {
            let isExist = false, goods_list = [];

            isExist = this.record_detail.some(
                v => v.spdm === good.spdm && v.color_code === good.color_code && v.size_code === good.size_code
            );

            goods_list.push(good);

            const params = {
                record_code: this.record.record_code,
                record_detail: goods_list,
                bill_id: this.record.bill_id,
                ownerId: this.accountChannelId,
                kw_id: this.record.kw_id
            };

            return this.$http.update_stock_detail(params).then(() => {
                this.$toast('更新数据成功!');
                // 更新页面显示的主表数据
                let money = this.record.money || 0;
                if (!isEdit) {
                    money += good.num * good.price;
                    this.record.money = money; 
                    this.record.num += good.num;
                }
                // 更新明细数据
                if (!isExist) {
                    this.record_detail.unshift(good);
                } else {
                    const currentGood = this.record_detail.find(g => g.spdm === good.spdm && g.color_code === good.color_code && g.size_code === good.size_code)
                    if (currentGood) {
                        if (isEdit) {
                            let changeNum = good.num - currentGood.num;
                            money += changeNum * good.price;
                            this.record.money = money; 
                            this.record.num = this.record.num + changeNum;
                            currentGood.num = good.num;
                        } else {
                            currentGood.num += good.num;
                        }
                        return true;
                    } else {
                        return false;
                    }
                }
            });
        },
        // 获取商品列表
        getGoodsList() {
            if (this.hasNoMore) {
                return Promise.resolve();
            }
            this.hasNoMore = true;
            return this.$http.get_stock_check_detail(this.params).then(res => {
                this.$http.get_stock_task_list({
                    record_code: res.data.record.relation_code,
                    store_code: this.params.shop_code,
                    size: 1,
                    page: 1
                }).then(res2 => {
                    this.record_detail = res.data.record_detail;
                    this.record = res.data.record;
                    this.record_task = res2.data.data[0];
                });
            }).catch(() => {
                this.params.page--;
            }).finally(() => {
            });
        },
        // 点击编辑商品
        editGood(good) {
            if(!(!!this.record.is_sure === false && !!this.record_task.is_stop !== true)){
                return;
            }
            MessageBox.prompt(
                `${good.goods_name}(${good.sku})`,
                '修改数量',
                {
                    inputType: 'number',
                    inputPlaceholder: '请输入商品数量',
                    inputValue: good.num
                }
            ).then(({value}) => {
                if (value < 0) {
                    return this.$toast('请输入商品数量(非负数)!');
                } else if (Number(good.num) === value) {
                    return;
                }

                let tmpGood = Object.assign({}, good);
                this.updateGoodStock(tmpGood, true)
            }).catch(() => {});
        },
        loadMore() {
            return this.getGoodsList().then(() => {
                return this.hasNoMore;
            });
        },
        pullRefresh() {
            return this.getGoodsList(true).then(() => {
                this.hasNoMore = false;
                return this.hasNoMore;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";

.content {
    padding: 0 30px;
}

.caption {
    height: 70px;
    font-size: 28px;
    line-height: 70px;
    background: transparent;
    @include border-1px(#c8c7cc, bottom);
}

.inventory-detail {
    flex: 1;
}

.detail-content {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.find-stock {
    display: flex;
    height: 120px;
    line-height: 120px;
    align-items: center;
    font-size: 28px;
    @include border-1px(#c8c7cc, bottom);
    input {
        font-size: inherit;
    }
    .scanner {
        font-size: 60px;
        color: $color-default;
    }
    .search {
        .icon-search {
            color: #999;
            font-size: 32px;
            padding: 0 16px;
        }
        .search-input {
            background: transparent;
            height: 100%;
        }
        margin-left: 20px;
        background: rgba(0, 0, 0, 0.08);
        height: 72px;
        width: 440px;
        line-height: 72px;
        border-radius: 10px;
    }
    .search-num {
        margin-left: 20px;
        width: 80px;
        border-radius: 10px;
        padding: 0 10px;
        height: 50px;
        line-height: 50px;
        background: rgba(0, 0, 0, 0.03);
        color: #ff3b1b;
    }
}

.good-list {
    font-size: 28px;
    color: #8e9093;
    line-height: 1.5;
    li {
        background-color: #fff;
        padding-top: 20px;
        padding-bottom: 20px;
        @include border-1px(#c8c7cc, bottom);
        .num {
            float: right;
            color: #444;
        }
    }
}
</style>
