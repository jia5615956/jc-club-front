import React, { Fragment, Component } from 'react';
// import { withRouter } from 'react-router-dom';
import req from '@utils/request';
import RankingBox from '../ranking-box';
import { apiName, RankingType } from '../../constant';
import { mockRankingModuleList } from '../../mock';

class ContributionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contributionList: mockRankingModuleList[1].rankingList || [],
            contributeType: 0,
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
        req({
            method: 'post',
            data: {},
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
     * @param {*} index
     * @returns
     */
    onChangeRanking = (index) => {
        console.log(index, 'contribute index')

        this.setState({
            contributeType: index,
        });
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
                        contributionList={contributionList}
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
