import React, { Fragment, Component } from 'react';
import req from '@utils/request';
import RankingBox from '../ranking-box';
import { imgObject, apiName, RankingType } from '../../constant';
import { mockRankingModuleList } from '../../mock';

const rankingBackImg = {
    0: imgObject.ranking1Img,
    1: imgObject.ranking2Img,
    2: imgObject.ranking3Img,
};

class ContributionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contributionList: mockRankingModuleList[1].rankingList || [],
            contributeType: 1,
            isLoading: false,
        };
    }

    componentDidMount() {
        // this.getContributeList();
    }

    /**
     * 获得贡献榜
     */
    getContributeList() {
        const { contributeType } = this.state;
        let params = {
            contributeType: contributeType,
        };
        req({
            method: 'post',
            data: params,
            url: apiName.getContributeList,
        })
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    this.setState({
                        contributionList: res.data,
                        isLoading: false,
                    });
                } else {
                    this.setState({
                        contributionList: [],
                        isLoading: false,
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    /**
     * 切换排行榜
     * @param {*} type
     * @returns
     */
    onChangeRanking = (type) => {
        this.setState(
            {
                contributeType: type,
                isLoading: true,
            },
            () => {
                this.getContributeList();
            }
        );
    };

    /**
     * 去录题
     */
    onChangeJump = () => {
        this.props.history.push('/upload-questions');
    };

    render() {
        const { contributionList, isLoading, contributeType } = this.state;
        return (
            <Fragment>
                {contributionList?.length > 0 && (
                    <RankingBox
                        isLoading={isLoading}
                        rankingList={contributionList}
                        currentActive={contributeType}
                        rankingType={RankingType.contribution}
                        onHandleRanking={this.onChangeRanking}
                        onHandleJump={this.onChangeJump}
                    />
                )}
            </Fragment>
        );
    }
}

export default ContributionList;
