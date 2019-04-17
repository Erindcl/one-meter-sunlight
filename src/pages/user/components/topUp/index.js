import React, { Component } from "react";
import "./style.scss";
import { Row, Col, Card, Button, Modal } from 'antd';

const confirm = Modal.confirm;

export default class TopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
    
  }

  showConfirm = () => {
    confirm({
      title: '确认购买米币30?',
      content: '需要您支付60RMB',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        
      },
      onCancel() {
        
      },
    });
  }

  render() {
    const {  }=this.state;
    return (
      <div className="top-up">
        <Row gutter={16}>
          <Col span={8}>
            <Card className="card-box" style={{ border: '1px solid #F05133' }} bordered={true}>
              <div className="large">30</div>
              <div className="small">售价：60RMB</div>
              <div className="checked" style={{ display: 'block' }}>√</div>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="card-box" bordered={true}>
              <div className="large">30</div>
              <div className="small">售价：60RMB</div>
              <div className="checked" style={{ display: 'none' }}>√</div>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="card-box" bordered={true}>
              <div className="large">30</div>
              <div className="small">售价：60RMB</div>
              <div className="checked" style={{ display: 'none' }}>√</div>
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={8}>
            <Card className="card-box" bordered={true}>
              <div className="large">30</div>
              <div className="small">售价：60RMB</div>
              <div className="checked" style={{ display: 'none' }}>√</div>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="card-box" bordered={true}>
              <div className="large">30</div>
              <div className="small">售价：60RMB</div>
              <div className="checked" style={{ display: 'none' }}>√</div>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="card-box" bordered={true}>
              <div className="large">30</div>
              <div className="small">售价：60RMB</div>
              <div className="checked" style={{ display: 'none' }}>√</div>
            </Card>
          </Col>
        </Row>
        <div className="btn-box">
          <Button type="primary" onClick={this.showConfirm} style={{ width: 100 }}>充值</Button>
        </div>
      </div>
    );
  }
}
