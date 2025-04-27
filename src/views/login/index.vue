<template>
  <div class="login-container">
    <el-row >
      <el-col :span="12" :xs="0" >
        左侧内容
      </el-col>
      <el-col :span="12" :xs="24" >
        右侧内容
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;
}


</style>

<script setup>
import 'element-plus/dist/index.css'
</script>
