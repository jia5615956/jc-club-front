import req from '@utils/request'
import { Card, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BatchleBox from './pages/batch-box'
import SingleBox from './pages/single-box'

import './index.less'
const tabList = [
  {
    key: 'singleBox',
    tab: '单题录入'
  }
]
const UploadQuestions = () => {
  const [currentKey, setCurrentKey] = useState('singleBox')
  const navigate = useNavigate()

  useEffect(() => {
    const userInfoStorage = localStorage.getItem('userInfo')
    if (!userInfoStorage) {
      return message.info('请登录')
    }
    const { loginId } = JSON.parse(userInfoStorage)
    req(
      {
        method: 'get',
        url: '/permission/getPermission',
        params: {
          userName: loginId
        }
      },
      '/auth'
    ).then(res => {
      if (res.success && res.data) {
        if (!res.data.includes('subject:add')) {
          message.info('暂无权限')
          navigate('/question-bank')
        }
      }
    })
  }, [])

  const contentList = {
    singleBox: <SingleBox />,
    batchBox: <BatchleBox />
  }

  return (
    <div className='upload-questions-box'>
      <Card
        style={{ width: '100%' }}
        tabList={tabList}
        bordered={false}
        activeTabKey={currentKey}
        onTabChange={key => {
          setCurrentKey(key)
        }}
      >
        {contentList[currentKey]}
      </Card>
    </div>
  )
}

export default UploadQuestions
