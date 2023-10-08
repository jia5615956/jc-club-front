import React, { Component, Fragment } from "react";

import { Tag, Table, Pagination, Input } from "antd";
import { filterDifficulty, gradeObject, imgObject } from "./constant";
import { splicingQuery } from "@utils";
import "./index.less";
const { Search } = Input;

const colors = ['#ffffb8', '#f4ffb8', '#b5f5ec', '#bae0ff', '#d9f7be', '#efdbff', ' #ffd6e7', '#d6e4ff']

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "难度",
    };
  }

  componentDidMount() { }


  RandomNumBoth = (Min, Max) => {
    //差值
    const Range = Max - Min;
    // 随机数
    const Rand = Math.random();
    return Min + Math.round(Rand * Range); //四舍五入 
  }

  /**
   * 题目列表
   */
  questionColumns = [
    {
      title: <div style={{ display: 'flex' }}>题目 <div className="question-count-box" style={{ marginLeft: '10px', color: 'rgba(0, 0, 0, 0.5)' }}>
        （当前
        <span style={{ color: "rgba(0, 0, 0, 0.65)" }}> {100} </span>
        道题）
      </div></div>,
      key: "questionNo",
      align: "centlefter",
      render: (item) => {
        return (
          <div className="question-info-container">
            <div className="question-info-desc">
              {item.questionTitle}

            </div>
            <div className="question-info-tags">
              {item?.tags?.length > 0 &&
                item.tags.map((tagsItem, index) => {
                  return (
                    <div className="question-info-tag" key={index} style={{ backgroundColor: colors[this.RandomNumBoth(0, 7)] }}>
                      {tagsItem.name}
                    </div>
                  );
                })}
            </div>
          </div>
        );
      },
    },
    {
      title: "难度",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      filters: [
        {
          value: 0,
          text: '全部',
        },
        {
          value: 1,
          text: '初级',
        },
        {
          value: 2,
          text: '中级',
        },
        {
          value: 3,
          text: '高级',
        },
        {
          value: 4,
          text: '资深',
        },
      ],
      onFilter: (value, record) => {
        return value === 0 ? record : record.grade === value
      },
      width: 90,
      render: (key) => {
        return (
          <Tag color={gradeObject?.[key]?.color}>{gradeObject?.[key]?.title}</Tag>
        );
      },
    },
  ];

  /**
   * 选择标签
   * @param {*} id
   */
  handleChangeSelect = (id) => {
    console.log(id);
    let selectValue = "难度";
    if (id != 0) {
      filterDifficulty.forEach((item) => {
        if (item.id == id) {
          selectValue = item.id;
        }
      });
    }
    this.setState(
      {
        selectValue,
      },
      () => {
        this.props.handleChangeSelect(id);
      }
    );
  };

  /**
   * 进入详情
   * @param {*} item
   * @param {*} type
   * @returns
   */
  onChangeAction = (item, index) => () => {
    let { isNotToDetail, difficulty, primaryCategoryId, labelList, pageIndex } =
      this.props;
    !isNotToDetail &&
      this.props.history.push(
        splicingQuery("/brush-questions", {
          id: item?.id,
          index: index + (pageIndex - 1) * 10 + 1,
          difficulty,
          primaryCategoryId,
          labelList,
        })
      );
    if (!isNotToDetail) return;
    this.toChangeSelectRows(item);
  };

  toChangeSelectRows = (record) => {
    let newSelectedRows = [...this.props.selectRows];
    const isHas = newSelectedRows.some((rowItem) => rowItem.id === record.id);
    if (isHas) {
      newSelectedRows = newSelectedRows.filter(
        (rowItem) => rowItem.id !== record.id
      );
    } else {
      newSelectedRows.push(record);
    }
    this.props.setSelectRows(newSelectedRows);
  };

  onChangePagination = (e) => {
    this.props.onChangePagination(e);
  };

  render() {
    const { questionList, total, pageIndex, isHideSelect, isMultiple } =
      this.props;
    return (
      <Fragment>
        <div className="question-list-filter">
          {!isHideSelect && this.renderFilterContainer()}
          <div className="question-list-container">
            <Table
              onRow={(record, index) => {
                return {
                  onClick: this.onChangeAction(record, index), // 点击行
                };
              }}
              columns={this.questionColumns}
              dataSource={questionList}
              rowKey={(record) => record.id}
              // bordered={false}
              pagination={false}
              rowClassName="question-table-row"
            />
            {total > 10 && (
              <Pagination
                style={{
                  padding: "24px 0",
                  textAlign: "center",
                }}
                showQuickJumper
                defaultCurrent={pageIndex}
                total={total}
                onChange={this.onChangePagination}
              />
            )}
          </div>
        </div>
      </Fragment>
    );
  }

  /**
   * 过滤框-搜索框-模块
   * @returns
   */
  renderFilterContainer = () => {
    const { selectValue } = this.state;
    const { total, isShowSearch, setSearchStr } = this.props;
    return (
      <div className="question-filter-container">
        {isShowSearch && (
          <Search
            placeholder="请输入感兴趣的内容～"
            onSearch={(value) => setSearchStr(value)}
            style={{ width: 240 }}
            allowClear
            size="small"
          />
        )}
      </div>
    );
  };
}


export default QuestionList;