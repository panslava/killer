<template>
  <div class="overlay">
    <h1 class="header">Вход</h1>
    <div class="email-input input-overlay">
      <label>Email</label>
      <custom-input placeholder="name@example.com" class="inputs" type="email"></custom-input>
    </div>
    <div class="password-input input-overlay">
      <label>Пароль</label>
      <custom-input placeholder="************" class="inputs" type="password"></custom-input>
    </div>
    <div class="login-button">
      <img class="login-button__image" src="@/assets/icons/arrow.png">
    </div>
    <router-link class="register" to="#">Регистрация</router-link>
  </div>
</template>

<script>
import CustomInput from '@/components/global/CustomInput.vue'

export default {
  components: {
    CustomInput
  },
  name: 'Login',
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
  height: 100%;
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

.register {
  grid-area: register;
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
      "register";
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
    margin-top: 20px;
  }

  .register {
    align-self: end;
  }
}
</style>
