<template>
  <div id='app' >

    <form  enctype="multipart/form-data" method="post" >

      <inputText v-model='name.first'>
           <span slot='label'>Имя</span>
      </inputText>

      <span v-if='!$v.name.first.required'>Поле должно быть заполнено</span>
      <span v-if='!$v.name.first.alpha'>Только буквы</span>
      <br>

      Фамилия
      <br>
      <input type='text' v-model='name.last' >
      <span v-if='!$v.name.last.required'>Поле должно быть заполнено</span>
      <span v-if='!$v.name.last.alpha'>Только буквы</span>
      <br>

      Курс
      <br>
      <input  type='text' v-model='courseStr' @input='checkCourse'>
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
import { required,alpha,email,between } from 'vuelidate/lib/validators'
import inputText from './input.vue'

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
    components: {
        'inputText':inputText
    },

    mixins: [validationMixin],

    validations: {
        name: {
            first:{
                required,
                alpha
            },
            last:{
                required,
                alpha
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
            if(!this.$v.$invalid&&!this.errCourse){
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
