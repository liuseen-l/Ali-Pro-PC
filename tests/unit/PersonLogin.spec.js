import { mount } from '@vue/test-utils'
import PersonLogin from '../../src/components/personView/PersonLogin.vue'

describe('PersonLogin.vue', () => {
  // 当用户处于手机号登录页面的时候，如果输入的手机号为空，news1 变量值应该提示用户输入电话号码
  it('do not write username && give error tip', async () => {
    const phone = ''
    const password = 12131
    const news1 = ''
    const wrapper = mount(PersonLogin, {
      data() {
        return {
          phone,
          password,
          news1
        }
      }
    })
    await wrapper.get('.login-submit').trigger('click')
    expect(wrapper.vm.news1).toBe('请输入手机号码')
  })
})
