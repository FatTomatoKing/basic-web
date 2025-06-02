<script setup lang="ts">
import useUserStore from "@/store/modules/user"
let userStore = useUserStore()

</script>

<template>
<div>
  我是首页路由 {{userStore.username}}
</div>
</template>

<style scoped>

</style>
