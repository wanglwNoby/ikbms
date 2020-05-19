import * as React from 'react'
import moment, { Moment } from 'moment'
import { Row, Col, DatePicker, Radio } from 'antd'
import { RangePickerValue } from 'antd/lib/date-picker/interface'
import styles from './kdgManageQuery.module.less'

interface IProps {
    setQueryState: (state: IState) => void;
}

interface IState {
    rangeTime: RangePickerValue;
    verified: number;
    published: number;
    [key: string]: any;
}

class KdgManageQuery extends React.PureComponent<IProps, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            rangeTime: [moment().startOf('day'), moment().endOf('day')],
            verified: -1,
            published: -1
        }
    }

    public rangeTimeChange = (dates: RangePickerValue): void => {
        this.setState({
            rangeTime: dates
        }, (): void => { this.props.setQueryState(this.state) })
    }

    public radioChange = (key: string, e: any): void => {
        this.setState({
            [key]: e.target.value
        }, (): void => { this.props.setQueryState(this.state) })
    }

    public render(): React.ReactElement {
        return (
            <React.Fragment>
                <Row className={styles.row}>
                    <Col span={6}>时间段：</Col>
                    <Col span={18}>
                        <DatePicker.RangePicker
                            className={styles.rangePicker}
                            ranges={{
                                今天: [moment().startOf('day'), moment().endOf('day')],
                                今周: [moment().startOf('week'), moment().endOf('week')],
                                今月: [moment().startOf('month'), moment().endOf('month')],
                                今年: [moment().startOf('year'), moment().endOf('year')]
                            }}
                            disabledDate={(current: Moment): boolean => current > moment().endOf('day')}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            value={this.state.rangeTime}
                            onChange={this.rangeTimeChange}
                        />
                    </Col>
                </Row>
                <Row className={styles.row}>
                    <Col span={6}>审核结果：</Col>
                    <Col span={18}>
                        <Radio.Group
                            value={this.state.verified}
                            onChange={this.radioChange.bind(this, 'verified')}
                        >
                            <Radio value={-1}>全部</Radio>
                            <Radio value={0}>未审核</Radio>
                            <Radio value={1}>审核通过</Radio>
                            <Radio value={2}>审核未通过</Radio>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row className={styles.row}>
                    <Col span={6}>发布结果：</Col>
                    <Col span={18}>
                        <Radio.Group
                            value={this.state.published}
                            onChange={this.radioChange.bind(this, 'published')}
                        >
                            <Radio value={-1}>全部</Radio>
                            <Radio value={0}>未发布</Radio>
                            <Radio value={1}>已发布</Radio>
                        </Radio.Group>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default KdgManageQuery