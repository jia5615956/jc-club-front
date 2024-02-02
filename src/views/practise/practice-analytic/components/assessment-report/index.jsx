import AnalysisAtlas from '@components/analysis-atlas'
import { splicingQuery } from '@utils'
import req from '@utils/request'
import { Button, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiName, ModuleName } from '../../constant'
import RecommendList from '../recommend-list'

import './index.less'

const AssessmentReport = props => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('测试试卷')
  const [correctSubject, setCorrectSubject] = useState('3')
  const [spinning, setSpinning] = useState(false)
  const [recommendSetList, setRecommendSetList] = useState([])
  const [skill, setSkill] = useState([
    {
      name: '名称1',
      star: 50
    },
    {
      name: '名称2',
      star: 70
    },
    {
      name: '名称3',
      star: 90
    },
    {
      name: '名称4',
      star: 80
    }
  ])

  useEffect(() => {}, [])

  /**
   * 答案解析-获得评估报告
   */
  const getReport = async () => {
    const { practiceId } = this.props
    let params = {
      practiceId: practiceId
    }
    await req({
      method: 'post',
      data: params,
      url: ApiName.getReport
    })
      .then(res => {
        if (res?.data) {
          let list = res.data.skill || []
          let len = res.data.skill.length
          if (len === 1) {
            let l1 = [
              { name: res.data.skill[0].name + ' ', star: res.data.skill[0].star },
              {
                name: ' ' + res.data.skill[0].name + ' ',
                star: res.data.skill[0].star
              }
            ]
            list = list.concat(l1)
          } else if (len === 2) {
            let l1 = [{ name: res.data.skill[1].name + ' ', star: res.data.skill[1].star }]
            list = list.concat(l1)
          }
          this.setState({
            isLoading: false,
            title: res.data.title,
            correctSubject: res.data.correctSubject,
            recommendSetList: res.data.recommendSetList,
            skill: list
          })
        }
      })
      .catch(err => console.log(err))
  }

  /**
   * 练习其他技能
   */
  const onChangePracticeOther = () => {
    // this.props.history.push('/practice-questions')
    navigate('/practice-questions')
  }

  /**
   * 查看答案解析
   */
  const onChangeAnswerAnalysis = () => {
    props.onHandleAnswerAnalysis && props.onHandleAnswerAnalysis(ModuleName.analysis)
  }

  /**
   * 点击推荐套题
   * @param {*} setId
   * @returns
   */
  const onChangeSetId = setId => {
    this.props.history.push(
      splicingQuery('/practice-details', {
        setId
      })
    )
  }

  return (
    <Spin spinning={spinning}>
      <div className='assessment-report-box'>
        <div className='assessment-report-top'>
          <div className='assessment-report-main'>
            {/* <div className="assessment-report-defen">
                          <img src={ImgObj.defen} className="assessment-report-defen-icon" />
                          得分：12
                      </div> */}
            <div className='assessment-report-item'>试卷：{title}</div>
            <div className='assessment-report-item'>正确题数：{correctSubject}</div>
            <Button
              className='assessment-report-submit'
              type='primary'
              onClick={onChangePracticeOther}
            >
              练习其他技能
            </Button>
          </div>
          <div className='assessment-report-tupu'>
            <div className='assessment-report-tupu-tip'>你的技能图谱</div>
            <div className='assessment-report-tupu-content'>
              <AnalysisAtlas
                aliasStr='正确率'
                atlasList={skill || []}
                atlasMin={-25}
                atlasWidth={200}
                atlasHeight={200}
              />
            </div>
          </div>
        </div>
        {recommendSetList?.length > 0 && (
          <RecommendList recommendSetList={recommendSetList} onHandleSetId={onChangeSetId} />
        )}
        <div className='assessment-report-answer-analysis'>
          <Button
            className='assessment-report-answer-btn'
            type='primary'
            onClick={onChangeAnswerAnalysis}
          >
            查看答案解析
          </Button>
        </div>
      </div>
    </Spin>
  )
}

