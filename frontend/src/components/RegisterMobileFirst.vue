<template>
  <form @submit.prevent="nextPage" class="overlay">
    <h1 class="header">Регистрация</h1>
    <div class="email-input input-overlay">
      <label>Email</label>
      <custom-input
        v-model="email"
        :defaultValue="email"
        @submit="nextPage"
        placeholder="name@example.com"
        class="inputs"
        type="email"
      ></custom-input>
      <div class="email-input__error error" v-if="errors.email">{{errors.email}}</div>
    </div>
    <div class="password-input input-overlay">
      <label>Пароль</label>
      <custom-input
        v-model="password"
        :defaultValue="password"
        @submit="nextPage"
        placeholder="**********"
        class="inputs"
        type="password"
      ></custom-input>
      <div class="password-input__error error" v-if="errors.password">{{errors.password}}</div>
    </div>
    <a href="next-page" @click.prevent="nextPage" class="next-page-button">
      <img src="@/assets/icons/arrow.png" class="next-page-button__image">
    </a>
    <router-link class="login" to="/login">Войти</router-link>
  </form>
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
      errors: {}
    }
  },
  methods: {
    nextPage () {
      this.errors = {}
      if (!this.validEmail(this.email)) {
        console.log(`Почта не прошла верификацию: ${this.email}`)
        this.errors.email = 'Это не похоже на email'
      }
      if (!this.password) {
        console.log(`Пустой пароль: ${this.password}`)
        this.errors.password = 'Введите пароль'
      }
      if (Object.keys(this.errors).length === 0) { this.$emit('changePage', 2) }
    },
    validEmail: function (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
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

.login {
  grid-area: login;
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
    display: flex;
    flex-direction: column;
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
