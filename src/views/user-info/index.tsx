import Head from '@/imgs/head.jpg'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import req from '@utils/request'
import { Button, Card, Col, Form, Input, Radio, Row, message } from 'antd'
import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './index.less'

const { TextArea } = Input
const apiName = '/user/update'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10, offset: 1 }
}

const UserInfo = () => {
  const [form] = Form.useForm()
  const [editFlag, setEditFlag] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = () => {
    setLoading(true)
    const userInfoStorage = localStorage.getItem('userInfo')
    const { loginId = '' } = userInfoStorage ? JSON.parse(userInfoStorage) : {}
    const values = form.getFieldsValue()
    if (!Object.values(values).filter(Boolean).length) {
      setLoading(false)
      return
    }
    const params = {
      userName: loginId,
      ...values
    }
    req(
      {
        method: 'post',
        url: apiName,
        data: { ...params }
      },
      '/auth'
    )
      .then(res => {
        if (res.success) {
          message.success('更新成功')
          setTimeout(() => {
            navigate('/question-bank')
          }, 1000)
        }
        setLoading(false)
        setEditFlag(false)
      })
      .catch(() => {
        message.error('更新失败')
        setLoading(false)
      })
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
                <Form.Item label='性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别' name='sex'>
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
                <Form.Item label='手机号码' name='phone'>
                  <Input placeholder='请输入手机号码' />
                </Form.Item>
              ) : (
                <Form.Item label='手机号码'>
                  <>暂无</>
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
                    <Button
                      type='primary'
                      style={{ marginRight: '20px' }}
                      onClick={onFinish}
                      loading={loading}
                    >
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
