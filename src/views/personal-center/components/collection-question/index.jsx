import { SnippetsTwoTone } from '@ant-design/icons'
import { debounce, splicingQuery } from '@utils'
import React, { Component } from 'react'

import './index.less'

class CollectionQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: false //对话框默认不可见
    }
  }

  handleCancelCollection = () => {
    console.log('取消收藏')
    this.setState({
      isModalVisible: true
    })
  }

  handleCancel = () => {
    // console.log('点了取消');
    this.setState({
      isModalVisible: false
    })
  }

  handleOk = () => {
    console.log('点了确认')
    this.setState({
      isModalVisible: false
    })
  }
  handleJump = id =>
    debounce(() => {
      this.props.history.push(
        splicingQuery('good-collection-question', {
          subjectType: 4,
          subjectId: id
        })
      )
    })

  render() {
    const { collectionList, collectionTotal } = this.props
    const { isModalVisible } = this.state
    return (
      <div className='collection-bag-component-tab1-body'>
        <div className='collection-bag-component-tab1-head-title'>
          <div className='collection-bag-component-tab1-head-title-icon'>
            <SnippetsTwoTone twoToneColor='#FF0000' />
          </div>
          <div>收藏的题目({collectionTotal})</div>
        </div>
        {collectionList.map(item => {
          return (
            <div
              className='collection-bag-component-tab1-body-item'
              key={`collection_question_${item.id}`}
            >
              <div className='collection-bag-component-tab1-body-item-question'>
                <span
                  className='collection-bag-component-tab1-body-item-question-content'
                  onClick={this.handleJump(item.id)}
                >
                  {item.subjectName}
                </span>
              </div>
              {/* <div className="collection-bag-component-tab1-body-item-foot">
                <span
                  className="collection-bag-component-tab1-body-item-foot-button"
                  onClick={this.handleCancelCollection}
                >
                  取消收藏
                </span>
                <Modal
                  title="提示"
                  visible={isModalVisible}
                  cancelText="取消"
                  okText="确认"
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <p
                    style={{
                      fontSize: '17px',
                      textAlign: 'center',
                    }}
                  >
                    确认取消收藏吗？
                  </p>
                </Modal>
              </div> */}
            </div>
          )
        })}
      </div>
    )
  }
}

export default CollectionQuestion
