import req from '@utils/request'
import { Card, Checkbox, Descriptions } from 'antd'
import { useEffect, useState } from 'react'

const apiName = {
  /**
   * 查询大类
   */
  queryPrimaryCategory: '/category/queryPrimaryCategory',

  // 查询分类及标签
  queryCategoryAndLabel: '/category/queryCategoryAndLabel'
}

const PracticeHome = () => {
  const [primaryList, setPrimaryList] = useState<Record<string, any>[]>([])
  const [cateAndLabelList, setCateAndLabelList] = useState<Record<string, any>[]>([])
  const [currentPrimaryId, setCurrentPrimaryId] = useState()

  const queryPrimaryList = () => {
    req({
      method: 'post',
      url: apiName.queryPrimaryCategory,
      data: { categoryType: 1 }
    })
      .then((res: Record<string, any>) => {
        if (res.data && res.data.length > 0) {
          setCurrentPrimaryId(res.data[0].id)
          setPrimaryList([...res.data].map(t => ({ tab: t.categoryName, key: t.id })))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    queryPrimaryList()
  }, [])

  const getCategoryAndLabel = () => {
    req({
      method: 'post',
      url: apiName.queryCategoryAndLabel,
      data: { id: currentPrimaryId }
    })
      .then(res => {
        if (res.data && res.data.length > 0) {
          res.data = res.data.map(item => {
            return {
              ...item,
              children: item.labelDTOList.map(t => ({ label: t.labelName, value: t.id }))
            }
          })
          setCateAndLabelList([...res.data])
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (currentPrimaryId) {
      getCategoryAndLabel()
    }
  }, [currentPrimaryId])

  return (
    <div>
      <Card tabList={primaryList}>
        {cateAndLabelList.map(item => {
          return (
            <Descriptions title={item.categoryName} extra={<Checkbox>全选</Checkbox>}>
              <Descriptions.Item label=''>
                <Checkbox.Group
                  // value={secondItem.activeList}
                  options={item.children}
                  // onChange={this.onChange(secondIndex)}
                />
              </Descriptions.Item>
            </Descriptions>
          )
        })}
      </Card>
    </div>
  )
}

export default PracticeHome
