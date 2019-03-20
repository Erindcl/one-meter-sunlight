import React, { Component } from 'react';
import { Input, Row, Col, Form, Button, Select, message, Card } from 'antd';

import RichEditor from './RichEditor';

const FormItem = Form.Item;

class ContentEditor extends Component {
  static displayName = 'ContentEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        title: '',
        desc: '',
        author: '',
        body: null,
        cats: [],
      },
      content: ''
    };
  }

  handleSubmit = () => {
    this.props.form.validateFields((errors, values) => {
      console.log('errors', errors, 'values', values);
      if (errors) {
        return false;
      }
      console.log(this.state.content)
      console.log(values)
      message.success('提交成功');
    });
  };

  setContentValue = (value) => {
    this.setState({content: value})
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const SelectOption = [
      { label: '分类1', value: 'cat1' },
      { label: '分类2', value: 'cat2' },
      { label: '分类3', value: 'cat3' },
    ];
    return (
      <div className="content-editor">
        <Form>
          <Card>
            <h2 style={styles.title}>添加文章</h2>
            <Form labelAlign="top" style={styles.form}>
              <Row>
                <Col span="11">
                  <FormItem label="标题">
                    {getFieldDecorator('title', {
                      rules: [{
                        required: true, message: '标题必填',
                      }],
                    })(
                      <Input placeholder="这里填写文章标题" />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="11">
                  <FormItem label="作者">
                    {getFieldDecorator('author', {
                      rules: [{
                        required: true, message: '作者信息必填',
                      }],
                    })(
                      <Input placeholder="填写作者名称" />
                    )}
                  </FormItem>
                </Col>
                <Col span="11" offset="2">
                  <Form.Item label="分类">
                    {getFieldDecorator('cats', {
                      rules: [{
                        required: true, message: '分类必选',
                      }],
                    })(
                      <Select 
                        placeholder="请选择分类"
                        style={styles.cats}
                        mode="multiple"
                      >
                        {SelectOption.map((item,index) => (
                          <Option key={index} value={item.value}>{item.label}</Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <FormItem label="描述">
                {getFieldDecorator('describ', {})(
                  <Input.TextArea placeholder="这里填写正文描述">
                  </Input.TextArea>
                )}
              </FormItem>
              <FormItem label="正文">
                <RichEditor onChange={this.setContentValue} />
              </FormItem>
              <FormItem>
                <Button type="primary" onClick={this.handleSubmit}>
                  发布文章
                </Button>
              </FormItem>
            </Form>
          </Card>
        </Form>
      </div>
    );
  }
}

export default Form.create()(ContentEditor)

const styles = {
  title: {
    margin: '0px 0px 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  form: {
    marginTop: 30,
  },
  cats: {
    width: '100%',
  },
};
