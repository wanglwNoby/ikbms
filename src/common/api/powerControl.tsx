import { AxiosResponse } from 'axios'
import axios from '../../utils/axios'

// 获取知识控制权限列表
export function _powerControlList(): Promise<AxiosResponse<any>> {
    return axios.get('/kdg_access/list')
}

// 获取角色列表
export function _getRoleList(): Promise<AxiosResponse<any>> {
    return axios.get('/kdg_access/role_list')
}

// 获取机构用户树
export function _getOrgUserTree(): Promise<AxiosResponse<any>> {
    return axios.get('/kdg_access/org_user_tree')
}

// 获取控制目标树
export function _getTargetTree(): Promise<AxiosResponse<any>> {
    return axios.get('/kdg_access/business_all')
}

// 新建知识权限
export function _createPowerControl(params: ICreatePowerControl): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_access/create_kdg_access', params, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// 修改知识权限
export function _modifyPowerControl(params: ICreatePowerControl): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_access/modify_kdg_access', params, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// 删除知识权限
export function _deletePowerControl(params: IDeletePowerControl): Promise<AxiosResponse<any>> {
    return axios.post('/kdg_access/delete_kdg_access', params)
}