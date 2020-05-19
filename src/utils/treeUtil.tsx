interface IInitTreeData {
    id: string;
    name: string;
    children: IInitTreeData[];
}

export default function formatTreeData(initTreeData: IInitTreeData[]): ITreeData[] {
    const newTreeData: ITreeData[] = []
    initTreeData.forEach((item: IInitTreeData): void => {
        newTreeData.push({
            title: item.name,
            value: item.id,
            key: item.id,
            // disabled: item.id === '6150000000000000000', // 特殊情况
            children: item.children.length > 0 ? formatTreeData(item.children) : []
        })
    })
    return newTreeData
}