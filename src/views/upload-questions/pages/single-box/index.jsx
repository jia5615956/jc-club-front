import React, { Component } from 'react'
import BriefQuestions from '../../components/brief-questions'
import JudgeQuestions from '../../components/judge-questions'
import MultipleQuestions from '../../components/multiple-questions'
import SingleQuestions from '../../components/single-questions'
import UploadLeftLayout from '../../components/upload-left-layout'
import { uploadLayout } from '../../constant'

import './index.less'
export default class SingleBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      layoutList: uploadLayout,
      currentIndex: 0
    }
  }
  /**
   * 切换题型
   * @param {*} id
   */
  onChangeQuestionsType = layoutIndex => {
    let { layoutList, currentIndex } = this.state
    if (currentIndex === layoutIndex) {
      return
    }
    let list = layoutList.map((item, index) => {
      let flag = false
      if (layoutIndex === index) {
        flag = true
      }
      return {
        ...item,
        active: flag
      }
    })
    this.setState({
      layoutList: list,
      currentIndex: layoutIndex
    })
  }

  render() {
    const { currentIndex, layoutList } = this.state
    return (
      <div style={{ display: 'flex' }}>
        <UploadLeftLayout layoutList={layoutList} onChange={this.onChangeQuestionsType} />
        <div className='upload-questions-modular'>{this.changeReander(currentIndex)}</div>
      </div>
    )
  }

  changeReander = i => {
    switch (i) {
      case 0:
        return <BriefQuestions questionsType={i + 1} key={`question_${i}`} />
      case 1:
        return <SingleQuestions questionsType={i + 1} key={`question_${i}`} />
      case 2:
        return <MultipleQuestions questionsType={i + 1} key={`question_${i}`} />
      case 3:
        return <JudgeQuestions questionsType={i + 1} key={`question_${i}`} />
    }
  }
}
