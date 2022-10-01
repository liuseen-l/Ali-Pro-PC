<template>
  <div class="register">
    <div class="register-header">
      <span>注册</span>
      <ul>
        <li>已有账号？</li>
        <li @click="toLogin">点击登录</li>
      </ul>
    </div>
    <div class="register-center">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <!-- 用户名 -->
        <el-form-item label="" prop="username">
          <span slot="label">
            <span class="span-box">
              <i class="el-icon-user"></i>
            </span>
          </span>
          <el-input
            placeholder="请输入用户名"
            class="register-center-input"
            v-model.number="ruleForm.username"
          ></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="" prop="email">
          <span slot="label">
            <span class="span-box">
              <i class="el-icon-message"></i>
            </span>
          </span>
          <el-input
            placeholder="请输入邮箱"
            class="register-center-input"
            v-model="ruleForm.email"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="" prop="pass">
          <span slot="label">
            <span class="span-box">
              <i class="el-icon-lock"></i>
            </span>
          </span>
          <el-input
            class="register-center-input"
            type="password"
            placeholder="请输入密码"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label="" prop="checkPass">
          <el-input
            class="register-center-input"
            type="password"
            placeholder="请确认密码"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 重置 -->
        <el-form-item>
          <el-checkbox v-model="checked" style="color: #59bce0"
            >我已同意并同意</el-checkbox
          ><span> 使用条款</span>

          <el-button
            style="float: right; padding: 8px 15px"
            @click="resetForm('ruleForm')"
            >重置</el-button
          >
        </el-form-item>
        <!-- 提交 -->
        <el-form-item>
          <el-button
            class="register-center-btn"
            type="primary"
            @click="submitForm('ruleForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <PersonFooter />
  </div>
</template>

<script>
import PersonFooter from "@/components/personView/PersonFooter/PersonFooter.vue";

export default {
  name: "PersonRegister",
  components: {
    PersonFooter,
  },
  data() {
    // 校验用户名
    var checkusername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        // 模仿后台请求数据加载
        setTimeout(() => {
          callback();
        }, 1000);
      }
    };
    // 校验密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    //  校验确认密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 校验邮箱
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      }
      setTimeout(() => {
        // 模仿后台请求数据校验
        if (!/^[1-9][0-9]{4,10}@qq.com$/.test(value)) {
          callback(new Error("邮箱格式错误"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        username: "",
        email: "",
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkusername, trigger: "blur" }],
      },
      checked: false,
    };
  },
  methods: {
    // 提示错误
    giveError() {
      this.$message.error("请确认使用条款");
    },
    // 创建账号
    submitForm(formName) {
      let flag = true;
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          flag = false;
          return false;
        }
      });
      
      // 如果没有同意使用条款直接返回,并提示
      if (!this.checked || flag) {
        this.giveError();
        return false;
      }
      // 创建成功返回登录界面登录
      this.$router.push({
        path: "login",
      });
    },
    // 重置内容
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 前往登录页面
    toLogin() {
      this.$router.push({
        path: "login",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.register {
  position: absolute;
  z-index: 9999;
  right: 0;
  bottom: 0;
  transform: translate(-30%, -30%);
  width: 500px;
  height: 600px;
  padding: 40px;
  background: rgba(37, 37, 37, 0.7);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 10px;

  &-header {
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 26px;
      font-weight: 700;
      margin-bottom: 20px;
    }
    ul {
      padding: 0;
      // background-color: #689ee9;
      display: flex;
      align-items: center;
      font-size: 12px;
      li {
        list-style: none;
        &:nth-child(2) {
          color: #59bce0;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }

  &-center {
    padding: 20px 40px 0 0;
    width: 100%;
    height: 400px;
    border-radius: 20px;

    i {
      font-size: 20px;
      color: white;
    }

    &-input {
      :deep(input) {
        background-color: transparent;
        color: white;
        font-size: 12px;
      }
    }

    &-btn {
      margin-bottom: 20px;
      width: 100%;
      height: 40px;
      background-color: #59bce0;
      display: flex;
      transition: 0.5s;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: #b5d5de;
      border-radius: 5px;
      /* 鼠标移上去会有一个发光的效果 */
      &:hover {
        background: #59bce0;
        color: #fff;
        border-radius: 5px;
        /* 盒子阴影 */
        box-shadow: 0 0 5px #59bce0, 0 0 25px #59bce0, 0 0 50px #59bce0,
          0 0 100px #06003b;
      }
    }
  }
}
</style>
