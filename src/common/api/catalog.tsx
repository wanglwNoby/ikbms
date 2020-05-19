import { AxiosResponse } from 'axios'
import axios from '../../utils/axios'

export function _create(params: ICreate): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_class/create', params)
}

export function _modify(params: IModify): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_class/modify', params)
}

export function _delete(params: IDelete): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_class/delete', params)
}

// 移动
export function _move(params: IMove): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_class/move', params)
}

// 获取详情
export function _getCatalogInfo(params: IGetCatalogInfo): Promise<AxiosResponse<any>> {
    return axios.get('/kdg_class/kdg_class_info', params)
}