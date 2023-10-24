import JavaImg from '@views/imgs/javaImg.png'
/**
 * 难度等级
 */
export const gradeObject = {
    1: {
        color: 'rgba(60, 110, 238, 0.7)',
        title: '初级',
    },
    2: {
        color: 'rgba(60, 110, 238, 0.7)',
        title: '中级',
    },
    3: {
        color: 'rgba(60, 110, 238, 0.7)',
        title: '高级',
    },
    4: {
        color: 'rgba(60, 110, 238, 0.7)',
        title: '资深',
    },
    5: {
        color: 'rgba(60, 110, 238, 0.7)',
        title: '专家',
    },
};

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
     * 查询分类
     */
    queryPrimaryCategory: '/category/queryPrimaryCategory',

    /**
     * 查询大类下分类
     */
    queryCategoryByPrimary: '/category/queryCategoryByPrimary',

    // 获取题目列表
    getSubjectPage: '/getSubjectPage'

};

export const imgObject = {
    clickImg:
        'https://img13.360buyimg.com/imagetools/jfs/t1/222669/25/807/6590/617f4f06Eb2094586/64c39ce3769b8a16.png',
    ranking1Img:
        'https://img12.360buyimg.com/imagetools/jfs/t1/110906/3/22471/3750/6214a3bfE392596cf/122c9e4b30948682.png',
    ranking2Img:
        'https://img13.360buyimg.com/imagetools/jfs/t1/211695/8/12987/4360/6214a3bfEd4679fde/4f3c55783bb9119c.png',
    ranking3Img:
        'https://img10.360buyimg.com/imagetools/jfs/t1/175261/19/28428/4566/6214a3bfE476e1b0f/ea59084c55001c06.png',
    rankingImg:
        'https://img11.360buyimg.com/imagetools/jfs/t1/167264/35/27633/603/6214a3bfEf8feff1d/8d833235e6bc468d.png',
    timeline:
        'https://img13.360buyimg.com/imagetools/jfs/t1/210387/35/7564/555/617f4fbbE0cb305c1/728913d21e650794.png',
    backAllImg:
        'https://img11.360buyimg.com/imagetools/jfs/t1/206213/24/13307/2603/617f4fc4E676d448d/622d5287fbf5a919.png',
    dataImg:
        'https://img12.360buyimg.com/imagetools/jfs/t1/207558/34/7606/3672/617f4fc4E1ca685fc/3953a92a6072fba4.png',
    javaImg: JavaImg,
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

/**
 * 模块类型
 */
export const RankingType = {
    /**
     * 贡献榜
     */
    contribution: 1,
    /**
     * 排行榜
     */
    practice: 2,
};

/**
 * 模块名称
 */
export const RankingTypeText = {
    [RankingType.contribution]: '贡献榜',
    [RankingType.practice]: '综合练习榜',
};

/**
 * 对应按钮名字
 */
export const RankingTypeBtnText = {
    [RankingType.contribution]: '去出题',
    [RankingType.practice]: '去练习',
};
