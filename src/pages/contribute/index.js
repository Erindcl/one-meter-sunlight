import React, { Component } from "react";
// import {  } from 'antd';
import "./style.scss";

export default class Contribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
    
  }
  render() {
    // const {  } = this.state;
    return (
      <div className="contribute-page">
        <h1>❤ 投稿说明 ❤</h1>
        <br />

        <p>这个世界上每天那么多人来来往往<br />
        常常以为<br />
        自己生活的圈子就是整个世界</p>


        <p>其实<br />
        很多人活着的方式<br />
        可能我们永远也不会知道</p>

        <p>在这里<br />
        将更多人的故事讲给你听<br />
        如果你喜欢这些故事，可以点击购买<br />
        花几米币，为自己从这个故事里得到的任何一种感觉买单<br />
        在享受的同时，献出一份爱心。</p>

        <p>虽然我们现在过着饿了吃饭、冷了添衣的舒适日子<br />
        但殊不知，在大山深处有这么一群孩子<br />
        穿着补丁打满的衣服<br />
        吃的永远是馒头<br />
        住的是外面下雨里面也下雨的屋檐<br />
        网站所有售卖所得将全捐赠给这群可爱的孩子<br />
        让我们为孩子做点力所能及的事情</p>

        <p>然而我们最大的希望<br />
        是有更多人来这里贡献自己的故事<br />
        这也是一种奉献的方式<br />
        让这里变成一个故事的集市、爱的集市<br />
        集市里有人间百态，有喜怒哀乐，有感动，有平淡，有搞笑，有残酷，有我们不知道的小世界<br />
        在这个小世界里，洒下的一米阳光始终温暖着我们与孩子们的心房</p>

        <p>请将故事寄存到<br />
        1733412074@163.com</p>
        <img style={{ top: 200, left: -100, width: 70, height: 20 }} src={require('assets/imgs/blr.png')}></img>
        <img style={{ top: 200, right: -250 }} src={require('assets/imgs/sjy.png')}></img>
        <img style={{ top: 130, left: -250 }} src={require('assets/imgs/yqg.png')}></img>
        <img style={{ top: 220, right: 90 }} src={require('assets/imgs/yqg.png')}></img>
        <img style={{ top: 330, left: 50 }} src={require('assets/imgs/yqg.png')}></img>
        <img style={{ bottom: 200, right: -80 }} src={require('assets/imgs/sjy.png')}></img>
        <img style={{ top: 430, left: -150 }} src={require('assets/imgs/sjy.png')}></img>
        <img style={{ bottom: 300, left: 0, width: 70, height: 20 }} src={require('assets/imgs/blr.png')}></img>
        <img style={{ top: 500, right: 10, width: 70, height: 20 }} src={require('assets/imgs/blr.png')}></img>
        <img style={{ bottom: 220, left: -90 }} src={require('assets/imgs/yqg.png')}></img>
        <img style={{ bottom: 450, left: -300, width: 70, height: 20, transform: 'rotate(90deg)' }} src={require('assets/imgs/blr.png')}></img>
      </div>
    );
  }
}
 