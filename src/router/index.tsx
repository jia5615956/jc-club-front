
import App from '@/App'
import QuestionBank from '@views/question-bank';
import UploadQuestions from '@views/upload-questions';
import BrushQuestions from '@views/brush-questions'
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
        ],
    },
]);

export default router