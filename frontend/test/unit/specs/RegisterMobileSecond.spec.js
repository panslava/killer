import RegisterMobileSecond from '@/components/RegisterMobileSecond'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import router from '../../../src/router'

const store = new Vuex.Store({
  state: {
    user: {
      course: 3,
      email: 'verycrazyslava@gmail.com',
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

describe('RegisterMobileSecond.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(RegisterMobileSecond, {
      localVue,
      store
    })
    expect(wrapper.find('header'))
  })
})
