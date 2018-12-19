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

.overlay {
  display: grid;
  height: 100vh;
}

label {
  font-weight: 300;
  color: $color-label-font;
}

.header {
  font-weight: 100;
  color: $color-main-font;
  margin: 0;
  grid-area: header;
}

.email-input {
  grid-area: email;
}

.password-input {
  grid-area: password;
}

.login {
  grid-area: login;
}

@media (max-width: 768px) {
  .header {
    text-align: center;
  }

  .overlay {
    box-sizing: border-box;
    padding: $padding-mobile-overlay;
    grid-template-areas:
      "header"
      "email"
      "password"
      "login-button"
      "login";
    grid-template-rows:
      10fr max-content max-content
      9fr 50px;
    grid-template-columns: 1fr;
    justify-items: center;
  }

  .input-overlay {
    text-align: center;
    width: 100%;
  }

  .inputs {
    margin-top: 10px;
  }

  .login-button {
    align-self: end;
    margin-bottom: 20px;
  }

  .login-button__image {
    width: 50px;
  }

  .password-input {
    margin-top: 25px;
  }

  .login {
    align-self: end;
  }
}
</style>
