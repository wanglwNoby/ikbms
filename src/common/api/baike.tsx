import { AxiosResponse } from 'axios'
import axios from '../../utils/axios'

// 废弃，暂时放在这
export function _getColumns(params: IGetColumns): Promise<AxiosResponse<any>> {
    return axios.get('/view_columns/get_columns', params)
}
export function _listKdg(params: IListKdg): Promise<AxiosResponse<any>> {
    return axios.get('/kdg_management/list_kdg', params)
}