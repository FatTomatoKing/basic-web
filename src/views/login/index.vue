<template>
  <div class="login-container" >
    <el-row>
      <el-col :span="12" :xs="0">
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login-form" :model="loginUserParam" :rules="loginUserParamCheckRules" ref="validateResult">
          <h1>Hello</h1>
          <h2>欢迎来到{{setting.title}}</h2>
          <el-form-item prop = "username">
            <el-input :prefix-icon="User" v-model="loginUserParam.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" :prefix-icon="Lock" v-model="loginUserParam.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="submitState" class="login-form-button" type="primary" size="default" @click="login">Login</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>


<script setup lang="ts">
import {User, Lock} from '@element-plus/icons-vue'
//这里不使用｛｝的原因是使用了默认暴露
import useUserStore from '@/store/modules/user.js'
import {ref,reactive} from "vue";
import {useRouter,useRoute} from "vue-router";
import {ElNotification} from "element-plus";
import {getHour} from "@/utils/time.js";
import setting from "@/setting";


//收集账号与表单密码的数据
let loginUserParam = reactive({username: "admin", password: "admin", code :10086})

let submitState = ref(false);


let validateResult = ref()

let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();
async function login() {
  console.log("点击了提交按钮")
  try {
    let validate = validateResult.value.validate();
    console.log(validate)
    await validate
    submitState.value = true
    await userStore.userLogin(loginUserParam);
    submitState.value = false
    let redirect = $route.query.redirect;
    console.log(redirect)
    if (redirect) {
      $router.push(redirect);
    } else{
      $router.push("/");
    }
    ElNotification({
      type: "success",
      message: `Hi, ${getHour()}`
    })

  } catch (error) {
    submitState.value = false
    console.error('验证错误:', error)
    let msg = ""
    if (error && typeof error === 'object') {
      msg = Object.values(error)
          .map(arr => arr[0]?.message)
          .filter(Boolean)
          .join('或')
    }else {
      msg = (error as Error).message
    }

    ElNotification({
      type: "error",
      message: msg,
    })
  }
}

let usernameValidator = (rule:any,value:any,callback:any)=>{
  if (value.length > 4){
      callback()
  } else(
      callback(new Error("账号长度必须大于4"))
  )
}

let passwordValidator = (rule:any,value:any,callback:any)=>{
  if (value.length > 4){
    callback()
  } else(
      callback(new Error("密码长度必须大于4"))
  )
}

const loginUserParamCheckRules ={
  username: [
      // { required: true, min: 4, max:20, message: '用户名长度至少4-20位', trigger: 'change' },
    {trigger: "blur", validator: usernameValidator},

  ],
  password: [
      //{ required: true, min: 8, max:20, message: '密码长度至少8-20位', trigger: 'change' },
    {trigger: "change", validator: passwordValidator},
  ]
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
