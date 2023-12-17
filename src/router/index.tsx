import App from '@/App'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'question-bank',
        Component: lazy(() => import('@views/question-bank'))
      },
      {
        path: 'brush-question/:id',
        // element: <BrushQuestions />
        Component: lazy(() => import('@views/brush-questions'))
      },
      {
        path: 'upload-question',
        // element: <UploadQuestions />
        Component: lazy(() => import('@views/upload-questions'))
      },
      {
        path: 'login',
        // element: <Login />
        Component: lazy(() => import('@views/login'))
      },
      {
        path: 'user-info',
        // element: <UserInfo />
        Component: lazy(() => import('@views/user-info'))
      },
      {
        path: 'search-detail',
        Component: lazy(() => import('@views/search-details'))
      },
      {
        path: 'personal-center/:tab',
        Component: lazy(() => import('@views/personal-center'))
      },
      {
        path: 'practice-questions',
        Component: lazy(() => import('@views/practise/practice-questions'))
      },
      {
        path: 'practice-detail/:id',
        Component: lazy(() => import('@views/practise/practice-details/index1.jsx'))
      },
      {
        path: 'practice-analytic/:id',
        Component: lazy(() => import('@views/practise/practice-analytic'))
      }
    ]
  }
])

export default router
