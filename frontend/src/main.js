import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/components/App.vue'
import store from './store/index'
import {routes} from './routes/routes'

Vue.use(VueRouter)

export const router= new VueRouter ({
    mode:'history',
    routes
})

new Vue({
    el: '#app-root',
    router,
    store,
    render: h => h(App)
})
