import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  }
})
