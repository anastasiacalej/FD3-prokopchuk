"use strict";

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Cards from './components/Cards';

let spriteList="http://fe.it-academy.by/Examples/cards2.png"; 


ReactDOM.render(    
  
     <Cards spriteList={spriteList}/>  
  
  , document.getElementById('container') 
);

