import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Card } from 'antd';

export default class CustomBreadcrumb extends Component {
  static displayName = 'CustomBreadcrumb';

  static defaultProps = {
    dataSource: [],
  };

  static propTypes = {
    dataSource: PropTypes.array,
  };

  render() {
    const { dataSource } = this.props;
    return (
      <Card style={{ marginBottom: 20 }}>
        <Breadcrumb style={{ margin: 0 }}>
          {dataSource.map((item, index) => {
            return (
              <Breadcrumb.Item key={index}>
                <a href={item.link}>{item.text}</a>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </Card>
    );
  }
}
