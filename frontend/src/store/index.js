import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import Api from '@/services/Api'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: {
    token: null,
    user: {
      course: '0'
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUser (state, user) {
      state.user = user
    },
    updateUser (state, user) {
      state.user = { ...state.user, ...user }
    },
    logout (state) {
      state.user = {}
      state.user = {
        course: '0'
      }
      state.token = null
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    async getAndUpdateUser ({ commit }) {
      try {
        const user = (await Api.getUserByToken()).data
        commit('updateUser', user)
      } catch (err) {
        console.error(err)
      }
    },
    async getPhoto ({ commit }) {
      try {
        const rawResponse = await Api.getPhoto()
        const coded = btoa(rawResponse)
        console.log(coded)
      } catch (err) {
        console.error(err)
      }
    }
  }
})
