<script setup lang="ts">

import {ArrowDown} from "@element-plus/icons-vue";
import useSetting from "@/store/modules/setting";
import useUserStore from "@/store/modules/user";
import {useRouter, useRoute} from"vue-router"
import path from "path";

let useSettingStore = useSetting();
let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();

const changeRefreshState = () => {
  useSettingStore.refresh = !useSettingStore.refresh;
}

const fullScreen = () => {
  // 使用document 判断是否全屏幕
  let fullscreenElement = document.fullscreenElement;
  // 非全屏
  if (!fullscreenElement) {
    // 使用document 进行全屏
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏
    document.exitFullscreen()
  }
}
// 退出登陆函数
const logout = async () => {
  // 清除token
  await userStore.logout();
  // 路由重定向到登陆页面
  let redirectPath = $route.path;
  console.log("退出登录" + redirectPath);
  $router.push({path:"/login", query: {redirect: redirectPath}});
}


</script>

<template>
  <el-button size="small" icon="Refresh" @click="changeRefreshState" circle></el-button>
  <el-button size="small" icon="FullScreen" @click="fullScreen" circle></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img :src="userStore.avatar" style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%" alt="">
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down/>
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>
</style>
