import './main.less'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import QuestionBank from '@views/question-bank';
import UploadQuestions from '@views/upload-questions';
import BrushQuestions from '@views/brush-questions'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "question-bank",
        element: <QuestionBank />,
      },
      {
        path: "brush-question",
        element: <BrushQuestions />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
