import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios'
import { Carousel, NoticeBar } from 'antd-mobile';

const host = 'https://zkh-website-api-pro.zkh360.com/v1/h5'

function App() {

  const [banners, setBanners] = useState([])

  useEffect(() => {
    axios.get(`${host}/home`).then(res => {
      console.log(res.data)
      var { banners } = res.data.data
      setBanners(banners)
    })
  }, [])

  useEffect(() => {
    
  }, [banners])


  return (
    <div className="home-page">
      <div className="search">
        <img src={require('./assets/topIcSearch.png')} alt="" className="list-icon" />
        <div className="search-wrapper">
          <img src={require('./assets/searchIc.png')} alt="" />
          <p>请输入产品名称、品牌、型号、SKU号</p>
        </div>
        <p className="to-login">登录</p>
      </div>

      <Carousel
        autoplay
        infinite
        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        afterChange={index => console.log('slide to', index)}
        // dotStyle={{ width: 8, height: 8, margin: '0 3px', borderRadius: '50%', background: '#ccc' }}
      >
        {
          banners.map(e => (
            <img
              key={e.bannerImg}
              src={e.bannerImg}
              alt=""
              style={{ width: '100%', verticalAlign: 'top', height: 200, display: 'inline-block' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
              }}
            />
          ))
        }
      </Carousel>

      <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
        Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
      </NoticeBar>
    </div>
  );
}

export default App;
