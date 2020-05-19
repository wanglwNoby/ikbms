import { AxiosResponse } from 'axios'
import axios from '../../utils/axios'

export function _listKdg(params: IListKdg): Promise<AxiosResponse<any>> {
    return axios.get('/kdg_management/list_kdg', params)
}
// 生成标签
export function _analysisDocumentTags(params: FormData): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_create/analysis/tags/document', params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
// 创建文库
export function _createDocument(params: FormData): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_create/create_document', params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}