import { mount } from '@vue/test-utils'
import PersonLogin from '../../src/components/personView/PersonLogin.vue'

describe('PersonLogin.vue', () => {
  // 当用户处于手机号登录页面的时候，如果输入的手机号为空，news1 变量值应该提示用户输入电话号码
  it('do not write phoneNUmber && give error tip', async () => {
    const phone = ''
    const password = 12131
    const news1 = ''
    const flag = true
    const wrapper = mount(PersonLogin, {
      data() {
        return {
          phone,
          password,
          news1,
          flag
        }
      }
    })
    await wrapper.get('.login-submit').trigger('click')
    expect(wrapper.vm.news1).toBe('请输入手机号码')
  })

  // 当用户处于手机号登录页面的时候，如果输入的username 和password 都为空，news1 变量值应该提示用户输入登录账号!,news2 变量值应该提示用户输入密码！
  it('do not write username and password && give error tip', async () => {
    const username = ''
    const password = ''
    const news1 = ''
    const news2 = ''
    const flag = false
    const wrapper = mount(PersonLogin, {
      data() {
        return {
          username,
          password,
          news1,
          news2,
          flag,
        }
      }
    })
    await wrapper.get('.login-submit').trigger('click')
    expect(wrapper.vm.news1).toBe('请输入账号!')
    expect(wrapper.vm.news2).toBe('请输入密码!')
  })

  // 当用户处于手机号登录页面的时候，如果输入的 username 为空，news1 变量值应该提示用户输入登录账号!
  it('do not write username && give error tip', async () => {
    const username = ''
    const password = '123123'
    const news1 = ''
    const flag = false
    const wrapper = mount(PersonLogin, {
      data() {
        return {
          username,
          password,
          news1,
          flag,
        }
      }
    })
    await wrapper.get('.login-submit').trigger('click')
    expect(wrapper.vm.news1).toBe('请输入账号!')
  })


  // 当用户处于手机号登录页面的时候，如果输入的 password 为空，news2 变量值应该提示用户输入密码！
  it('do not write password && give error tip', async () => {
    const username = '123123'
    const password = ''
    const news2 = ''
    const flag = false
    const wrapper = mount(PersonLogin, {
      data() {
        return {
          username,
          password,
          news2,
          flag,
        }
      }
    })
    await wrapper.get('.login-submit').trigger('click')
    expect(wrapper.vm.news2).toBe('请输入密码!')
  })
})
