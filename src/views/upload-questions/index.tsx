import React, { Component } from 'react';
import { Card } from 'antd';
import SingleBox from './pages/single-box';
import BatchleBox from './pages/batch-box';
import './index.less';
const tabList = [
    {
        key: 'singleBox',
        tab: '单题录入',
    },
    // {
    //     key: 'batchBox',
    //     tab: '批量导入',
    // },
];
export default class UploadQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = { currentKey: 'singleBox' };
    }

    contentList = {
        singleBox: <SingleBox />,
        batchBox: <BatchleBox />,
    };

    onTabChange = (e) => {
        this.setState({
            currentKey: e,
        });
    };
    render() {
        const { currentKey } = this.state;
        return (
            <div className="upload-questions-box">
                <Card
                    style={{ width: '100%' }}
                    tabList={tabList}
                    bordered={false}
                    activeTabKey={currentKey}
                    onTabChange={(key) => {
                        this.onTabChange(key, 'key');
                    }}>
                    {this.contentList[currentKey]}
                </Card>
            </div>
        );
    }
}
