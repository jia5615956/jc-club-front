import React, { Component, Fragment } from 'react';
import req from '@utils/request';
import TagsEditor from '@components/tags-editor';
import { apiName, ModuleType, starList } from '../../constant';
import './index.less';
export default class RankLabelBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryList: [],
            secondCategoryList: [],
            thirdCategoryList: [],
            rankList: starList,
        };
    }

    componentDidMount() {
        this.geFirstCategoryList();
    }

    firstValue = ''; // 一级分类id

    firstCategoryValue = ''; // 一级分类的值
    secondCategoryValue = []; // 二级分类的值
    thirdCategoryValue = []; // 三级标签的值

    /**
     * 初始化数据
     */
    initRankLabel = () => {
        this.firstCategoryValue = ''; // 一级分类的值
        this.secondCategoryValue = []; // 二级分类的值
        this.thirdCategoryValue = []; // 三级标签的值
        this.firstValue = '';
        this.setState(
            {
                firstCategoryList: [],
                secondCategoryList: [],
                thirdCategoryList: [],
                rankList: starList,
            },
            () => {
                this.geFirstCategoryList();
            }
        );
    };

    /**
     * 获得一级分类数据
     */
    geFirstCategoryList() {
        const params = { categoryType: 1 };
        req({
            method: 'post',
            data: params,
            url: apiName.getInterviewCategory,
        })
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    let list = res.data.map((item, index) => {
                        return {
                            ...item,
                            active: index == 0 ? true : false,
                        };
                    });
                    this.setState(
                        {
                            firstCategoryList: list,
                            secondCategoryList: [],
                            thirdCategoryList: [],
                        },
                        () => {
                            this.firstValue = list[0].categoryId;
                            this.getSecondCategoryList(this.firstValue);
                            this.getThirdCategoryList(this.firstValue);
                        }
                    );
                } else {
                    this.setState({
                        firstCategoryList: [],
                        secondCategoryList: [],
                        thirdCategoryList: [],
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    /**
     * 获得二级分类数据
     * @param {*} id 一级分类id
     */
    getSecondCategoryList(id) {
        const params = { parentId: id, categoryType: 2 };
        req({
            method: 'post',
            data: params,
            url: apiName.getInterviewCategory,
        })
            .then((res) => {
                this.firstCategoryValue = id;
                this.secondCategoryValue = [];
                this.thirdCategoryValue = [];
                if (res.data && res.data.length > 0) {
                    this.setState({
                        secondCategoryList: res.data,
                    });
                } else {
                    // 若需要新增时，则需要将数组第一个item，重置如下
                    this.setState({
                        secondCategoryList: [{ categoryName: '空', categoryId: -9999 }],
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    /**
     * 获得三级分类数据
     * @param {*} id 二级分类id
     */
    getThirdCategoryList(id) {
        const { subjectName } = this.props;
        const params = {
            primaryCategoryId: id || this.firstValue,
            subjectName: subjectName,
        };
        req({
            method: 'post',
            data: params,
            url: apiName.getRecommendLabel,
        })
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    let list = res.data.map((item) => {
                        return {
                            categoryName: item.labelName,
                            categoryId: item.labelId,
                            active: item?.isRecommend === 1 ? true : false,
                        };
                    });
                    this.thirdCategoryValue = this.formatList(list);
                    if (this.thirdCategoryValue.length >= 0) {
                        this.onChangeRankLabel();
                    }
                    this.setState({
                        thirdCategoryList: list,
                    });
                } else {
                    // 若需要新增时，则需要将数组第一个item，重置如下
                    this.setState({
                        thirdCategoryList: [{ categoryName: '空', categoryId: -9999 }],
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    /**
     * 选择职级-单选
     * @param {*} handleStatusList
     * @param {*} selectList
     */
    onHandleChangeRank = (handleStatusList, selectList) => {
        this.setState({ rankList: handleStatusList });
        this.props.handleChangeRank(selectList);
    };

    /**
     * 选择一级分类-单选
     * @param {*} handleStatusList 带有是否选中状态的原数组
     * @param {*} selectList 选中id的数组
     */
    onChangeFirst = (handleStatusList, selectList) => {
        this.setState({ firstCategoryList: handleStatusList });
        this.firstValue = selectList[0];
        // 获得二级分类
        this.getSecondCategoryList(this.firstValue);
        // 获得三级标签
        this.getThirdCategoryList(this.firstValue);
    };

    /**
     * 选择二级分类
     * @param {*} handleStatusList 带有是否选中状态的原数组
     * @param {*} selectList 选中id的数组
     */
    onChangeSecondTags = (handleStatusList, selectList) => {
        this.secondCategoryValue = selectList;
        this.setState({ secondCategoryList: handleStatusList });
        this.onChangeRankLabel();
    };

    /**
     * 选择三级标签
     * @param {*} handleStatusList 带有是否选中状态的原数组
     * @param {*} selectList 选中id的数组
     */
    onChangeThirdTags = (handleStatusList, selectList) => {
        this.thirdCategoryValue = selectList;
        this.setState({ thirdCategoryList: handleStatusList });
        this.onChangeRankLabel();
    };

    /**
     * 格式化数据-获得选中项id列表
     * @param {*} list
     * @returns
     */
    formatList = (list) => {
        let labelList = [];
        list.forEach((item) => {
            if (item.active) {
                labelList.push(item.categoryId);
            }
        });
        return labelList;
    };

    /**
     * 向父组件传递
     */
    onChangeRankLabel = () => {
        console.log(
            '问答题 -------',
            this.firstCategoryValue,
            this.secondCategoryValue,
            this.thirdCategoryValue
        );
        this.props.onChangeRankLabel(
            this.firstCategoryValue,
            this.secondCategoryValue,
            this.thirdCategoryValue
        );
    };

    render() {
        const { firstCategoryList, secondCategoryList, thirdCategoryList, rankList } = this.state;
        return (
            <Fragment>
                {this.rendeRrankModule(rankList)}
                {this.renderFirstModule(firstCategoryList)}
                {secondCategoryList?.length > 0 && (
                    <Fragment>
                        {this.renderSecondModule(secondCategoryList)}
                        {thirdCategoryList?.length > 0 && this.renderThirdModule(thirdCategoryList)}
                    </Fragment>
                )}
            </Fragment>
        );
    }

    /**
     * 职级选择
     * @param {*} rankList
     * @returns
     */
    rendeRrankModule = (rankList) => {
        return (
            <div className="upload-single-container">
                <div className="upload-single-title">职级选择：</div>
                <div className="upload-single-main">
                    <TagsEditor
                        categoryList={rankList}
                        isSingleChoice={true}
                        onChangeLabel={this.onHandleChangeRank}
                        isDisabledReverseSelection={true}
                    />
                    <span style={{ marginLeft: '8px', color: 'red' }}>
                        注：所选职级应为熟练掌握该题的最低职级
                    </span>
                </div>
            </div>
        );
    };

    /**
     * 一级分类选择
     * @param {*} firstCategoryList
     * @returns
     */
    renderFirstModule = (firstCategoryList) => {
        return (
            <Fragment>
                {firstCategoryList?.length > 0 && (
                    <div className="upload-single-container">
                        <div className="upload-single-title">一级分类：</div>
                        <div className="upload-single-main">
                            <TagsEditor
                                categoryList={firstCategoryList}
                                isSingleChoice={true}
                                onChangeLabel={this.onChangeFirst}
                                isDisabledReverseSelection={true}
                            />
                        </div>
                    </div>
                )}
            </Fragment>
        );
    };

    /**
     * 二级分类选择
     * @param {*} secondCategoryList
     * @returns
     */
    renderSecondModule = (secondCategoryList) => {
        return (
            <div className="upload-single-container">
                <div className="upload-single-title">二级分类：</div>
                <div className="upload-single-main">
                    <TagsEditor
                        moduleType={ModuleType.second}
                        categoryList={secondCategoryList}
                        isSingleChoice={false}
                        onChangeLabel={this.onChangeSecondTags}
                    // parentCategoryValue={[this.firstCategoryValue]}
                    // isAddTag={true}
                    // isDeleteTag={true}
                    />
                </div>
            </div>
        );
    };

    /**
     * 三级标签选择
     * @param {*} thirdCategoryList
     * @returns
     */
    renderThirdModule = (thirdCategoryList) => {
        return (
            <div className="upload-single-container">
                <div className="upload-single-title">三级标签：</div>
                <div className="upload-single-main">
                    <TagsEditor
                        moduleType={ModuleType.third}
                        categoryList={thirdCategoryList}
                        isSingleChoice={false}
                        onChangeLabel={this.onChangeThirdTags}
                    // parentCategoryValue={[this.firstCategoryValue]}
                    // isAddTag={true}
                    // isDeleteTag={true}
                    />
                </div>
            </div>
        );
    };
}

