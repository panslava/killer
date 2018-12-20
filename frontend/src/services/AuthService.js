import axios from '@/services/AxiosConfig'

export default {
    register (credentials) {
        return axios().post('/api/users/register', credentials)
    },

    auth (credentials) {
        return axios().post('/api/users/auth', credentials)
    }
}
