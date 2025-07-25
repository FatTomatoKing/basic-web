<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {deleteAccount, editAccount, getAccountById, listPage, saveAccount} from "@/api/account";
import {AccountForm, AccountInfo} from "@/api/account/type.ts";
import {PageResult, ResponseResult} from "@/api/common/type.ts";
import {ElMessage, ElMessageBox} from "element-plus";
import {
  Search,
  Grid,
  Plus,
  Refresh,
  Link,
  DocumentCopy,
  Edit,
  Delete
} from '@element-plus/icons-vue'

let pageNo = ref<number>(1)
let limit = ref<number>(12)
let total = ref<number>(1024)
let dialogFormVisible = ref(false);
const accountList = ref<AccountInfo[]>([]);
let accountInfo = reactive<AccountInfo>(new AccountInfo())

// 搜索条件
const searchForm = reactive({
  envName: '',
  website: '',
  username: ''
})

onMounted(() => {
  pageList()
});

const save = () => {
  dialogFormVisible.value = true
  // 重置表单
  accountInfo = reactive<AccountInfo>(new AccountInfo())
}

const pageList = async () => {
  let accountForm = new AccountForm(pageNo.value, limit.value);
  // 添加搜索条件
  accountForm.envName = searchForm.envName;
  accountForm.website = searchForm.website;
  accountForm.username = searchForm.username;

  const result: ResponseResult<PageResult<AccountInfo>> = await listPage(accountForm);
  if (result.isSuccess()) {
    accountList.value = result.data.list;
    total.value = result.data.total;
  }
}

// 重置搜索
const resetSearch = () => {
  searchForm.envName = '';
  searchForm.website = '';
  searchForm.username = '';
  pageList();
}

