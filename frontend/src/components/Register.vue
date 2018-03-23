<template>
  <div id='app' >

    <form  enctype="multipart/form-data" method="post" >

      Имя
      <br>
      <input type='text' v-model='name.first'>
      <span v-if='!$v.name.first.required'>Поле должно быть заполнено</span>
      <span v-if='!$v.name.first.alpha'>Только буквы</span>
      <span v-if='!$v.name.first.minLength'>Не менее 2-х симоволов</span>
      <span v-if='!$v.name.first.maxLength'>Не более 16-ти симоволов</span>
      <br>

      Фамилия
      <br>
      <input type='text' v-model='name.last' >
      <span v-if='!$v.name.last.required'>Поле должно быть заполнено</span>
      <span v-if='!$v.name.last.alpha'>Только буквы</span>
      <span v-if='!$v.name.last.minLength'>Не менее 2-х симоволов</span>
      <span v-if='!$v.name.last.maxLength'>Не более 20-ти симоволов</span>
      <br>

      Курс
      <br>
      <input id='course' type='text' v-model='courseStr' @keyup='checkCourse'>
      <span v-if='!$v.courseStr.required'>Поле должно быть заполнено</span>
      <span v-if='(errCourse)&&($v.courseStr.required)'>Некоррекные данные</span>

      <br>
      Email
      <br>
      <input type='text' v-model='email'>
      <span v-if='!$v.email.required'>Поле должно быть заполнено</span>
      <span v-if='!$v.email.email'>Не email</span>
      <br>
      Код смерти
      <br>
      <input type='text' v-model='deathCode'>
      <span v-if='!$v.deathCode.required'>Поле должно быть заполнено</span>
      <span v-if='!$v.deathCode.between'>Число от 1000 до 9999</span>
      <br>
      Vk
      <br>
      <input type='text' v-model='vk'>
      <span v-if='!$v.vk.required'>Поле должно быть заполнено</span>
      <br>
      Фото
      <br>
      <input type='file' id='file' @change='loadPhoto' accept='image/jpeg,image/png'>
      <span v-if='!$v.photo.required'>Загрузите фото</span>
      <br><br>
     <button type='button' @click='register'>Зарегистрироваться</button>

    </form>

  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, alpha,email,between } from 'vuelidate/lib/validators'

export default {
    data () {
        return {
            name:{
                first:'',
                last:''
            },
            email:'',
            courseStr:'',
            courseValue:'',
            vk:'',
            photo:'',
            deathCode:'',
            errCourse:false
        }
    },

    mixins: [validationMixin],

    validations: {
        name: {
            first:{
                required,
                alpha,
                minLength: minLength(2),
                maxLength: maxLength(16)
            },
            last:{
                required,
                alpha,
                minLength: minLength(2),
                maxLength: maxLength(20)
            }
        },
        vk:{
            required,

        },
        photo:{
            required
        },
        email:{
            required,
            email
        },
        deathCode:{
            required,
            between:between(1000,9999)
        },
        courseStr:{
            required
        }
    },

    methods: {
        loadPhoto () {
            var imagefile = document.getElementById('file')
            this.photo=imagefile.files[0]
        },

        checkCourse () {
            var value
            var courseStr=(document.getElementById('course')).value
            if(courseStr.match(/[0-4]/i)||(courseStr.match(/преп/i))||(courseStr.match(/асп/i)))
            {
                if(courseStr.match(/преп/i)) {
                    this.errCourse=false
                    this.courseValue=8
                    return
                }
                if(courseStr.match(/маг/i)) {
                    if(courseStr.match(/[0-2]/i)) {
                        this.errCourse=false
                        value=courseStr.match(/[0-2]/i)[0]
                        this.courseValue=String(4+Number(value))
                        return
                    }
                    else {
                        this.errCourse=true
                        return
                    }
                }
                if(courseStr.match(/асп/i)) {
                    this.errCourse=false
                    this.courseValue=7
                    return
                }
                value=courseStr.match(/[0-4]/i)[0]
                this.courseValue=value
                this.errCourse=false
            }
            else {
                this.errCourse=true
            }
        },
        register () {
            if(!this.$v.name.first.$invalid&&!this.$v.name.last.$invalid&&!this.$v.vk.$invalid&&!this.$v.email.$invalid
            &&!this.$v.deathCode.$invalid&&!this.$v.courseStr.$invalid&&!this.errCourse){
                var postBody= {
                    name:this.name,
                    course:this.courseValue,
                    email:this.email,
                    vk:this.vk,
                    photo:this.photo,
                    deathCode:this.deathCode
                }
                this.$store.dispatch('register',postBody)
            }
        }
    }
}
</script>
