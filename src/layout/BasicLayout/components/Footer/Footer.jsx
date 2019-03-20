import React, { PureComponent } from 'react';
import {Layout} from 'antd';
import Logo from '../Logo';

import './Footer.scss';

const {Footer} = Layout;

export default class FooterPage extends PureComponent {
  render() {
    return (
      <Footer className="layout-footer" style={{ background: 'rgba(0,0,0,0)' }}>
        <div className="layout-footer-body">
          <div style={{ filter: 'grayscale(75%)' }}>
            <Logo />
          </div>
          <div className="copyright">
            © 2018 Theme designed by{' '}
            <a
              href="##"
              target="_blank"
              className="copyright-link"
              rel="noopener noreferrer"
            >
              kangroo
            </a>
          </div>
        </div>
      </Footer>
    );
  }
}
