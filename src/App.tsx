import Header from '@views/header'
import { memo, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './App.less'

const App = () => {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname === '/') {
      const userInfoStorage = localStorage.getItem('userInfo')
      if (!userInfoStorage) {
        return window.location.replace('/login')
      }
      navigate('/question-bank')
    }
  }, [location])
  return (
    <div
      className='app-main'
      style={{ padding: location.pathname === '/login' ? '66px 0 0' : '66px 16px 32px' }}
    >
      <Header />
      <div
        className='content-box'
        style={{ width: location.pathname === '/login' ? '100%' : '1439px' }}
      >
        <Outlet />
      </div>
    </div>
  )
}

export default memo(App)
