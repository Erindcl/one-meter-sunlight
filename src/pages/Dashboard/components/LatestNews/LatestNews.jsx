import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import cx from 'classnames';

import './LatestNews.scss';
import './index.module.scss';

const dataSource = {
  articles: [
    {
      title: '三个想开旧书店的女孩儿',
      time: '2019-03-22',
    },
    {
      title: '高墙内 ',
      time: '2019-03-22',
    },
    {
      title: '在苏州的老房子里，有你想要的小日子',
      time: '2019-03-17',
    },
    {
      title: '四个客人的寿司店',
      time: '2019-03-17',
    },
    {
      title: '捡到手机之后',
      time: '2019-03-17',
    },
    {
      title: '合租奇葩惊魂曲',
      time: '2019-03-17',
    },
  ],
  comments: [
    {
      title: '这样的小日子，如果是每一天该有多好。',
      time: '2019-05-06 22:04:36',
      num: '0',
    },
    {
      title: '青春里面的小时光最纯粹，超级怀念！',
      time: '2019-05-06 12:34:30',
      num: '2',
    },
    {
      title: '相亲都能遇到这么好的人，真的是缘分呀。真的是缘分来了挡都挡不住的',
      time: '2019-05-03 21:11:03',
      num: '10',
    }
  ],
};

export default class LatestNews extends Component {
  static displayName = 'LatestNews';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={cx('container', 'latest-news')}>
        <Row wrap gutter="20">
          <Col span={12}>
            <Card className={'cardContainer'}>
              <h3 className={'cardTitle'}>
                最新文章
                <a href="#" className={cx('more', 'link')}>
                  更多
                </a>
              </h3>
              <div className={'items'}>
                {dataSource.articles.map((item, index) => {
                  return (
                    <a key={index} href="#" className={cx('item', 'link')}>
                      <div className={'itemTitle'}>{item.title}</div>
                      <div className={'itemTime'}>{item.time}</div>
                    </a>
                  );
                })}
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card className={'cardContainer'}>
              <h3 className={'cardTitle'}>
                最新评论
                <a href="#" className={cx('more', 'link')}>
                  更多
                </a>
              </h3>
              <div className={'items'}>
                {dataSource.comments.map((item, index) => {
                  return (
                    <a key={index} href="#" className={cx('item', 'link')}>
                      <div className={'itemComment'}>
                        <div className={'commentTitle'}>{item.title}</div>
                        <div className={'commentTime'}>{item.time}</div>
                      </div>
                      <div className={'commentNum'}>{item.num}</div>
                    </a>
                  );
                })}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
