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
  getSubjectPage: '/getSubjectPage',

  /**
   * 练题排行榜
   */
  getPracticeRankList: '/getContributeList'
}

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
  practice: 2
}

/**
 * 模块名称
 */
export const RankingTypeText = {
  [RankingType.contribution]: '综合练习榜',
  [RankingType.practice]: '出题贡献榜'
}

/**
 * 对应按钮名字
 */
export const RankingTypeBtnText = {
  [RankingType.contribution]: '去练习',
  [RankingType.practice]: '去出题'
}
