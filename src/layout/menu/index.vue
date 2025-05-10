<script setup lang="ts" >


    defineProps(['menuList'])
</script>

<script lang="ts">
 export default {
   name: "Menu",
 }
</script>

<template>
  <template v-for="(item) in menuList" :key="item.path">
      <template v-if="!item.children">
        <el-menu-item v-if="!item.meta.hidden" :index="item.path" :key="item.path">
          <template #title>
            <span>标&ensp;</span>
            <span>{{item.meta.title}}</span>
          </template>
        </el-menu-item>
      </template>

      <template v-if="item.children && item.children.length == 1">
        <el-menu-item v-if="!item.children.meta.hidden" :index="item.children[0].path" :key="item.path"> >
          <template #title>
            <span>标&ensp;</span>
            <span>{{item.children[0].meta.title}}</span>
          </template>
        </el-menu-item>
      </template>


      <el-sub-menu v-if="item.children && item.children.length>1" :index="item.path" :key="item.path">
        <template #title>
          <span>{{item.meta.title}}</span>
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
  </template>
</template>

<style scoped>

</style>