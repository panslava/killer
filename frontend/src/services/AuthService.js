import axios from '@/services/AxiosConfig'

export default {
  register (credentials) {
    return axios().post('/api/users/register', credentials)
  },

  updatePhoto (photo) {
    let formDataBody = new FormData()
    formDataBody.append('photo', photo)
    return axios().post('/api/users/update-photo', formDataBody, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
