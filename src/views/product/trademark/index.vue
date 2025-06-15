<script setup lang="ts">
import {ref, onMounted, reactive, watch} from "vue"
import {editBrand, listPage, saveBrand} from "@/api/brand"
import {BrandEntity, BrandForm} from "@/api/brand/type";
import {PageResult, ResponseResult} from "@/api/common/type";
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'


let pageNo = ref<number>(1)
let limit = ref<number>(10)
let total = ref<number>(1024)
let dialogFormVisible = ref(false);
const brandList = ref<BrandEntity[]>([]);
let brandEntity = reactive<BrandEntity>(new BrandEntity())



onMounted(() => {
  getListPage()
});
// 监听 dialogFormVisible 的变化
watch(dialogFormVisible, (newValue) => {
  if (newValue === false) {
    // 当 dialogFormVisible 变为 false 时，清空表单数据
    // 假设你的属性是 logo 和 name
    brandEntity.logoUrl = null;
    brandEntity.tmName = null;
    // 如果 BrandEntity 有 id 属性且需要清空
    brandEntity.id = null;
  }
  console.log(newValue);
});

const getListPage = async ()=>{
  const brandForm = new BrandForm(pageNo.value, limit.value);

  const result: ResponseResult<PageResult<BrandEntity>> = await listPage(brandForm);  // 处理返回结果
  if (result.isSuccess()){
    brandList.value = result.data.list
    total.value = result.data.total
  }
  console.log(result);
}
const save = ()=>{
  dialogFormVisible.value = true
}
const edit = () => {
  dialogFormVisible.value = true
}
const cancel = ()=>{
  dialogFormVisible.value = false
}
const confirm = async ()=>{
  if (brandEntity.id){
    const result = await editBrand(brandEntity)
  } else{
   const result = await saveBrand(brandEntity)
   if (result.isSuccess()){
     dialogFormVisible.value = false
     ElMessage({
       type: "success",
       message: "添加品牌成功"
     })
     await getListPage()
   } else {
     ElMessage({
       type: "error",
       message: "添加品牌失败"
     })
   }
  }

}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('The picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('The picture size can not exceed 2MB!')
    return false
  }
  return true
}




const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  console.log(response)
  brandEntity.logoUrl= response.data
  console.log(brandEntity)
}

</script>

<template>
  <div>
    <el-card>
      <el-button type="primary" icon="plus" @click="save">添加品牌</el-button>
      <el-table :data=brandList style="margin: 10px 0px" border>
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="品牌名称">
          <!--具名插槽，父组件使用 v-slot 或者 # 来接受子组件的传递值        -->
          <template v-slot="{ row, column, $index }">
            <!-- 假设 BrandEntity 有一个 name 属性 -->
            <h1>{{ row.tmName }}</h1>
          </template>
        </el-table-column>
        <el-table-column label="品牌Logo" >
          <template #="{ row, column, $index }">
            <img v-if="row.logoUrl" :src="row.logoUrl" style="width: 100px; height: 100px"/>
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" >
          <!--具名插槽，父组件使用 v-slot 或者 # 来接受子组件的传递值        -->
          <template #="{ row, column, $index }">
            <el-button type="primary" size="small" icon="Edit" @click="edit"></el-button>
            <el-button type="primary" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="limit"
          :page-sizes="[ 30, 50, 100 ]"
          layout="prev, pager, next, jumper, ->,sizes, total"
          :total="total"
          @size-change="getListPage"
          @current-change="getListPage"
      />
    </el-card>
    <el-dialog v-model="dialogFormVisible" title="添加品牌" width="600">
      <el-form label-width="auto">
        <el-form-item label="品牌名称" style="width: 80%;">
          <el-input placeholder="请输入品牌名称" v-model="brandEntity.tmName"></el-input>
        </el-form-item>
        <el-form-item label="上传品牌Logo">
          <el-upload
              class="avatar-uploader"
              action="/prod-api/upload/file"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="brandEntity.logoUrl" :src="brandEntity.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer="">
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
        <el-button type="primary" size="default" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>



</template>


<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>