import { AxiosResponse } from 'axios'
import axios from '../../../utils/axios'

// 获取最新问题
export function _newestQuestionParams(params: INewestQuestion): Promise<AxiosResponse<any>> {
    return axios.get('/question/newest_question', params)
}
// 获取最新问题
export function _newestQuestion(): Promise<AxiosResponse<any>> {
    return axios.get('/question/newest_question')
}
// 根据关键词获取最新问题
export function _keywordQuestion(params: IKeywordQuestion): Promise<AxiosResponse<any>> {
    return axios.get('/question/keyword_question', params)
}
// 获取目录分类
export function _businessAll(): Promise<AxiosResponse<any>> {
    return axios.get('/kdg_create/business_all')
}
// 获取业务分类
export function _loadDimensions(): Promise<AxiosResponse<any>> {
    return axios.get('/kdg_create/load_dimensions')
}
// 机构用户树
export function _orgUserTree(): Promise<AxiosResponse<any>> {
    return axios.get('/question/org_user_tree')
}
// 问题审核
export function _verifyQuestion(params: IVerifyQuestion): Promise<AxiosResponse<any>> {
    return axios.post(`/question/verify_question?verify=${params.verify}&verify_memo=${params.verify_memo}`, JSON.stringify(params.questions), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 加签
export function _addTag(params: IAddTag): Promise<AxiosResponse<any>> {
    return axios.post(`/question/add_tag?tags=${params.tags}`, JSON.stringify(params.questions), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 等级
export function _setLevel(params: ISetLevel): Promise<AxiosResponse<any>> {
    return axios.post(`/question/set_level?level=${params.level}`, JSON.stringify(params.questions), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 归类
export function _modifyClassQuestion(params: IModifyClassQuestion): Promise<AxiosResponse<any>> {
    return axios.post(`/question/modify_class_question?class_id=${params.class_id}&business_id=${params.business_id}`, JSON.stringify(params.questions), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 获取去重合并
export function _similarTexts(params: ISimilarTexts): Promise<AxiosResponse<any>> {
    return axios.post('/question/similar_texts', JSON.stringify(params.similarTexts), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 合并
export function _mergeQuestion(params: IMergeQuestion): Promise<AxiosResponse<any>> {
    return axios.post('/question/merge_question', params.similarTexts, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 设置扭转
export function _setTransfer(params: ISetTransfer): Promise<AxiosResponse<any>> {
    return axios.post(`/question/set_transfer?answer_user=${params.answer_user}`, JSON.stringify(params.questions), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}