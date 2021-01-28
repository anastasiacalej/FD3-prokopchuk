import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoizee';

import MobileClient from './MobileClient';
import './MobileCompany.css';
import {eventsClicked} from './events';


class MobileCompany extends React.PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
    hatClients:PropTypes.arrayOf(PropTypes.string.isRequired),
    clients:PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        f: PropTypes.string.isRequired,
        i: PropTypes.string.isRequired,
        o: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
      })
    ),
  };

  state = {
    name: this.props.name,
    clients: this.props.clients,//все клиенты
    showClients: this.props.clients,//клиенты, выводимые на экран
    editClient: null,//id редактируемого клиента
    addClient: null,//хэш добавляемого клиента
  };

  setName1 = () => {
    this.setState({name:'МТС'});
  };

  setName2 = () => {
    this.setState({name:'Velcom'});
  };
  
  showAllClients = () => {
    let newClients=[...this.state.clients]; // копия всех клиентов
      this.setState({showClients:newClients});
  };

  showActiveClients = () => {
    let newClients=[...this.state.clients]; // копия всех клиентов
    newClients=newClients.filter( c => 
      c.balance>=0 
    );
      this.setState({showClients:newClients});
  };

  showBlockedClients = () => {
    let newClients=[...this.state.clients]; // копия всех клиентов
    newClients=newClients.filter( c => 
      c.balance<0 
    );
      this.setState({showClients:newClients});
  };

  deleteClient = (idClient) =>{
    let newClients=[...this.state.clients]; // копия всех клиентов
    let newShowClients=[...this.state.showClients]; // копия показываемых клиентов

    let indexDeletedClient=newClients.findIndex(client => client.id===idClient);//индекс удаляемого клиента в массиве всех клиентов
    let indexDeletedShowClient=newShowClients.findIndex(client => client.id===idClient);//индекс удаляемого клиента в массиве показываемых клиентов
    
    newClients.splice(indexDeletedClient,1);
    newShowClients.splice(indexDeletedShowClient,1);
    this.setState({clients:newClients, showClients:newShowClients});
  };

  editClient = (idClient) =>{
    this.setState({editClient:idClient});
  };

  infoMemoizeed = memoize((ob) => ob);//функция мемоизации данных

  saveClient = (newInfo) =>{
    let newClients=[...this.state.clients]; // копия всех клиентов
    let a=this.infoMemoizeed(newInfo);//мемоизируем данные измененного клиента

    newClients.forEach( (c,i) => {
      let b=this.infoMemoizeed(c); //мемоизируем очередного клиента     
      
      if ( c.id==newInfo.id&&a!=b ) {
        newClients[i]=newInfo;
      }
    });
      //делаем setState - обнуляем editClient в любом случае:  
      this.setState({editClient: null, clients:newClients, showClients: newClients});
      
  };

  saveAddClient = (newClient)=>{
    let newClients=[...this.state.clients]; // копия всех клиентов
        //добавляем в любом случае - сюда попадет проверенный клиент
        newClients.push(newClient);
      
         //делаем setState - обнуляем addClient в любом случае:  
        this.setState({addClient: null, clients:newClients, showClients: newClients});
        eventsClicked.emit('EAddedClientClick');       
  };

  addClient = ()=>{
      let idAddClient=this.state.clients[this.state.clients.length].id;//присваиваем новому клиенту уникальный id
      let addClient={id:idAddClient};//формируем начальный хэш нового клиента
      if(!this.state.addClient){
         this.setState({addClient: addClient});
         eventsClicked.emit('EAddCurrentClientClick');
      }
  };

  editCancelClient = ()=>{
      this.setState({editClient: null});//при отмене редактирования
  };

  cancelAddClient = ()=>{
      this.setState({addClient: null});//при отмене добавления
      eventsClicked.emit('EAddedClientClick');  
  };

  componentDidMount = () =>{
    eventsClicked.addListener('EDeleteClientClick',this.deleteClient);
    eventsClicked.addListener('EEditClientClick',this.editClient);
    eventsClicked.addListener('EEditCancelClientClick',this.editCancelClient);
    eventsClicked.addListener('ESaveClientClick',this.saveClient);
    eventsClicked.addListener('ESaveAddClientClick',this.saveAddClient);
    eventsClicked.addListener('EAddCancelClientClick',this.cancelAddClient);
  };

  componentWillUnmount = () =>{
    eventsClicked.removeListener('EDeleteClientClick',this.deleteClient);
    eventsClicked.removeListener('EEditClientClick',this.editClient);
    eventsClicked.removeListener('EEditCancelClientClick',this.editCancelClient);
    eventsClicked.removeListener('ESaveClientClick',this.saveClient);
    eventsClicked.removeListener('ESaveAddClientClick',this.saveAddClient);
    eventsClicked.removeListener('EAddCancelClientClick',this.cancelAddClient);
  };

  render() {

    console.log("MobileCompany render");

    //шапка таблицы
    var hatClients=this.props.hatClients.map( (item,i) =>
    <td key={i}>{item}</td>
    );
    
    //таблица клиентов
    var clientsCode=this.state.showClients.map( client =>
      <MobileClient key={client.id} info={client} 
      //если id очередного клиента равно id редактируемого клиента - передадим этот id в пропсах
      //иначе ложное значение
      editClient={client.id===this.state.editClient&&this.state.editClient}
      //всегда передаем null - не тот случай 
      addClient={null}/>
    );

    return (
      <div className='MobileCompany'>
        <div className='MobileCompanyName'>
          <input className='ButtonName' type="button" value="Velcom" onClick={this.setName2} />
          <input className='ButtonName' type="button" value="МТС" onClick={this.setName1} />        
          <div className='CurrentName'>Компания: {this.state.name}</div>
        </div>

        <div className='MobileClientsFilter'>
          <input className='ButtonName' type="button" value="Все" onClick={this.showAllClients} />
          <input className='ButtonName' type="button" value="Активные" onClick={this.showActiveClients} />        
          <input className='ButtonName' type="button" value="Заблокированные" onClick={this.showBlockedClients} />  
        </div>

        <table className='MobileCompanyClients'>
          <tbody>
            <tr className="HatClients">
               {hatClients}
            </tr>
            {clientsCode}
            {
              this.state.addClient&&
              <MobileClient info={this.state.addClient}
              //всегда null - не тот случай: 
              editClient={null}
              //сообщаем клиенту, что его нужно добавить: 
              addClient={this.state.addClient}/>
            }
          </tbody>
        </table>

        <input className='ButtonName' type="button" value="Добавить клиента" onClick={this.addClient}/>
      </div>
    );

  }

}


export default MobileCompany;
