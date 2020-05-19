import * as React from 'react'
import { withRouter } from 'react-router-dom'
import echarts from 'echarts'
import 'echarts-wordcloud'
import { _listHotWord } from '../../../common/api/homePage'

interface IWordData {
    term: string;
    operator: string;
    number: number;
}
interface IWordCloud {
    name: string;
    value: number;
    textStyle: any;
}
interface IRandomStyle {
    normal: { color: string };
    emphasis?: { color: string };
}

class HotSearch extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {}
    }

    public componentDidMount(): void {
        this.getHotWord()
    }

    public getHotWord = async (): Promise<void> => {
        const res: any = await _listHotWord()
        if (res && res.result) {
            const wordCloudData: IWordCloud[] = []
            res.data.forEach((item: IWordData): void => {
                wordCloudData.push({
                    name: item.term,
                    value: item.number,
                    textStyle: this.createRandomItemStyle()
                })
            })
            this.createWordCloud(wordCloudData)
        }
    }

    public createRandomItemStyle = (): IRandomStyle => {
        const r: number = Math.round(Math.random() * 256)
        const g: number = Math.round(Math.random() * 256)
        const b: number = Math.round(Math.random() * 256)
        return {
            normal: {
                color: `rgba(${r},${g},${b},0.8)`
            },
            emphasis: {
                color: `rgba(${r},${g},${b},1)`
            }
        }
    }

    public createWordCloud = (wordCloudData: IWordCloud[]): void => {
        const dom: HTMLDivElement | HTMLCanvasElement = document.getElementById('wordCloud') as HTMLDivElement | HTMLCanvasElement
        if (!dom) {
            return
        }
        const myChart = echarts.init(dom)
        const option = {
            series: [{
                type: 'wordCloud',
                left: 'center',
                top: 'center',
                width: '90%',
                height: '90%',
                sizeRange: [18, 60],
                data: wordCloudData
            }]
        }
        myChart.setOption(option)
        myChart.on('click', (params: any): void => {
            this.props.history.push({ pathname: '/kms', state: { keyword: params.name } })
        })
        window.addEventListener('resize', (): void => { myChart.resize() })
    }

    public render(): React.ReactElement {
        return (
            <div id="wordCloud" style={{ height: '100%' }} />
        )
    }
}

export default withRouter(HotSearch)