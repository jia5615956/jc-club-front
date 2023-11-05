import { message } from 'antd';
import React, { useState, memo, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './index.less'
// 顶部tab
const MENULIST = [
  {
    key: 'questionBank',
    title: '刷题',
    route: '/question-bank',
  },
  {
    key: 'prictiseQuestion',
    title: '练题',
    route: '/brush-question',
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
  },
]

// 顶部tab映射
const mapMenu = {
  '/question-bank': 'questionBank',
}

const TopMenu = () => {

  const [currentKey, setCurrentKey] = useState('questionBank')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const cur = MENULIST.filter(t => t.route === location.pathname)
    if (cur.length) {
      setCurrentKey(cur[0].key)
    } else {
      setCurrentKey('')
    }
  }, [location.pathname]);


  /**
   * 切换item
   * @param {*} item
   * @returns
   */
  const changeMenu = (item) => () => {
    if (item.key === "questionBank") {
      if (location.pathname === '/question-bank') return
      navigate('/question-bank')
      setCurrentKey(item.key)
    } else {
      return message.info("敬请期待")
    }
  }

  return (
    <div className="top-menu-list">
      {MENULIST.map((item, index) => {
        return (
          <div
            className={`top-menu-item ${currentKey === item.key ? 'top-menu-item-active' : ''}`}
            key={item.key + index}
            onClick={changeMenu(item)}
          >
            <div className="top-menu-text">{item.title}</div>
            <div className={`top-menu-line ${currentKey === item.key ? 'top-menu-line-active' : ''}`}></div>
          </div>
        )
      })}
    </div>
  )
}

export default memo(TopMenu)
