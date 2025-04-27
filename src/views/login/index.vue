<template>
  <div class="login-container">
    <el-row style="display: flex; flex-direction: row;">
      <el-col :span="12" :xs="0" class="left-side">
        左侧内容
      </el-col>
      <el-col :span="12" :xs="24" class="right-side">
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

.left-side, .right-side {
  height: 100%;
  width: 100%;
}
</style>

<script setup>

</script>
