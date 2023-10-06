import './App.css'
import { BrowserRouter as Router, Route, Outlet, Routes } from 'react-router-dom'

import Home from './views/home'
import UploadExam from './views/upload-exam'

function App() {

  return (
    <div className='App'>
      <Router >
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/home' Component={Home}></Route>
          <Route path='/upload-exam' Component={UploadExam}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
