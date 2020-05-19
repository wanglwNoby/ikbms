import { AxiosResponse } from 'axios'
import axios from '../../utils/axios'

// 获取用户正在使用的布局
export function _usedPartList(): Promise<AxiosResponse<any>> {
    return axios.get('/layout/used_part_list')
}
// 获取最新知识
export function _newestKdg(): Promise<AxiosResponse<any>> {
    return axios.get('/home/newest_kdg')
}
// 获取热搜
export function _listHotWord(): Promise<AxiosResponse<any>> {
    return axios.get('/home/list_hot_word')
}
// 获取公告
export function _newestNotice(): Promise<AxiosResponse<any>> {
    return axios.get('/home/newest_notice')
}
// 获取热点
export function _listHotKdg(params: IListHotKdg): Promise<AxiosResponse<any>> {
    return axios.get('/home/list_hot_kdg', params)
}