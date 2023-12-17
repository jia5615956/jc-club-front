import { Tabs } from 'antd'
import React, { Component } from 'react'
import AnswerAnalysis from './components/answer-analysis'
import AssessmentReport from './components/assessment-report'
import { ModuleName } from './constant'
import './index.less'
const { TabPane } = Tabs

const practiceAnalyticTabList = [
  { tab: '评估报告', key: ModuleName.assessment },
  { tab: '答案解析', key: ModuleName.analysis }
]
export default class PracticeAnalytic extends Component {
  constructor(props) {
    super(props)
    this.state = { currentKey: ModuleName.assessment }
  }

  /**
   * 切换card tab
   * @param {*} key
   */
  onTabChange = key => {
    this.setState({ currentKey: key })
  }

  render() {
    const { currentKey } = this.state
    console.log(this.props)
    // const urlParams = queryParse(this.props.location.search)
    // if (!urlParams.practiceId) {
    //   return null
    // }
    return (
      <div className='practice-analytic-box'>
        <Tabs
          size='default'
          type='card'
          style={{ width: '100%' }}
          activeKey={currentKey}
          defaultActiveKey={currentKey}
          tabBarStyle={{
            height: '41px',
            background: '#fff',
            borderBottom: '1px solid #1890ff',
            margin: 0
          }}
          onChange={key => {
            this.onTabChange(key, 'key')
          }}
        >
          {practiceAnalyticTabList.map(item => {
            return <TabPane tab={item.tab} key={item.key}></TabPane>
          })}
        </Tabs>
        {currentKey == ModuleName.assessment ? (
          <AssessmentReport
            onHandleAnswerAnalysis={key => {
              this.onTabChange(key, 'key')
            }}
            practiceId={1}
          />
        ) : (
          <AnswerAnalysis practiceId={1} />
        )}
      </div>
    )
  }
}
