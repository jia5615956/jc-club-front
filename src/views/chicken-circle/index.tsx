import { Input } from 'antd'

const { TextArea } = Input
const Circle = () => {
  return (
    <div className='circle-box'>
      <div className='top-input-box'>
        <TextArea
          showCount
          maxLength={100}
          // onChange={onChange}
          placeholder='disable resize'
          style={{ height: 120, resize: 'none', outline: 'none' }}
        />
      </div>
    </div>
  )
}

export default Circle
