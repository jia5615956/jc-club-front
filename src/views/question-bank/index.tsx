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
    const [labelList, setLabelList] = useState<string[]>([]); // 选中的标签列表
    const [difficulty, setDiffculty] = useState(0); //困难度（全部）
    const [total, setTotal] = useState(0); // 总条数
    const [pageIndex, setPageIndex] = useState(1);
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
        setLabelList([])
        setPromaryCategoryId(item.id)
        setPageIndex(1)
    };

    /**
    * 选择标签时，请求列表数据
    * @param {*} primaryCategoryId 一级分类id
    * @param {*} assembleIds 三级标签 assembleIds
    */
    const onChangeLabel = (primaryCategoryId: string, assembleIds: string[]) => {
        setLabelList(assembleIds)
        setPromaryCategoryId(primaryCategoryId)
        setPageIndex(1)
    };

    useEffect(() => {
        if (!primaryCategoryId) {
            getPrimaryCategoryInfo()
        }
    }, [])

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
