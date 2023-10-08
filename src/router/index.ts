
import QuestionBank from '@views/question-bank';
import UploadQuestions from '@views/upload-questions';

export default [
    {
        path: '/question-bank',
        exact: true,
        component: QuestionBank,
    },
    {
        path: '/upload-questions',
        exact: true,
        component: UploadQuestions,
    },
];
