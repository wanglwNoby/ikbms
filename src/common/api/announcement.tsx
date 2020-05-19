import { AxiosResponse } from 'axios'
import axios from '../../utils/axios'

export function _listKdg(params: IListKdg): Promise<AxiosResponse<any>> {
    return axios.get('/kdg_management/list_kdg', params)
}
// 生成标签
export function _analysisTags(params: IAnalysisTags): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_create/analysis_tags', params)
}
// 创建公告
export function _createNotice(params: ICreateNotice): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_create/create_notice', params)
}
// 修改基本内容
export function _modifyBasicKdg(params: IModifyBasicKdg): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_management/modify_basic_kdg', params)
}
// 修改目录或分类
export function _modifyClassKdg(params: IModifyClassKdg): Promise<AxiosResponse<any>> {
    return axios.post(`/kdg_management/modify_class_kdg?class_id=${params.class_id}&business_ids=${params.business_ids}`, params.kdgs, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}