import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import cx from 'classnames';

import './LatestNews.scss';
import './index.module.scss';

const dataSource = {
  articles: [
    {
      title: '这里是文章的标题1',
      time: '2018-03-31',
    },
    {
      title: '这里是文章的标题2',
      time: '2018-02-02',
    },
    {
      title: '这里是文章的标题3',
      time: '2018-01-22',
    },
    {
      title: '这里是文章的标题4',
      time: '2018-02-02',
    },
    {
      title: '这里是文章的标题5',
      time: '2018-01-22',
    },
    {
      title: '这里是文章的标题6',
      time: '2018-02-02',
    },
  ],
  comments: [
    {
      title: '这里是最新的评论1',
      time: '2018-02-26',
      num: '18',
    },
    {
      title: '这里是最新的评论2',
      time: '2018-01-22',
      num: '22',
    },
    {
      title: '这里是最新的评论3',
      time: '2018-01-18',
      num: '36',
    },
    {
      title: '这里是最新的评论4',
      time: '2018-01-18',
      num: '29',
    },
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
