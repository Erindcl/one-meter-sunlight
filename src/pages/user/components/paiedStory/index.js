import React, { Component } from "react";
import "./style.scss";
import { Card, Pagination } from 'antd';

export default class PaiedStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      total: 22,
      pageSize: 20
    };
  }
  componentDidMount() {
    
  }

  handlePageChange = (page, pageSize) => {
    this.setState({ pageNo: page }, () => {
      // this.getStoryList();
    })
  }

  render() {
    const { pageNo, total, pageSize }=this.state;
    return (
      <div className="paied-story">
        <Card
          type="inner"
          title="2019-04-04 12:15:45"
          extra={<a href="#">查看</a>}
        >
          <div className="story-item-box">
            <div className="img-box">
              <img src={require('assets/imgs/t6.jpg')}></img>
            </div>
            <div className="infor">
              <div className="title">咖啡店那一角的风景</div>
              <div className="corn">米币： 30</div>
            </div>
          </div>
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="2019-04-04 12:15:45"
          extra={<a href="#">查看</a>}
        >
          <div className="story-item-box">
            <div className="img-box">
              <img src={require('assets/imgs/t3.jpg')}></img>
            </div>
            <div className="infor">
              <div className="title">咖啡店那一角的风景</div>
              <div className="corn">米币： 30</div>
            </div>
          </div>
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="2019-04-04 12:15:45"
          extra={<a href="#">查看</a>}
        >
          <div className="story-item-box">
            <div className="img-box">
              <img src={require('assets/imgs/t1.jpg')}></img>
            </div>
            <div className="infor">
              <div className="title">咖啡店那一角的风景</div>
              <div className="corn">米币： 30</div>
            </div>
          </div>
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="2019-04-04 12:15:45"
          extra={<a href="#">查看</a>}
        >
          <div className="story-item-box">
            <div className="img-box">
              <img src={require('assets/imgs/t4.jpg')}></img>
            </div>
            <div className="infor">
              <div className="title">咖啡店那一角的风景</div>
              <div className="corn">米币： 30</div>
            </div>
          </div>
        </Card>
        <dvi className="pagination-box">
          <Pagination current={pageNo} onChange={this.handlePageChange} total={total} pageSize={pageSize} />
        </dvi>
      </div>
    );
  }
}
