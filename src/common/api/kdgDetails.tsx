import { AxiosResponse } from 'axios'
import axios from '../../utils/axios'

// 获取知识详细信息
export function _kdg(params: IKdg): Promise<AxiosResponse<any>> {
    return axios.get('/search/kdg', params)
}

// 获取相关知识
export function _relativeKdg(params: IRelativeKdg): Promise<AxiosResponse<any>> {
    return axios.get('/search/relative_kdg', params)
}

// 知识类型=20，即文库，下载该文库文件
export function _downloadDocKdg(params: IDownloadDocKdg): Promise<AxiosResponse<any>> {
    return axios.get('/search/download_doc_kdg', params)
}

// 判断是否可收藏
export function _checkFavorite(params: ICheckFavorite): Promise<AxiosResponse<any>> {
    return axios.get('/favorite/check_favorite', params)
}

// 判断是否可收藏
export function _createFavorite(params: ICreateFavorite): Promise<AxiosResponse<any>> {
    return axios.post('/favorite/create', params)
}

// 点赞知识
export function _thumKdg(params: IThumKdg): Promise<AxiosResponse<any>> {
    return axios.get('/kdg_management/thumb_kdg', params)
}