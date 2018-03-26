import axios from 'axios'
import {router} from '../../main.js'
const state = {
    id:'',
    firstName:'',
    lastName:'',
    email:'',
    deathCode:''
}

const mutations = {
    newUser (state,id,firstName,lastName,email,deathCode) {
        state.id=id
        state.firstName=firstName
        state.lastName=lastName
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
        }).then(() =>{
            var authData=JSON.stringify ({
                deathCode: data.deathCode,
                email: data.email
            })
            axios.post('/users/auth',authData,{
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response=>{
                var id
                id=response.body._id
                commit('newUser',id,data.name.first,data.name.last,data.email,data.deathCode)
                const photoReq=new FormData()
                photoReq.append('id',id)
                photoReq.append('photo',data.photo)
                axios.post('/users/update-photo', photoReq, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(()=>{
                    router.push('/waitPage')
                })
            })


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
