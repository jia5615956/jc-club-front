
import App from '@/App'
import QuestionBank from '@views/question-bank';
import UploadQuestions from '@views/upload-questions';
import BrushQuestions from '@views/brush-questions'
import Login from '@views/login'
import UserInfo from '@views/user-info'
import {
    createBrowserRouter,
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
                path: "brush-question/:id",
                element: <BrushQuestions />,
            },
            {
                path: "upload-question",
                element: <UploadQuestions />,
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'user-info',
                element: <UserInfo />
            }
        ],
    },
]);

export default router