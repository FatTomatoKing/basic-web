<script setup lang="ts">
import {getCategoryList} from "@/api/category";
import {onMounted, ref} from "vue";


let categoryList = ref<any>([])
let subCategoryList = ref<any>([])
let threeLevelCategoryList = ref<any>([])


let subCategoryId = ref<number | string>("")
let threeLevelCategoryId = ref<number | string>("")

onMounted(() => {
  getParentList()
});

const getParentList = async () => {
  let result = await getCategoryList(0)
  categoryList.value = result.data
}

const handleLevelChange = async () => {
  subCategoryId.value = ""
  threeLevelCategoryList.value = []
  let result = await getCategoryList(0)
  subCategoryList.value = result.data
}

const handleSecondLevelChange = async () => {
  let result = await getChildrenList(subCategoryId.value)
  threeLevelCategoryList.value = result.data
}

const handleThreeLevelChange = async () => {
  // todo zard 刷新页面
  threeLevelCategoryId.value = ''

}

</script>


<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类" style="width: 200px;">
        <el-select v-model="categoryId" @change="handleLevelChange">
          <el-option v-for="(category,index) in categoryList" :key="category.id" :label="category.categoryName"
                     :value="category.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类" style="width: 200px">
        <el-select v-model="subCategoryId" @change="handleSecondLevelChange">
          <el-option v-for="(category,index) in subCategoryList" :key="category.id" :label="category.categoryName"
                     :value="category.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类" style="width: 200px">
        <el-select v-model="threeLevelCategoryId" @change="handleThreeLevelChange">
          <el-option v-for="(category,index) in threeLevelCategoryList" :key="category.id" :label="category.categoryName"
                     :value="category.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>

</style>