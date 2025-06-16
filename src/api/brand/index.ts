import {request} from "@/utils/request"

import {PageResult, ResponseResult} from "@/api/common/type.ts";
import {BrandEntity, BrandForm} from "@/api/brand/type";


enum API {
    LIST_PAGE = "/business/brand/management/list-page",
    GET_BY_ID = "/business/brand/management/get-by-id",
    EDIT = "/business/brand/management/update-by-id",
    SAVE = "/business/brand/management/save",
    DELETE = "/business/brand/management/delete-by-id",
}

export const listPage = (data: BrandForm) => request.get<any, ResponseResult<PageResult<BrandEntity>>>(API.LIST_PAGE, {params: data})

export const getBrandById = (id: number) => request.get<any, ResponseResult<BrandEntity>>(API.GET_BY_ID, { params: { id: id } });
export const editBrand = (data: BrandEntity) => request.put<any, ResponseResult<any>>(API.EDIT, data)

export const saveBrand = (data: BrandEntity) => request.post<any, ResponseResult<any>>(API.SAVE, data)

export const deleteBrand = (id: number) => request.delete<any, ResponseResult<any>>(API.DELETE, {params: {id:id}})