<script setup lang="ts">

</script>

<template>

  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>

</template>

<style scoped>
.fade-enter-from{
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to{

  opacity: 1;
}

</style>