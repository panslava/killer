<template>
  <div id='app' >
    <form  enctype="multipart/form-data" method="post"  >
            <input type='text'   v-model='firstName'>
            <br>
            <input type='text'  v-model='lastName'>
            <br>
            <input type='text'   v-model='course'>
            <br>
            <input type='text'   v-model='email'>
            <br>
            <input type='text'    v-model='vk'>
            <br>
            <input type='file' id='file' @change='loadPhoto' >
            <br>
            <button type='button' @click='register'>Зарегистрироваться</button>

    </form>

</div>

</template>

<script>
export default {
  data () {
  return {
    course:'',
    email:'',
    photo:''
  }
},
  computed: {
    firstName: function () {
      return this.$store.state.user.firstName;
    },
    lastName: function () {
      return this.$store.state.user.lastName;
    },
    vk: function () {
      return this.$store.state.user.vk;
    }

  },
  methods: {
    loadPhoto () {
      var imagefile = document.getElementById('file');
      this.photo=imagefile.files[0];
    },
    register () {
     var postBody={
       firstName:this.firstName,
       lastName:this.lastName,
       course:this.course,
       email:this.email,
       vk:this.vk,
       photo:this.photo
       }
     this.$store.dispatch('register',postBody);

       }
    }
  }

</script>
