<script setup lang="ts">
  import useSetting from "@/store/modules/setting";
  import {ref, watch} from "vue";
  import {nextTick} from "vue";
  let useSettingStore = useSetting();
  let flag = ref(true)
  watch(() => useSettingStore.refresh,()=>{
    console.log(useSettingStore.refresh)
    flag.value = false
    nextTick(()=>{
      flag.value = true
    })
  })


</script>

<script lang="ts">
 export default {
   name : "Main"
 }
</script>

<template>

  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag"/>
    </transition>
  </router-view>

</template>

<style scoped>
.fade-enter-from{
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all .3s;
}
.fade-enter-to{
  opacity: 1;
  transform: scale(1);
}

</style>
