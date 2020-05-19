import { AxiosResponse } from 'axios'
import axios from '../../utils/axios'

// 个人中心内容
// 获取我的搜索
export function _listWeek(): Promise<AxiosResponse<any>> {
    return axios.get('/search/list_week')
}

// 删除搜索历史
export function _deleteSearch(params: IDeleteSearch): Promise<AxiosResponse<any>> {
    return axios.get('/search/delete', params)
}

// 获取我的浏览
export function _listWeekBrowse(): Promise<AxiosResponse<any>> {
    return axios.get('/browse_history/list_week')
}

// 删除我的浏览
export function _deleteBrowse(params: IDeleteBrowse): Promise<AxiosResponse<any>> {
    return axios.get('/browse_history/delete', params)
}

// 获取我的下载
export function _downloadList(params: IDownloadList): Promise<AxiosResponse<any>> {
    return axios.get('/download_history/download_list', params)
}

// 获取我的收藏
export function _favoriteList(params: IFavoriteList): Promise<AxiosResponse<any>> {
    return axios.get('/favorite/favorite_list', params)
}

// 批量删除我的下载
export function _deleteDownloads(params: IDeleteDownloads): Promise<AxiosResponse<any>> {
    return axios.post('/download_history/delete_downloads', params.questions,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
}

// 批量删除我的收藏
export function _deleteFavorites(params: IDeleteFavorites): Promise<AxiosResponse<any>> {
    return axios.post('/favorite/delete_favorites', params.questions,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
}