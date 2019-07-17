<template>
    <!-- <img class="iconfont" :src="'../fonts/'+icon+'.svg'"> -->
    <img class="iconfont" src="@/assets/fonts/scan.svg">
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            required: true
        }
    }
}
</script>