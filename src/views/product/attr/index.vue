<script setup lang="ts">

</script>

<template>
  <Category/>

  <el-card style="margin: 10px 0px">
    <el-button type="primary" icon="Plus">添加属性</el-button>
    <el-table border style="margin: 10px 0px">
      <el-table-column label="序号" type="index" align="center"></el-table-column>
      <el-table-column label="属性名称"></el-table-column>
      <el-table-column label="属性值名称"></el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" icon="Edit"></el-button>
        <el-button type="primary" icon="Delete"></el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped>

</style>