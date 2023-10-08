import React, { Component } from 'react';
import './App.less';
import { Routes, Route, Link } from "react-router-dom"
import req from '@utils/request.ts';
import PubSub from 'pubsub-js';
import { Input } from 'antd';
import QuestionBank from './views/question-bank';
import UploadQuestions from './views/upload-questions';
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
    // req({
    //   method: 'post',
    //   url: 'admin/interview/peo/getDirectorInfo',
    // }).then((re) => {
    //   this.setState(
    //     {
    //       userName: re.data?.name ?? '',
    //       intervieweEamil: re.data?.email ?? '',
    //       headImg: '',
    //     },
    //     () => {
    //       window.localStorage.setItem('interviewerName', re.data?.name ?? 'XXX');
    //       window.localStorage.setItem('intervieweEamil', re.data?.email ?? 'XXX');
    //     }
    //   );
    // });
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
class RouteExample extends Component {
  render() {
    return (
      <>
        <NavTop />
        <Routes>
          <Route path="/question-bank" element={<QuestionBank />}></Route>
          <Route path="/upload-questions" element={<UploadQuestions />}></Route>
        </Routes>
      </>

    );
  }
}
export default class App extends Component {
  render() {
    return (
      <div className="app-main">
        <RouteExample />
      </div>
    );
  }
}
