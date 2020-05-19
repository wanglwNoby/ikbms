import { AxiosResponse } from 'axios'
import axios from '../../utils/axios'

// 获取维度列表
export function _getDimensionList(): Promise<AxiosResponse<any>> {
    return axios.get('/kdg_business/list_dimensions')
}

// 根据维度 id ，获取业务种类树
export function _getClassifyTree(params: IGetClassifyTree): Promise<AxiosResponse<any>> {
    return axios.get('/kdg_business/class_tree', params)
}

// 创建业务维度
export function _createDimension(params: ICreateDimension): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_business/create/dimension', params)
}

// 业务维度详情
export function _getDimensionInfo(params: IGetDimensionInfo): Promise<AxiosResponse<any>> {
    return axios.get('/kdg_business/dimension_info', params)
}

// 更新业务维度
export function _modifyDimension(params: IModifyDimension): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_business/modify_dimension', params)
}

// 删除业务维度
export function _deleteDimension(params: IDeleteDimension): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_business/delete_dimension', params)
}

// 创建业务种类
export function _createClassify(params: ICreateClassify): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_business/create/class', params)
}

// 业务种类详情
export function _getClassifyInfo(params: IGetClassifyInfo): Promise<AxiosResponse<any>> {
    return axios.get('/kdg_business/class_info', params)
}

// 更新业务种类
export function _modifyClassify(params: IModifyClassify): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_business/modify_class', params)
}

// 删除业务种类
export function _deleteClassify(params: IDeleteClassify): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_business/delete_class', params)
}

// 移动
export function _moveClassify(params: IMoveClassify): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_business/move_class', params)
}