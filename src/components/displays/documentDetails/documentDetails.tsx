import * as React from 'react'
import PDF from 'react-pdf-js'
import { Typography, Spin, Pagination } from 'antd'
import { _downloadDocKdg } from '../../../common/api/kdgDetails'
import styles from './documentDetails.module.less'

interface IState {
    file: any;
    fileUrl: string;
    page: number;
    pages: number;
}

interface IProps {
    kdgDetails: {
        id: string;
        month: number;
        title: string;
        create_time: string;
        content: string;
    };
}

const pdfType = ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf']
const imageType = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']
const audioType = ['.mp3', '.wma', '.wav', '.ogg']
const videoType = ['.mp4', 'wmv', 'avi', '.mov']


class DocumentDetails extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            file: {},
            fileUrl: '',
            page: 1,
            pages: 0
        }
    }

    public componentDidMount(): void {
        this.downloadDocument()
    }

    public downloadDocument = async (): Promise<void> => {
        const res: any = await _downloadDocKdg({
            params: {
                id: this.props.kdgDetails.id,
                month: this.props.kdgDetails.month
            }
        })
        console.log(res)
        if (res && res.result) {
            this.setState({
                file: res.data,
                fileUrl: pdfType.indexOf(res.data.doc_ext) > -1 ? `/temp/${res.data.pdf_name}` : `/temp/${res.data.temp_name}`
            })
        }
    }

    public render(): React.ReactElement {
        const renderPDF = (
            <React.Fragment>
                <PDF
                    file={this.state.fileUrl}
                    onDocumentComplete={(pages: number): void => this.setState({ pages })}
                    page={this.state.page}
                />
                <Pagination
                    defaultPageSize={1}
                    current={this.state.page}
                    total={this.state.pages}
                    onChange={(page: number): void => this.setState({ page })}
                />
            </React.Fragment>
        )

        const renderImage = <img src={this.state.fileUrl} alt={this.state.file.doc_name} />

        const renderAudio = <audio controls src={this.state.fileUrl} />

        const renderVideo = <video controls src={this.state.fileUrl} />

        return (
            <Typography>
                <Typography.Title>{this.props.kdgDetails.title}</Typography.Title>
                <Typography.Text strong>
                    {`${this.props.kdgDetails.create_time.substr(0, 4)}-${this.props.kdgDetails.create_time.substr(4, 2)}-${this.props.kdgDetails.create_time.substr(6, 2)}`}
                </Typography.Text>
                <Typography.Paragraph style={{ marginTop: 16, textAlign: 'center' }}>
                    {
                        this.state.fileUrl !== '' ?
                            pdfType.indexOf(this.state.file.doc_ext) > -1 ? renderPDF :
                                imageType.indexOf(this.state.file.doc_ext) > -1 ? renderImage :
                                    audioType.indexOf(this.state.file.doc_ext) > -1 ? renderAudio :
                                        videoType.indexOf(this.state.file.doc_ext) > -1 ? renderVideo : <textarea className={styles.textarea} readOnly value={this.state.file.content} /> : <Spin tip="正在加载中..." />
                    }
                </Typography.Paragraph>
            </Typography>
        )
    }
}

export default DocumentDetails