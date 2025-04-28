<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0">
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login-form">
          <h1>Hello</h1>
          <h2>欢迎来到天启世界</h2>
          <el-form-item>
            <el-input :prefix-icon="User" v-model="loginUserParam.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" :prefix-icon="Lock" v-model="loginUserParam.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-form-button" type="primary" size="default" @click="login">Login</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>


<script setup>
import {User, Lock} from '@element-plus/icons-vue'
//这里不使用｛｝的原因是使用了默认暴露
import useUserStore from '@/store/modules/user.js'
import {reactive} from "vue";

//收集账号与表单密码的数据
let loginUserParam = reactive({username: "admin", password: "admin", code :'10086'})

let userStore = useUserStore();

function login() {
  console.log("点击了提交按钮")
  userStore.userLogin(loginUserParam)
}


</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;

  .login-form {
    width: 80%;
    top: 30vh;
    position: relative;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 30px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .login-form-button {
      width: 100%;
    }

  }
}
</style>
