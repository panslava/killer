import axios from 'axios'
import store from '@/store'

axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
})

axios.interceptors.response.use(response => {
    console.log('Response:', response)
    return response
})

export default () => {
    return axios.create({
        baseURL: `http://localhost:8081/`,
        headers: {
            Authorization: `Bearer ${store.state.token}`
        }
    })
}
