import React, { Component, Fragment } from 'react';
import { Input, Modal, message, Spin } from 'antd';

import req from '@utils/request';
import { debounce } from '@utils';
import KindEditor from '../kind-editor';
import RankLabelBox from '../rank-label-box';
import RepeatContentBox from '../repeat-content-box';
import { apiName } from '../../constant';
import './index.less';

export default class BriefQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjectName: '', // 题目
            isDisabledSubmit: true, //是否禁止输入
            isShowModalBox: false, // 是否展示重复率弹框
            isSubmit: true, // 是否支持提交
        };
    }
    kindEditor = KindEditor | null;
    rankLabelBox = RankLabelBox | null;
    rankId = 1; //职级
    subjectAnswer = ''; // 答案
    firstCategoryValue = ''; // 一级分类的值
    secondCategoryValue = []; // 二级分类的值
    thirdCategoryValue = []; // 三级标签的值
    repeatInfo = {}; // 重复率

    /**
     * 输入题目
     * @param {*} e
     */
    onChangeSubjectName = (e) => {
        let str = e.target.value.trim();
        this.setState(
            {
                subjectName: str,
            },
            () => {
                this.rankLabelBox.getThirdCategoryList();
                let isDisabledSubmit = this.checkData();
                this.setState({
                    isDisabledSubmit,
                });
            }
        );
    };

    /**
     * 富文本编辑器
     * @param {*} e
     */
    onChangeEditor = (e) => {
        this.subjectAnswer = e;
        let isDisabledSubmit = this.checkData();
        this.setState({
            isDisabledSubmit,
        });
    };

    /**
     * 一次确认录入
     */
    onSubmit = debounce(() => {
        const { subjectName, isDisabledSubmit, isSubmit } = this.state;
        if (isDisabledSubmit || !isSubmit) {
            return;
        }
        // if (!isSubmit) {
        //     return;
        // }
        if (!!!subjectName) {
            message.warning('请输入题目名称');
            return;
        }
        if (!!!this.subjectAnswer) {
            message.warning('请输入题目答案');
            return;
        }
        if (!!!this.firstCategoryValue) {
            message.warning('请选择一级分类');
            return;
        }
        if (this.secondCategoryValue.length <= 0) {
            message.warning('请选择二级分类');
            return;
        }
        if (this.thirdCategoryValue.length <= 0) {
            message.warning('请选择三级标签');
            return;
        }
        this.setState({
            isSubmit: false,
        });
        let params = {
            subjectName: subjectName,
            difficulty: this.rankId,
            subjectType: 4,
            subjectScore: 1,
            subjectAnswer: this.subjectAnswer,
            categoryIds: this.secondCategoryValue,
            labelIds: this.thirdCategoryValue,
        };
        console.log('录入 ----', params);
        req({
            method: 'post',
            data: params,
            url: apiName.addInterviewSubject,
        })
            .then((res) => {
                this.repeatInfo = {};
                if (res.data && res.data.insertStatus) {
                    this.setState(
                        {
                            isSubmit: true,
                        },
                        () => {
                            this.successModalConfirm();
                        }
                    );
                } else if (!res.data.insertStatus) {
                    this.repeatInfo = {
                        repeatDocId: res.data.docId, // 重复题目id
                        repeatRate: res.data.repeatRate, // 重复率
                        repeatSubjectName: res.data.subjectName, // 重复题目
                        repeatSubjectAnswe: res.data.subjectAnswer, // 重复答案
                        repeatSetterErp: res.data.subjectSetterErp, // 出题人erp
                        repeatSetterName: res.data.subjectSetterName, // 出题人姓名
                    };
                    this.setState({
                        isShowModalBox: true,
                        isSubmit: true,
                    });
                }
            })
            .catch((err) => {
                this.setState({
                    isSubmit: true,
                });
                console.log(err);
            });
    });

    /**
     * 校验是否支持点击按钮
     * @returns
     */
    checkData = () => {
        const { subjectName } = this.state;
        let isDisabledSubmit = false;
        if (
            !!!subjectName ||
            !!!this.subjectAnswer ||
            !!!this.firstCategoryValue ||
            this.secondCategoryValue.length <= 0 ||
            this.thirdCategoryValue.length <= 0
        ) {
            isDisabledSubmit = true;
        }
        return isDisabledSubmit;
    };

    /**
     * 取消
     */
    onCancel = () => {
        this.subjectAnswer = ''; // 答案
        this.rankId = 1;
        this.firstCategoryValue = '';
        this.secondCategoryValue = [];
        this.thirdCategoryValue = [];
        this.repeatInfo = {};
        this.kindEditor.onClear();
        this.rankLabelBox.initRankLabel();
        this.setState({
            subjectName: '',
            isShowModalBox: false,
            isSubmit: true, // 是否支持提交
        });
    };

    /**
     * 重复率弹框-确认录入
     */
    onSubmitRepeatModal = debounce(
        () => {
            let params = {
                docId: this.repeatInfo.repeatDocId,
            };
            req({
                method: 'post',
                data: params,
                url: apiName.addRepeatInterviewSubject,
            })
                .then((res) => {
                    if (res.data) {
                        this.successModalConfirm();
                    } else {
                        message.info('请再次确认');
                    }
                })
                .catch((err) => {
                    console.log(err);
                    message.error('请再次确认');
                });
        },
        300,
        true
    );

    /**
     * 重复率弹框-取消录入
     */
    onCancelRepeatModal = () => {
        this.repeatInfo = {};
        this.setState({
            isShowModalBox: false,
        });
    };

    /**
     * 录入成功的弹框
     */
    successModalConfirm = () => {
        Modal.confirm({
            title: (
                <div
                    style={{
                        textAlign: 'center',
                        color: 'rgba(60, 110, 238, 1)',
                        fontSize: 16,
                    }}>
                    录入成功！贡献榜火力值 + 1
                </div>
            ),
            closable: false,
            maskClosable: false,
            icon: ' ',
            onOk: this.onAgainSuccessModal,
            onCancel: this.onGoHomeSuccessModal,
            okText: '再录一题',
            cancelText: '去首页',
            className: 'questions-success-modal-confirm',
        });
    };

    /**
     * 录入成功弹框-再来一题
     */
    onAgainSuccessModal = () => {
        this.onCancel();
    };

    /**
     * 录入成功弹框-去首页
     */
    onGoHomeSuccessModal = () => {
        window.location.href = '/cms-supplier/question-bank';
    };

    /**
     * 分类选择
     * @param {*} e
     */
    onChangeRankLabel = (firstCategoryValue, secondCategoryValue, thirdCategoryValue) => {
        this.firstCategoryValue = firstCategoryValue; // 一级分类的值
        this.secondCategoryValue = secondCategoryValue; // 二级分类的值
        this.thirdCategoryValue = thirdCategoryValue; // 三级标签的值
        let isDisabledSubmit = this.checkData();
        this.setState({
            isDisabledSubmit,
        });
    };

    /**
     * 职级选择
     * @param {*} list
     */
    handleChangeRank = (list) => {
        this.rankId = list[0];
        let isDisabledSubmit = this.checkData();
        this.setState({
            isDisabledSubmit,
        });
    };

    render() {
        const { subjectName, isDisabledSubmit, isSubmit, isShowModalBox } = this.state;
        const { questionsType } = this.props;
        // this.successModalConfirm();

        return (
            <Spin spinning={!isSubmit}>
                <Fragment>
                    <div className="brief-questions-container">
                        <div className="brief-questions-title">题目名称：</div>
                        <div className="brief-questions-main">
                            <Input
                                placeholder="输入题目"
                                className="brief-questions-input"
                                value={subjectName}
                                maxLength={64}
                                onChange={this.onChangeSubjectName}
                            />
                        </div>
                    </div>
                    <div className="brief-questions-container">
                        <div className="brief-questions-title">题目答案：</div>
                        {/* {this.reanderAnser()} */}
                    </div>
                    <RankLabelBox
                        // ref={(ref) => {
                        //     this.rankLabelBox = ref;
                        // }}
                        subjectName={subjectName}
                        onChangeRankLabel={this.onChangeRankLabel}
                        handleChangeRank={this.handleChangeRank}
                    />
                    <div className="brief-questions-btns-container">
                        <div className="brief-questions-btn" onClick={this.onCancel}>
                            清空
                        </div>
                        <div
                            className={`brief-questions-btn brief-questions-submit ${isDisabledSubmit && 'brief-questions-disabled-submit'
                                }`}
                            onClick={this.onSubmit}>
                            提交
                        </div>
                    </div>
                    <RepeatContentBox
                        isShowModalBox={isShowModalBox}
                        repeatQuestionsType={questionsType}
                        repeatInfo={this.repeatInfo}
                        handleSubmitRepeatModal={this.onSubmitRepeatModal}
                        handleCancelRepeatModal={this.onCancelRepeatModal}
                    />
                </Fragment>
            </Spin>
        );
    }

    /**
     * 问答题-答案
     */
    reanderAnser = () => {
        return (
            <div className="brief-questions-main">
                <KindEditor
                    onChange={this.onChangeEditor}
                    ref={(ref) => {
                        this.kindEditor = ref;
                    }}
                />
            </div>
        );
    };
}

