import {request} from "@/utils/request"

import {PageResult, ResponseResult} from "@/api/common/type.ts";
import {BrandEntity, BrandForm} from "@/api/brand/type";


enum API {
    LIST_PAGE = "/business/brand/management/list-page"
}

export const listPage = (data: BrandForm) => request.get<any, ResponseResult<PageResult<BrandEntity>>>(API.LIST_PAGE, data)