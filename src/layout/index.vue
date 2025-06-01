<script setup lang="ts">
    import Logo from '@/layout/logo/index.vue'
    import Menu from '@/layout/menu/index.vue'
    import useUserStore from "@/store/modules/user";
    import useSetting from "@/store/modules/setting.ts";
    // 引入vue 组件呢是这种不用加{}的，但是引入ts 中的一个属性或者函数是需要加{}的
    import Main from '@/layout/main/index.vue'
    // useRoute 和 useRouter 有什么区别
    import {useRoute} from "vue-router";
    import Tabbar from  '@/layout/tabbar/index.vue'
    import {onMounted} from "vue";


    let userStore = useUserStore();
    let $route = useRoute();
    const settingStore = useSetting()

    onMounted(() => {
      // 如果token 存在
      if (userStore.token){
        // 触发获取用户信息
        userStore.getUserInfo(userStore.token)
      }
    })

</script>

<script lang="ts">
export default {
  name: "Layout"
}
</script>

<template>
    <div class="layout_container">
      <div class="layout_slider" :class="settingStore.fold ? 'foldState' : ''">
        <Logo></Logo>
        <el-scrollbar class="scroll_bar" >
          <el-menu mode="vertical" :collapse="settingStore.fold" :default-active="$route.path" background-color="#001529" text-color="white">
            <Menu :menuList="userStore.menuRoutes"></Menu>
          </el-menu>
        </el-scrollbar>
      </div>
      <div class="layout_tabbar" :class="settingStore.fold ? 'foldState' : ''">
        <Tabbar></Tabbar>
      </div>
      <div class="layout_main" :class="settingStore.fold ? 'foldState' : ''">
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
      transition:  all 0.3s;

      &.foldState {
        width: $base-menu-fold-width;

        // 重要：子元素在折叠状态下也要改变宽度
        .scroll_bar {
          width: $base-menu-fold-width;
        }
      }

      .scroll_bar{
        width: 100%;
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
      top: 0px;
      left: $base-menu-width;
      transition: all 0.3s;  // 明确指定过渡属性
      &.foldState {
        width: calc(100% - $base-menu-fold-width);
        left: $base-menu-fold-width;
      }
    }
    .layout_main{
      width: calc(100% - $base-menu-width);
      height: calc(100vh - $base-tabbar-height);
      position: absolute;
      top: $base-tabbar-height;
      left: $base-menu-width;
      background: white;
      // 处理右下角div内容自适应
      overflow: auto;
      transition: all 0.3s;  // 明确指定过渡属性
      &.foldState {
        width: calc(100% - $base-menu-fold-width);
        left: $base-menu-fold-width;
      }
    }
  }
</style>
