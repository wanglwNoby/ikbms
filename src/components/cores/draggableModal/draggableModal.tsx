import * as React from 'react'
import { Modal } from 'antd'
import ModalTitle from './modalTitle'

interface IProps {
    visible: boolean;
    title: string;
    width?: number;
    confirmLoading?: boolean;
    onOk: () => void;
    onCancel: () => void;
}

class DraggableModal extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props)
        this.state = {}
    }

    public render(): React.ReactElement {
        return (
            <Modal
                {...this.props}
                destroyOnClose
                maskClosable={false}
                title={<ModalTitle title={this.props.title} />}
            >
                {
                    React.Children.map(this.props.children, (child: any): React.ReactElement => child)
                }
            </Modal>
        )
    }
}

export default DraggableModal