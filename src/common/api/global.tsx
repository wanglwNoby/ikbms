import { AxiosResponse } from 'axios'
import axios from '../../utils/axios'

// 登录
export function _login(params: ILogin): Promise<AxiosResponse<any>> {
    return axios.post('/login/logon', params)
}

// 修改密码
export function _changePassword(params: IChangePassword): Promise<AxiosResponse<any>> {
    return axios.post('/login/change_password', params)
}

// 获取设置按钮下拉的菜单
export function _settingMenus(): Promise<AxiosResponse<any>> {
    return axios.get('/setting_menus')
}

// 获取目录-知识管理下拉的菜单
export function _kdgManagementMenus(): Promise<AxiosResponse<any>> {
    return axios.get('/kdg_management_menus')
}

// 自动搜索功能
export function _autoCompleteList(params: IAutoCompleteList): Promise<AxiosResponse<any>> {
    return axios.get('/search/auto_complete_list', params)
}

// 获取table表头
export function _getColumns(params: IGetColumns): Promise<AxiosResponse<any>> {
    return axios.get('/view_columns/get_columns', params)
}

// 获取知识目录树
export function _getCatalogTree(): Promise<AxiosResponse<any>> {
    return axios.get('/kdg_create/business_all')
}

// 获取业务分类树
export function _getClassifyTree(): Promise<AxiosResponse<any>> {
    return axios.get('/kdg_create/load_dimensions')
}

// 删除知识
export function _deleteKdg(params: IDeleteKdg): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_management/delete_more_kdg', params)
}