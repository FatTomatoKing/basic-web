<script setup lang="ts">
    import Logo from '@/layout/logo/index.vue'
</script>

<template>
    <div class="layout_container">
      <div class="layout_slider">
        <Logo></Logo>
      </div>
      <div class="layout_tabbar">456</div>
      <div class="layout_main">
        <p style="background: red; background-color: red; height: 10000px">我是一个段落</p>
      </div>
    </div>
</template>

<style scoped lang="scss">
  .layout_container{
    width: 100%;
    height: 100vh;
    .layout_slider{
      width: $base-menu-width;
      height: 100vh;
      background:  $base-menu-background;
    }
    .layout_tabbar{
      width: calc(100% - $base-menu-width);
      height: $base-tabbar-height;
      background: cyan;
      position: fixed;
      top: 0;
      left: $base-menu-width;
    }
    .layout_main{
      width: calc(100% - $base-menu-width);
      height: calc(100vh - $base-tabbar-height);
      position: absolute;
      top: $base-tabbar-height;
      left: $base-menu-width;
      background: yellowgreen;
      // 处理右下角div内容自适应
      overflow: auto;
    }


  }
</style>