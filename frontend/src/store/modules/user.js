import axios from 'axios'
import {router} from '../../main.js'
const state = {
    email:'',
    deathCode:''
}

const mutations = {
    newUser (state,email,deathCode) {
        state.email=email
        state.deathCode=deathCode
    }
}

const actions = {
    register ({commit},data) {
        var textData=JSON.stringify ({
            name: data.name,
            email: data.email,
            vk: data.vk,
            course: data.course,
            deathCode:data.deathCode
        })
        axios.post('/users/add', textData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response =>{
            commit('newUser',data.email,data.deathCode)
            var id
            id=response.body.id
            const photoReq=new FormData()
            photoReq.append('id',id)
            photoReq.append('photo',data.photo)
            axios.put('/users/update-photo', photoReq, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            router.push('/auth')
        })
    }
}

const getters = {
}

export default {
    state,
    mutations,
    actions,
    getters
}
