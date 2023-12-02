import { IdcardOutlined, LikeTwoTone, MailOutlined, StarTwoTone } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { Component } from 'react'
// import JDreq from '@common/JDreq'
import PubSub from 'pubsub-js'
// import headLog from './headLog.png'
import CollectionBag from './components/collection-bag'
import GoodBag from './components/good-bag'
import './index.less'

export default class PersonalCenter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentKeyMap: 0, //选中的menu
      userName: '', //姓名
      intervieweEamil: '', //邮箱
      headImg: '', //头像
      department: '', //部门
      practiceAmount: 0, //练题数
      inputAmount: 0, //录题数
      goodAmount: 0, //点赞数
      collectionAmount: 0, //收藏数
      subMenuList: []
    }
  }
  personList = {
    // 0: '刷题',
    0: '收藏',
    1: '点赞'
  }
  componentDidMount() {
    // JDreq({
    //   method: 'post',
    //   url: 'admin/person/home/getPersonInfo'
    // }).then(res => {
    //   this.setState(
    //     {
    //       userName: res.data?.name ?? '',
    //       intervieweEamil: res.data?.email ?? '',
    //       headImg: res.data?.headImg ?? '',
    //       department: res.data?.departmentName ?? '',
    //       goodAmount: res.data?.thumpCount ?? 0,
    //       collectionAmount: res.data?.collectCount ?? 0,
    //       practiceAmount: res.data?.practiceCount ?? 0,
    //       inputAmount: res.data?.subjectCount ?? 0
    //     },
    //     () => {
    //       window.localStorage.setItem('interviewName', res.data?.name ?? 'XXX')
    //       window.localStorage.setItem('interviewEamil', res.data?.email ?? 'XXX')
    //     }
    //   )
    // })
    PubSub.subscribe('handleToRender', () => {
      this.setState({})
    })
  }
  /**
   * 切换菜单
   * @param {*} e
   */
  handleClick = e => {
    console.log('--------', e)
    //截取_后的字符
    let index = e.keyPath[0].lastIndexOf('_')
    let index2 = e.keyPath[0].substring(index + 1, e.keyPath[0].length)
    //
    console.log('index2>>>>', index2)
    this.setState({
      currentKeyMap: Number(index2)
    })
  }
  render() {
    let {
      headImg,
      userName,
      intervieweEamil,
      department,
      goodAmount,
      collectionAmount,
      practiceAmount,
      inputAmount
    } = this.state
    const { currentKeyMap } = this.state
    return (
      <div className='personal-center-box'>
        <div className='personal-center-introduction'>
          <div className='personal-center-introduction-detail'>
            <div className='personal-center-introduction-detail-headImg'>
              <img src={headImg} style={{ width: 60, height: 60, borderRadius: '50%' }} />
            </div>
            <div className='personal-center-introduction-detail-text'>
              <div className='personal-center-introduction-detail-name'>{userName}</div>
              <div className='personal-center-introduction-detail-information'>
                <span className='personal-center-introduction-detail-information-content'>
                  <IdcardOutlined style={{ color: 'blue', marginRight: '3px' }} />
                  {/* 部门：{department} */}
                </span>
                <span className='personal-center-introduction-detail-information-content'>
                  <MailOutlined style={{ color: 'blue', marginRight: '3px' }} />
                  {/* 邮箱：{intervieweEamil} */}
                </span>
              </div>
            </div>
          </div>
          <div className='personal-center-introduction-result'>
            <div className='personal-center-introduction-result-item'>
              <div className='personal-center-introduction-result-item-number'>
                {practiceAmount}
              </div>
              <div>练题</div>
            </div>
            <div className='personal-center-introduction-result-item'>
              <div className='personal-center-introduction-result-item-number'>{inputAmount}</div>
              <div>录题</div>
            </div>
            <div className='personal-center-introduction-result-item'>
              <div className='personal-center-introduction-result-item-number'>{goodAmount}</div>
              <div>点赞</div>
            </div>
            <div className='personal-center-introduction-result-item'>
              <div className='personal-center-introduction-result-item-number'>
                {collectionAmount}
              </div>
              <div>收藏</div>
            </div>
          </div>
        </div>
        <div className='personal-center-content'>
          <div className='personal-center-content-left'>
            <Menu
              mode='inline'
              onClick={this.handleClick}
              style={{ width: 256 }}
              defaultSelectedKeys={['personList_0']}
            >
              {/* <Menu.Item key={`personList_0`}>
                <MailOutlined style={{ color: 'rgb(171,214,97)' }} />
                <span>{this.personList[0]}</span>
              </Menu.Item> */}
              <Menu.Item key={`personList_0`}>
                <StarTwoTone twoToneColor='rgb(252,132,67)' />
                <span>{this.personList[0]}</span>
              </Menu.Item>
              <Menu.Item key={`personList_1`}>
                <LikeTwoTone twoToneColor='#99bbff' />
                <span>{this.personList[1]}</span>
              </Menu.Item>
            </Menu>
          </div>
          <div className='personal-center-content-right'>
            {/* {currentKeyMap === 0 && <BrushQuestion />} */}
            {currentKeyMap === 0 && <CollectionBag />}
            {currentKeyMap === 1 && <GoodBag />}
          </div>
        </div>
      </div>
    )
  }
}
