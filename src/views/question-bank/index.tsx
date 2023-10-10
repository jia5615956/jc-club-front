// import { Component } from 'react';
import { useState, useEffect } from 'react'
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
    const [questionList, setQuestionList] = useState(mockDataList)
    const [isShowSpin, setIsShowSpin] = useState(false)
    const [labelList, setLabelList] = useState<string[]>([]); // 选中的标签列表
    const [difficulty, setDiffculty] = useState(0); //困难度（全部）
    const [total, setTotal] = useState(0); // 总条数
    const [pageIndex, setPageIndex] = useState(1);
    const [primaryCategoryId, setPromaryCategoryId] = useState(''); //第一个大类id


    /**
     * 获取一级分类数据
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
                    setPromaryCategoryId(res.data[0].primaryCategoryId);
                    setFirstCategoryList(res.data)
                    setIsShowSpin(false)
                } else {
                    setIsShowSpin(false)
                }
            })
            .catch((err: string) => console.log(err));
    }

    /**
    * 切换一级分类
    * @param {*} e
    */
    const onChangeCategory = (e: string) => {
        setLabelList([])
        setPromaryCategoryId(e)
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
        // this.getInterviewSubjectList();
    };

    useEffect(() => {
        getPrimaryCategoryInfo()
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
export default QuestionBank
// class QuestionBank extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             firstCategoryList: [],
//             questionList: [],
//             isShowSpin: false,
//         };
//     }
//     labelList = []; // 选中的标签列表
//     difficulty = 0; //困难度（全部）
//     total = 0; // 总条数
//     pageIndex = 1;
//     primaryCategoryId = ''; //第一个大类id

//     componentDidMount() {
//         // this.getPrimaryCategoryInfo();
//         // console.log(this.props.route);
//     }



//     /**
//      * 获取题目列表
//      */
//     getInterviewSubjectList() {
//         let params = {
//             pageInfo: {
//                 pageIndex: this.pageIndex,
//                 pageSize: 10,
//             },
//             difficulty: this.difficulty,
//             primaryCategoryId: this.primaryCategoryId,
//             assembleIds: this.labelList,
//         };
//         req({
//             method: 'post',
//             data: params,
//             url: apiName.getInterviewSubjectList,
//         })
//             .then((res) => {
//                 if (res.data && res.data?.pageList?.length > 0) {
//                     this.total = res.data.pageInfo.total;
//                     this.setState({
//                         questionList: res.data.pageList,
//                         isShowSpin: false,
//                     });
//                 } else {
//                     this.total = 0;
//                     this.setState({
//                         questionList: [],
//                         isShowSpin: false,
//                     });
//                 }
//             })
//             .catch((err) => console.log(err));
//     }



//     /**
//      * 切换一级分类
//      * @param {*} e
//      */
//     onChangeCategory = (e) => {
//         this.labelList = [];
//         this.primaryCategoryId = e;
//         this.pageIndex = 1;
//         this.getInterviewSubjectList();
//     };

//     /**
//      * 筛选列表数据
//      * @param {*} id
//      */
//     handleChangeSelect = (id) => {
//         this.difficulty = id;
//         this.pageIndex = 1;
//         this.getInterviewSubjectList();
//     };

//     /**
//      * 分页功能
//      * @param {*} pageIndex 当前页码
//      */
//     onChangePagination = (pageIndex) => {
//         this.pageIndex = pageIndex;
//         this.getInterviewSubjectList();
//     };

//     render() {
//         const { firstCategoryList, questionList, isShowSpin } = this.state;
//         return (
//             <div className="question-bank-box">
//                 <Spin spinning={isShowSpin}>
//                     <div className="question-box">
//                         <div className="category-list-box">
//                             {firstCategoryList?.length > 0 && (
//                                 <CategoryList
//                                     onChangeCategory={this.onChangeCategory}
//                                     categoryList={firstCategoryList}
//                                     onChangeLabel={this.onChangeLabel}
//                                 />
//                             )}
//                         </div>
//                         <div className="question-list-box">
//                             <QuestionList
//                                 pageIndex={this.pageIndex}
//                                 total={this.total}
//                                 questionList={questionList}
//                                 handleChangeSelect={this.handleChangeSelect}
//                                 onChangePagination={this.onChangePagination}
//                                 difficulty={this.difficulty}
//                                 primaryCategoryId={this.primaryCategoryId}
//                                 labelList={this.labelList}
//                             />
//                         </div>
//                     </div>
//                 </Spin>
//                 <div className="ranking-box">
//                     <ContributionList />
//                     <RankingList />
//                 </div>
//             </div>
//         );
//     }
// }
