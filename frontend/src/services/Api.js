import axios from '@/services/AxiosConfig'

export default {
  updatePhoto (photo) {
    let formDataBody = new FormData()

    console.log(photo.photo)
    formDataBody.append('photo', photo.photo)

    for (let key of formDataBody.entries()) {
      console.log(key[0])
      console.log(JSON.stringify(key[1]))
    }
    return axios().post('/api/users/update-photo', formDataBody, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  isEmailFree (email) {
    return axios().post('api/users/is-email-free', { email: email })
  }
}
