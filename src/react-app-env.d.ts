declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module 'braft-extensions/dist/header-id'
declare module 'braft-utils'
declare module 'echarts-wordcloud'

declare module '*.module.less' {
    const classes: { [key: string]: string }
    export default classes
}

// mapStateToProps
interface IMapStateToProps {
    [key: string]: any;
}
// mapDispatchToProps
interface IMapDispatchToProps {
    [key: string]: ([key]: any) => any;
}

// 布局item
interface ILayoutsItem {
    i: string;
    title: string;
    component: React.ReactElement | string;
}

// 树数据
interface ITreeData {
    title: string;
    key: string;
    children: ITreeData[];
    disabled?: boolean;
    value: string;
}

// 表头
interface IColumns {
    key: string;
    title: string;
    dataIndex: string;
    width: number;
    ellipsis?: boolean;
    fixed?: boolean | 'left' | 'right';
    editable?: boolean;
    render?: (text: any, record?: any) => React.ReactElement | string;
}