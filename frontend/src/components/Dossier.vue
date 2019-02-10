<template>
  <div class="overlay">
    <div class="email">
      <div class="email__label">Почта</div>
      <div class="email__data">{{email}}</div>
    </div>
    <div class="firstName">
      <div class="firstName__label">Имя</div>
      <div class="firstName__data">{{firstName}}</div>
    </div>
    <div class="lastName">
      <div class="lastName__label">Фамилия</div>
      <div class="lastName__data">{{lastName}}</div>
    </div>
    <div class="course">
      <div class="course__label">Курс</div>
      <div class="course__data">{{course}}</div>
    </div>
    <div class="exit">
      <a class="exit__link" href="javascript:history.back()">
        <img class="exit__img" src="@/assets/icons/delete.png">
      </a>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  name: 'Dossier',
  data () {
    return {
      course: ''
    }
  },
  created () {
    let course = this.$store.state.user.course
    if (course === 1) {
      this.course = '1 бакалавриат'
    }

    if (course === 2) {
      this.course = '2 бакалавриат'
    }

    if (course === 3) {
      this.course = '3 бакалавриат'
    }

    if (course === 4) {
      this.course = '4 бакалавриат'
    }

    if (course === 5) {
      this.course = '1 магистратура'
    }
    if (course === 6) {
      this.course = '2 магистратура'
    }

    if (course === 7) {
      this.course = 'Аспирант'
    }

    if (course === 8) {
      this.course = 'Преподаватель'
    }
  },
  computed: {
    firstName () {
      return this.$store.state.user.name.first
    },
    lastName () {
      return this.$store.state.user.name.last
    },
    email () {
      return this.$store.state.user.email
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/style/global-vars.scss";

.email__data,
.firstName__data,
.lastName__data,
.course__data {
  font-weight: 300;
  font-size: 30px;
  color: $color-main-font;
}

.email__label,
.firstName__label,
.lastName__label,
.course__label {
  font-weight: 100;
  font-size: 30px;
  color: $color-label-font;
}
</style>
