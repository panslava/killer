<template>
  <div>
    <register-mobile v-if="windowWidth<=768"></register-mobile>
  </div>
</template>

<script>
import RegisterMobile from '@/components/RegisterMobile.vue'

export default {
  components: {
    RegisterMobile
  },
  name: 'Register',
  data () {
    return {
      windowWidth: window.innerWidth
    }
  },
  mounted () {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/style/global-vars.scss";
</style>
