"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import MyIshop3 from './components/MyIshop3';


var nameShop='Магазин электроники и бытовой техники "ЭЛЕКТРО-МИР"';
var productHead= 
  {name:'Наименование товара',code:'Код товара',count:'Осталось на складе',expected:'Ожидается поступление в кол-ве',price:'Стоимость',view:''}; 
var productList=require('./productList.json');

ReactDOM.render(
  <MyIshop3 name={nameShop} head={productHead} list={productList}/>
  ,document.getElementById('container') 
);