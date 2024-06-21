import React from 'react';
import { createRoot } from 'react-dom/client';
import Layer from '@/system/widgets/layer';
import styles from './template.module.less';
import { Col, Row, Button, Form, Input, Select, Pagination } from 'antd';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
export default class TemplateControler extends React.Component {

    constructor(controler) {
        super(controler);
        this.controler = controler;
        this.init()

        console.log(styles);

    }

    static template() {
        const element = document.querySelector('#function-modal');
        const root = createRoot(element);

        this.prototype.close = () => root.unmount()

        root.render(<TemplateControler />)
    }

    render() {
        const {
            templateLibrary, templateSearch, templateContent, templatePaging, templateContentItem, templateContentItemImg, templateContentItemName
        } = styles

        return (
            <Layer.open
                titles={['模板库']}
                area={this.area}
                close={this.close}
                draggable={this.draggable}
                skin="em-function-resource"
                cancel={this.cancel}
                ensure={this.ensure}
            >
                <div id={templateLibrary}>
                    <div className={templateSearch}>
                        <Form
                            name='sad'
                            layout={'inline'}
                        >
                            <Form.Item label="颜色" wrapperCol={{
                                gutter: 16,
                            }}>
                                <Select
                                    placeholder="请选择"
                                    style={{
                                        width: 160,
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label="行业" wrapperCol={{
                                gutter: 16,
                            }}>
                                <Select
                                    placeholder="请选择"
                                    style={{
                                        width: 160,
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label="导航类型">
                                <Select
                                    placeholder="请选择"
                                    style={{
                                        width: 160,
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label="模板编号">
                                <Input placeholder="请输入模板编号" />
                            </Form.Item>

                            <Form.Item >
                                <Button type="primary">查询</Button>
                                <Button style={{ marginLeft: '20px' }} type="primary">重置</Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className={templateContent}>
                        <Row gutter={[16, 16]}>
                            {
                                this.list.map(item => {
                                    return (
                                        <Col span={6} key={item.id}>
                                            <div className={templateContentItem}>
                                                <div className={templateContentItemImg}>
                                                    <img src={item.previewUrl} alt="" style={{ width: '100%', height: '100%' }} />
                                                </div>
                                                <div className={templateContentItemName}>{item.name}</div>
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>
                    <div className={templatePaging}>
                        <ConfigProvider locale={zhCN} theme={{
                            components: {
                                Pagination: {
                                    itemActiveBg: "#116DFF",
                                },
                            },
                        }}>
                            <Pagination
                                total={85}
                                showSizeChanger={false}
                                showQuickJumper
                                showTotal={(total) => `共 ${total} 条数据`}
                            />
                        </ConfigProvider>
                    </div>
                </div>
            </Layer.open>
        )
    }


    init() {
        this.titles = this.controler.titles || ['模板库'];
        this.area = this.controler.area || ["1200px", "auto"];
        this.cancel = this.controler.cancel || false;
        this.ensure = this.controler.ensure || false;
        this.draggable = this.controler.draggable || false;

        // 模拟模板库数据
        this.list = [
            {
                name: "111",
                id: 1,
                previewUrl: 'https://www.eyingbao.com/public/uploads/660a1bd430f00.jpg'
            },
            {
                name: "111",
                id: 2,
                previewUrl: 'https://www.eyingbao.com/public/uploads/660a1bd430f00.jpg'
            },
            {
                name: "111",
                id: 3,
                previewUrl: 'https://www.eyingbao.com/public/uploads/660a1bd430f00.jpg'
            }, {
                name: "111",
                id: 4,
                previewUrl: 'https://www.eyingbao.com/public/uploads/660a1bd430f00.jpg'
            }
            , {
                name: "111",
                id: 5,
                previewUrl: 'https://www.eyingbao.com/public/uploads/660a1bd430f00.jpg'
            }
        ]
    }
}