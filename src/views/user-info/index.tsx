import Head from '@/imgs/head.jpg'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Input, Radio, Row } from 'antd'
import { memo, useState } from 'react'
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

  const onFinish = values => {
    console.log(values)
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>点击上传</div>
    </div>
  )

  return (
    <div className='user-info-box'>
      <Card title='基本信息'>
        <Form {...layout} colon={false} form={form}>
          <Row>
            <Col span={16}>
              <Form.Item label='用户头像'>
                <img className='user-info_header' src={Head} />
              </Form.Item>
            </Col>
            <Col span={16}>
              {editFlag ? (
                <Form.Item label='用户昵称' name='nickName'>
                  <Input placeholder='请输入昵称' />
                </Form.Item>
              ) : (
                <Form.Item label='用户昵称'>
                  <>暂无</>
                </Form.Item>
              )}
            </Col>
            <Col span={16}>
              {editFlag ? (
                <Form.Item
                  label='性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别'
                  name='gender'
                >
                  <Radio.Group>
                    <Radio value={1}>男</Radio>
                    <Radio value={2}>女</Radio>
                  </Radio.Group>
                </Form.Item>
              ) : (
                <Form.Item label='性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别'>
                  <>未知</>
                </Form.Item>
              )}
            </Col>
            <Col span={16}>
              {editFlag ? (
                <Form.Item
                  label='邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱'
                  name='email'
                >
                  <Input placeholder='请输入邮箱' />
                </Form.Item>
              ) : (
                <Form.Item label='邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱'>
                  <>暂无</>
                </Form.Item>
              )}
            </Col>
            <Col span={16}>
              {editFlag ? (
                <Form.Item label='个人简介' name='introduce'>
                  <TextArea placeholder='请输入个人简介' maxLength={500} showCount />
                </Form.Item>
              ) : (
                <Form.Item label='个人简介'>
                  <>这个人很懒，什么也没有留下。。。。</>
                </Form.Item>
              )}
            </Col>

            <Col span={16}>
              <Form.Item wrapperCol={{ offset: 5 }}>
                {editFlag ? (
                  <>
                    <Button type='primary' style={{ marginRight: '20px' }} onClick={onFinish}>
                      保存
                    </Button>
                    <Button onClick={() => setEditFlag(false)}>取消</Button>
                  </>
                ) : (
                  <Button type='primary' onClick={() => setEditFlag(true)}>
                    编辑
                  </Button>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  )
}

export default memo(UserInfo)
