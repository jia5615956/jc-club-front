import React from 'react'
import './index.less'
export default function EmptyBox() {
  return (
    <div className='empty-box'>
      <img
        src='https://img11.360buyimg.com/imagetools/jfs/t1/161028/16/25609/6746/61a08d83E06659dfa/e6418acdab948134.png'
        className='empty-inco'
      />
      <span className='empty-text'>这里什么也没有哦～</span>
    </div>
  )
}
