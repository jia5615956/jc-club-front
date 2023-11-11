import { useState, useEffect, memo } from 'react'
import QuestionList from '@components/question-list';
import CategoryList from '@components/category-list';
import ContributionList from './components/contribution-list';
import RankingList from './components/practice-list'
import { apiName } from './constant';
import req from '@utils/request';
import './index.less';

const QuestionBank = () => {

    const [firstCategoryList, setFirstCategoryList] = useState<Record<string, any>[]>([])
    const [questionList, setQuestionList] = useState([])
    const [labelList, setLabelList] = useState<string | number>(); // 选中的标签列表
    const [difficulty, setDiffculty] = useState(''); //困难度（全部）
    const [total, setTotal] = useState(0); // 总条数
    const [pageIndex, setPageIndex] = useState(0);
    const [primaryCategoryId, setPromaryCategoryId] = useState(''); //第一个大类id
    const [secondCategoryId, setSecondCategoryId] = useState('')

    const [loading, setLoading] = useState(false)
    const [finished, setFinished] = useState(false)
    const [switchFlag, setSwitchFlag] = useState(false)


    /**
     * 获取大类分类
     */
    const getPrimaryCategoryInfo = () => {
        req({
            method: 'post',
            url: apiName.queryPrimaryCategory,
            data: { categoryType: 1 }
        })
            .then((res: Record<string, any>) => {
                if (res.data && res.data.length > 0) {
                    setPromaryCategoryId(res.data[0].id);
                    setFirstCategoryList(res.data)
                }
            })
            .catch((err: string) => {
                console.log(err)
            })
    }

    /**
    * 切换一级分类
    * @param {*} e
    */
    const onChangeCategory = (item: Record<string, any>) => {
        setLabelList('')
        setPromaryCategoryId(item.id)
        setQuestionList([])
        setTotal(0)
        setPageIndex(1)
    };


    /**
    * 选择标签时，请求列表数据
    * @param {*} secondCategoryId 一级分类id
    * @param {*} assembleIds 三级标签 assembleIds
    */
    const onChangeLabel = (secondCategoryId: any, assembleIds: string) => {
        setSecondCategoryId(secondCategoryId)
        setLabelList(assembleIds)
        setQuestionList([])
        setTotal(0)
        setPageIndex(1)
    };

    const queryQuestionList = () => {
        setLoading(true)
        const params = {
            pageNo: pageIndex,
            pageSize: 20,
            labelId: labelList,
            categoryId: secondCategoryId,
            subjectDifficult: difficulty || ''
        }
        req({
            method: 'post',
            url: apiName.getSubjectPage,
            data: params
        }).then(res => {
            setLoading(false)
            let lastList = [...questionList]
            const { total, result } = res.data
            if (result.length) {
                lastList = lastList.concat(result)
                setQuestionList(lastList)
                setTotal(total)
                if (result.length < 20 || lastList.length >= total) {
                    setFinished(true)
                } else {
                    setFinished(false)
                    setSwitchFlag(false)
                }
            }
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        if (!primaryCategoryId) {
            getPrimaryCategoryInfo()
        }
    }, [])

    useEffect(() => {
        if (labelList && secondCategoryId) {
            queryQuestionList()
        }
    }, [labelList, pageIndex, secondCategoryId, difficulty])

    /**
   * 更多分类切换
   * @param {*} e
   */
    const onChangeCategoryMore = (id: string, categoryList: Record<string, any>[]) => {
        setFirstCategoryList(categoryList)
        setPromaryCategoryId(id)
        setLabelList('')
        setQuestionList([])
        setPageIndex(1)
        setTotal(0)
    }

    const scrollHandler = e => {
        let scrollTop = e.target.scrollTop; // listBox 滚动条向上卷曲出去的长度，随滚动变化
        let clientHeight = e.target.clientHeight; // listBox 的视口可见高度，固定不变
        let scrollHeight = e.target.scrollHeight; // listBox 的整体高度，随数据加载变化
        let saveHeight = 30; // 安全距离，距离底部XX时，触发加载
        let tempVal = scrollTop + clientHeight + saveHeight;
        // 如果不加入 saveHeight 安全距离，在 scrollTop + clientHeight == scrollHeight 时，触发加载
        // 加入安全距离，相当于在 scrollTop + clientHeight >= scrollHeight - 30 时，触发加载，比前者更早触发
        if (tempVal >= scrollHeight) {
            if (!finished && !switchFlag) {
                // 数据加载未结束 && 未加锁
                setPageIndex(pageIndex + 1)
            }
            setSwitchFlag(true)
        }
    }

    const changeDifficuty = cur => {
        if (cur === difficulty) return
        setPageIndex(1)
        setDiffculty(cur)
        setQuestionList([])
    }

    return (
        <div className="question-bank-box">
            <div className='mask-box' onScroll={scrollHandler}>
                <div className="question-box" >
                    <div className="category-list-box">
                        {firstCategoryList?.length > 0 && (
                            <CategoryList
                                onChangeCategory={onChangeCategory}
                                categoryList={firstCategoryList}
                                onChangeLabel={onChangeLabel}
                                primaryCategoryId={primaryCategoryId}
                                isMultipleChoice={false}
                                onChangeCategoryMore={onChangeCategoryMore}
                            />
                        )}
                    </div>
                    <div className="question-list-box">
                        <QuestionList
                            pageIndex={pageIndex}
                            total={total}
                            questionList={questionList}
                            changeDifficuty={changeDifficuty}
                            labelList={labelList}
                        />
                    </div>

                    <div className='loading-more'>{
                        questionList.length == 0
                            ? "暂无数据"
                            : loading && !finished
                                ? "努力加载中..."
                                : "我是有底线的（："
                    }</div>
                </div>
            </div>
            <div className="ranking-box">
                <RankingList />
                <ContributionList />
            </div>
        </div>
    );
}

export default memo(QuestionBank)
