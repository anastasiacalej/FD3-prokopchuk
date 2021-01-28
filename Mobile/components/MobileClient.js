import React from 'react';
import PropTypes from 'prop-types';

import './MobileClient.css';
import {eventsClicked} from './events';

class MobileClient extends React.PureComponent {

  static propTypes = {
    info:PropTypes.shape({
      id: PropTypes.number.isRequired,
      f: PropTypes.string,
      i: PropTypes.string,
      o: PropTypes.string,
      balance: PropTypes.number,
    }),
  };

  inputRefFam=null;//ссылка на нужный input
  inputRefIm=null;//ссылка на нужный input
  inputRefOtch=null;//ссылка на нужный input
  inputRefBalance=null;//ссылка на нужный input
  editButton=null;
 
  //узнаем ссылки на нужные inputы
  setRefFam = (ref)=>{
    this.inputRefFam=ref;
  }

  setRefIm = (ref)=>{
    this.inputRefIm=ref;
  }

  setRefOtch = (ref)=>{
    this.inputRefOtch=ref;
  }

  setRefBalance = (ref)=>{
    this.inputRefBalance=ref;
  }

  setEditButton = (ref)=>{
    this.editButton=ref;
  }

  validate = ()=>{
   if (  this.inputRefFam.value==='') 
   {this.inputRefFam.placeholder='Введите фамилию';this.inputRefFam.className='Edit Validate' }
   if (  this.inputRefIm.value==='') 
   {this.inputRefIm.placeholder='Введите имя';this.inputRefIm.className='Edit Validate'}
   if (  this.inputRefOtch.value==='') 
   {this.inputRefOtch.placeholder='Введите отчество';this.inputRefOtch.className='Edit Validate'}
   if (  isNaN(parseInt(this.inputRefBalance.value))) 
   {this.inputRefBalance.value=''; this.inputRefBalance.placeholder='Введите цифру';this.inputRefBalance.className='Edit Validate'}
  }

  saveEditClient = ()=>{
   
    if (this.inputRefFam.value!==''
      &&this.inputRefIm.value!==''
      &&this.inputRefOtch.value!==''
      &&!isNaN(parseInt(this.inputRefBalance.value))){
    //формируем новую информацию о клиенте в хэш:    
    let newInfo= {...this.props.info,f:this.inputRefFam.value, i:this.inputRefIm.value, 
      o:this.inputRefOtch.value, balance:parseInt(this.inputRefBalance.value)};

    eventsClicked.emit('ESaveClientClick', newInfo);
    }else{
      this.validate();
    }
  }

  saveAddClient = ()=>{ 
    if (this.inputRefFam.value!==''
      &&this.inputRefIm.value!==''
      &&this.inputRefOtch.value!==''
      &&!isNaN(parseInt(this.inputRefBalance.value))){
    //формируем полученную информацию о новом клиенте в хэш:   
    let newInfo= {...this.props.info,f:this.inputRefFam.value, i:this.inputRefIm.value, 
      o:this.inputRefOtch.value, balance:parseInt(this.inputRefBalance.value)}; 

    eventsClicked.emit('ESaveAddClientClick', newInfo);
  }else{
    this.validate();
  }
  }

  deleteClient = () =>{
    eventsClicked.emit('EDeleteClientClick', this.props.info.id);
  }

  editClient = () =>{
    eventsClicked.emit('EEditClientClick', this.props.info.id);
  }

  cancelEditClient = ()=>{
    eventsClicked.emit('EEditCancelClientClick');
  }

  cancelAddClient =()=>{
    eventsClicked.emit('EAddCancelClientClick');
  }

  disableEdit = ()=>{
    if(this.editButton)
    this.editButton.disabled=true;
  }

  ableEdit =()=>{
    if(this.editButton)
    this.editButton.disabled=false;
  }

  componentDidMount = () =>{
    eventsClicked.addListener('EAddCurrentClientClick',this.disableEdit);
    eventsClicked.addListener('EAddedClientClick',this.ableEdit);
  };

  componentWillUnmount = () =>{
    eventsClicked.removeListener('EAddCurrentClientClick',this.disableEdit);
    eventsClicked.removeListener('EAddedClientClick',this.ableEdit);
  };

  render() {

    console.log("MobileClient id="+this.props.info.id+" render");
    
    if (this.props.editClient!==this.props.info.id&&!this.props.addClient)
    return (
      <tr className='MobileClient'>        
        <td>{this.props.info.f}</td>
        <td>{this.props.info.i}</td>
        <td>{this.props.info.o}</td>
        <td>{this.props.info.balance}</td>
        <td className={this.props.info.balance>=0?'StatusActive':'StatusBlocked'}>
          {this.props.info.balance>=0?'active':'blocked'}</td>
        <td>
          <input className='ButtonName' type="button" value="Редактировать" onClick={this.editClient} ref={this.setEditButton}/>
        </td>
        <td>
          <input className='ButtonName' type="button" value="Удалить" onClick={this.deleteClient} />
        </td>
      </tr>
    );

    if (this.props.editClient===this.props.info.id&&!this.props.addClient)
    return (
      <tr className='MobileClient' className='Highlight'>        
        <td>
          <input className='Edit' type="text" defaultValue={this.props.info.f} ref={this.setRefFam} />
        </td>
        <td>
          <input className='Edit' type="text" defaultValue={this.props.info.i} ref={this.setRefIm} />
        </td>
        <td>
          <input className='Edit' type="text" defaultValue={this.props.info.o} ref={this.setRefOtch} />
        </td>
        <td>
          <input className='Edit' type="text" defaultValue={this.props.info.balance} ref={this.setRefBalance} />
        </td>
        <td className={this.props.info.balance>=0?'StatusActive':'StatusBlocked'}>
          {this.props.info.balance>=0?'active':'blocked'}</td>
        <td>
          <input className='ButtonName' type="button" value="Cохранить" onClick={this.saveEditClient} />
        </td>
        <td>
          <input className='ButtonName' type="button" value="Отмена" onClick={this.cancelEditClient} />
        </td>
      </tr>
    );

    if (this.props.addClient)
    return (
      <tr className='MobileClient' className='Highlight'>        
        <td>
          <input className='Edit' type="text" placeholder="Введите фамилию" ref={this.setRefFam} />
        </td>
        <td>
          <input className='Edit' type="text" placeholder="Введите имя" ref={this.setRefIm} />
        </td>
        <td>
          <input className='Edit' type="text" placeholder="Введите отчество" ref={this.setRefOtch} />
        </td>
        <td>
          <input className='Edit' type="text" placeholder="Введите баланс" ref={this.setRefBalance} />
        </td>
        <td></td>
        <td>
          <input className='ButtonName' type="button" value="Добавить" onClick={this.saveAddClient} />
        </td>
        <td>
          <input className='ButtonName' type="button" value="Отмена" onClick={this.cancelAddClient} />
        </td>
      </tr>
    );

  }

}

export default MobileClient;
