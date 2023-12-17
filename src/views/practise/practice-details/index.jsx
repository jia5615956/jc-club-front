import Timer from '@components/timerCom/FlipClock'
import { getCurrentTime, splicingQuery } from '@utils'
import req from '@utils/request'
import { Checkbox, Modal, Radio } from 'antd'
import _ from 'lodash'
import React, { Component } from 'react'
import PracticeAction from './components/practice-action'
import PracticeAdvance from './components/practice-advance'
import PracticePaging from './components/practice-paging'
import { ApiName, ImgObj, quetionsType } from './constant'
import './index.less'

export default class PracticeDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMark: 0, // 是否标记
      isCollection: 0,
      currentActive: '',
      subjectList: [], // 总题目列表
      subjectObject: {}, //题目
      currentIndex: 0,
      isShowAdvanOverceBox: false,
      isShowStopBox: false
    }
  }

  timerRef = React.createRef()
  subjectTitle = ''
  singleLength = 0
  multipleLength = 0
  judgeLength = 0
  setId = ''

  componentDidMount() {
    // const urlParams = queryParse(this.props.location.search)
    // this.setId = urlParams.setId
    this.getSubjectList()
    this.timerRef.current.run()
    // window.addEventListener('beforeunload', this.listener);
  }

  componentWillUnmount() {
    // window.addEventListener('beforeunload', this.listener);
  }

  //监听屏幕刷新，关闭默认事件，界面没有动，不会拦截
  listener = ev => {
    ev.preventDefault()
    ev.returnValue = ''
  }

  /**
   * 获得题目列表
   */
  getSubjectList = () => {
    let params = {
      setId: this.setId
    }
    this.subjectTitle = '热门题目练习'
    this.singleLength = 1
    this.multipleLength = 1
    this.judgeLength = 1
    const list = [
      {
        subjectType: 1,
        subjectId: 1
      },
      {
        subjectType: 2,
        subjectId: 2
      },
      {
        subjectType: 3,
        subjectId: 3
      }
    ]
    this.setState({
      subjectList: [...list]
    })
    _.set(list, [0, 'active'], true)
    this.getPracticeSubject(list[0], list, 0, [])
    // req({
    //   method: 'post',
    //   data: params,
    //   url: ApiName.getSubjects
    // })
    //   .then(res => {
    //     if (res.data && res.data?.subjectList?.length > 0) {
    //       let list = res.data.subjectList
    //       this.singleLength =
    //         list?.length > 0 ? list.filter(item => item.subjectType === 1).length : 0
    //       this.multipleLength =
    //         list?.length > 0 ? list.filter(item => item.subjectType === 2).length : 0
    //       this.judgeLength =
    //         list?.length > 0 ? list.filter(item => item.subjectType === 3).length : 0
    //       this.subjectTitle = res.data?.title || '' // 总题目列表
    //       this.getPracticeSubject(list[0], list, 0, [])
    //     }
    //   })
    //   .catch(err => console.log(err))
  }

  /**
   * 获得题目详情
   * @param {*} item 选择的项
   * @param {*} subjectList 题目列表
   * @param {*} index 选择的下标
   * @param {*} activeList 选中的列表
   * @param {*} isMark 是否被标记
   */
  getPracticeSubject = (item, subjectList, index, activeList, isMark = 0) => {
    let params = {
      subjectId: item.subjectId,
      subjectType: item.subjectType
    }

    const optionList =
      item.subjectType === 3
        ? [
            {
              optionContent: '正确',
              optionType: 1
            },
            {
              optionContent: '错误',
              optionType: 0
            }
          ]
        : [
            {
              optionType: 1,
              optionContent: '<p>题目答案1</p>'
            },
            {
              optionType: 2,
              optionContent: '<p>题目答案2</p>'
            },
            {
              optionType: 3,
              optionContent: '<p>题目答案3</p>'
            }
          ]

    return this.setState({
      currentIndex: index,
      currentActive: item.subjectType === 2 ? activeList : activeList[0],
      subjectObject: {
        subjectName: '题干内容',
        subjectType: item.subjectType,
        optionList,
        // subjectList: subjectList,
        // currentIndex: index,
        // currentActive: item.sub??jectType === 2 ? activeList : activeList[0],
        isMark: isMark
      }
    })
    req({
      method: 'post',
      data: params,
      url: ApiName.getPracticeSubject
    })
      .then(res => {
        if (res.data) {
          let subjectObject = res.data
          if (item.subjectType === 3) {
            subjectObject.optionList = [
              {
                optionContent: '正确',
                optionType: 1
              },
              {
                optionContent: '错误',
                optionType: 0
              }
            ]
          }
          this.setState({
            subjectObject: res.data,
            subjectList: subjectList,
            currentIndex: index,
            currentActive: item.subjectType === 2 ? activeList : activeList[0],
            isMark: isMark
          })
        }
      })
      .catch(err => console.log(err))
  }

  /**
   * 选择单选
   * @param {*} e
   * @returns
   */
  onChangeRadio = e => () => {
    let { currentIndex, subjectList } = this.state
    _.set(subjectList, [currentIndex, 'activeList'], [e])
    this.setState({
      currentActive: e,
      subjectList
    })
  }

  /**
   * 选择多选
   * @param {*} e
   * @returns
   */
  onChangeCheck = e => {
    let { currentIndex, subjectList } = this.state
    _.set(subjectList, [currentIndex, 'activeList'], e)
    this.setState({
      currentActive: e,
      subjectList
    })
  }

  /**
   * 暂停计时
   */
  onChangeStop = () => {
    this.setState({ isShowStopBox: true })
    this.timerRef.current.stop()
  }

  /**
   * 标记一下
   */
  onChangeMark = () => {
    let { currentIndex, subjectList, subjectObject } = this.state
    let flag = 1
    if (subjectList[currentIndex]?.isMark) {
      flag = 0
    }
    _.set(subjectList, [currentIndex, 'isMark'], flag)
    this.setState({
      subjectList,
      isMark: flag,
      subjectObject
    })
  }

  /**
   * 选择答题卡
   * @param {*} index
   * @param {*} item
   * @returns
   */
  onChangePaging = index => {
    let { currentIndex } = this.state
    // 如果点击当前题目，直接return
    if (currentIndex === index) {
      return
    }
    this.changeData(index)
  }

  /**
   * 交卷
   */
  onChangeOver = () => {
    const { subjectList } = this.state
    let answerDetails = []
    subjectList.forEach(item => {
      let obj = {
        subjectId: item.subjectId,
        subjectType: item.subjectType,
        answerContents: []
      }
      if (item?.activeList && item?.activeList?.length > 0) {
        obj.answerContents = item.activeList
      }
      answerDetails.push(obj)
    })
    let params = {
      setId: this.setId,
      timeUse: this.timerRef.current.getUseTime(),
      submitTime: getCurrentTime(),
      answerDetails: answerDetails
    }
    req({
      method: 'post',
      data: params,
      url: ApiName.submitSubject
    })
      .then(res => {
        if (res.data && res.data.practiceId) {
          //关闭定时器
          this.timerRef.current.end()
          this.props.history.replace(
            splicingQuery('/practice-analytic', {
              practiceId: res.data.practiceId
            })
          )
        }
      })
      .catch(err => console.log(err))
  }

  /**
   * 提前交卷弹框-直接交卷
   */
  onHandleSubmitModal = () => {
    this.onChangeOver()
  }

  /**
   * 提前交卷弹框-继续做题
   */
  onHandleCancelModal = () => {
    this.setState({ isShowAdvanOverceBox: false })
  }

  /**
   * 提前交卷
   */
  onChangeAdvanceOver = () => {
    this.setState({
      isShowAdvanOverceBox: true
    })
  }

  /**
   * 下一题
   * @returns
   */
  onChangeNext = () => {
    let { currentIndex } = this.state
    currentIndex += 1
    this.changeData(currentIndex)
  }

  /**
   * 改变数据
   * @param {*} index 当前点击下标
   */
  changeData = index => {
    let { subjectList } = this.state
    let subObj = subjectList[index]
    let activeList = [] // 多选 选中的答案项
    let isMark = 0 // 是否被标记

    // 将其他item设置为未选中
    subjectList.forEach(item => {
      item.active = false
    })
    _.set(subjectList, [index, 'active'], true)

    // if当前选择的有选答案，则直接显示出来
    if (subObj?.activeList?.length > 0) {
      activeList = subObj?.activeList
    }

    // if当前已被标记，则直接显示出来
    if (subObj?.isMark == 1) {
      isMark = 1
    }

    this.getPracticeSubject(subObj, subjectList, index, activeList, isMark)
  }

  /**
   * 暂停弹框-继续做题
   */
  onChangeSubmitModal = () => {
    this.timerRef.current.run()
    this.setState({ isShowStopBox: false })
  }

  /**
   * 暂停弹框-再次再做
   */
  onChangeCancelModal = () => {
    this.props.history.goBack()
  }

  render() {
    const {
      isMark,
      isCollection,
      currentIndex,
      currentActive,
      subjectList,
      subjectObject,
      isShowAdvanOverceBox,
      isShowStopBox
    } = this.state
    const isLast = currentIndex === subjectList?.length - 1
    // 获得已答的题目个数
    const noAnswerNum =
      subjectList.filter(item => item.activeList && item.activeList.length > 0).length || 0
    return (
      <div className='details-container'>
        <div className='container-box'>
          <div className='container-box-title'>
            <div className='title-title'>{this.subjectTitle}</div>
            <div className='title-time'>
              <div className='title-timer-img' onClick={this.onChangeStop}>
                <img src={isShowStopBox ? ImgObj.stop : ImgObj.run} className='title-timer-icon' />
              </div>
              <Timer ref={this.timerRef} />
            </div>
          </div>
          <div className='details-question-number'>
            <div className='question-number-number'>
              {currentIndex + 1}/{subjectList?.length}
            </div>
            <img src={ImgObj.questionMark} className='question-number-mark' />
            <div className='question-number-type'>[{quetionsType[subjectObject.subjectType]}]</div>
          </div>
          <div className='practice-main'>
            <div className='practice-text'>
              <div className='practice-question'>{subjectObject.subjectName}</div>
              {subjectObject.subjectType === 2 ? (
                <Checkbox.Group
                  className='practice-answer-list'
                  onChange={this.onChangeCheck}
                  value={currentActive || []}
                  key={currentIndex}
                >
                  {subjectObject?.optionList?.length > 0 &&
                    subjectObject?.optionList.map(item => {
                      return (
                        <Checkbox
                          key={item.optionType}
                          className={`practice-answer-item ${
                            currentActive.includes(item.optionType)
                              ? 'practice-answer-item-active'
                              : ''
                          }`}
                          value={item.optionType}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.optionContent
                            }}
                          ></div>
                        </Checkbox>
                      )
                    })}
                </Checkbox.Group>
              ) : (
                <Radio.Group
                  className='practice-answer-list'
                  value={currentActive}
                  key={currentIndex}
                >
                  {subjectObject?.optionList?.length > 0 &&
                    subjectObject?.optionList.map(item => {
                      return (
                        <Radio
                          key={item.optionType}
                          onClick={this.onChangeRadio(item.optionType)}
                          className={`practice-answer-item ${
                            currentActive === item.optionType ? 'practice-answer-item-active' : ''
                          }`}
                          value={item.optionType}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.optionContent
                            }}
                          ></div>
                        </Radio>
                      )
                    })}
                </Radio.Group>
              )}
            </div>
            <PracticeAction
              isLast={isLast}
              isMark={isMark}
              onHandleMark={this.onChangeMark}
              onHandleOver={this.onChangeOver}
              onHandleAdvanceOver={this.onChangeAdvanceOver}
              onHandleNext={this.onChangeNext}
            />
          </div>
          <PracticePaging
            subjectList={subjectList}
            onHandlePaging={this.onChangePaging}
            singleLength={this.singleLength}
            multipleLength={this.multipleLength}
            judgeLength={this.judgeLength}
          />
        </div>
        <PracticeAdvance
          isShowModalBox={isShowAdvanOverceBox}
          onHandleSubmitModal={this.onHandleSubmitModal}
          onHandleCancelModal={this.onHandleCancelModal}
        />
        <Modal
          closable={false}
          maskClosable={false}
          style={{ padding: 20 }}
          open={isShowStopBox}
          onOk={this.onChangeSubmitModal}
          onCancel={this.onChangeCancelModal}
          okText='继续做题'
          cancelText='下次再做'
        >
          <div style={{ padding: 40 }}>
            <img src={ImgObj.info} className='details-container-box-info' />
            休息一下吧！共{subjectList?.length}道题，还剩
            {subjectList?.length - noAnswerNum}道没做哦～
          </div>
        </Modal>
      </div>
    )
  }
}
