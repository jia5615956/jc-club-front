import React, { Component, Fragment } from 'react';

import {
    RightOutlined,
    UpOutlined,
    DownOutlined,
    CaretDownOutlined,
    CaretUpOutlined,
} from '@ant-design/icons';
import req from '@utils/request';
import { Divider } from 'antd';
import _ from 'lodash';
import './index.less';
import { apiName, imgObject } from './constant';

/**
 * 大分类中的背景图
 */
export const categoryBackImg = {
    0: imgObject.backAllImg,
    1: imgObject.dataImg,
    2: imgObject.javaImg,
    3: imgObject.npmImg,
    4: imgObject.parallelComputingImg,
    5: imgObject.springbootImg,
    6: imgObject.sqlImg,
    7: imgObject.systemDesignImg,
    8: imgObject.algorithmImg,
};

const categoryShowCount = 4;

export default class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secondCategoryList: [],
            currentActive: '',
            isPutAway: true, // 是否收起 默认收起状态
        };
    }

    componentDidMount() {
        // this.initCategoryList();
    }

    /**
     * 初始化数据，默认选择第一个
     */
    initCategoryList() {
        const { categoryList, primaryCategoryId } = this.props;
        let currentActive = primaryCategoryId ?? categoryList[0].primaryCategoryId;
        this.props.onChangeCategory(currentActive);
        this.getSecondCategoryList(currentActive);
    }

    /**
     * 获得二级三级分类数据
     */
    getSecondCategoryList(currentActive) {
        const { categoryListMap } = this.props;
        // 调用接口返回二级三级数据
        let params = {
            primaryCategoryId: currentActive,
            subjectTypeList: [4],
        };
        req({
            method: 'post',
            data: params,
            url: apiName.getCategoryLabelInfo,
        })
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    let secondCategoryList = res.data;
                    let listLen =
                        categoryListMap &&
                        categoryListMap[currentActive] &&
                        categoryListMap[currentActive].length;
                    let objActive = {};
                    listLen > 0 &&
                        categoryListMap &&
                        categoryListMap[currentActive] &&
                        categoryListMap[currentActive].forEach((item) => {
                            objActive[item] = item;
                        });
                    secondCategoryList.forEach((categoryItem) => {
                        categoryItem.labelInfoList.forEach((item) => {
                            if (listLen > 0 && objActive[item.assembleId]) {
                                item.active = true;
                            } else {
                                item.active = false;
                            }
                        });
                        categoryItem.isOpen = false;
                    });
                    this.setState(
                        {
                            secondCategoryList,
                            currentActive,
                        },
                        () => {
                            let activeList = [];
                            secondCategoryList.forEach((categoryItem) => {
                                categoryItem.labelInfoList.forEach((item) => {
                                    if (item.active) {
                                        activeList.push(item.assembleId);
                                    }
                                });
                            });
                            secondCategoryList.forEach((item, index) => {
                                let height = document.getElementById('id_' + index)?.scrollHeight;
                                let displayHeight = height > 43 ? 'flex' : 'none';
                                !this.props.isHideSec &&
                                    (document.getElementById('second_id_' + index).style.display =
                                        displayHeight);
                            });
                        }
                    );
                }
            })
            .catch((err) => console.log(err));
    }

    /**
     * 切换一级分类
     * @param {*} item
     * @returns
     */
    onChangeCategory = (primaryCategoryId) => () => {
        let { currentActive } = this.state;
        if (currentActive === primaryCategoryId) {
            return;
        }
        this.props.isHideSec &&
            this.setState({
                currentActive: primaryCategoryId,
            });
        this.props.onChangeCategory(primaryCategoryId);
        !this.props.isHideSec && this.getSecondCategoryList(primaryCategoryId);
    };

    /**
     * 选择标签-支持单选（多选）
     * @param {*} categoryId 一级分类id
     * @param {*} childrenLevelList 二级分类对象的标签列表
     * @param {*} secondCategoryIndex 二级分类对象index
     * @param {*} thirdCategoryIndex 三级标签index
     * @param {*} active 三级标签当前的选中状态
     * @returns
     */
    onChangeLabel = (childrenLevelList, secondCategoryIndex, thirdCategoryIndex, active) => () => {
        let { secondCategoryList, currentActive } = this.state;
        const { isMultipleChoice } = this.props;
        if (isMultipleChoice) {
            // 三级标签支持多选
            _.set(childrenLevelList, [thirdCategoryIndex, 'active'], !active);
            _.set(secondCategoryList, [secondCategoryIndex, 'labelInfoList'], childrenLevelList);
        } else {
            // 三级标签支持单选
            let formatLabelList = childrenLevelList.map((item, index) => {
                let flag = false;
                if (index === thirdCategoryIndex) {
                    flag = !active; // 将三级标签设置选中/未选中
                }
                return {
                    ...item,
                    active: flag,
                };
            });
            _.set(secondCategoryList, [secondCategoryIndex, 'labelInfoList'], formatLabelList);
        }
        this.setState(
            {
                secondCategoryList,
            },
            () => {
                let activeList = [];
                secondCategoryList.forEach((categoryItem) => {
                    categoryItem.labelInfoList.forEach((item) => {
                        if (item.active) {
                            activeList.push(item.assembleId);
                        }
                    });
                });
                this.props.onChangeLabel(currentActive, activeList);
            }
        );
    };

    /**
     * 展开/收起
     * @param {*} secondCategoryIndex
     * @returns
     */
    onChangeOpenStatus = (secondCategoryIndex, isOpen) => () => {
        let { secondCategoryList } = this.state;
        _.set(secondCategoryList, [secondCategoryIndex, 'isOpen'], !isOpen);
        this.setState({
            secondCategoryList,
        });
    };

    /**
     * 展开/收起
     */
    onChangePutAway = () => {
        let { isPutAway } = this.state;
        this.setState({
            isPutAway: !isPutAway,
        });
    };

    render() {
        const { categoryList } = this.props;
        const { secondCategoryList } = this.state;
        return (
            <div className="category-box">
                <Fragment>{categoryList?.length > 0 && this.renderFirstContainer()}</Fragment>
                {!this.props.isHideSec && (
                    <Fragment>
                        {secondCategoryList?.length > 0 && this.renderSecondContainer()}
                    </Fragment>
                )}
            </div>
        );
    }

    /**
     * 一级分类模块
     * @returns
     */
    renderFirstContainer = () => {
        const { categoryList } = this.props;
        const { currentActive } = this.state;
        return (
            <div className="first-category-list">
                {categoryList.slice(0, 7).map((categoryModuleItem, categoryModuleIndex) => {
                    return (
                        <div
                            className={`first-category-item ${categoryModuleItem.primaryCategoryId === currentActive &&
                                'first-category-item-active'
                                }`}
                            key={`first_category_${categoryModuleItem.primaryCategoryId}`}
                            style={{
                                backgroundImage: `url(${categoryBackImg[categoryModuleIndex]})`,
                            }}
                            onClick={this.onChangeCategory(categoryModuleItem.primaryCategoryId)}>
                            <div className="first-category-item-title">
                                {categoryModuleItem.levelName}
                            </div>
                            <div className="first-category-item-count">
                                {categoryModuleItem.count}道题
                            </div>
                        </div>
                    );
                })}
                {categoryList.length > 7 && (
                    <div className="first-category-more">
                        更多
                        <RightOutlined />
                    </div>
                )}
            </div>
        );
    };

    /**
     * 二级分类模块
     * @returns
     */
    renderSecondContainer = () => {
        const { secondCategoryList, isPutAway } = this.state;
        return (
            <div className="second-category-list">
                {secondCategoryList.map((secondCategoryItem, secondCategoryIndex) => {
                    return (
                        <div
                            style={{
                                display:
                                    secondCategoryIndex >= categoryShowCount && isPutAway
                                        ? 'none'
                                        : 'flex',
                            }}
                            className="second-category-item"
                            key={`second_category_${secondCategoryItem.categoryId}`}>
                            <div className="second-category-item-title">
                                {secondCategoryItem.categoryName}：
                            </div>
                            {secondCategoryItem?.labelInfoList?.length > 0 && (
                                <div className="second-category-item-box">
                                    <div
                                        style={{
                                            height: secondCategoryItem.isOpen ? 'auto' : 43,
                                        }}
                                        className="second-category-item-list"
                                        id={`id_${secondCategoryIndex}`}>
                                        {secondCategoryItem.labelInfoList.map(
                                            (thirdCategoryItem, thirdCategoryIndex) => {
                                                return (
                                                    <div
                                                        className={`third-category-item ${thirdCategoryItem.active
                                                            ? 'third-category-item-active'
                                                            : ''
                                                            }`}
                                                        key={`third_category_${thirdCategoryItem.id}`}
                                                        onClick={this.onChangeLabel(
                                                            secondCategoryItem.labelInfoList,
                                                            secondCategoryIndex,
                                                            thirdCategoryIndex,
                                                            thirdCategoryItem.active
                                                        )}>
                                                        {thirdCategoryItem.labelName}·
                                                        {thirdCategoryItem.subjectCount}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                    <div
                                        id={`second_id_${secondCategoryIndex}`}
                                        className="second-category-item-status"
                                        onClick={this.onChangeOpenStatus(
                                            secondCategoryIndex,
                                            secondCategoryItem.isOpen
                                        )}>
                                        <div className="second-category-item-type" style={{ fontSize: 12 }}>
                                            {secondCategoryItem.isOpen ? '收起' : '展开'}
                                        </div>
                                        <div className="second-category-item-icon" style={{ fontSize: 12 }}>
                                            {secondCategoryItem.isOpen ? (
                                                <UpOutlined />
                                            ) : (
                                                <DownOutlined />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
                {secondCategoryList?.length >= categoryShowCount && (
                    <Divider
                        onClick={this.onChangePutAway}
                        dashed
                        style={{
                            marginTop: 10,
                            fontSize: 13,
                        }}>
                        {isPutAway ? '展开' : '收起'}
                        {isPutAway ? (
                            <CaretDownOutlined style={{ marginLeft: 4 }} />
                        ) : (
                            <CaretUpOutlined style={{ marginLeft: 4 }} />
                        )}
                    </Divider>
                )}
            </div>
        );
    };
}

