import { ExclamationCircleOutlined } from '@ant-design/icons'
import { queryParse } from '@utils'
import { Card, Input, Pagination, Skeleton, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.less'

const { Search } = Input

const mockList = [
  {
    id: 100,
    subjectName: 'Redis支持哪几种数据类型？',
    subjectDifficult: 1,
    subjectType: 4,
    subjectScore: 1,
    subjectParse: '解析什么',
    subjectAnswer:
      '<p><br></p><ol><li>String（字符串）</li><li>List（列表）</li><li>Hash（字典）</li><li>Set（集合）</li><li>Sorted Set（有序集合）</li></ol><p><br></p><p><strong>String</strong></p><p><br></p><p>String是简单的 key-value 键值对，value 不仅可以是 String，也可以是数字。String在redis内部存储默认就是一个字符串，被redisObject所引用，当遇到incr,decr等操作时会转成数值型进行计算，此时redisObject的encoding字段为int。</p><p><br></p><p><strong>List</strong></p><p><br></p><p>Redis列表是简单的字符串列表，可以类比到C++中的std::list，简单的说就是一个链表或者说是一个队列。可以从头部或尾部向Redis列表添加元素。列表的最大长度为2^32 - 1，也即每个列表支持超过40亿个元素。</p><p><br></p><p>Redis list的实现为一个双向链表，即可以支持反向查找和遍历，更方便操作，不过带来了部分额外的内存开销，Redis内部的很多实现，包括发送缓冲队列等也都是用的这个数据结构。</p><p><br></p><p><strong>Hash</strong></p><p><br></p><p>Redis Hash对应Value内部实际就是一个HashMap，实际这里会有2种不同实现，这个Hash的成员比较少时Redis为了节省内存会采用类似一维数组的方式来紧凑存储，而不会采用真正的HashMap结构，对应的value redisObject的encoding为zipmap,当成员数量增大时会自动转成真正的HashMap。</p><p><br></p><p><strong>Set</strong></p><p><br></p><p>set 的内部实现是一个 value永远为null的HashMap，实际就是通过计算hash的方式来快速排重的，这也是set能提供判断一个成员是否在集合内的原因。</p><p><br></p><p><strong>Sorted Set</strong></p><p><br></p><p>Redis有序集合类似Redis集合，不同的是增加了一个功能，即集合是有序的。一个有序集合的每个成员带有分数，用于进行排序。</p><p><br></p><p>Redis有序集合添加、删除和测试的时间复杂度均为O(1)(固定时间，无论里面包含的元素集合的数量)。列表的最大长度为2^32- 1元素(4294967295，超过40亿每个元素的集合)。</p><p><br></p><p>Redis sorted set的内部使用HashMap和跳跃表(SkipList)来保证数据的存储和有序，HashMap里放的是成员到score的映射，而跳跃表里存放的是所有的成员，排序依据是HashMap里存的score,使用跳跃表的结构可以获得比较高的查找效率，并且在实现上比较简单。</p>',
    labelName: ['Redis']
  },
  {
    id: 101,
    subjectName: 'Redis的高级数据类型有什么？',
    subjectDifficult: 2,
    subjectType: 4,
    subjectScore: 1,
    subjectParse: '解析什么',
    subjectAnswer:
      '<p><br></p><p>bitmap：bitmap是一种位数据类型，常常用于统计，大家比较知名的就是布隆过滤器。也可以统计一些大数据量的东西，比如每天有多少优惠券被使用。</p><p><br></p><p>hyperloglog：用于基数统计，基数是数据集去重后元素个数，运用了LogLog的算法。{1,3,5,7,5,7,8} &nbsp; 基数集:{1,3,5,7,8} &nbsp;基数:5</p><p><br></p><p>geo：应用于地理位置计算，主要是经纬度的计算，常见的就是附近的人，可以以当前人的坐标获取周围附近的成员，可以计算经纬度，计算地理位置</p>',
    labelName: ['Redis']
  },
  {
    id: 102,
    subjectName: 'Redis的优点有什么？',
    subjectDifficult: 1,
    subjectType: 4,
    subjectScore: 1,
    subjectParse: '解析什么',
    subjectAnswer:
      '<p><br></p><p>(1) 速度快，因为数据存在内存中，类似于HashMap，HashMap的优势就是查找和操作的时间复杂度都是O(1)</p><p><br></p><p>(2) 支持丰富数据类型，支持string，list，set，Zset，hash等</p><p><br></p><p>(3) 支持事务，操作都是原子性，所谓的原子性就是对数据的更改要么全部执行，要么全部不执行</p><p><br></p><p>(4) 丰富的特性：可用于缓存，消息，按key设置过期时间，过期后将会自动删除</p>',
    labelName: ['Redis']
  },
  {
    id: 103,
    subjectName: 'Redis相比Memcached有哪些优势？',
    subjectDifficult: 1,
    subjectType: 4,
    subjectScore: 1,
    subjectParse: '解析什么',
    subjectAnswer:
      '<p><br></p><p>(1) Memcached所有的值均是简单的字符串，redis作为其替代者，支持更为丰富的数据类型</p><p><br></p><p>(2) Redis的速度比Memcached快很多</p><p><br></p><p>(3) Redis可以持久化其数据</p>',
    labelName: ['Redis']
  },
  {
    id: 106,
    subjectName: 'redis过期策略都有哪些？',
    subjectDifficult: 1,
    subjectType: 4,
    subjectScore: 1,
    subjectParse: '解析什么',
    subjectAnswer:
      '<p><br></p><p>noeviction: 当内存不足以容纳新写入数据时，新写入操作会报错。</p><p><br></p><p>allkeys-lru：当内存不足以容纳新写入数据时，在键空间中，移除最近最少使用的 key。</p><p><br></p><p>allkeys-random：当内存不足以容纳新写入数据时，在键空间中，随机移除某个 key，这个一般没人用吧，为啥要随机，肯定是把最近最少使用的 key 给干掉啊。</p><p><br></p><p>volatile-lru：当内存不足以容纳新写入数据时，在设置了过期时间的键空间中，移除最近最少使用的 key。</p><p><br></p><p>volatile-random：当内存不足以容纳新写入数据时，在设置了过期时间的键空间中，随机移除某个 key。</p><p><br></p><p>volatile-ttl：当内存不足以容纳新写入数据时，在设置了过期时间的键空间中，有更早过期时间的 key 优先移除。</p>',
    labelName: ['Redis']
  }
]

const defaultValue = queryParse(location.search).t

const SearchDetails = () => {
  const navigate = useNavigate()
  const [isShowSkeleton, setIsShowSkeleton] = useState(true)
  const [questionList, setQuestionList] = useState(mockList)
  const [total, setTotal] = useState(0)
  const [pageIndex, setPageIndex] = useState(0)
  const [searchValue, setSearchValue] = useState(defaultValue)

  const searchSubject = () => {
    setIsShowSkeleton(false)
  }

  const handleJump = id => {
    navigate('/brush-question/' + id)
  }

  const onChangePagination = () => {}

  useEffect(() => {
    searchSubject()
  }, [searchValue])

  return (
    <div className='search-details-box'>
      <div className='search-details-box-search'>
        <div>
          <Search
            placeholder='请输入感兴趣的内容'
            onSearch={value => {
              if (value) {
                // this.state.searchText = value
                // this.pageIndex = 1
                // this.searchSubject()
              } else {
                message.info('搜索词不能为空')
              }
            }}
            enterButton
            defaultValue={defaultValue}
          />
        </div>
      </div>
      <Skeleton
        title={{ width: '100%' }}
        paragraph={{ rows: 20, width: new Array(20).fill('100%') }}
        active
        loading={isShowSkeleton}
      >
        <div className='search-details-box-content'>
          <div className='search-details-box-content-card'>
            <Card
              style={{ width: '100%' }}
              // tabList={this.tabList}
              // onTabChange={key => {
              //   this.onTabChange(key, 'key')
              // }}
            >
              <div className='search-details-box-content-main'>
                {questionList?.length > 0 ? (
                  questionList.map((item, index) => {
                    if (item.subjectAnswer) {
                      return (
                        <div className='search-details-box-content-main-item'>
                          <div
                            className='search-details-box-content-main-item-question'
                            key={`search-details-question_${index}`}
                            onClick={() => handleJump(item.id)}
                            dangerouslySetInnerHTML={{
                              __html: item.subjectName
                            }}
                          ></div>
                          <div
                            className='search-details-box-content-main-item-answer'
                            key={`search-details-answer_${index}`}
                            onClick={() => handleJump(item.id)}
                            dangerouslySetInnerHTML={{
                              __html: item.subjectAnswer + '...'
                            }}
                          ></div>
                        </div>
                      )
                    } else {
                      return (
                        <div className='search-details-box-content-main-item'>
                          <div
                            className='search-details-box-content-main-item-question'
                            key={`search-details-question_${index}`}
                            onClick={() => handleJump(item.id)}
                            dangerouslySetInnerHTML={{
                              __html: item.subjectName
                            }}
                          ></div>
                          <div
                            className='search-details-box-content-main-item-answer'
                            key={`search-details-answer_${index}`}
                            onClick={() => handleJump(item.id)}
                            dangerouslySetInnerHTML={{
                              __html: item.subjectAnswer
                            }}
                          ></div>
                        </div>
                      )
                    }
                  })
                ) : (
                  <div className='search-null'>
                    <ExclamationCircleOutlined />
                    <div>很抱歉，没有找到与你搜索相关的内容</div>
                  </div>
                )}
              </div>
            </Card>
          </div>
          <div className='search-details-box-content-paging'>
            {total > 20 && (
              <Pagination
                style={{
                  padding: '24px 0',
                  textAlign: 'center'
                }}
                showQuickJumper
                current={pageIndex}
                defaultCurrent={1}
                total={total}
                defaultPageSize={20}
                onChange={onChangePagination}
              />
            )}
          </div>
        </div>
      </Skeleton>
    </div>
  )
}

export default SearchDetails
