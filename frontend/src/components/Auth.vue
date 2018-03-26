<template>
    <div class = 'auth'>
       <my-header content = 'Вход'></my-header> 

    </div>

</template>

<script>
import Header from './Header.vue'

export default {

    components: {
        MyHeader: Header
    },

  
}
</script>

<style lang="scss" scoped>
    @import '~@/utils/var.scss';
    .auth {
        background-color: $color--bg-main;
    }

</style>



