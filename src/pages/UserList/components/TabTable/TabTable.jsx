import React, { Component } from 'react';
import { Tabs , Card, Table } from 'antd';
import { API } from "@/api/index.js";
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';

const TabPane = Tabs.TabPane;

const tabs = [{ tab: '全部', key: 'all' }, { tab: '审核中', key: 'review' }];

export default class TabTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      tabKey: 'all',
    };
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 50,
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        width: 100,
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        width: 150,
      },
      {
        title: '用户组',
        dataIndex: 'group',
        key: 'group',
        width: 120,
      },
      {
        title: '评论数',
        dataIndex: 'commentNum',
        key: 'commentNum',
        width: 80,
      },
      {
        title: '注册时间',
        dataIndex: 'regTime',
        key: 'regTime',
        width: 150,
      },
      {
        title: '最后登录时间',
        dataIndex: 'LastLoginTime',
        key: 'LastLoginTime',
        width: 150,
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
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
  }

  componentDidMount() {
    API.getUserListM().then(response =>{ 
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
    const { dataSource, tabKey } = this.state;
    return (
      <div className="tab-table">
        <Card>
          {/* <Tabs onChange={this.handleTabChange}>
            {tabs.map((item) => {
              return (
                <TabPane tab={item.tab} key={item.key}>
                  <Table columns={this.columns} dataSource={dataSource[tabKey]} />
                </TabPane>
              );
            })}
          </Tabs> */}
          <Table columns={this.columns} dataSource={dataSource[tabKey]} />
        </Card>
      </div>
    );
  }
}
