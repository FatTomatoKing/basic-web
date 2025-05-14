<script setup lang="ts">
import Setting from "@/layout/tabbar/setting/index.vue";
import Breadcrumb from "@/layout/tabbar/breadcrumb/index.vue";
</script>

<script lang="ts">
export default {
  name: "Setting"
}
</script>

<template>
  <div class="tabbar">
    <div class="tabbar-left">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="tabbar-right">
      <Setting></Setting>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .tabbar-left {
    display: flex;
    margin-top: 10px;
    margin-left: 20px;
    align-content: center;
  }

  .tabbar-right {
    display: flex;
    margin-top: 10px;
    align-content: center;
  }
}

</style>
