import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Footer from './components/Footer';
import Intro from './components/Intro';

export default class UserLayout extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.mask} />
        <Row wrap style={styles.row}>
          <Col span="12">
            <Intro />
          </Col>
          <Col span="12">
            <div style={styles.form}>
              {this.props.children}
            </div>
          </Col>
        </Row>
        <Footer />
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    width: '100wh',
    minWidth: '1200px',
    height: '100vh',
    backgroundImage:
      `url(${require('assets/imgs/warmBg.jpg')})`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
  },
  mask: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: '#000',
    opacity: '0.5',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1',
    zIndex: '1',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
