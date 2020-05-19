import { AxiosResponse } from 'axios'
import axios from '../../utils/axios'

// 用户拥有的模块列表
export function _userPartList(): Promise<AxiosResponse<any>> {
    return axios.get('/layout/user_part_list')
}
// 用户所有的布局
export function _allUserLayout(): Promise<AxiosResponse<any>> {
    return axios.get('/layout/all_user_layout')
}
// 用户正在使用的布局
export function _usedPartList(): Promise<AxiosResponse<any>> {
    return axios.get('/layout/used_part_list')
}
// 保存/新建用户自定义的布局
export function _saveLayout(params: ISaveLayout): Promise<AxiosResponse<any>> {
    return axios.post('/layout/save_layout', params)
}
// 根据布局id获取详细布局
export function _userLayoutByLayoutId(params: IUserLayoutByLayoutId): Promise<AxiosResponse<any>> {
    return axios.get('/layout/user_layout_by_layout_id', params)
}
// 根据布局id删除布局
export function _deleteUserLayout(params: IDeleteUserLayout): Promise<AxiosResponse<any>> {
    return axios.post('/layout/delete_user_layout', params)
}