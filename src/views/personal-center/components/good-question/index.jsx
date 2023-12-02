import { SnippetsTwoTone } from '@ant-design/icons'
import { debounce, splicingQuery } from '@utils'
import React, { Component } from 'react'

import './index.less'

class GoodQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: false //对话框默认不可见
    }
  }

  handleCancelGood = () => {
    console.log('取消点赞')
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
    const { goodList, goodTotal } = this.props
    const { isModalVisible } = this.state
    return (
      <div className='good-bag-component-tab1-body'>
        <div className='good-bag-component-tab1-head-title'>
          <div className='good-bag-component-tab1-head-title-icon'>
            <SnippetsTwoTone twoToneColor='#FF0000' />
          </div>
          <div>点赞的题目（{goodTotal}）</div>
        </div>
        {goodList.map(item => {
          return (
            <div className='good-bag-component-tab1-body-item' key={`good_question_${item.id}`}>
              <div className='good-bag-component-tab1-body-item-question'>
                <span
                  className='good-bag-component-tab1-body-item-question-content'
                  onClick={this.handleJump(item.id)}
                >
                  {item.subjectName}
                </span>
              </div>
              {/* <div className="good-bag-component-tab1-body-item-foot">
                <span className="good-bag-component-tab1-body-item-foot-button" onClick={this.handleCancelGood}>
                  取消点赞
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
                    确认取消点赞吗？
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

export default GoodQuestion