// class AssessmentReport extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       correctSubject: '3',
//       recommendSetList: [],
//       skill: [
//         {
//           name: '名称1',
//           star: 50
//         },
//         {
//           name: '名称2',
//           star: 70
//         },
//         {
//           name: '名称3',
//           star: 90
//         },
//         {
//           name: '名称4',
//           star: 80
//         }
//       ],
//       title: '测试试卷',
//       isLoading: false
//     }
//   }

//   componentDidMount() {
//     this.getReport()
//   }

//   /**
//    * 答案解析-获得评估报告
//    */
//   getReport = async () => {
//     const { practiceId } = this.props
//     let params = {
//       practiceId: practiceId
//     }
//     await req({
//       method: 'post',
//       data: params,
//       url: ApiName.getReport
//     })
//       .then(res => {
//         if (res?.data) {
//           let list = res.data.skill || []
//           let len = res.data.skill.length
//           if (len === 1) {
//             let l1 = [
//               { name: res.data.skill[0].name + ' ', star: res.data.skill[0].star },
//               {
//                 name: ' ' + res.data.skill[0].name + ' ',
//                 star: res.data.skill[0].star
//               }
//             ]
//             list = list.concat(l1)
//           } else if (len === 2) {
//             let l1 = [{ name: res.data.skill[1].name + ' ', star: res.data.skill[1].star }]
//             list = list.concat(l1)
//           }
//           this.setState({
//             isLoading: false,
//             title: res.data.title,
//             correctSubject: res.data.correctSubject,
//             recommendSetList: res.data.recommendSetList,
//             skill: list
//           })
//         }
//       })
//       .catch(err => console.log(err))
//   }

//   /**
//    * 练习其他技能
//    */
//   onChangePracticeOther = () => {
//     this.props.history.push('/practice-questions')
//   }

//   /**
//    * 查看答案解析
//    */
//   onChangeAnswerAnalysis = () => {
//     this.props.onHandleAnswerAnalysis && this.props.onHandleAnswerAnalysis(ModuleName.analysis)
//   }

//   /**
//    * 点击推荐套题
//    * @param {*} setId
//    * @returns
//    */
//   onChangeSetId = setId => {
//     this.props.history.push(
//       splicingQuery('/practice-details', {
//         setId
//       })
//     )
//   }

//   render() {
//     const { correctSubject, recommendSetList, skill, title, isLoading } = this.state
//     return (
//       <Spin spinning={isLoading}>
//         <div className='assessment-report-box'>
//           <div className='assessment-report-top'>
//             <div className='assessment-report-main'>
//               {/* <div className="assessment-report-defen">
//                             <img src={ImgObj.defen} className="assessment-report-defen-icon" />
//                             得分：12
//                         </div> */}
//               <div className='assessment-report-item'>试卷：{title}</div>
//               <div className='assessment-report-item'>正确题数：{correctSubject}</div>
//               <Button
//                 className='assessment-report-submit'
//                 type='primary'
//                 onClick={this.onChangePracticeOther}
//               >
//                 练习其他技能
//               </Button>
//             </div>
//             <div className='assessment-report-tupu'>
//               <div className='assessment-report-tupu-tip'>你的技能图谱</div>
//               <div className='assessment-report-tupu-content'>
//                 <AnalysisAtlas
//                   aliasStr='正确率'
//                   atlasList={skill || []}
//                   atlasMin={-25}
//                   atlasWidth={200}
//                   atlasHeight={200}
//                 />
//               </div>
//             </div>
//           </div>
//           {recommendSetList?.length > 0 && (
//             <RecommendList recommendSetList={recommendSetList} onHandleSetId={this.onChangeSetId} />
//           )}
//           <div className='assessment-report-answer-analysis'>
//             <Button
//               className='assessment-report-answer-btn'
//               type='primary'
//               onClick={this.onChangeAnswerAnalysis}
//             >
//               查看答案解析
//             </Button>
//           </div>
//         </div>
//       </Spin>
//     )
//   }
// }

export default AssessmentReport
