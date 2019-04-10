import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';

const dataSource = {
  chartData: [
    { month: '1 月', users: 38 },
    { month: '2 月', users: 52 },
    { month: '3 月', users: 61 },
    { month: '4 月', users: 115 },
    { month: '5 月', users: 48 },
    { month: '6 月', users: 38 },
    { month: '7 月', users: 48 },
    { month: '8 月', users: 58 },
    { month: '9 月', users: 68 },
    { month: '10 月', users: 88 },
    { month: '11 月', users: 98 },
    { month: '12 月', users: 68 },
  ],
  statisticData: [
    {
      name: '今日注册',
      value: '12678',
      img: {
        width: 35,
        height: 32,
        url: require('./images/TB1fTidceuSBuNjy1XcXXcYjFXa-70-64.png'),
      },
    },
    {
      name: '今日登录',
      value: '22139',
      img: {
        width: 30,
        height: 31,
        url: require('./images/TB1fnidceuSBuNjy1XcXXcYjFXa-60-62.png'),
      },
    },
    {
      name: '今日订阅',
      value: '35623',
      img: {
        width: 28,
        height: 27,
        url: require('./images/TB1gDidceuSBuNjy1XcXXcYjFXa-56-54.png'),
      },
    },
    {
      name: '今日评论',
      value: '16826',
      img: {
        width: 28,
        height: 26,
        url: require('./images/TB1hDidceuSBuNjy1XcXXcYjFXa-56-52.png'),
      },
    },
    {
      name: '七日新增',
      value: '25%',
      img: {
        width: 35,
        height: 32,
        url: require('./images/TB11FFTcgmTBuNjy1XbXXaMrVXa-70-64.png'),
      },
    },
    {
      name: '七日活跃',
      value: '68%',
      img: {
        width: 28,
        height: 28,
        url: require('./images/TB1h_1jcamWBuNjy1XaXXXCbXXa-56-56.png'),
      },
    },
  ],
};

export default class DataStatistics extends Component {
  static displayName = 'DataStatistics';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const cols = {
      users: { tickInterval: 20 },
    };

    return (
      <Card style={{ width: '100%', marginBottom: '20px' }}>
        <h4 style={styles.title}>用户活跃趋势</h4>
        <Row wrap>
          <Col span={16}>
            <Chart
              height={300}
              padding={[40, 10, 40, 35]}
              data={dataSource.chartData}
              scale={cols}
              forceFit
            >
              <Axis name="month" />
              <Axis name="value" />
              <Tooltip crosshairs={{ type: 'y' }} />
              <Geom type="interval" position="month*users" />
            </Chart>
          </Col>
          <Col span={8} style={{ background: '#fff' }}>
            <ul style={styles.items}>
              {dataSource.statisticData.map((item, index) => {
                return (
                  <li key={index} style={styles.itemBox}>
                    <div style={styles.itemIcon}>
                      <img
                        src={item.img.url}
                        style={{
                          width: item.img.width,
                          height: item.img.height,
                        }}
                        alt=""
                      />
                    </div>
                    <div style={styles.itemText}>
                      <div style={styles.name}>{item.name}</div>
                      <div style={styles.value}>{item.value}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Col>
        </Row>
      </Card>
    );
  }
}

const styles = {
  container: {
    width: '100%',
  },
  title: {
    color: '#333',
    margin: 0,
    fontSize: '16px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
    paddingBottom: '15px',
  },
  items: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '30px',
    flexDirection: 'row',
  },
  itemBox: {
    width: '50%',
    display: 'flex',
    marginTop: '50px',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemIcon: {
    marginRight: '10px',
  },
  icon: {
    color: 'gray',
  },
  value: {
    color: 'red',
    fontSize: '20px',
  },
  name: {
    fontSize: '12px',
  }
}
