import React, { Component } from 'react'
import './index.less'
// 顶部tab
const MENULIST = [
  {
    key: 'shareIndex',
    title: '刷题',
    route: '/share-index',
  },
  {
    key: 'questionBank',
    title: '练题',
    route: '/question-bank',
  },
  {
    key: 'practiceQuestions',
    title: '鸡圈',
    route: '/practice-questions',
  },
  {
    key: 'interList',
    title: '模拟面试',
    route: '/inter-list',
    // isOpenNewWindow: true,
  },
]

// 顶部tab映射
const mapMenu = {
  '/cms-supplier/share-index': 'shareIndex',
  '/cms-supplier/inter-list': 'interList',
  '/cms-supplier/question-bank': 'questionBank',
  '/cms-supplier/practice-questions': 'practiceQuestions',
}
class TopMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentKey: 'shareIndex',
    }
  }

  componentDidMount() {
    // this.setState({
    //   currentKey: mapMenu[this.props.currentRoute] || '',
    // })
  }

  /**
   * 切换item
   * @param {*} item
   * @returns
   */
  changeMenu = (item) => () => {
    // 打开新窗口
    if (item.isOpenNewWindow) {
      window.open('/cms-supplier' + item.route)
      return
    }
    this.setState(
      {
        currentKey: item.key,
      },
      () => {
        this.props.history.push(item.route)
      }
    )
  }

  render() {
    const { currentKey } = this.state
    return (
      <div className="top-menu-list">
        {MENULIST.map((item, index) => {
          return (
            <div
              className={`top-menu-item ${currentKey === item.key ? 'top-menu-item-active' : ''}`}
              key={item.key + index}
              onClick={this.changeMenu(item)}
            >
              <div className="top-menu-text">{item.title}</div>
              <div className={`top-menu-line ${currentKey === item.key ? 'top-menu-line-active' : ''}`}></div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default TopMenu
