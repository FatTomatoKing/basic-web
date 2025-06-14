<script setup lang="ts">
import {ref,onMounted} from "vue"
import {listPage} from "@/api/brand"
import {BrandEntity, BrandForm} from "@/api/brand/type";
import {PageResult, ResponseResult} from "@/api/common/type";

let pageNo = ref<number>(1)
let limit = ref<number>(10)
let total = ref<number>(0)
const brandList = ref<BrandEntity[]>([]);

onMounted(async () => {
  const brandForm = new BrandForm(pageNo.value, limit.value);
  const result: ResponseResult<PageResult<BrandEntity>> = await listPage(brandForm);  // 处理返回结果
  if (result.isSuccess()){
    brandList.value = result.data.list
    total.value = result.data.total
  }
  console.log(result);
});

</script>

<template>
  <el-card>
    <el-button type="primary" icon="plus">添加品牌</el-button>
    <el-table :data=brandList style="margin: 10px 0px" border>
      <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
      <el-table-column label="品牌名称">
        <!--具名插槽，父组件使用 v-slot 或者 # 来接受子组件的传递值        -->
        <template v-slot="{ row, column, $index }">
          <!-- 假设 BrandEntity 有一个 name 属性 -->
          <h1>{{ row.tmName }}</h1>
        </template>
      </el-table-column>
      <el-table-column label="品牌Logo" prop="logoUrl"></el-table-column>
      <el-table-column label="品牌操作" >
        <!--具名插槽，父组件使用 v-slot 或者 # 来接受子组件的传递值        -->
        <template #="{ row, column, $index }">
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[ 30, 50, 100 ]"
        :background="background"
        layout="prev, pager, next, jumper, ->,sizes, total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </el-card>


</template>


<style scoped>

</style>