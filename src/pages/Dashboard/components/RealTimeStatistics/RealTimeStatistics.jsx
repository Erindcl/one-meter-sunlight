import React, { Component } from 'react';
import { Row, Col } from 'antd';

export default class RealTimeStatistics extends Component {
  static displayName = 'RealTimeStatistics';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="real-time-statistics">
        <Row style={styles.items}>
          <Col span={6} style={styles.paddingJustright}>
            <div style={{ ...styles.itemBody, ...styles.lightBlue }}>
              <div style={styles.itemTitle}>
                <p style={styles.titleText}>分类统计</p>
                <span style={styles.tag}>实时</span>
              </div>
              <div style={styles.itemContent}>
                <h2 style={styles.itemNum}>16</h2>
                <div style={styles.itemMeta}>
                  <p style={styles.desc}>当前分类总记录数</p>
                </div>
              </div>
            </div>
          </Col>
          <Col span={6} style={styles.paddingBoth}>
            <div style={{ ...styles.itemBody, ...styles.orange }}>
              <div style={styles.itemTitle}>
                <p style={styles.titleText}>交易统计</p>
                <span style={styles.tag}>实时</span>
              </div>
              <div style={styles.itemContent}>
                <h2 style={styles.itemNum}>246</h2>
                <div style={styles.itemMeta}>
                  <p style={styles.desc}>当前完成的交易数</p>
                </div>
              </div>
            </div>
          </Col>
          <Col span={6} style={styles.paddingBoth}>
            <div style={{ ...styles.itemBody, ...styles.green }}>
              <div style={styles.itemTitle}>
                <p style={styles.titleText}>故事统计</p>
                <span style={styles.tag}>实时</span>
              </div>
              <div style={styles.itemRow}>
                <div style={styles.itemCol}>
                  <h2 style={styles.itemNum}>120</h2>
                  <p style={styles.desc}>上新总数</p>
                </div>
                <div style={styles.itemCol}>
                  <h2 style={styles.itemNum}>141</h2>
                  <p style={styles.desc}>加入购物车数</p>
                </div>
              </div>
            </div>
          </Col>
          <Col span={6} style={styles.paddingJustLeft}>
            <div style={{ ...styles.itemBody, ...styles.lightRed }}>
              <div style={styles.itemTitle}>
                <p style={styles.titleText}>评论统计</p>
                <span style={styles.tag}>实时</span>
              </div>
              <div style={styles.itemRow}>
                <div style={styles.itemCol}>
                  <h2 style={styles.itemNum}>207</h2>
                  <p style={styles.desc}>评论总次数</p>
                </div>
                <div style={styles.itemCol}>
                  <h2 style={styles.itemNum}>263</h2>
                  <p style={styles.desc}>点赞次数</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const styles = {
  item: {
    marginBottom: '20px',
  },
  itemBody: {
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '4px',
    color: '#fff',
  },
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    position: 'relative',
  },
  titleText: {
    margin: 0,
    fontSize: '14px',
    color: '#fff',
  },
  tag: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: '2px 4px',
    borderRadius: '4px',
    fontSize: '12px',
    background: 'rgba(255, 255, 255, 0.3)',
  },
  itemNum: {
    margin: '16px 0',
    fontSize: '32px',
    color: '#fff',
  },
  total: {
    margin: 0,
    fontSize: '12px',
  },
  desc: {
    margin: 0,
    fontSize: '12px',
    color: '#fff',
  },
  green: {
    background: '#58ca9a',
  },
  lightBlue: {
    background: '#5e83fb',
  },
  orange: {
    background: '#f7da47',
  },
  lightRed: {
    background: '#ee706d',
  },
  paddingBoth: {
    padding: '0px 10px'
  },
  paddingJustLeft: {
    padding: '0px 0px 0px 10px'
  },
  paddingJustright: {
    padding: '0px 10px 0px 0px'
  }
};