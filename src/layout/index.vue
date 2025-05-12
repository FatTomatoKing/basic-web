<script setup lang="ts">
    import Logo from '@/layout/logo/index.vue'
    import Menu from '@/layout/menu/index.vue'
    import useUserStore from "@/store/modules/user";
    // 引入vue 组件呢是这种不用加{}的，但是引入ts 中的一个属性或者函数是需要加{}的
    import Main from '@/layout/main/index.vue'
    // useRoute 和 useRouter 有什么区别
    import {useRoute} from "vue-router";

    import Tabbar from  '@/layout/tabbar/index.vue'


    let userStore = useUserStore();

    let $route = useRoute();
</script>

<template>
    <div class="layout_container">
      <div class="layout_slider">
        <Logo></Logo>
        <el-scrollbar class="scroll_bar" >
          <el-menu :default-active="$route.path" background-color="#001529" text-color="white">
            <Menu :menuList="userStore.menuRoutes"></Menu>
          </el-menu>
        </el-scrollbar>
      </div>
      <div class="layout_tabbar">
        <Tabbar></Tabbar>
      </div>
      <div class="layout_main">
        <Main></Main>
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
      .scroll_bar{
        width: $base-menu-width;
        height: calc(100vh - $base-logo-height);
        .el-menu{
          border-right: none ;
        }
      }
    }
    .layout_tabbar{
      width: calc(100% - $base-menu-width);
      height: $base-tabbar-height;
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