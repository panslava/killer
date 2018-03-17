import Vue from 'vue'
import App from '@/components/App.vue'
import store from './store'

new Vue({
    el: '#app-root',
    store,
    render: h => h(App)
})
