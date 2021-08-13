import React from 'react';
import L from 'leaflet';//地图依赖包
//需要在入口html文件引入css
// <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/leaflet/1.6.0/leaflet.css">
import  'leaflet-ant-path'//动线依赖包

class Map extends React.Component {
  componentDidMount() {
    let mymap = L.map('map').setView([-3.65358, -38.71431], 13)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken }', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiYmxhY2tjYXRraWxsZXIiLCJhIjoiY2tzNXI1MXY4MHZ5NjJwcGhrMDV6ZmlpeSJ9.1WLdu-R5OHd8UXqU-I80Ig'
      //这个是我自己申请的，可以换高德地图贺哥的token
    }).addTo(mymap);

    let coords = [
      [-3.65358, -38.71431],
      [-3.66402, -38.71528],
      [-3.66861, -38.71574],
      [-3.66866, -38.71573],
      [-3.66867, -38.71563],
      [-3.66881, -38.71523],
      [-3.66841, -38.71523],
      
    ]
    
   
    //循环获取经纬度  
    const latlngs0 = coords.slice(0,2).map(e => {
      return L.latLng(e[0], e[1]);
    });
    const latlngs1 = coords.slice(1,7).map(e => {
      return L.latLng(e[0], e[1]);
    });
    const color = [
      ["#0000FF", "#FFFFFF"],
      ["#FF00CC", "#996699"],


    ]
    //根据经纬度规划动态路线
    let latlngs = [latlngs0, latlngs1];
    latlngs.forEach((i,index) => {
      let antPolyline = new L.Polyline.AntPath(i, {
        "paused": true,   　　//暂停  初始化状态false(流动效果)
  　　　　"reverse": false,　　//方向反转
  　　　　"delay": 3000,　　　　//延迟，数值越大效果越缓慢
  　　　　"dashArray": [10, 20],　//间隔样式
  　　　　"weight": 5,　　　　//线宽
  　　　　"opacity": 0.5,　　//透明度
  　　　　"color": color[index][0],　//颜色
  　　　　"pulseColor": color[index][1]　　//块颜色
      });
  
      //把动态路线添加到地图上
      antPolyline.addTo(mymap)
        
    })

  
}

  


  render() {
    return <div id="map" style={{
      height: '600px',
      width:'800px',
    }}></div>
  }
}

export default Map;