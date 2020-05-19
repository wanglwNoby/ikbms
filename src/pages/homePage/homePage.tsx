import * as React from 'react'
import { WidthProvider, Responsive, Layout } from 'react-grid-layout'
import { Card } from 'antd'
import { _usedPartList } from '../../common/api/homePage'
import layoutChangeToComponent from '../../utils/layoutChangeToComponent'
import styles from './homePage.module.less'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

interface IState {
    layouts: Layout[];
}

class HomePage extends React.Component<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            layouts: []
        }
    }

    public componentDidMount(): void {
        this.initLayout()
    }

    // 初始化布局
    public initLayout = async (): Promise<void> => {
        const res: any = await _usedPartList()
        if (res && res.result) {
            this.setState({
                layouts: res.data
            })
        }
    }

    public render(): React.ReactElement {
        return (
            layoutChangeToComponent(this.state.layouts).length > 0 &&
            <ResponsiveReactGridLayout
                rowHeight={30}
                cols={{ lg: 20, md: 8, sm: 6, xs: 4, xxs: 2 }}
                layouts={{ lg: this.state.layouts }}
                isDraggable={false}
                isResizable={false}
            >
                {
                    layoutChangeToComponent(this.state.layouts).map((item: ILayoutsItem): React.ReactElement => (
                        <Card
                            key={item.i}
                            className={styles.card}
                            title={item.title}
                            bordered={false}
                        >
                            {item.component}
                        </Card>
                    ))
                }
            </ResponsiveReactGridLayout>
        )
    }
}

export default HomePage