import { AxiosResponse } from 'axios'
import axios from '../../utils/axios'

// 创建问题
export function _createQuestion(params: ICreateQuestion): Promise<AxiosResponse<any>> {
    return axios.post('/question/create_question', params)
}
export default _createQuestion