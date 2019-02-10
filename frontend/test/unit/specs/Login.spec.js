import Login from '@/components/Login'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import router from '../../../src/router'

const store = new Vuex.Store({
  state: {
    user: {
      course: 3,
      email: 'pansslava@gmail.com',
      password: 'hahahahmypassword',
      name: { first: 'Вячеслав', last: 'Панасовец' },
      games: [],
      createdAt: '2018-12-20T22:30:38.755Z',
      updatedAt: '2018-12-21T02:12:40.228Z',
      __v: 0,
      photo: 'photo-P2zrJsdeUkS9N6j3.jpeg',
      photoState: 1
    }
  }
})

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(router)

describe('Login.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(Login, {
      localVue,
      store
    })
    expect(wrapper.find('header'))
  })

  it('should display vuex email', () => {
    const wrapper = shallowMount(Login, {
      localVue,
      store
    })
    expect(wrapper.find('[name="email"]').props().defaultValue).toBe(
      'pansslava@gmail.com'
    )
  })

  it('should display vuex email', () => {
    const wrapper = shallowMount(Login, {
      localVue,
      store
    })
    expect(wrapper.find('[name="email"]').props().defaultValue).toBe(
      'pansslava@gmail.com'
    )
  })

  it('should display vuex password', () => {
    const wrapper = shallowMount(Login, {
      localVue,
      store
    })
    expect(wrapper.find('[name="password"]').props().defaultValue).toBe(
      'hahahahmypassword'
    )
  })
})
