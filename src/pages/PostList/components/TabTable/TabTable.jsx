import React, { Component } from 'react';
import { Tabs , Card, Table } from 'antd';
import { API } from "@/api/index.js";
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';

const TabPane = Tabs.TabPane;

const tabs = [
  { tab: '全部', key: 'all' },
  { tab: '已发布', key: 'released' },
  { tab: '审核中', key: 'review' },
  { tab: '已拒绝', key: 'rejected' },
];

export default class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  state = {
    dataSource: {},
    tabKey: 'all',
  };

  componentDidMount() {
    API.getTabTable().then(response =>{ 
      this.setState({
        dataSource: response.data,
      });
    });
  }

  getFormValues = (dataIndex, values) => {
    const { dataSource, tabKey } = this.state;
    dataSource[tabKey][dataIndex] = values;
    this.setState({
      dataSource,
    });
  };

  handleRemove = (value, index) => {
    const { dataSource, tabKey } = this.state;
    dataSource[tabKey].splice(index, 1);
    this.setState({
      dataSource,
    });
  };

  handleTabChange = (key) => {
    this.setState({
      tabKey: key,
    });
  };

  render() {
    const { dataSource } = this.state;
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: 200,
      },
      {
        title: '作者',
        dataIndex: 'author',
        key: 'author',
        width: 150,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 150,
      },
      {
        title: '发布时间',
        dataIndex: 'date',
        key: 'date',
        width: 150,
      },
      {
        title: '操作',
        key: 'action',
        width: 150,
        render: (value, index, record) => {
          return (
            <span>
              <EditDialog
                index={index}
                record={record}
                getFormValues={this.getFormValues}
              />
              <DeleteBalloon
                handleRemove={() => this.handleRemove(value, index, record)}
              />
            </span>
          );
        },
      },
    ];

    return (
      <div className="tab-table">
        <Card>
          <Tabs onChange={this.handleTabChange}>
            {tabs.map((item) => {
              return (
                <TabPane tab={item.tab} key={item.key}>
                  <Table columns={columns} dataSource={dataSource[this.state.tabKey]} />
                </TabPane>
              );
            })}
          </Tabs>
        </Card>
      </div>
    );
  }
}
