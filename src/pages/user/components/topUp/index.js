import React, { Component } from "react";
import "./style.scss";
import { Row, Col, Card, Button, Modal } from 'antd';

const confirm = Modal.confirm;
const option = [
  { corn: 20, rmb: 1 },
  { corn: 100, rmb: 5 },
  { corn: 210, rmb: 10 },
  { corn: 350, rmb: 15 },
  { corn: 500, rmb: 20 },
  { corn: 1000, rmb: 30 },
]

export default class TopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOne: 1
    };
  }
  componentDidMount() {
    
  }

  showConfirm = () => {
    let currentItem = option[this.state.selectedOne];
    confirm({
      title: `确认购买 米币${currentItem.corn}?`,
      content: `需要您支付 ${currentItem.rmb} RMB`,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        // 请求购买米币
      },
      onCancel() {
        
      },
    });
  }

  handleClick = (index) => {
    this.setState({ selectedOne: index });
  }

  render() {
    const { selectedOne }=this.state;
    return (
      <div className="top-up">
        <Row gutter={16}>
          <Col span={8}>
            <Card onClick={this.handleClick.bind(this,1)} className="card-box" style={selectedOne == 1 ? { border: '1px solid #F05133' } : {}} bordered={true}>
              <div className="large">20</div>
              <div className="small">售价：1RMB</div>
              <div className="checked" style={{ display: selectedOne == 1 ? 'block' : 'none' }}>√</div>
            </Card>
          </Col>
          <Col span={8}>
            <Card onClick={this.handleClick.bind(this,2)} className="card-box" style={selectedOne == 2 ? { border: '1px solid #F05133' } : {}} bordered={true}>
              <div className="large">100</div>
              <div className="small">售价：5RMB</div>
              <div className="checked" style={{ display: selectedOne == 2 ? 'block' : 'none' }}>√</div>
            </Card>
          </Col>
          <Col span={8}>
            <Card onClick={this.handleClick.bind(this,3)} className="card-box" style={selectedOne == 3 ? { border: '1px solid #F05133' } : {}} bordered={true}>
              <div className="large">210</div>
              <div className="small">售价：10RMB</div>
              <div className="checked" style={{ display: selectedOne == 3 ? 'block' : 'none' }}>√</div>
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={8}>
            <Card onClick={this.handleClick.bind(this,4)} className="card-box" style={selectedOne == 4 ? { border: '1px solid #F05133' } : {}} bordered={true}>
              <div className="large">350</div>
              <div className="small">售价：15RMB</div>
              <div className="checked" style={{ display: selectedOne == 4 ? 'block' : 'none' }}>√</div>
            </Card>
          </Col>
          <Col span={8}>
            <Card onClick={this.handleClick.bind(this,5)} className="card-box" style={selectedOne == 5 ? { border: '1px solid #F05133' } : {}} bordered={true}>
              <div className="large">500</div>
              <div className="small">售价：20RMB</div>
              <div className="checked" style={{ display: selectedOne == 5 ? 'block' : 'none' }}>√</div>
            </Card>
          </Col>
          <Col span={8}>
            <Card onClick={this.handleClick.bind(this,6)} className="card-box" style={selectedOne == 6 ? { border: '1px solid #F05133' } : {}} bordered={true}>
              <div className="large">1000</div>
              <div className="small">售价：30RMB</div>
              <div className="checked" style={{ display: selectedOne == 6 ? 'block' : 'none' }}>√</div>
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
