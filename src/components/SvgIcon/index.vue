<template>
  <div>
    <svg :style= "{width:width, height :height}" >
      <use :xlink:href="prefix+iconName" :fill="color" ></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    prefix :{
      type:String,
      default:"#icons-"
    },
    iconName: String,
    color:{
      type: String,
      default:""
    },
    width:{
      type: String,
      default: "30px"
    },
    height:{
      type: String,
      default: "30px"
    }
  })
</script>
<style scoped>

</style>
