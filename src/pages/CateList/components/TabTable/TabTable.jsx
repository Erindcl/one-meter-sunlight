import React, { Component } from 'react';
import { Card, Table } from 'antd';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';

const MOCK_DATA = [
  {
    name: 'love',
    nameC: '爱情',
    articleNum: '15',
  },
  {
    name: 'travel',
    nameC: '旅行',
    articleNum: '16',
  },
  {
    name: 'friend',
    nameC: '友情',
    articleNum: '10',
  },
  {
    name: 'changeLife',
    nameC: '交换人生',
    articleNum: '26',
  },
  {
    name: 'dateStory',
    nameC: '相亲故事',
    articleNum: '18',
  },
  {
    name: 'motivational',
    nameC: '生活励志',
    articleNum: '6',
  },
  {
    name: 'family',
    nameC: '亲情',
    articleNum: '39',
  },
  {
    name: 'growth',
    nameC: '成长',
    articleNum: '52',
  },
  {
    name: 'embarrass',
    nameC: '糗事一箩筐',
    articleNum: '21',
  },
  {
    name: 'profession',
    nameC: '职业',
    articleNum: '28',
  }
];

export default class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: MOCK_DATA,
    };
    this.columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: 150,
      },
      {
        title: '中文名',
        dataIndex: 'nameC',
        key: 'nameC',
        width: 150,
      },
      {
        title: '文章数',
        width: 150,
        dataIndex: 'articleNum',
        key: 'articleNum',
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
  }

  getFormValues = (dataIndex, values) => {
    const { dataSource } = this.state;
    dataSource[dataIndex] = values;
    this.setState({
      dataSource,
    });
  };

  handleRemove = (value, index) => {
    const { dataSource } = this.state;
    dataSource.splice(index, 1);
    this.setState({
      dataSource,
    });
  };

  render() {
    return (
      <div className="tab-table">
        <Card>
          <Table columns={this.columns} dataSource={this.state.dataSource} />
        </Card>
      </div>
    );
  }
}
