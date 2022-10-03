import { mount } from '@vue/test-utils'
import PersonRegister from '../../src/components/personView/PersonRegister.vue'

describe('PersonRegister.vue', () => {
  it('do not write phoneNUmber && give error tip', async () => {
    const ruleForm = {
      pass: "",
      checkPass: "",
      username: "",
      email: "",
    }

    const wrapper = mount(PersonRegister, {
      // 注册
      stubs: ['el-form', 'el-form-item', 'el-input', 'el-button', 'el-checkbox'],
      data() {
        return {
          ruleForm
        }
      }
    })

    wrapper.get('.register-center-btn').trigger('click')
    

  })
})