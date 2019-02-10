import axios from '@/services/AxiosConfig'

export default {
  updatePhoto (photo) {
    let formDataBody = new FormData()

    formDataBody.append('photo', photo.photo)
    return axios().post('/api/users/update-photo', formDataBody, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  isEmailFree (email) {
    return axios().post('/api/users/is-email-free', { email: email })
  },

  getUserByToken () {
    return axios().post('/api/users/get-user-by-token')
  },

  getPhoto () {
    return axios().post('/api/users/get-photo')
  }
}
