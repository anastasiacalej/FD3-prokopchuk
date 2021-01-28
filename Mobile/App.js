"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import MobileCompany from './components/MobileCompany';

let companyName='Velcom';
let hatClients= ["Фамилия", "Имя", "Отчество", "Баланс", "Статус", "Редактировать", "Удалить"];
let clientsArr=[ 
  {id:101, f:"Иванов", i:"Иван", o:"Иванович", balance:200}, 
  {id:102, f:"Сидоров",i:"Сидор", o:"Сидорович", balance:250}, 
  {id:103, f:"Петров", i:"Петр", o:"Петрович", balance:180},
  {id:104, f:"Григорьев", i:"Григорий", o:"Григорьевич", balance:-220},
];

ReactDOM.render(
  <MobileCompany name={companyName} hatClients={hatClients} clients={clientsArr}/>
  , document.getElementById('container') 
);

