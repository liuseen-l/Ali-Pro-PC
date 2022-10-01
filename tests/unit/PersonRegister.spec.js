import { mount } from '@vue/test-utils'
import PersonRegister from '../../src/components/personView/PersonRegister.vue'

describe('PersonRegister.vue',()=>{
  it('do not write phoneNUmber && give error tip', async () => {

    const wrapper = mount(PersonRegister, {
      data() {
        return {
      
        }
      }
    })
    await wrapper.get('.login-submit').trigger('click')
    expect(wrapper.vm.news1).toBe('请输入手机号码')
  })

})