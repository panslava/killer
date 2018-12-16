<template>
  <div class="overlay">
    <h1 class="header">Регистрация</h1>
    <div class="email-input input-overlay">
      <label>Email</label>
      <custom-input placeholder="name@example.com" class="inputs" type="email"></custom-input>
    </div>
    <div class="password-input input-overlay">
      <label>Пароль</label>
      <custom-input placeholder="**********" class="inputs" type="password"></custom-input>
    </div>
    <a onclick href="/register/next-page" class="next-page-button">
      <img class="next-page-button__image" src="@/assets/icons/arrow.png">
    </a>
    <router-link class="login" to="/login">Войти</router-link>
  </div>
</template>

<script>
import CustomInput from '@/components/global/CustomInput.vue'

export default {
  components: {
    CustomInput
  },
  name: 'RegisterMobileFirst',
  data () {
    return {
      email: '',
      password: ''
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
      "next-page-button"
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

  .next-page-button {
    align-self: end;
    margin-bottom: 20px;
  }

  .next-page-button__image {
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
