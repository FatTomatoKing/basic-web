import {request} from "@/utils/request"

import {PageResult, ResponseResult} from "@/api/common/type.ts";
import {BrandEntity, BrandForm} from "@/api/brand/type";


enum API {
    LIST_PAGE = "/business/brand/management/list-page",
    EDIT = "/business/brand/management/update-by-id",
    SAVE = "/business/brand/management/save",
    DELETE = "/business/brand/management/save",
}

export const listPage = (data: BrandForm) => request.get<any, ResponseResult<PageResult<BrandEntity>>>(API.LIST_PAGE, {params: data})

export const editBrand = (data: BrandEntity) => request.put<any, ResponseResult<any>>(API.EDIT, data)

export const saveBrand = (data: BrandEntity) => request.post<any, ResponseResult<any>>(API.SAVE, data)

export const deleteBrand = (id: number) => request.delete(any, ResponseResult<any>)(API.DELETE, {params: id})