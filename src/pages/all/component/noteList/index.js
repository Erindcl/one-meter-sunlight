import React, { Component } from "react";
import { Card, Col, Row } from 'antd';
import "./style.scss";

const { Meta } = Card;

export default class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
    
  }

  redirect = (item) => {
    this.props.redirectTo(item._id);
  }
  render() {
    const { listData }=this.props;
    return (
      <div className="note-list">
        <Row wrap gutter={12}>
          {listData.map((item,index) => {
            let coverSrc = require(`assets/imgs/article/${item.coverPic}`);
            console.log("coverSrc")
            console.log(coverSrc)
            return (
              <Col span={6} onClick={this.redirect.bind(this,item)}>
                <Card 
                bordered={false} 
                hoverable
                className="card-margin-bottom"
                cover={<img style={{ width: '100%', height: '100%' }} alt="example" src={coverSrc} />}
                >
                  <Meta
                    title={item.title}
                    description={`浏览:${item.watchCount}  评论:${item.remarkGroup && item.remarkGroup.length}  币:${item.payCorn}`}
                  />
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
    );
  }
}
 