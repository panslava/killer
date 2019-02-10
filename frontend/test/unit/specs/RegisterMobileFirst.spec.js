import RegisterMobileFirst from '@/components/RegisterMobileFirst'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import router from '../../../src/router'

const store = new Vuex.Store({
  state: {
    user: {
      name: {
        first: 'Слава',
        last: 'Панасовец'
      },
      course: 3,
      email: 'pansslava@gmail.com',
      password: '1234567'
    }
  }
})

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(router)

describe('RegisterMobileFirst.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(RegisterMobileFirst, {
      localVue,
      store
    })
    expect(wrapper.find('header'))
  })
})
