<script setup lang="ts">

</script>

<template>
    <div>
      我是动态生成的菜单

      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">数据大屏</el-menu-item>

      <el-sub-menu index="3">
        <template #title>
          <span>权限管理</span>
        </template>
        <el-menu-item index="4">用户管理</el-menu-item>
        <el-menu-item index="5">角色管理</el-menu-item>
        <el-menu-item index="6">菜单管理</el-menu-item>
      </el-sub-menu>
    </div>
</template>

<style scoped>

</style>