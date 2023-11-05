import { useEffect, memo } from 'react';
import './App.less';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import Header from '@views/header'

const App = () => {
  const location = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/question-bank')
    }
  }, [location])
  return (
    <div className="app-main">
      <Header />
      <div className='content-box'>
        <Outlet />
      </div>
    </div>
  )
}

export default memo(App)
