import {request} from "@/utils/request"

import {PageResult, ResponseResult} from "@/api/common/type.ts";
import {BrandEntity, BrandForm} from "@/api/brand/type";
import {AccountForm, AccountInfo} from "@/api/account/type.ts";


enum API {
    LIST_PAGE = "/business/account/info/list-page",
    GET_BY_ID = "/business/account/info/get-by-id",
    SAVE = "/business/account/info/save",
    EDIT = "/business/account/info/update-by-id",
    DELETE = "/business/account/info/delete-by-id",
}

export const listPage = (data: AccountForm) => request.get<any, ResponseResult<PageResult<AccountInfo>>>(API.LIST_PAGE, {params: data})

export const getAccountById = (id: number) => request.get<any, ResponseResult<AccountInfo>>(API.GET_BY_ID, { params: { id: id } });

export const saveAccount = (data: AccountInfo) => request.post<any, ResponseResult<any>>(API.SAVE, data)

export const editAccount = (data: AccountInfo) => request.put<any, ResponseResult<any>>(API.EDIT, data)

export const deleteAccount = (id: number) => request.delete<any, ResponseResult<any>>(API.DELETE, {params: {id:id}})
