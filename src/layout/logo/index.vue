<script setup lang="ts">
import setting  from "@/setting";
</script>

<script lang="ts">
 export default {
   name : "Logo"
 }
</script>

<template>
  <div class="logo">
    <img class="image" :src="setting.logo" alt="logo" v-if="setting.logoHidden">
    <p v-if="setting.logoHidden">{{setting.title}}</p>
  </div>
</template>

<style scoped lang="scss">
  .logo{
    width: 100%;
    height: $base-logo-height;
    color: white;
    display: flex;
    align-items: center;
    padding: 10px;
    .image{
      width: 40px;
      height: 40px;
    }
    p{
      font-size: $base-logo-title-size;
      margin-left: 30px;
    }
  }

</style>
