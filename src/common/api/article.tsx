import { AxiosResponse } from 'axios'
import axios from '../../utils/axios'

export function _listKdg(params: IListKdg): Promise<AxiosResponse<any>> {
    return axios.get('/kdg_management/list_kdg', params)
}
// 生成标签
export function _analysisTags(params: IAnalysisTags): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_create/analysis_tags', params)
}
// 创建文章
export function _createArticle(params: ICreateArticle): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_create/create_article', params)
}
// 富文本插件，上传文件
export function _uploadMedia(params: FormData, processFn: any): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_create/upload_media', params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
            const progressNumber = (progressEvent.loaded / progressEvent.total) * 100 || 0
            processFn(Math.round(progressNumber))
        }
    })
}