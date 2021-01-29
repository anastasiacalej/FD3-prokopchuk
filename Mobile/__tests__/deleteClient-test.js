"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import MobileClient from '../components/MobileClient';

let clientsArr=[ 
  {id:101, f:"Иванов", i:"Иван", o:"Иванович", balance:200}, 
  {id:102, f:"Сидоров",i:"Сидор", o:"Сидорович", balance:250}, 
  {id:103, f:"Петров", i:"Петр", o:"Петрович", balance:180},
  {id:104, f:"Григорьев", i:"Григорий", o:"Григорьевич", balance:-220},
];

test('работа кнопки "Удалить"', () => {

  // создаём тестовую версию компонента
  const component = renderer.create(
    <MobileClient key={clientsArr[0].id} info={clientsArr[0]} //передать можно любого клиента
    //если id очередного клиента равно id редактируемого клиента - передадим этот id в пропсах (для кнопок 'сохранить' и 'отмена')
    //иначе ложное значение - для проверки кнопки 'Удалить':
    editClient={null}
    //всегда передаем null: 
    addClient={null}/>
  );

  // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // найдём в вёрстке компонента саму кнопку "Удалить"
  const buttonElem = component.root.find(el => el.type=='input' && el.props.value == "Удалить"); 
  
  // и "нажмём" на неё
  buttonElem.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  })
  