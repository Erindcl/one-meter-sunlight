import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;
const style={
  background:"#000",
  color: '#fff'
}

export default function Foot() {
  return <Footer style={style}>
    <div style={{textAlign:"center"}}>
      <b>©Copyright </b>
      { (new Date()).getFullYear() } zhifei.@163.com 版权所有
    </div>
  </Footer>
}
