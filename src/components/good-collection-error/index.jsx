import React, { Component } from 'react'
import { Modal, Input, Radio, message } from 'antd'
import { HeartTwoTone, LikeTwoTone, InfoCircleTwoTone } from '@ant-design/icons'
import { collection, good } from './constant'
import req from '@utils/request'
import './index.less'

const { TextArea } = Input
export default class GoodCollectionError extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isGood: false, //是否点赞
      isCollection: false, //是否收藏
      goodAmount: 0, //点赞数量
      collectionAmount: 0, //收藏数量
      // index: 1,
      question: [], //题目列表
      isModal: false, //是否显示纠错弹框
      value: 1, //纠错类型对应值
      inputValue: '', //纠错详情内容
      questionId: '', //题目id
    }
  }
  /**纠错类型 */
  errorType = [
    {
      value: 1,
      content: '答案错误',
    },
    {
      value: 2,
      content: '题目与答案不符',
    },
  ]
  componentDidMount() {
    // this.getDetail()
  }

  getDetail() {
    let params = {
      subjectId: this.props.questionId,
    }
    req({
      method: 'post',
      data: params,
      url: 'admin/question/collect/getDetail',
    })
      .then((res) => {
        if (res.data) {
          this.setState({
            isGood: res.data.isThump,
            goodAmount: res.data.thumpCount,
            isCollection: res.data.isCollect,
            collectionAmount: res.data.collectCount,
          })
        }
      })
      .catch((err) => console.log(err))
  }

  /**
   * 点击纠错按钮
   */
  handleModal = () => {
    this.setState({
      isModal: true,
    })
  }
  /**
   * 点击弹框确认按钮
   */
  handleOk = () => {
    const { value, inputValue } = this.state
    const { questionId } = this.props

    let params = {
      subjectId: questionId,
      errorType: value,
      errorMsg: inputValue,
    }
    if (inputValue.length === 0) {
      message.warning('请填写纠错详情!')
    } else {
      this.setState({
        isModal: false,
        inputValue: '',
      })
      message.success('感谢纠错，立即更改！')
      JDreq({
        method: 'post',
        data: params,
        url: '/admin/question/subjectError/add',
      })
    }
  }
  /**
   * 点击弹框取消按钮
   */
  handleCancel = () => {
    this.setState({
      isModal: false,
      inputValue: '',
    })
  }
  /**
   *
   * @param {选择纠错类型} e
   */
  handleChangeRadio = (e) => {
    this.setState({
      value: e.target.value,
    })
  }
  /**
   *
   * @param {纠错详情中填写内容} e
   */
  handleChangeInput = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
  }
  /**
   *
   * @returns 点击点赞按钮
   */
  handleChangeGood = () => {
    return message.info('敬请期待')
    const { isGood, goodAmount } = this.state
    const { questionId } = this.props
    let params = {
      subjectId: questionId,
    }
    this.setState(
      {
        isGood: isGood === true ? false : true,
        goodAmount: isGood === true ? goodAmount - 1 : goodAmount + 1,
      },
      () => {
        JDreq({
          method: 'post',
          data: params,
          url: 'admin/question/thump/addOrCancel',
        }).catch((err) => console.log(err))
      }
    )
  }
  /**
   * 点击收藏按钮
   */
  handleChangeCollection = () => {
    return message.info('敬请期待')
    const { isCollection, collectionAmount } = this.state
    const { questionId } = this.props
    let params = {
      subjectId: questionId,
    }
    this.setState(
      {
        isCollection: isCollection === true ? false : true,
        collectionAmount: isCollection === true ? collectionAmount - 1 : collectionAmount + 1,
      },
      () => {
        req({
          method: 'post',
          data: params,
          url: 'admin/question/collect/addOrCancel',
        }).catch((err) => console.log(err))
      }
    )
  }
  render() {
    const { isCollection, isGood, isModal, value, collectionAmount, goodAmount } = this.state
    return (
      <div className="left">
        <div
          className="good"
          size="middle"
          onClick={() => {
            this.handleChangeGood()
          }}
        >
          <LikeTwoTone twoToneColor={isGood == false ? 'grey' : 'blue'} style={{ marginRight: 4 }} />({goodAmount})
        </div>
        <div
          className="collection"
          onClick={() => {
            this.handleChangeCollection()
          }}
        >
          <HeartTwoTone twoToneColor={isCollection == false ? 'grey' : 'blue'} style={{ marginRight: 4 }} />(
          {collectionAmount})
        </div>
        {/* <div className="comment">
                    <MessageTwoTone twoToneColor="blue" style={{ marginRight: 4 }} />
                    评论
                </div> */}
        <div
          className="error-collection"
          onClick={() => {
            console.log('111')
            this.handleModal()
          }}
        >
          <InfoCircleTwoTone twoToneColor="red" style={{ marginRight: 4 }} />
          纠错
        </div>
        <Modal
          className="error-modal"
          title="题目纠错"
          visible={isModal}
          destroyOnClose={true}
          onOk={() => {
            this.handleOk()
          }}
          onCancel={() => {
            this.handleCancel()
          }}
          okText="确认"
          cancelText="取消"
          style={{ fontWeight: 500 }}
        >
          <div>
            <div className="error-collection-title">纠错类型</div>
            <div className="error-collection-type">
              {this.errorType.map((item, index) => {
                return (
                  <div key={index} className="error-collection-type-detail">
                    <Radio.Group
                      onChange={(e) => {
                        this.handleChangeRadio(e)
                      }}
                      defaultValue={1}
                      buttonStyle="solid"
                      value={value}
                    >
                      <Radio.Button value={item.value} className="ll">
                        {item.content}
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                )
              })}
            </div>
            <div className="error-collection-title">纠错详情</div>
            <TextArea
              className="error-input"
              placeholder="请输入..."
              maxLength={256}
              rows={4}
              showCount={true}
              onChange={(e) => {
                this.handleChangeInput(e)
              }}
            />
          </div>
        </Modal>
      </div>
    )
  }
}
