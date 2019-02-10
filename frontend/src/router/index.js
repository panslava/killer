import Vue from 'vue'
import Router from 'vue-router'

import Register from '@/components/Register'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import PhotoStatus from '@/components/PhotoStatus'
import Dossier from '@/components/Dossier'

import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/photoStatus',
      name: 'PhotoStatus',
      component: PhotoStatus,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/info',
      name: 'Dossier',
      component: Dossier,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  try {
    const token = store.state.token
    let user = store.state.user
    if (token && (!user || !user.updatedAt)) {
      store.dispatch('getAndUpdateUser')
    }
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const guest = to.matched.some(record => record.meta.guest)
    if (guest && token) {
      next('/profile')
    } else if (requiresAuth && !token) {
      next('/login')
    } else {
      next()
    }
  } catch (err) {
    console.error(err)
  }
})

export default router
