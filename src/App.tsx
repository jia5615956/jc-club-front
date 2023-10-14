import React, { Component, useEffect } from 'react';
import './App.less';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import PubSub from 'pubsub-js';
import { Input } from 'antd';
import Logo from '@views/imgs/logo.jpg'
import Head from '@views/imgs/head.jpg'
import TopMenu from '@components/top-menu'

const { Search } = Input;
class NavTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      intervieweEamil: '',
      headImg: '',
      isShowTimer: false,
    };
  }

  timerRef = React.createRef();

  componentDidMount() {

    PubSub.subscribe('handleToRender', () => {
      this.setState({});
    });
  }

  render() {
    let { headImg, isShowTimer } = this.state;
    const { pathname } = window.location;
    return (
      <div className="head-navigator-box">
        <div className="head-navigator">
          <div className="head-navigator-left">
            <div
              className="head-navigator-logo"
              onClick={() =>
                (window.location.href = '/question-bank')
              }>
              <img src={Logo} style={{ height: 50 }} />
            </div>
            <TopMenu />
          </div>
          <div className="head-navigator-user-box">
            <div className="time-box"></div>
            {'/question-bank' == pathname && (
              <div className="head-navigator-input-box">
                <Search
                  placeholder="请输入感兴趣的内容～"
                  onSearch={(value) => console.log(value)}
                  style={{ width: 300, borderRadius: '10px' }}
                />
              </div>
            )}
            <div className="head-navigator-bell">
              {/* <Icon type="bell" /> */}
            </div>
            <div className="head-navigator-user-img">
              <img
                src={Head}
                style={{ width: 36, height: 36 }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
      <NavTop />
      <Outlet />
    </div>
  )
}

export default App
