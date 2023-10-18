// import { Component } from 'react';
import { useState, useEffect, memo } from 'react'
import QuestionList from '@components/question-list';
import CategoryList from '@components/category-list';
import ContributionList from './components/contribution-list';
import RankingList from './components/ranking-list'
import { apiName } from './constant';
import req from '@utils/request';
import { Spin } from 'antd';
import { mockDataList } from './mock';
import './index.less';

const QuestionBank = () => {

    const [firstCategoryList, setFirstCategoryList] = useState([])
    const [questionList, setQuestionList] = useState([])
    const [isShowSpin, setIsShowSpin] = useState(false)
    const [labelList, setLabelList] = useState<string | number>(); // 选中的标签列表
    const [difficulty, setDiffculty] = useState(0); //困难度（全部）
    const [total, setTotal] = useState(0); // 总条数
    const [pageIndex, setPageIndex] = useState(0);
    const [primaryCategoryId, setPromaryCategoryId] = useState(''); //第一个大类id


    /**
     * 获取大类分类
     */
    const getPrimaryCategoryInfo = () => {
        setIsShowSpin(true)
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
            }).finally(() => {
                setIsShowSpin(false)
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
        setPageIndex(1)
        setTotal(0)
    };

    const [secondCategoryId, setSecondCategoryId] = useState('')

    /**
    * 选择标签时，请求列表数据
    * @param {*} primaryCategoryId 一级分类id
    * @param {*} assembleIds 三级标签 assembleIds
    */
    const onChangeLabel = (secondCategoryId: any, assembleIds: string) => {
        // setPromaryCategoryId(primaryCategory)
        setSecondCategoryId(secondCategoryId)
        setLabelList(assembleIds)
        setPageIndex(1)
    };

    const queryQuestionList = () => {
        const params = {
            pageNo: pageIndex,
            pageSize: 10,
            labelId: labelList,
            categoryId: secondCategoryId,
            subjectDifficult: 1
        }
        req({
            method: 'post',
            url: apiName.getSubjectPage,
            data: params
        }).then(res => {
            setTotal(res.data.total)
            setQuestionList(res.data.result)
        })
    }

    useEffect(() => {
        if (!primaryCategoryId) {
            getPrimaryCategoryInfo()
        }
    }, [])

    useEffect(() => {
        if (labelList && primaryCategoryId) {
            queryQuestionList()
        }
    }, [labelList, primaryCategoryId, pageIndex])


    return (
        <div className="question-bank-box">
            <Spin spinning={isShowSpin}>
                <div className="question-box">
                    <div className="category-list-box">
                        {firstCategoryList?.length > 0 && (
                            <CategoryList
                                onChangeCategory={onChangeCategory}
                                categoryList={firstCategoryList}
                                onChangeLabel={onChangeLabel}
                                primaryCategoryId={primaryCategoryId}
                                isMultipleChoice={false}
                            />
                        )}
                    </div>
                    <div className="question-list-box">
                        <QuestionList
                            pageIndex={pageIndex}
                            total={total}
                            questionList={questionList}
                            // handleChangeSelect={this.handleChangeSelect}
                            // onChangePagination={this.onChangePagination}
                            difficulty={difficulty}
                            // primaryCategoryId={this.primaryCategoryId}
                            labelList={labelList}
                        />
                    </div>
                </div>
            </Spin>
            <div className="ranking-box">
                <ContributionList />
                <RankingList />
            </div>
        </div>
    );
}
export default memo(QuestionBank)
