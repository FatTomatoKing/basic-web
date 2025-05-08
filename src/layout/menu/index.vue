<script setup lang="ts">
    defineProps(['menuList'])
</script>

<template>
    <div>
      我是动态生成的菜单
      {{menuList}}
    </div>
  <template v-for="(item) in menuList" :key="item.path">
      <el-menu-item>
        <template #title>
          <span>标&ensp;</span>
          <span>{{item.meta.title}}</span>
        </template>
      </el-menu-item>
  </template>
</template>

<style scoped>

</style>