const host = import.meta.env.VITE_IMG_HOST
/**
 * 难度筛选
 */
export const filterDifficulty = [
  {
    id: 0,
    title: '全部'
  },
  {
    id: 1,
    title: '初级'
  },
  {
    id: 2,
    title: '中级'
  },
  {
    id: 3,
    title: '高级'
  },
  {
    id: 4,
    title: '资深'
  },
  {
    id: 5,
    title: '专家'
  }
]

/**
 * 难度等级
 */
export const gradeObject = {
  1: {
    color: 'rgba(60, 110, 238, 0.5)',
    title: '初级'
  },
  2: {
    color: 'rgba(60, 110, 238, 0.6)',
    title: '中级'
  },
  3: {
    color: 'rgba(60, 110, 238, 0.7)',
    title: '高级'
  },
  4: {
    color: 'rgba(60, 110, 238, 0.8)',
    title: '资深'
  },
  5: {
    color: 'rgba(60, 110, 238, 0.9)',
    title: '专家'
  }
}

export const imgObject = {
  clickImg:
    host +
    '/jichi/icon/%E7%83%AD%E9%97%A8.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20231102%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231102T153146Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=e6b8cdb3231b1c3d7114212cb9278ecc17cf6d4ec0f759ea0200e04156d4c8b7'
}
