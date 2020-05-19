import { AxiosResponse } from 'axios'
import axios from '../../utils/axios'

// 知识检索（普通+高级）
export function _retrievalKdg(params: IRetrievalKdg): Promise<AxiosResponse<any>> {
    return axios.get('/search/advance_kdg', params)
}
// 相关搜索
export function _relatedSearch(params: IRelatedSearch): Promise<AxiosResponse<any>> {
    return axios.get('/search/relative_list', params)
}