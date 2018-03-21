<template>
  <div id='app' >

    <form  enctype="multipart/form-data" method="post" >
      <input type='text' v-bind:value='firstName' disabled>
      <br>
      <input type='text' v-bind:value='lastName' disabled>
      <br>
      <input type='text' v-model='courseStr'>
      <span v-if='errCourse'>Некорректные данные</span>
      <br>
      <input type='text' v-bind:value='email' disabled>
      <br>
      <input type='text' v-model='vk'>
      <span v-if='errVk'>Некорректные данные</span>
      <br>
      <input type='file' id='file' @change='loadPhoto' >
      <span v-if='errPhoto'>Загрузите фото</span>
      <br>
      <button type='button' @click='register'>Зарегистрироваться</button>

    </form>

  </div>
</template>

<script>
export default {
    data () {
        return {
            courseStr:'',
            courseValue:'',
            vk:'',
            photo:'',
            errPhoto:false,
            errCourse:false,
            errVk:false
        }
    },

    computed: {
        firstName: function () {
            return this.$store.state.user.firstName
        },
        lastName: function () {
            return this.$store.state.user.lastName
        },
        email: function () {
            return this.$store.state.user.firstName
        }
    },

    methods: {
        loadPhoto () {
            this.errPhoto=false
            var imagefile = document.getElementById('file')
            this.photo=imagefile.files[0]
        },
        checkCourse () {
            var value
            if(this.courseStr==='') {
                this.errCourse=true
                return
            }

            if(this.courseStr.match(/[0-4]/i)||(this.courseStr.match(/преп/i))||(this.courseStr.match(/асп/i)))
            {
                if(this.courseStr.match(/преп/i)) {
                    this.errCourse=false
                    this.courseValue=8
                    return
                }
                if(this.courseStr.match(/маг/i)) {
                    if(this.courseStr.match(/[0-2]/i)) {
                        this.errCourse=false
                        value=this.courseStr.match(/[0-2]/i)[0]
                        this.courseValue=String(4+Number(value))
                        return
                    }
                    else {
                        this.errCourse=true
                        return
                    }
                }
                if(this.courseStr.match(/асп/i)) {
                    this.errCourse=false
                    this.courseValue=7
                    return
                }
                value=this.courseStr.match(/[0-4]/i)[0]
                this.courseValue=value
                this.errCourse=false
            }
            else {
                this.errCourse=true
            }
        },
        register () {
            if(this.photo==='') this.errPhoto=true
            if(this.vk==='') this.errVk=true
            else this.errVk=false
            this.checkCourse()
            if((!this.errPhoto)&&(!this.errCourse)&&(!this.errVk)){
                var postBody= {
                    firstName:this.firstName,
                    lastName:this.lastName,
                    course:this.courseValue,
                    email:this.email,
                    vk:this.vk,
                    photo:this.photo
                }
                this.$store.dispatch('register',postBody)
            }
        }
    }
}
</script>
