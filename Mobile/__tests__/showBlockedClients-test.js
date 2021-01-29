"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import MobileCompany from '../components/MobileCompany';
let companyName='Velcom';
let hatClients= ["Фамилия", "Имя", "Отчество", "Баланс", "Статус", "Редактировать", "Удалить"];
let clientsArr=[ 
  {id:101, f:"Иванов", i:"Иван", o:"Иванович", balance:200}, 
  {id:102, f:"Сидоров",i:"Сидор", o:"Сидорович", balance:250}, 
  {id:103, f:"Петров", i:"Петр", o:"Петрович", balance:180},
  {id:104, f:"Григорьев", i:"Григорий", o:"Григорьевич", balance:-220},
];

test('работа кнопки "Заблокированные"', () => {

  // создаём тестовую версию компонента
  const component = renderer.create(
    <MobileCompany name={companyName} hatClients={hatClients} clients={clientsArr}/>
  );

  // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // найдём в вёрстке компонента саму кнопку "Заблокированные"
  const buttonElem = component.root.find( el => el.type=='input' && el.props.value == 'Заблокированные' ); 
  // и "нажмём" на неё
  buttonElem.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  })
  