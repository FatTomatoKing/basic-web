<script setup lang="ts">
import {onMounted} from "vue";
import {reqLogin} from "@/api/user";

onMounted(() => {
  let loginResponseDataPromise = reqLogin({username: 'admin', password: 'admin', code: 123});
  console.log(loginResponseDataPromise)
})

</script>

<template>

</template>

<style scoped>

</style>
