import axios from 'axios'

const state = {
    firstName:'dsf',
    lastName:'df',
    email:'sfd'
}

const mutations = {
}

const actions = {
    register ({},data) {
        var textData=JSON.stringify ({
            name: {
                first: data.firstName,
                last: data.lastName
            },
            email: data.email,
            vk: data.vk,
            course: data.course
        })
        axios.post('/api/user', textData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response =>{
            var id
            id=response.body.id
            const photoReq=new FormData()
            photoReq.append('id',id)
            photoReq.append('photo',data.photo)
            axios.put('/api/user', photoReq, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
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
