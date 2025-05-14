

<template>
  <el-icon style="margin-right: 10px" @click="settingStore.changeIcon()">
    <component :is="settingStore.$state.fold?'Fold':'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight" style="margin-top: 2px">
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
// ts 中只有一个暴露的时候时候不用写｛｝
import useSetting from "@/store/modules/setting.ts"

let settingStore = useSetting();



</script>

<script lang="ts">
 export default {
   name: "Breadcrumb"
 }
</script>

<style scoped>

</style>
