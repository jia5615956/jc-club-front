/**
 * 难度筛选
 */
export const filterDifficulty = [
    {
        id: 0,
        title: '全部',
    },
    {
        id: 1,
        title: '初级',
    },
    {
        id: 2,
        title: '中级',
    },
    {
        id: 3,
        title: '高级',
    },
    {
        id: 4,
        title: '资深',
    },
    {
        id: 5,
        title: '专家',
    },
];

export const apiName = {
    /**
     * 获取二级和三级标签
     */
    getCategoryLabelInfo: '/admin/question/category/getCategoryLabelInfo',

    /**
     * 查询大类下分类
     */
    queryCategoryByPrimary: '/category/queryCategoryByPrimary',

    // 根据分类查标签
    queryLabelByCategoryId: '/label/queryLabelByCategoryId'
};

export const imgObject = {
    clickImg:
        '../../views/imgs/clickImg.png',
    ranking1Img:
        'https://img14.360buyimg.com/imagetools/jfs/t1/206730/39/7751/986/617f4fbaE4e23097a/aa94ca31a9c132b2.png',
    ranking2Img:
        'https://img10.360buyimg.com/imagetools/jfs/t1/156125/21/27968/948/617f4fbaEcf1da9a9/722ad0917497697a.png',
    ranking3Img:
        'https://img12.360buyimg.com/imagetools/jfs/t1/213197/17/2682/958/617f4fbbE06c277a9/03ef4c389c52ab8d.png',
    timeline:
        'https://img13.360buyimg.com/imagetools/jfs/t1/210387/35/7564/555/617f4fbbE0cb305c1/728913d21e650794.png',
    backAllImg:
        'https://img11.360buyimg.com/imagetools/jfs/t1/206213/24/13307/2603/617f4fc4E676d448d/622d5287fbf5a919.png',
    dataImg:
        'https://img12.360buyimg.com/imagetools/jfs/t1/207558/34/7606/3672/617f4fc4E1ca685fc/3953a92a6072fba4.png',
    javaImg:
        'https://img14.360buyimg.com/imagetools/jfs/t1/213752/24/2703/4803/617f4fc4E037da291/5f8050641d4d73d2.png',
    npmImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/200551/24/15367/3145/617f4fc4Ea153dc2e/b4bbf2de8807f42d.png',
    parallelComputingImg:
        'https://img14.360buyimg.com/imagetools/jfs/t1/207198/23/7638/3037/617f4fc4E0e20ab9d/40197a6c79c5a33f.png',
    springbootImg:
        'https://img13.360buyimg.com/imagetools/jfs/t1/171775/10/24915/4127/617f4fc4Eeb3d356e/cfbfe8d7c3155047.png',
    sqlImg: 'https://img13.360buyimg.com/imagetools/jfs/t1/208027/11/7347/3074/617f4fc4Ef11e9495/1093903301db1d1d.png',
    systemDesignImg:
        'https://img12.360buyimg.com/imagetools/jfs/t1/206967/24/7622/3629/617f4fc4E60a188b3/cb659847c5d4232a.png',
    algorithmImg:
        'https://img14.360buyimg.com/imagetools/jfs/t1/215758/34/2633/4128/617f4fc4E5dcdab66/727be155858a06a5.png',
    defaultImg:
        'https://img13.360buyimg.com/imagetools/jfs/t1/155957/24/22934/2028/617a147cE8bcbb57a/7a4885e4ae99a895.png',
};
