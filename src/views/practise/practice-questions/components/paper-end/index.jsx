// import req from '@utils/request'
import { Card, Input, Pagination, Spin, Tooltip } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './index.less'

const { Search } = Input

const tabList = [
  {
    key: '0',
    tab: '默认'
  }
  // {
  //   key: '1',
  //   tab: '最新'
  // },
  // {
  //   key: '2',
  //   tab: '最热'
  // }
]

const PaperView = props => {
  const navigate = useNavigate()

  const [spinning, setSpinning] = useState(false)
  const [paperList, setPaperList] = useState([
    {
      setId: 1,
      setName: '测试试卷',
      setHeat: 1,
      setDesc: '描述'
    }
  ])
  const [orderType, setOrderType] = useState(0)
  const [setId, setSetId] = useState(0)
  const [pageInfo, setPageInfo] = useState({
    total: 0,
    pageIndex: 1
  })
  const [searchText, setSearchText] = useState('')
  const getPreSetContent = () => {
    // const { menuId, menuType } = this.props
    // const { orderType, searchText } = this.state
    // let params = {
    //   menuId: menuId,
    //   menuType: menuType,
    //   orderType: orderType,
    //   pageInfo: {
    //     pageIndex: this.pageIndex,
    //     pageSize: 8
    //   },
    //   setName: searchText
    // }
    // req({
    //   method: 'post',
    //   data: params,
    //   url: 'admin/practice/set/getPreSetContent'
    // })
    //   .then(res => {
    //     if (res.data.pageList && res.data.pageList?.length > 0) {
    //       this.setState({
    //         paperList: res.data.pageList,
    //         total: res.data.pageInfo.total,
    //         isShowSpin: false,
    //         setId: res.data.pageList.setId
    //       })
    //     }
    //   })
    //   .catch(err => console.log(err))
  }

  const onTabChange = key => {
    setOrderType(key)
  }

  const onChangePagination = pageIndex => {
    setPageInfo({
      ...pageInfo,
      pageIndex
    })
  }

  const handleJump = setId => navigate('/practice-detail/' + setId)

  const onSearch = value => {
    setSearchText(value)
  }

  return (
    <Spin spinning={spinning}>
      {/* <div className='paper-box-search'>
        <Search
          placeholder='请输入试卷名'
          onSearch={onSearch}
          style={{ width: 300, borderRadius: '10px' }}
        />
      </div> */}
      <div className='paper-box'>
        <div className='paper-box-cardlist'>
          <Card
            style={{ width: '100%' }}
            tabList={tabList}
            bordered={false}
            activeTabKey={tabList.key}
            onTabChange={onTabChange}
          >
            <div className='ant-card-body'>
              {paperList?.length > 0 &&
                paperList.map((item, index) => {
                  return (
                    <div
                      className='paper-box-cardlist-body-item'
                      onClick={() => handleJump(item.setId)}
                      key={`paperList_${index}`}
                    >
                      <h1 className='paper-box-cardlist-body-item-title'>{item.setName}</h1>
                      <div className='paper-box-cardlist-body-item-hot'>
                        热度指数：{item.setHeat}
                      </div>
                      <div className='paper-box-cardlist-body-item-describe'>
                        <Tooltip placement='topLeft' title={item.setDesc}>
                          <span className='hide-3-line'>{item.setDesc}</span>
                        </Tooltip>
                      </div>
                    </div>
                  )
                })}
            </div>
          </Card>
        </div>
        <div className='paper-box-paging'>
          {pageInfo.total > 8 && (
            <Pagination
              style={{
                padding: '24px 0',
                textAlign: 'center'
              }}
              showQuickJumper
              current={pageInfo.pageIndex}
              defaultCurrent={1}
              total={pageInfo.total}
              defaultPageSize={10}
              onChange={onChangePagination}
            />
          )}
        </div>
      </div>
    </Spin>
  )
}

export default PaperView
