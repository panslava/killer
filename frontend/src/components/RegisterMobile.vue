<template>
  <div>
    <register-mobile-first @changePage="pageNum = 2" v-if="pageNum == 1"></register-mobile-first>
    <register-mobile-second @changePage="pageNum = 1" v-if="pageNum == 2"></register-mobile-second>
  </div>
</template>

<script>
import RegisterMobileFirst from '@/components/RegisterMobileFirst'
import RegisterMobileSecond from '@/components/RegisterMobileSecond'

export default {
  components: {
    RegisterMobileFirst, RegisterMobileSecond
  },
  name: 'RegisterMobile',
  data () {
    return {
      pageNum: 1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
