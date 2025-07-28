import {request} from "@/utils/request"

import type {Category} from "@/api/category/type";
import {ResponseResult} from "@/api/common/type";

enum API {
    GET_CATEGORY_LIST = "/business/category/management/get-by-parent-id",
}

export const getCategoryList = (parentId: number) => request.get<any, ResponseResult<Category>[]>(API.GET_CATEGORY_LIST, {
    params: { parentId }
})
