import * as React from 'react'
import { Layout } from 'react-grid-layout'
import HotSearch from '../components/displays/hotSearch/hotSearch'
import LatestKdg from '../components/displays/latestKdg/latestKdg'
import Announcement from '../components/displays/announcement/announcement'
import Focusing from '../components/displays/focusing/focusing'

// 遍历layouts,映射i对应的各个组件
export default (data: Layout[]): ILayoutsItem[] => {
    const layoutsItem: ILayoutsItem[] = []
    data.forEach((item: Layout): void => {
        switch (item.i) {
            case '6210000000000000001':
                layoutsItem.push({
                    i: item.i,
                    title: '公告',
                    component: <Announcement />
                })
                break
            case '6210000000000000002':
                layoutsItem.push({
                    i: item.i,
                    title: '热搜',
                    component: <HotSearch />
                })
                break
            case '6210000000000000003':
                layoutsItem.push({
                    i: item.i,
                    title: '热点',
                    component: <Focusing />
                })
                break
            case '6210000000000000004':
                layoutsItem.push({
                    i: item.i,
                    title: '最新知识',
                    component: <LatestKdg />
                })
                break
            case '6210000000000000005':
                layoutsItem.push({
                    i: item.i,
                    title: '最近搜索',
                    component: '最近搜索'
                })
                break
            case '6210000000000000006':
                layoutsItem.push({
                    i: item.i,
                    title: '最近浏览',
                    component: '最近浏览'
                })
                break
            case '6210000000000000007':
                layoutsItem.push({
                    i: item.i,
                    title: '最近下载',
                    component: '最近下载'
                })
                break
            case '6210000000000000008':
                layoutsItem.push({
                    i: item.i,
                    title: '最近收藏',
                    component: '最近收藏'
                })
                break
            case '6210000000000000009':
                layoutsItem.push({
                    i: item.i,
                    title: '推荐知识',
                    component: '推荐知识'
                })
                break
            case '6210000000000000010':
                layoutsItem.push({
                    i: item.i,
                    title: '重要知识',
                    component: '重要知识'
                })
                break
            case '6210000000000000011':
                layoutsItem.push({
                    i: item.i,
                    title: '必读知识',
                    component: '必读知识'
                })
                break
            case '6210000000000000012':
                layoutsItem.push({
                    i: item.i,
                    title: '我的关注点',
                    component: '我的关注点'
                })
                break
            case '6210000000000000013':
                layoutsItem.push({
                    i: item.i,
                    title: '我的薄弱点',
                    component: '我的薄弱点'
                })
                break
            case '6210000000000000014':
                layoutsItem.push({
                    i: item.i,
                    title: '个人知识',
                    component: '个人知识'
                })
                break
            case '6210000000000000015':
                layoutsItem.push({
                    i: item.i,
                    title: '热门论坛',
                    component: '热门论坛'
                })
                break
            case '6210000000000000016':
                layoutsItem.push({
                    i: item.i,
                    title: '我的培训',
                    component: '我的培训'
                })
                break
            case '6210000000000000017':
                layoutsItem.push({
                    i: item.i,
                    title: '我的考试',
                    component: '我的考试'
                })
                break
            default:
                layoutsItem.push({
                    i: item.i,
                    title: item.i,
                    component: `这是${item.i}组件`
                })
                break
        }
    })
    return layoutsItem
}