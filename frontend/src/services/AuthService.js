import axios from '@/services/AxiosConfig'

export default {
  register (credentials) {
    return axios().post('/api/users/register', credentials, {
      validateStatus: function (status) {
        return status !== 500
      }
    })
  },

  auth (credentials) {
    return axios().post('/api/users/auth', credentials)
  }
}
