import React from 'react';
import { Popover, Spin } from 'antd';
import { debounce } from '@utils';
import { imgObject, RankingTypeText, RankingTypeBtnText } from '../../constant';
import './index.less';
import { message } from 'antd';

const rankingBackImg = {
    0: imgObject.ranking1Img,
    1: imgObject.ranking2Img,
    2: imgObject.ranking3Img,
};

export default function RankingBox(props) {
    const { isLoading, currentActive, rankingList, rankingType } = props;
    const onChangeRanking = (type) =>
        debounce(() => {
            props.onHandleRanking && props.onHandleRanking(type);
        });
    const onJump = debounce(() => {
        message.destroy()
        return message.info('敬请期待')
        props.onHandleJump && props.onHandleJump();
    });
    return (
        <div className="ranking-list-box">
            <div className="ranking-list-header">
                <div className="ranking-list-title">{RankingTypeText[rankingType]}</div>
                <div className="ranking-list-btns">
                    <div
                        onClick={onChangeRanking(1)}
                        className={`ranking-list-btn ${currentActive === undefined || currentActive === 1
                            ? 'ranking-list-btn-active'
                            : ''
                            }`}>
                        本月排行
                    </div>
                    <div
                        onClick={onChangeRanking(2)}
                        className={`ranking-list-btn ${currentActive === 2 ? 'ranking-list-btn-active' : ''
                            }`}>
                        总排行
                    </div>
                </div>
            </div>
            <Spin spinning={isLoading}>
                <div className="ranking-list">
                    {rankingList?.length > 0 &&
                        rankingList.map((item, index) => {
                            return (
                                <div className="ranking-item" key={item.id}>
                                    <div className="ranking-left">
                                        <div
                                            className="ranking-icon"
                                            style={{
                                                backgroundImage: `url(${rankingBackImg[index]})`,
                                            }}>
                                            {index + 1}
                                        </div>
                                        <div className="ranking-head-img">
                                            <img src={item.headImg} className="ranking-head-icon" />
                                        </div>
                                        <Popover
                                            title={
                                                <div>
                                                    {item.name}
                                                </div>
                                            }
                                            content={
                                                <div className="tooltip-info">
                                                    <div>{item.erp}</div>
                                                    <div>{item.organizationFullName}</div>
                                                </div>
                                            }>
                                            <div className="ranking-info">
                                                <div className="ranking-name">{item.name}</div>
                                                <div className="ranking-department">
                                                    {item.organizationName}
                                                </div>
                                            </div>
                                        </Popover>
                                    </div>
                                    <div className="ranking-right">🔥 {item.count}</div>
                                </div>
                            );
                        })}
                </div>
            </Spin>
            <div className="ranking-btn-go" onClick={onJump}>
                <div
                    className="ranking-btn-go-icon"
                    style={{
                        backgroundImage: `url(${imgObject.clickImg})`,
                    }}></div>
                <div className="ranking-btn-text">{RankingTypeBtnText[rankingType]}</div>
            </div>
        </div>
    );
}
