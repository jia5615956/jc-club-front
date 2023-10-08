import { Component } from 'react';
import QuestionList from '@components/question-list';
import CategoryList from '@components/category-list';
import ContributionList from './components/contribution-list';
import RankingList from './components/ranking-list'
import { apiName } from './constant';
import req from '@utils/request';
import { Spin } from 'antd';
import { mockTabList, mockDataList } from './mock'
import './index.less';

export default class QuestionBank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryList: mockTabList || [],
            questionList: mockDataList || [],
            isShowSpin: false,
        };
    }
    labelList = []; // 选中的标签列表
    difficulty = 0; //困难度（全部）
    total = 0; // 总条数
    pageIndex = 1;
    primaryCategoryId = ''; //第一个大类id

    componentDidMount() {
        // this.getPrimaryCategoryInfo();
        // console.log(this.props.route);
    }

    /**
     * 获取一级分类数据
     */
    getPrimaryCategoryInfo() {
        req({
            method: 'post',
            data: { subjectTypeList: [4] },
            url: apiName.getPrimaryCategoryInfo,
        })
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    this.primaryCategoryId = res.data[0].primaryCategoryId;
                    this.setState(
                        {
                            firstCategoryList: res.data,
                            isShowSpin: false,
                        },
                        () => {
                            this.getInterviewSubjectList();
                        }
                    );
                } else {
                    this.primaryCategoryId = '';
                    this.setState({
                        isShowSpin: false,
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    /**
     * 获取题目列表
     */
    getInterviewSubjectList() {
        let params = {
            pageInfo: {
                pageIndex: this.pageIndex,
                pageSize: 10,
            },
            difficulty: this.difficulty,
            primaryCategoryId: this.primaryCategoryId,
            assembleIds: this.labelList,
        };
        req({
            method: 'post',
            data: params,
            url: apiName.getInterviewSubjectList,
        })
            .then((res) => {
                if (res.data && res.data?.pageList?.length > 0) {
                    this.total = res.data.pageInfo.total;
                    this.setState({
                        questionList: res.data.pageList,
                        isShowSpin: false,
                    });
                } else {
                    this.total = 0;
                    this.setState({
                        questionList: [],
                        isShowSpin: false,
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    /**
     * 选择标签时，请求列表数据
     * @param {*} primaryCategoryId 一级分类id
     * @param {*} assembleIds 三级标签 assembleIds
     */
    onChangeLabel = (primaryCategoryId, assembleIds) => {
        this.labelList = assembleIds;
        this.primaryCategoryId = primaryCategoryId;
        this.pageIndex = 1;
        this.getInterviewSubjectList();
    };

    /**
     * 切换一级分类
     * @param {*} e
     */
    onChangeCategory = (e) => {
        this.labelList = [];
        this.primaryCategoryId = e;
        this.pageIndex = 1;
        this.getInterviewSubjectList();
    };

    /**
     * 筛选列表数据
     * @param {*} id
     */
    handleChangeSelect = (id) => {
        this.difficulty = id;
        this.pageIndex = 1;
        this.getInterviewSubjectList();
    };

    /**
     * 分页功能
     * @param {*} pageIndex 当前页码
     */
    onChangePagination = (pageIndex) => {
        this.pageIndex = pageIndex;
        this.getInterviewSubjectList();
    };

    render() {
        const { firstCategoryList, questionList, isShowSpin } = this.state;
        return (
            <div className="question-bank-box">
                <Spin spinning={isShowSpin}>
                    <div className="question-box">
                        <div className="category-list-box">
                            {firstCategoryList?.length > 0 && (
                                <CategoryList
                                    onChangeCategory={this.onChangeCategory}
                                    categoryList={firstCategoryList}
                                    onChangeLabel={this.onChangeLabel}
                                />
                            )}
                        </div>
                        <div className="question-list-box">
                            <QuestionList
                                pageIndex={this.pageIndex}
                                total={this.total}
                                questionList={questionList}
                                handleChangeSelect={this.handleChangeSelect}
                                onChangePagination={this.onChangePagination}
                                difficulty={this.difficulty}
                                primaryCategoryId={this.primaryCategoryId}
                                labelList={this.labelList}
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
}
