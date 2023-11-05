import { useState } from 'react'
import { Form, Row, Col, Input, Button, Card } from 'antd'

import './index.less'

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10, offset: 1 }
}

const UserInfo = () => {

    const [editFields, setEditFields] = useState<Record<string, any>>({
        nickName: false,
        gender: false,
        introduce: false,
        birth: false
    })

    const changeEditFields = (field: string) => {
        setEditFields({
            ...editFields,
            [field]: !editFields[field]
        })
    }

    return <div className='user-info-box'>
        <Card title='基本信息'>
            <Form {...layout} colon={false}>
                <Row >
                    <Col span={16}>
                        <Form.Item label='用户昵称'>
                            {editFields.nickName ? <Input placeholder='请输入昵称' /> : <>
                                昵称
                            </>}
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label='性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别'>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label='个人简介'>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label='出生日期'>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>

    </div>
}

export default UserInfo