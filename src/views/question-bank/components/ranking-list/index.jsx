import React, { Fragment, Component } from 'react';

import req from '@utils/request';
import { mockRankingModuleList } from '../../mock';
import { imgObject, apiName, RankingType } from '../../constant';
import RankingBox from '../ranking-box';

const rankingBackImg = {
    0: imgObject.ranking1Img,
    1: imgObject.ranking2Img,
    2: imgObject.ranking3Img,
};
class RankingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleList: [],
            contributeType: 2,
            isLoading: true,
        };
    }

    componentDidMount() {
        this.getContributeList();
    }

    /**
     * 获得贡献榜
     */
    getContributeList() {
        // let params = {
        //     contributeType: this.contributeType,
        // };
        // req({
        //     method: 'post',
        //     data: params,
        //     url: apiName.getContributeList,
        // })
        //     .then((res) => {
        //         if (res.data && res.data.length > 0) {
        //             this.setState(
        //                 {
        //                     firstCategoryList: res.data,
        //                     isShowSpin: false,
        //                 },
        //                 () => {
        //                     this.getInterviewSubjectList();
        //                 }
        //             );
        //         } else {
        //             this.primaryCategoryId = '';
        //             this.setState({
        //                 isShowSpin: false,
        //             });
        //         }
        //     })
        //     .catch((err) => console.log(err));

        this.setState({
            moduleList: mockRankingModuleList[0].rankingList,
            isLoading: false,
        });
    }

    /**
     * 切换排行榜
     * @param {*} type
     * @returns
     */
    onChangeRanking = (type, index) => () => {
        let { moduleList } = this.state;
        moduleList[index].currentActive = type;
        this.setState(
            {
                moduleList,
                isLoading: true,
            },
            () => {
                this.getData();
            }
        );
    };

    onJump = (e) => () => {
        if (e === 2) {
            this.props.history.push('/upload-questions');
        } else {
            this.props.history.push('/practice-questions');
        }
    };

    render() {
        const { moduleList, isLoading, contributeType } = this.state;
        return (
            <Fragment>
                <RankingBox
                    isLoading={isLoading}
                    rankingList={moduleList}
                    currentActive={contributeType}
                    rankingType={RankingType.practice}
                    onHandleRanking={this.onChangeRanking}
                    onHandleJump={this.onChangeJump}
                />
            </Fragment>
        );
    }
}

export default RankingList;
