<script setup lang="ts">

import {ArrowDown} from "@element-plus/icons-vue";
import useSetting from "@/store/modules/setting";

let useSettingStore = useSetting();



const changeRefreshState = ()=>{
  useSettingStore.refresh = !useSettingStore.refresh;

}

</script>

<template>
  <el-button size="small" icon="Refresh" @click="changeRefreshState" circle></el-button>
  <el-button size="small" icon="FullScreen" circle></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img src="../../../../public/logo4.png" style="width: 24px; height: 24px; margin: 0 10px" alt="">
  <el-dropdown>
    <span class="el-dropdown-link">
       admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>
</style>
