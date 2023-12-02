import { Card, Pagination, Spin } from 'antd'
import React, { Component } from 'react'
import { goodTabType } from '../../constant'
import EmptyBox from '../empty-box'
import GoodQuestion from '../good-question'
import './index.less'
const tabList = [
  {
    key: 'testQuestions',
    tab: '点赞的试题'
  }
  //   {
  //     key: 'posts',
  //     tab: '点赞的帖子',
  //   },
]

export default class GoodBag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentKey: goodTabType.testQuestions, // 选中的tab 默认选中第一个
      goodList: [],
      isShowSpin: true
    }
  }

  total = 0 // 总题数
  pageIndex = 1
  pageSize = 10

  componentDidMount() {
    this.getGoodList()
  }

  /**
   * 切换tab
   * @param {*} key
   */
  onTabChange = key => {
    this.setState(
      {
        currentKey: key
      },
      () => {
        this.pageIndex = 1
        this.getGoodList()
      }
    )
  }

  /**
   * 获取一级分类数据
   */
  getGoodList() {}

  /**
   * 分页
   * @param {*} pageIndex
   */
  onChangePagination = pageIndex => {
    this.pageIndex = pageIndex
    this.getGoodList()
  }

  render() {
    const { currentKey, goodList, isShowSpin } = this.state
    return (
      <div className='good-bag-component'>
        <Card
          style={{ width: '100%' }}
          tabList={tabList}
          activeTabKey={currentKey}
          onTabChange={key => {
            this.onTabChange(key)
          }}
        >
          <Spin spinning={isShowSpin}>
            {goodList?.length > 0 ? this.renderContent(currentKey) : <EmptyBox />}
            {this.total > 10 && (
              <Pagination
                style={{
                  padding: '24px 0',
                  textAlign: 'center'
                }}
                showQuickJumper
                current={this.pageIndex}
                defaultCurrent={this.pageIndex}
                total={this.total}
                onChange={this.onChangePagination}
              />
            )}
          </Spin>
        </Card>
      </div>
    )
  }

  /**
   * 渲染内容
   * @param {*} type
   * @returns
   */
  renderContent = type => {
    const { goodList } = this.state
    switch (type) {
      // 收藏的试题
      case goodTabType.testQuestions:
        return <GoodQuestion goodList={goodList} goodTotal={this.total} />
    }
  }
}
