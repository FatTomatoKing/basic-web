<template>
  <template v-for="(item) in menuList" :key="item.path">
    <div>
      <template v-if="!item.children">
        <el-menu-item v-if="!item.meta.hidden" :index="item.path" :key="item.path" @click="() => goRoute(item)">
          <template #title>
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{item.meta.title}}</span>
          </template>
        </el-menu-item>
      </template>

      <template v-if="item.children && item.children.length == 1">
        <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.children[0].path" :key="item.path" @click="() => goRoute(item.children[0])">
          <template #title>
            <el-icon>
              <component :is="item.children[0].meta.icon"></component>
            </el-icon>
            <span>{{item.children[0].meta.title}}</span>
          </template>
        </el-menu-item>
      </template>

      <el-sub-menu v-if="item.children && item.children.length >1" :index="item.path" :key="item.path">
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

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

defineProps<{
  menuList: Array<any>;
}>();

const router = useRouter();

const goRoute = (item: any) => {
  if (item && item.path) {
    console.log("Routing to:", item.path);
    router.push(item.path);
  } else {
    console.error('Invalid menu item:', item);
  }
};
</script>

<script lang="ts">
export default {
  name: "Menu",
}
</script>

<style scoped>

</style>