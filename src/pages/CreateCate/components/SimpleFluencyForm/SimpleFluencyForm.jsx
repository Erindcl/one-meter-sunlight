import React, { Component } from 'react';
import { Row, Col, Input, Button, message, Card, Form } from 'antd';
import cx from 'classnames';
import './SimpleFluencyForm.scss';
import './index.module.scss';

const FormItem = Form.Item;

class SimpleFluencyForm extends Component {
  static displayName = 'SimpleFluencyForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        name: '',
        shortName: '',
      },
    };
  }

  handleSubmit = () => {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }

      console.log('values:', values);
      message.success('添加成功');
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 11,
      },
    };
    return (
      <div className={cx('simple-fluency-form', 'simpleFluencyForm')}>
        <Card>
          <Form>
            <div className={'formContent'}>
              <h2 className={'formTitle'}>添加分类</h2>
              <Row className={'formRow'}>
                <Col span="15">
                  <FormItem label="分类名称" {...formItemLayout}>
                    {getFieldDecorator('name', {
                      rules: [{
                        required: true, message: '必填项',
                      }],
                    })(
                      <Input size="large" placeholder="请填写分类名称" />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row className={'formRow'}>
                <Col span="15">
                  <FormItem label="中文名称" {...formItemLayout}>
                    {getFieldDecorator('nameC', {
                      rules: [{
                        required: true, message: '必填项',
                      }],
                    })(
                      <Input size="large" placeholder="请填写中文名称" />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col offset="1">
                  <Button
                    onClick={this.handleSubmit}
                    type="primary"
                  >
                    确认
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(SimpleFluencyForm)