const updateAccountInfo = async (row: AccountInfo) => {
  const id = row.id;
  // 增加ID有效性检查
  if (id === null) {
    ElMessage.error('账号ID无效，无法编辑');
    return;
  }

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
  await ElMessageBox.confirm(
      '确定要删除这个账号吗?',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )

  const id = row.id;
  // 增加ID有效性检查
  if (id === null) {
    ElMessage.error('账号ID无效，无法删除');
    return;
  }

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

// 截断URL显示
const truncateUrl = (url: string) => {
  if (!url) return '';
  return url.length > 30 ? url.substring(0, 30) + '...' : url;
}

// 复制文本到剪贴板
const copyText = (text: string) => {
  navigator.clipboard.writeText(text)
      .then(() => {
        ElMessage({
          type: 'success',
          message: '复制成功'
        })
      })
      .catch(() => {
        ElMessage({
          type: 'error',
          message: '复制失败'
        })
      })
}

// 打开链接
const openUrl = (url: string) => {
  if (!url) return;
  // 确保URL有协议前缀
  let fullUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
  window.open(fullUrl, '_blank');
}


</script>

<template>
  <div class="account-container">
    <!-- 搜索区域 -->
    <el-card class="search-card">
      <template #header>
        <div class="card-header">
          <span><el-icon><Search /></el-icon> 搜索条件</span>
        </div>
      </template>
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="环境名称">
          <el-input v-model="searchForm.envName" placeholder="请输入环境名称" clearable class="search-input"/>
        </el-form-item>
        <el-form-item label="网址">
          <el-input v-model="searchForm.website" placeholder="请输入网址" clearable class="search-input"/>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="searchForm.username" placeholder="请输入账号" clearable class="search-input"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="pageList">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch" plain>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据列表区域 -->
    <el-card class="data-card">
      <template #header>
        <div class="card-header">
          <span><el-icon><Grid /></el-icon> 账号列表</span>
          <el-button type="primary" :icon="Plus" @click="save" class="header-button">新增账号</el-button>
        </div>
      </template>
      <el-table :data="accountList" style="width: 100%" border stripe>
        <el-table-column label="序号" width="70px" align="center" type="index"></el-table-column>
        <el-table-column label="环境名称" prop="envName" min-width="120px" show-overflow-tooltip></el-table-column>
        <el-table-column label="网址" min-width="200px">
          <template #default="scope">
            <div class="cell-content">
              <el-tooltip :content="scope.row.website" placement="top" effect="light">
                <span class="truncated-text link" @click="openUrl(scope.row.website)">{{ truncateUrl(scope.row.website) }}</span>
              </el-tooltip>
              <el-button type="primary" link @click="copyText(scope.row.website)" class="copy-btn">
                <el-icon><DocumentCopy /></el-icon>
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="账号" prop="username" min-width="150px">
          <template #default="scope">
            <div class="cell-content">
              <span class="truncated-text">{{ scope.row.username }}</span>
              <el-button type="primary" link @click="copyText(scope.row.username)" class="copy-btn">
                <el-icon><DocumentCopy /></el-icon>
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="密码" prop="password" min-width="150px">
          <template #default="scope">
            <div class="cell-content">
              <span class="truncated-text">{{ scope.row.password }}</span>
              <el-button type="primary" link @click="copyText(scope.row.password)" class="copy-btn">
                <el-icon><DocumentCopy /></el-icon>
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="描述" min-width="180px" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160px" align="center" fixed="right">
          <template #default="{ row }">
            <el-button text type="primary" size="small" :icon="Edit" @click="updateAccountInfo(row)">编辑</el-button>
            <el-button text type="danger" size="small" :icon="Delete" @click="deleteAccountInfo(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="limit"
            :page-sizes="[10, 30, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="pageList"
            @current-change="pageList"
            background
        />
      </div>
    </el-card>

    <!-- 表单弹窗 -->
    <el-dialog v-model="dialogFormVisible" :title="accountInfo.id ? '编辑账号信息' : '添加账号信息'" width="600px" destroy-on-close>
      <el-form label-width="100px" :model="accountInfo" class="dialog-form">
        <el-form-item label="环境名称">
          <el-input placeholder="请输入环境名称" v-model="accountInfo.envName"></el-input>
        </el-form-item>
        <el-form-item label="网址">
          <el-input placeholder="请输入网址" v-model="accountInfo.website"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="accountInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input placeholder="请输入密码" v-model="accountInfo.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number placeholder="请输入序号" v-model="accountInfo.orderNum" :min="0" style="width: 100%"></el-input-number>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" placeholder="请输入描述" v-model="accountInfo.description" rows="3"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>

</template>


<style scoped lang="scss">
/*
 * 改动原因: 整体页面美化与布局调整。
 * 之前的布局较为紧凑，元素之间缺少呼吸感，视觉风格也比较单一。
 * 本次改动旨在通过增加间距、调整背景色、优化字体和按钮样式，使页面更现代化、更易用。
 */

/*
 * 作用: 定义整个页面的根容器样式。
 * 改动说明:
 * 1. `padding: 20px`: 增加了内边距，让内容区域与浏览器边缘有一定的距离，避免拥挤感。
 * 2. `background-color: #f5f7fa`: 设置了浅灰色的背景，这是一种常见的设计实践。
 *    它可以让白色的卡片元素更加突出，形成视觉层次感，同时避免纯白背景的刺眼。
 * 3. `font-weight: 400`: 将基础字重设置为400（正常），解决了您提出的“字体太浓稠”的问题，使文本看起来更清爽。
 */
.account-container {
  padding: 20px;
  background-color: #f5f7fa;
  font-weight: 400;
}

/*
 * 作用: 为“搜索条件”和“账号列表”两个卡片设置通用样式。
 * 改动说明:
 * 1. `margin-bottom: 20px`: 在卡片之间增加了下外边距，拉开元素间距，使布局更舒展。
 * 2. `border-radius: 8px`: 添加了圆角，使卡片的边角不再尖锐，看起来更柔和、更现代化。
 * 3. `:deep(.el-card__header)`: 使用:deep()伪类穿透scoped限制，修改Element Plus卡片头部的默认样式。
 *    为其添加了淡淡的背景色和底边框，使其与卡片内容在视觉上分离开，结构更清晰。
 */
.search-card, .data-card {
  margin-bottom: 20px;
  border-radius: 8px;
  :deep(.el-card__header) {
    background-color: #fafcfe;
    border-bottom: 1px solid #ebeef5;
  }
}

/*
 * 作用: 美化卡片头部的标题区域。
 * 改动说明:
 * 1. `display: flex; justify-content: space-between; align-items: center;`: 使用Flexbox布局，让标题和右侧的按钮能够两端对齐，垂直居中。
 * 2. `font-size`, `font-weight`, `color`: 调整了标题的字体大小、粗细和颜色，使其更醒目。
 * 3. `.el-icon`: 为标题左侧的图标设置了外边距和垂直对齐，使其与文字完美配合。
 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  .el-icon {
    margin-right: 6px;
    vertical-align: -2px;
  }
}

/*
 * 作用: 调整搜索表单中每个表单项的样式。
 * 改动说明:
 * `margin-bottom: 0;`: 移除了表单项的下外边距。因为表单是单行内联(inline)模式，移除此边距可以使搜索栏更紧凑。
 */
.search-form .el-form-item {
  margin-bottom: 0;
}

/*
 * 新增样式
 * 作用: 为搜索框设置一个固定的宽度。
 * 改动原因: 解决您提出的“X出来搜索框长度不要变来变去”的问题。
 * 当Element Plus的输入框设置了 `clearable` 属性后，鼠标悬浮或输入内容时，清除按钮(X)会显示出来，
 * 这会挤占空间导致输入框的整体宽度发生变化，造成布局抖动。
 * 通过设置一个固定的宽度，可以确保无论清除按钮是否显示，输入框的总宽度都保持不变，从而消除抖动。
 */
.search-input {
  width: 240px;
}

/*
 * 作用: 调整数据卡片头部“新增账号”按钮的字体粗细。
 */
.data-card .header-button {
  font-weight: 500;
}

/*
 * 作用: 美化表格内文字按钮的样式。
 * 改动说明:
 * `padding: 5px;`: 解决了您提出的“按钮太丑”的问题之一。Element Plus的文字按钮默认内边距较大，
 * 在表格这种紧凑环境里会显得突兀。减小内边距让按钮更精致。
 */
.el-table {
  color: #333;
  .el-button.is-text {
    padding: 5px;
  }
}

/*
 * 作用: 定义表格单元格内容的通用容器。
 * 改动说明:
 * 1. `display: flex; align-items: center; justify-content: space-between;`:
 *    这是本次优化的核心之一。使用Flexbox布局，让单元格内的文本和右侧的“复制”按钮能够优雅地对齐和分布。
 * 2. `.copy-btn`: “一键复制”按钮的样式。
 *    `visibility: hidden;`: 默认将复制按钮隐藏，避免界面杂乱。
 *    `padding: 2px;`: 精细调整按钮内边距，使其小巧不占空间。
 * 3. `.truncated-text`: 被截断文本的样式。
 *    通过`white-space`, `overflow`, `text-overflow`三件套实现单行文本溢出时显示省略号(...)。
 *    `&.link`: 对同时是链接的文本（网址）额外添加样式，如鼠标指针、颜色和悬浮下划线，提升交互性。
 */
.cell-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .copy-btn {
    visibility: hidden;
    padding: 2px;
  }
  .truncated-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &.link {
      cursor: pointer;
      color: var(--el-color-primary);
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

/*
 * 作用: 实现表格行的悬浮交互效果。
 * 改动说明:
 * 当鼠标悬浮在任意表格行`.el-table__row`上时，该行内的复制按钮`.copy-btn`的`visibility`变为`visible`（可见）。
 * 这是一种常见的、提升用户体验的设计，即“按需显示”，只在用户需要时才展示操作入口。
 */
.el-table__row:hover .copy-btn {
  visibility: visible;
}

/*
 * 作用: 定义分页组件的容器样式。
 * 改动说明:
 * `display: flex; justify-content: flex-end;`: 使用Flexbox将分页组件推到容器的右侧，这是通用的UI布局习惯。
 */
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

/*
 * 作用: 调整弹窗内表单和底部的内边距。
 */
.dialog-form {
  padding: 0 20px;
}

.dialog-footer {
  padding: 10px 20px;
  text-align: right;
}
</style>
