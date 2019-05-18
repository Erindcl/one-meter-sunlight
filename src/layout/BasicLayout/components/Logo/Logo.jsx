import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './Logo.scss';

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo">
        <Link to="/dashboard/monitor" style={{ color: '#F05133' }} className="logo-text">
          一米阳光
        </Link>
      </div>
    );
  }
}
