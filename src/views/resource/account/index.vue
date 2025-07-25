<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {deleteAccount, editAccount, getAccountById, listPage, saveAccount} from "@/api/account";
import {AccountForm, AccountInfo} from "@/api/account/type.ts";
import {PageResult, ResponseResult} from "@/api/common/type.ts";
import {ElMessage} from "element-plus";


let pageNo = ref<number>(1)
let limit = ref<number>(10)
let total = ref<number>(1024)
let dialogFormVisible = ref(false);
const accountList = ref<AccountInfo[]>([]);
let accountInfo = reactive<AccountInfo>(new AccountInfo())

onMounted(() => {
  pageList()
});


const save = () => {
  dialogFormVisible.value = true
  accountInfo = reactive<AccountInfo>(new AccountInfo())
}
const pageList = async () => {
  let accountForm = new AccountForm(pageNo.value, limit.value);
  const result: ResponseResult<PageResult<AccountInfo>> = await listPage(accountForm);
  if (result.isSuccess()) {
    accountList.value = result.data.list;
    total.value = result.data.total;
  }
}

const updateAccountInfo = async (row: AccountInfo) => {
  let id = row.id;
  let result = await getAccountById(id)

  if (result.isSuccess()) {
    let data = result.data;
    accountInfo.id = data.id
    accountInfo.envName = data.envName
    accountInfo.website = data.website
    accountInfo.username = data.username;
    accountInfo.password = data.password;
    accountInfo.secretKey = data.secretKey;
    accountInfo.orderNum = data.orderNum;
    accountInfo.description = data.description;
  }
  dialogFormVisible.value = true

}

const deleteAccountInfo = async (row: AccountInfo) => {
  let id = row.id;
  let result = await deleteAccount(id)
  if (result.isSuccess()) {
    ElMessage({
      type: "success",
      message: "删除账号成功"
    })
  } else {
    ElMessage({
      type: "error",
      message: "删除账号失败"
    })
  }
  await pageList()
}

const confirm = async () => {
  if (accountInfo.id) {
    const result = await editAccount(accountInfo)
    if (result.isSuccess()) {
      dialogFormVisible.value = false
      ElMessage({
        type: "success",
        message: "编辑账号成功"
      })
      await pageList()
    } else {
      ElMessage({
        type: "error",
        message: "编辑账号失败"
      })
    }

  } else {
    const result = await saveAccount(accountInfo)
    if (result.isSuccess()) {
      dialogFormVisible.value = false
      ElMessage({
        type: "success",
        message: "添加账号成功"
      })
      await pageList()
    } else {
      ElMessage({
        type: "error",
        message: "添加账号成功"
      })
    }
  }
}
const cancel = () => {
  dialogFormVisible.value = false
}

</script>

<template>
  <div>
    <el-card>
      <el-button type="primary" icon="plus" @click="save">新增账号</el-button>
      <el-table :data="accountList">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="环境名称" prop="envName"></el-table-column>
        <el-table-column label="网址" prop="website"></el-table-column>
        <el-table-column label="账号" prop="username"></el-table-column>
        <el-table-column label="密码" prop="password"></el-table-column>
        <el-table-column label="描述" prop="description"></el-table-column>
        <el-table-column label="账号操作">
          <!--具名插槽，父组件使用 v-slot 或者 # 来接受子组件的传递值        -->
          <template #="{ row, column, $index }">
            <el-button type="primary" size="small" icon="Edit" @click="$event =>updateAccountInfo(row)"></el-button>
            <el-button type="primary" size="small" icon="Delete" @click="$event =>deleteAccountInfo(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[ 30, 50, 100 ]"
        layout="prev, pager, next, jumper, ->,sizes, total"
        :total="total"
        @size-change="pageList"
        @current-change="pageList"
    />
    <el-dialog v-model="dialogFormVisible" title="添加环境信息" width="600">
      <el-form label-width="auto">
        <el-form-item label="环境名称" style="width: 80%;">
          <el-input placeholder="请输入环境名称" v-model="accountInfo.envName"></el-input>
        </el-form-item>
        <el-form-item label="网址" style="width: 80%;">
          <el-input placeholder="请输入网址" v-model="accountInfo.website"></el-input>
        </el-form-item>
        <el-form-item label="用户名" style="width: 80%;">
          <el-input placeholder="请输入用户名" v-model="accountInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="用户名" style="width: 80%;">
          <el-input placeholder="请输入密码" v-model="accountInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="排序" style="width: 80%;">
          <el-input placeholder="请输入序号" v-model="accountInfo.orderNum"></el-input>
        </el-form-item>
        <el-form-item label="描述" style="width: 80%;">
          <el-input placeholder="请输入描述" v-model="accountInfo.description"></el-input>
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

</style>
