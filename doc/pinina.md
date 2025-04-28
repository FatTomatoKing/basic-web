> 安装pinia

```shell
npm i pinia
```

> 创建stroe文件夹和index.ts文件

```ts
import {createPinia} from "pinia";

// 创建大仓库
let pinia = createPinia();

// 暴露
export default pinia
```

> 在main.ts app中进行挂载

```tsx
import pinia  from "@/store/index.js";

。。。。
app.use(pinia)
```
