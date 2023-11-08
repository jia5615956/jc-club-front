import { useState } from 'react'
import { Form, Row, Col, Input, Button, Card, Radio, DatePicker, ConfigProvider, Upload } from 'antd'
import Head from '@/imgs/head.jpg'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

import './index.less'

const { TextArea } = Input

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10, offset: 1 }
}

const UserInfo = () => {
    const [form] = Form.useForm()
    const [editFlag, setEditFlag] = useState(false)
    const [loading, setLoading] = useState(false)

    const onFinish = (values) => {
        console.log(values)
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>点击上传</div>
        </div>
    );

    return <div className='user-info-box'>
        <Card title='基本信息'>
            <Form {...layout} colon={false} onFinish={onFinish} form={form}>
                <Row>
                    <Col span={16}>
                        <Form.Item label='用户头像' name='upload' valuePropName="fileList">
                            {editFlag ? <Upload listType="picture-card" name="avatar">
                                {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
                                {uploadButton}
                            </Upload> : <>
                                <img className='user-info_header' src={Head} />
                            </>}
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label='用户昵称' name='nickName'>
                            {editFlag ? <Input placeholder='请输入昵称' /> : <>
                                暂无
                            </>}
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label='性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别' name='gender'>
                            {editFlag ? <Radio.Group>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </Radio.Group> : <>
                                未知
                            </>}
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label='邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱' name='email'>
                            {editFlag ? <Input placeholder='请输入邮箱' /> : <>
                                暂无
                            </>}
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label='个人简介' name='introduce'>
                            {editFlag ? <TextArea placeholder='请输入个人简介' maxLength={500} showCount /> : <>
                                这个人很懒，什么也没有留下。。。。
                            </>}
                        </Form.Item>
                    </Col>

                    <Col span={16}>
                        <Form.Item wrapperCol={{ offset: 5 }}>
                            {
                                editFlag ? <>
                                    <Button type='primary' htmlType='submit' style={{ marginRight: '20px' }}>保存</Button>
                                    <Button onClick={() => setEditFlag(false)}>取消</Button>
                                </> : <Button type='primary' onClick={() => setEditFlag(true)}>编辑</Button>
                            }
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    </div>
}

export default UserInfo