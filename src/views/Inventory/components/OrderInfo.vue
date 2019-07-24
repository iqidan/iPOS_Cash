<template>
    <div class="info">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Info'
};
</script>

<style lang="scss" scoped>
@import "~/scss/helper.scss";

.bd {
    font-size: 32px;
    color: #555;
}
.currency {
    font-size: 30px;
}
.info {
    color: #8e9093;
    font-size: 28px;
    line-height: 42px;
    display: flex;
    padding: 20px 30px;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    @include border-1px(#c8c7cc, bottom);
    p {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
