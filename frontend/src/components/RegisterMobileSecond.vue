<template>
  <form @submit.prevent="submit" class="overlay">
    <h1 class="header">Досье</h1>
    <div class="firstName-input input-overlay">
      <label>Имя</label>
      <custom-input
        v-model="firstName"
        :placeholder="'Иван'"
        @submit="submit"
        class="inputs"
        type="text"
      ></custom-input>

      <div class="firstName-input__error error" v-if="errors.firstName">{{errors.firstName}}</div>
    </div>
    <div class="lastName-input input-overlay">
      <label>Фамилия</label>
      <custom-input
        v-model="lastName"
        :placeholder="'Иванов'"
        @submit="submit"
        class="inputs"
        type="text"
      ></custom-input>
      <div class="lastName-input__error error" v-if="errors.lastName">{{errors.lastName}}</div>
    </div>

    <div class="course-input input-overlay">
      <label>Курс</label>
      <select v-model="course" class="inputs course-input__select">
        <option value selected disabled>Сделайте выбор</option>
        <option value="1">1 бакалавриат</option>
        <option value="2">2 бакалавриат</option>
        <option value="3">3 бакалавриат</option>
        <option value="4">4 бакалавриат</option>
        <option value="5">1 магистратура</option>
        <option value="6">2 магистратура</option>
        <option value="7">Аспирант</option>
        <option value="8">Преподаватель</option>
      </select>
      <div class="course-input__error error" v-if="errors.course">{{errors.course}}</div>
    </div>
    <div class="photo-input input-overlay">
      <label>Фото</label>
      <custom-photo-upload class="inputs" v-model="photo"></custom-photo-upload>
      <div class="photo-input__error error" v-if="errors.photo">{{errors.photo}}</div>
    </div>
    <a href="submit" @click.prevent="submit" class="submit">
      <img src="@/assets/icons/ok.png" class="submit__image">
    </a>
    <a href="next-page" @click.prevent="prevPage" class="next-page">
      <img src="@/assets/icons/arrow.png" class="next-page__image">
    </a>
    <!-- <router-link class="login" to="/login">Войти</router-link> -->
  </form>
</template>

<script>
import CustomInput from '@/components/global/CustomInput.vue'
import CustomPhotoUpload from '@/components/global/CustomPhotoUpload.vue'

export default {
  components: {
    CustomInput,
    CustomPhotoUpload
  },
  name: 'RegisterMobileFirst',
  data () {
    return {
      firstName: '',
      lastName: '',
      password: '',
      course: '',
      photo: null,

      errors: {}
    }
  },
  methods: {
    prevPage () {
      this.$emit('changePage', 1)
    },
    submit () {
      this.errors = {}
      if (!this.firstName) {
        console.log(`Пустое имя: ${this.firstName}`)
        this.errors.firstName = 'Введите имя'
      }

      if (!this.lastName) {
        console.log(`Пустая фамилия ${this.lastName}`)
        this.errors.lastName = 'Введите фамилию'
      }

      if (!this.course) {
        console.log(`Не выбран курс: ${this.course}`)
        this.errors.course = 'Выберите курс'
      }

      if (!this.photo) {
        console.log(`Не выбрано фото: ${this.photo}`)
        this.errors.photo = 'Выберите фото'
      } else {
        if (this.photo.size > 1024 * 1024 * 25) {
          console.log(`Слишкмо большой размер фото: ${this.photo}`)
          this.error.photo = 'Фотография не должна превышать 25Мб'
        }
      }

      if (Object.keys(this.errors).length === 0) {
        console.log('Register mock')
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

.course-input {
  grid-area: course;
}

.photo-input {
  grid-area: photo;
}

.course-input__select {
  background-color: $color-input-background;
  border: 0;
  color: $color-input-font;
  font-size: 16px;
  font-weight: 300;
}

.submit {
  grid-area: submit;
}

.next-page {
  grid-area: next-page;
}

.submit__image {
  filter: brightness(60%);
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
      "course"
      "photo"
      "submit"
      "next-page";
    grid-template-rows:
      1fr max-content max-content max-content max-content
      1fr 1fr;
    grid-template-columns: 1fr;
    justify-items: center;
  }

  .input-overlay {
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 10px;
  }

  .inputs {
    margin-top: 10px;
  }

  .password-input {
    margin-top: 25px;
  }

  .next-page__image {
    transform: rotate(180deg);
    max-width: 50px;
  }

  .course-input__select {
    padding: 13px;
    text-align: center;
    text-align-last: center;
    padding-left: 8%;
    height: 44.45px;
  }

  .submit {
    align-self: flex-end;
  }

  .next-page {
    align-self: flex-end;
  }

  .submit__image {
    max-width: 50px;
    transform: scale(1.2);
    filter: grayscale(0.9) brightness(60%);
  }

  .submit__image_validated {
    filter: brightness(75%);
  }
}
</style>
