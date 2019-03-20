import React, { Component } from 'react';
import { Popover, Icon, Row, Col, Card } from 'antd';

const dataSource = [
  {
    text: '昨日浏览次数',
    number: '6,657',
    imgUrl: require('./images/TB1tlVMcgmTBuNjy1XbXXaMrVXa-140-140.png'),
    desc: '相关说明',
  },
  {
    text: '总访问数',
    number: '12,896',
    imgUrl: require('./images//TB1Py4_ceuSBuNjy1XcXXcYjFXa-142-140.png'),
    desc: '相关说明',
  },
  {
    text: '总订阅数',
    number: '9,157',
    imgUrl: require('./images/TB1Ni4_ceuSBuNjy1XcXXcYjFXa-142-140.png'),
    desc: '相关说明',
  },
  {
    text: '总收入数',
    number: '6,682',
    imgUrl: require('./images/TB1iFKccamWBuNjy1XaXXXCbXXa-140-140.png'),
    desc: '相关说明',
  },
];

export default class StatisticalCard extends Component {
  static displayName = 'StatisticalCard';

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    
  }

  renderItem = () => {
    return dataSource.map((data, idx) => {
      return (
        <Col span={6} key={idx}>
          <div style={styles.statisticalCardItem}>
            <div style={styles.circleWrap}>
              <img src={data.imgUrl} style={styles.imgStyle} alt="图片" />
            </div>
            <div style={styles.statisticalCardDesc}>
              <div style={styles.statisticalCardText}>
                {data.text}
                <Popover content={data.desc}>
                    <span>
                      <Icon type="question-circle" style={styles.helpIcon} size="xs" />
                    </span>
                </Popover>
              </div>
              <div style={styles.statisticalCardNumber}>{data.number}</div>
            </div>
          </div>
        </Col>
      );
    });
  };

  render() {
    return (
      <Card style={styles.container}>
        <Row wrap>{this.renderItem()}</Row>
      </Card>
    );
  }
}

const styles = {
  container: {
    padding: '10px 20px',
    width: '100%',
    margin: '0px 0px 20px'
  },
  statisticalCardItem: {
    display: 'flex',
    padding: '10px 0',
    justifyContent: 'center',
  },
  circleWrap: {
    width: '70px',
    height: '70px',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    marginRight: '10px',
    borderRadius: '50%',
    justifyContent: 'center',
  },
  imgStyle: {
    maxWidth: '100%'
  },
  helpIcon: {
    color: '#b8b8b8',
    marginLeft: '5px',
  },
  statisticalCardDesc: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  statisticalCardText: {
    color: '#666',
    position: 'relative',
    fontSize: '12px',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  statisticalCardNumber: {
    color: '#666',
    fontSize: '24px',
  },
  itemHelp: {
    top: '1px',
    width: '12px',
    right: '-15px',
    height: '12px',
    position: 'absolute',
  }
  
}
