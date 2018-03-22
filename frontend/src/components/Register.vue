<template>
  <div id='app' >

    <form  enctype="multipart/form-data" method="post" >

      Имя
      <br>
      <input type='text' v-model='name.first'>
      <span v-if='err.errFirstName'>Некорректные данные</span>
      <br>
      Фамилия
      <br>
      <input type='text' v-model='name.last' >
      <span v-if='err.errLastName'>Некорректные данные</span>
      <br>
      Курс
      <br>
      <input type='text' v-model='courseStr'>
      <span v-if='err.errCourse'>Некорректные данные</span>
      <br>
      Email
      <br>
      <input type='text' v-model='email'>
      <span v-if='err.errEmail'>Некорректные данные</span>
      <br>
      Код смерти(4 цифры)
      <br>
      <input type='text' v-model='deathCode'>
      <span v-if='err.errDeathCode'>Некорректные данные</span>
      <br>
      Vk
      <br>
      <input type='text' v-model='vk'>
      <span v-if='err.errVk'>Некорректные данные</span>
      <br>
      Фото
      <br>
      <input type='file' id='file' @change='loadPhoto' accept='image/jpeg,image/png'>
      <span v-if='err.errPhoto'>Загрузите фото</span>
      <br><br>
     <button type='button' @click='register'>Зарегистрироваться</button>

    </form>

  </div>
</template>

<script>
import validator from 'validator'
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
            err:{
                errPhoto:false,
                errCourse:false,
                errVk:false,
                errFirstName:false,
                errLastName:false,
                errDeathCode:false,
                errEmail:false
            }
        }
    },

    methods: {
        loadPhoto () {
            this.err.errPhoto=false
            var imagefile = document.getElementById('file')
            this.photo=imagefile.files[0]
        },
        checkFirstName () {
            if ((this.name.first==='')||(!validator.isAlpha(this.name.first))) this.err.errFirstName=true
            else this.err.errFirstName=false
        },
        checkLastName () {
            if (this.name.last===''||(!validator.isAlpha(this.name.last))) this.err.errLastName=true
            else this.err.errLastName=false
        },
        checkPhoto () {
            if (this.photo==='') this.err.errPhoto=true
            else this.err.errPhoto=false
        },
        checkVk () {
            if (this.vk==='') this.err.errVk=true
            else this.err.errVk=false
        },
        checkEmail () {
            if (validator.isEmail(this.email)) this.err.errEmail=false
            else this.err.errEmail=true
        },
        checkDeathCode () {
            if((this.deathCode.length===4)&&(this.deathCode!='')&&(validator.isNumeric(this.deathCode)))
                this.err.errDeathCode=false
            else this.err.errDeathCode=true
        },

        checkCourse () {
            var value
            if(this.courseStr==='') {
                this.err.errCourse=true
                return
            }

            if(this.courseStr.match(/[0-4]/i)||(this.courseStr.match(/преп/i))||(this.courseStr.match(/асп/i)))
            {
                if(this.courseStr.match(/преп/i)) {
                    this.err.errCourse=false
                    this.courseValue=8
                    return
                }
                if(this.courseStr.match(/маг/i)) {
                    if(this.courseStr.match(/[0-2]/i)) {
                        this.err.errCourse=false
                        value=this.courseStr.match(/[0-2]/i)[0]
                        this.courseValue=String(4+Number(value))
                        return
                    }
                    else {
                        this.err.errCourse=true
                        return
                    }
                }
                if(this.courseStr.match(/асп/i)) {
                    this.err.errCourse=false
                    this.courseValue=7
                    return
                }
                value=this.courseStr.match(/[0-4]/i)[0]
                this.courseValue=value
                this.err.errCourse=false
            }
            else {
                this.err.errCourse=true
            }
        },
        register () {
            this.checkFirstName()
            this.checkLastName()
            this.checkEmail()
            this.checkVk()
            this.checkPhoto()
            this.checkCourse()
            this.checkDeathCode()
            var count=0
            for (var key in this.err)
                if (this.err[key]===true) count+=1
            if(count===0){
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
