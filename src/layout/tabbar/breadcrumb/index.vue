

<template>
  <el-icon style="margin-right: 10px;margin-top: 2px" @click="settingStore.changeIcon()" >
    <component :is="settingStore.$state.fold?'Fold':'Expand'"></component>
  </el-icon>
  <el-breadcrumb  separator-icon="ArrowRight" style="margin-top: 2px">
    <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
      <el-icon style="margin: 0px 2px; vertical-align: -18%">
        <!--动态组件写法会把icon作为入参传进去-->
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!--展示路由的title-->
      <span>{{item.meta.title}}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
// ts 中只有一个暴露的时候时候不用写｛｝
import useSetting from "@/store/modules/setting.ts"
import {useRoute} from "vue-router"

let settingStore = useSetting();
let $route = useRoute();




</script>

<script lang="ts">
 export default {
   name: "Breadcrumb"
 }
</script>




<style scoped>

</style>
