import React from 'react';
import PropTypes, { string } from 'prop-types';
import ShowCard from './ShowCard';

class Cards extends React.PureComponent {

  static propTypes = {
    spriteList: PropTypes.string.isRequired
  };

  state = {
    string:0,//
    column:0
  };

  string=0;//запомненная строка
  column=0;//запомненный столбец
  prStr=null;//cсылка на input со строкой
  prCol=null;//ссылка на input со столбцом

  pr2Str = (ref)=>{
    this.prStr=ref;
  }

  pr2Col = (ref)=>{
    this.prCol=ref;
  }

  change1 = (EO)=>{
    if(!isNaN(EO.target.value)&&EO.target.value!=''){    
        this.string=parseInt(EO.target.value);//запоминаю введенную строку     
    }else{
        this.string=0;//запоминаю введенную строку
    }    
  }

  change2 = (EO)=>{
    if(!isNaN(EO.target.value)&&EO.target.value!=''){    
      this.column=parseInt(EO.target.value);//запоминаю введенный столбец     
    }else{
      this.column=0;//запоминаю столбец
    }      
  }

  pressed1=()=>{
    this.setState({string:this.string, column:this.column});//кладу в state запомненные строку и столбец
  }

  pressed2=()=>{
    this.string=11;//запоминаю нужную строку с пиковой дамой
    this.column=1;//запоминаю нужный столбец с пиковой дамой
    this.prStr.value=this.string;//устанавливаю value для input
    this.prCol.value=this.column;//устанавливаю value для input
    this.setState({string:this.string, column:this.column});//кладу в state нужные строку и столбец  
  }

  render() {   
    return (
      <div>
        <span>строка </span>
        <input type='text' placeholder="1-14" onChange={this.change1} ref={this.pr2Str}/><br/>
        <span>столбец </span>
        <input type='text' placeholder="1-4" onChange={this.change2} ref={this.pr2Col}/><br/>
        <input type='button' value='показать' onClick={this.pressed1} /><br/>
        <input type='button' value='показать пиковую даму' onClick={this.pressed2} /><br/>                
        <ShowCard string={this.state.string} column={this.state.column} spriteList={this.props.spriteList}/>               
      </div>                        
    ); 
  }
}

export default Cards;
