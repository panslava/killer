<template>
  <div id='app' >
    <form >
            <input type='text' v-model='name'>
            <br>
            <input type='text' v-model='surName'>
            <br>
            <input type='text' v-model='course'>
            <br>
            <input type='text' v-model='email'>
            <br>
            <input type='text' v-model='vk'>
            <br>
            <input type='file' v-model='photo'>
            <br>
            <button type='submit' @click='register'>Зарегистрироваться</button>

    </form>

</div>

</template>

<script>

export default {
  name: 'Register',
  data: function () {
    return {
      name:'',
      surName:'',
      course='',
      email='',
      vk='',
      photo=''
    }
  },

  methods: {
    register: function () {


    }
  }

    }

</script>
