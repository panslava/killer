<template>
  <form @submit.prevent="submit" class="overlay">
    <h1 class="header">Вход</h1>
    <div class="email-input input-overlay">
      <label>Email</label>
      <custom-input
        :defaultValue="email"
        v-model="email"
        @submit="submit"
        placeholder="name@example.com"
        class="inputs"
        type="email"
      ></custom-input>
      <div class="email-input__error error" v-show="errors.email">{{errors.email}}</div>
    </div>
    <div class="password-input input-overlay">
      <label>Пароль</label>
      <custom-input
        :defaultValue="password"
        v-model="password"
        @submit="submit"
        placeholder="**********"
        class="inputs"
        type="password"
      ></custom-input>
      <div class="password-input__error error" v-show="errors.password">{{errors.password}}</div>
    </div>
    <a href="/profile" @click.prevent="submit" class="login-button">
      <img class="login-button__image" src="@/assets/icons/arrow.png">
    </a>
    <router-link class="register" to="/register">Регистрация</router-link>
  </form>
</template>

<script>
import CustomInput from '@/components/global/CustomInput.vue'
import { checkEmail } from '@/services/Validation'
import AuthService from '@/services/AuthService'

export default {
  components: {
    CustomInput
  },
  name: 'Login',
  data () {
    return {
      errors: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async submit () {
      this.errors = {
        email: '',
        password: ''
      }
      if (!checkEmail(this.email))      {
        console.log(`Почта не прошла верификацию: ${this.email}`)
        this.errors.email = 'Это не похоже на email'
      }
      if (!this.password)      {
        console.log(`Пароль не может быть пустым: ${this.password}`)
        this.errors.password = 'Введите пароль'
      }
      if (!this.errors.email && !this.errors.password)      {
        try        {
          let res = await AuthService.auth({
            email: this.$store.state.user.email,
            password: this.$store.state.user.password
          })
          this.$store.dispatch('setToken', res.data.token)
          this.$router.push({
            path: 'profile'
          })
        } catch (err)        {
          console.error(err)
        }
      }
    }
  },
  computed: {
    email: {
      get () {
        return this.$store.state.user.email
      },
      set (value) {
        this.$store.commit('updateUser', { email: value })
      }
    },
    password: {
      get () {
        return this.$store.state.user.password
      },
      set (value) {
        this.$store.commit('updateUser', { password: value })
      }
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

.register {
  grid-area: register;
}

.error {
  font-weight: 300;
  color: $color-error;
  margin-top: 10px;
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
    display: flex;
    flex-direction: column;
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

  .register {
    align-self: end;
  }
}
</style>
