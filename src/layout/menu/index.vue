<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
    defineProps(['menuList']);

    import {useRouter} from "vue-router"


    let $router = useRouter()

    const goRoute = (vc: any)=>{
      console.log(vc)
      $router.push(vc.index)
    }

</script>

<script lang="ts">
 export default {
   name: "Menu",
 }
</script>

<template>
  <template v-for="(item) in menuList" :key="item.path">
    <div>
      <template v-if="!item.children">
        <el-menu-item v-if="!item.meta.hidden" :index="item.path" :key="item.path" @click="goRoute">
          <template #title>
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{item.meta.title}}</span>
          </template>
        </el-menu-item>
      </template>

      <template v-if="item.children && item.children.length == 1">
        <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.children[0].path" :key="item.path" @click="goRoute">
          <template #title>
            <el-icon>
              <component :is="item.children[0].meta.icon"></component>
            </el-icon>
            <span>{{item.children[0].meta.title}}</span>
          </template>
        </el-menu-item>
      </template>


      <el-sub-menu v-if="item.children && item.children.length>1" :index="item.path" :key="item.path" @click="goRoute">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{item.meta.title}}</span>
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </div>
  </template>
</template>

<style scoped>

</style>