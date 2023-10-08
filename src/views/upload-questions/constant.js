/**
 * API名称
 */
export const apiName = {
    /**
     * 获取一级/二级分类
     */
    getInterviewCategory: '/admin/question/category/getCategory',

    /**
     * 获取三级分类标签
     */
    getRecommendLabel: '/admin/question/label/getRecommendLabel',
    /**
     * 新增题目
     */
    addInterviewSubject: '/admin/question/subject/add',
    /**
     * 新增重复题目
     */
    addRepeatInterviewSubject: '/admin/question/subject/addRepeatSubject',
};

/**
 * 模块类型
 */
export const ModuleType = {
    default: 'default',
    second: 'second',
    third: 'third',
};

/**
 * 导入职级对应的星
 */
export const starList = [
    {
        categoryId: 1,
        categoryName: 'T4',
        active: true,
    },
    {
        categoryId: 2,
        categoryName: 'T5',
    },
    {
        categoryId: 3,
        categoryName: 'T6',
    },
    {
        categoryId: 4,
        categoryName: 'T7',
    },
    {
        categoryId: 5,
        categoryName: 'T8',
    },
];

/**
 * 模块类型
 */
export const uploadLayout = [
    {
        id: 1,
        title: '问答题',
        active: true,
    },
    {
        id: 2,
        title: '单选题',
        active: false,
    },
    {
        id: 3,
        title: '多选题',
        active: false,
    },
    {
        id: 4,
        title: '判断题',
        active: false,
    },
];

/**
 * 数组索引对应字母
 */
export const optionLetter = {
    0: {
        label: 'A',
        value: 1,
    },
    1: {
        label: 'B',
        value: 2,
    },
    2: {
        label: 'C',
        value: 3,
    },
    3: {
        label: 'D',
        value: 4,
    },
    4: {
        label: 'E',
        value: 5,
    },
    5: {
        label: 'F',
        value: 6,
    },
    6: {
        label: 'G',
        value: 7,
    },
};

/**
 * 字母id对应字母
 */
export const letterList = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'E',
    6: 'F',
    7: 'G',
};

/**
 * 正确/错误
 */
export const judgeList = {
    0: '错误',
    1: '正确',
};
