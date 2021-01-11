import React from 'react';
import PropTypes, { bool } from 'prop-types';
import './MyCardProd.css';

class MyCardProd extends React.Component{

    static propTypes = {
      code: PropTypes.any.isRequired,
      count: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,    
      view: PropTypes.string.isRequired, 
      expected: PropTypes.any,
      workMode:PropTypes.number.isRequired,
      validForm:PropTypes.bool, 
      cbSaveCard:PropTypes.func,
      cbProductIsEdit:PropTypes.func,
      cbWorkMode: PropTypes.func,
      cbAddCard:PropTypes.func   
    };

    state = {       
      valueName: this.props.name,
      valueCode: this.props.code,
      valueURL: this.props.view,
      valuePrice: this.props.price,
      valueCount: this.props.count,
      valueExpected: this.props.expected,

      validNameErr: null,
      validCodeErr: null,
      validURLErr: null,
      validPriceErr: null,
      validCountErr: null,
      validExpectedErr: null,

      validForm:this.props.validForm,
    };

    changedText=(EO)=>{
      EO.stopPropagation();
      switch(EO.target.name){
        case 'name':
          this.setState( {valueName:EO.target.value},this.validForm );
          break;
        case 'code':
          this.setState( {valueCode:EO.target.value},this.validForm );
          break;
        case 'url':
          this.setState( {valueURL:EO.target.value},this.validForm );
          break;
        case 'price':
          this.setState( {valuePrice:EO.target.value},this.validForm );
          break;
        case 'count':
          this.setState( {valueCount:EO.target.value},this.validForm );
          break;
        case 'expected':
          this.setState( {valueExpected:EO.target.value},this.validForm );
          break;                  
      }
      this.props.cbProductIsEdit();      
    }

    validForm=()=>{
      
      (this.state.valueName==='')
      ?this.setState( {validNameErr:'Укажите название товара!'} ):this.setState( {validNameErr:null} );
      
      (this.state.valueCode==='')
      ?this.setState( {validCodeErr:'Укажите код товара!'} ):(isNaN(this.state.valueCode)
      ?this.setState( {validCodeErr:'Код товара должен быть числом!'} ):this.setState( {validCodeErr:null} ));
     
      (this.state.valueURL==='')
      ?this.setState( {validURLErr:'Укажите URL изображения товара'} ):this.setState( {validURLErr:null} );

      (this.state.valuePrice==='')
      ?this.setState( {validPriceErr:'Укажите цену товара!'} ):this.setState( {validPriceErr:null} );

      (this.state.valueCount==='')
      ?this.setState( {validCountErr:'Укажите количества товара на складе!'} ):(isNaN(this.state.valueCount)
      ?this.setState( {validCountErr:'Количество должно быть числом!'} ):this.setState( {validCountErr:null} ) );

      (this.state.valueExpected==='')
      ?this.setState( {validExpectedErr:'Укажите количество заказанных единиц товара!'} ):(isNaN(this.state.valueExpected)
      ?this.setState( {validExpectedErr:'Количество должно быть числом!'} ):this.setState( {validExpectedErr:null} ));
       
      ((this.state.valueName==='')||
      (this.state.valueCode==='')||
      (this.state.valueURL==='')||
      (this.state.valuePrice==='')||
      (this.state.valueCount==='')||
      (this.state.valueExpected===''))
      ?this.setState( {validForm:false} ):this.setState( {validForm:true} );
    }

    clickedButtonSave=(EO)=>{
      EO.stopPropagation();
      this.props.cbSaveCard(this.state.valueName,
                            this.state.valueCode,
                            this.state.valueURL,
                            this.state.valuePrice,
                            this.state.valueCount,
                            this.state.valueExpected);
    }

    clickedButtonCancel=(EO)=>{
      EO.stopPropagation();
      this.props.cbWorkMode(0);
    }

    clickedButtonAdd = (EO)=>{
      EO.stopPropagation();
      this.props.cbAddCard(this.state.valueName,
        this.state.valueCode,
        this.state.valueURL,
        this.state.valuePrice,
        this.state.valueCount,
        this.state.valueExpected);
    }

    render() { 

      var display=(this.props.code==this.props.selectedProduct)//если код товара==коду выбранного товара
      ?{display:"block"}
      :{display:"none"};
      
      switch(this.props.workMode){
        case 1:
          var card=(
        <div className='CardProd' style={display}>
          <span className='CardName'>{this.props.name}</span><br/>
          <img className='ViewImgCard' src={this.props.view}/><br/>        
          <span>{'Код: '+this.props.code}</span><br/>
          <span>{'Цена: '+this.props.price}</span><br/>
          <span>{'В наличии: '+this.props.count}</span><br/>
          <span>{'Ожидается привоз: '+this.props.expected}</span>
        </div>
        ); 
        break;

        case 2:
          var card=(
          <div className='CardProd' style={display}>
          <span className='CardName'>{'Редактирование текущего товара'}</span><br/>
          
          <img className='ViewImgCard' src={this.state.valueURL}/><br/>
          <table>
          <tbody>
          <tr>  
          <td><span>{'Наименование: '}</span></td>    
          <td><input type='text' name='name' value={this.state.valueName} onChange={this.changedText}/>        
          <span className='Err'>{this.state.validNameErr}</span><br/></td> 
          </tr> 
          <tr> 
          <td><span>{'Код: '}</span></td>             
          <td><input type='text' name='code' value={this.state.valueCode} onChange={this.changedText}/>        
          <span className='Err'>{this.state.validCodeErr}</span><br/></td>
          </tr>
          <tr>
          <td><span>{'URL изображения: '}</span></td> 
          <td><input type='text' name='url' value={this.state.valueURL} onChange={this.changedText}/>          
          <span className='Err'>{this.state.validURLErr}</span><br/></td>
          </tr>
          <tr>
          <td><span>{'Цена: '}</span> </td>           
          <td><input type='text' name='price' value={this.state.valuePrice} onChange={this.changedText}/>      
          <span className='Err'>{this.state.validPriceErr}</span><br/></td>
          </tr>
          <tr>
          <td><span>{'В наличии: '}</span></td>       
          <td><input type='text' name='count' value={this.state.valueCount} onChange={this.changedText}/>      
          <span className='Err'>{this.state.validCountErr}</span><br/></td>
          </tr>
          <tr>
          <td><span>{'Ожидается привоз: '}</span></td>
          <td><input type='text' name='expected' value={this.state.valueExpected} onChange={this.changedText}/>
          <span className='Err'>{this.state.validExpectedErr}</span><br/></td>
          </tr>
          </tbody>
          </table>
          <input className='InputButtonSave' type='button' value='сохранить' disabled={(this.state.validForm)?false:true} 
            onClick={this.clickedButtonSave}/>
          <input className='InputButtonCancel' type='button' value='отмена' 
            onClick={this.clickedButtonCancel}/>    
        </div>
        ); 
        break;

        case 3:
          var card=(
          <div className='CardProd' >
          <span className='CardName'>{'Добавление нового товара'}</span><br/>
          
          <img className='ViewImgCard' src={this.state.valueURL}/><br/>
  
          <table>
          <tbody>
          <tr>  
          <td><span>{'Наименование: '}</span></td>    
          <td><input type='text' name='name' value={this.state.valueName} onChange={this.changedText}/>        
          <span className='Err'>{this.state.validNameErr}</span><br/></td> 
          </tr> 
          <tr> 
          <td><span>{'Код: '}</span></td>             
          <td><input type='text' name='code' value={this.state.valueCode} onChange={this.changedText}/>        
          <span className='Err'>{this.state.validCodeErr}</span><br/></td>
          </tr>
          <tr>
          <td><span>{'URL изображения: '}</span></td> 
          <td><input type='text' name='url' value={this.state.valueURL} onChange={this.changedText}/>          
          <span className='Err'>{this.state.validURLErr}</span><br/></td>
          </tr>
          <tr>
          <td><span>{'Цена: '}</span> </td>           
          <td><input type='text' name='price' value={this.state.valuePrice} onChange={this.changedText}/>      
          <span className='Err'>{this.state.validPriceErr}</span><br/></td>
          </tr>
          <tr>
          <td><span>{'В наличии: '}</span></td>       
          <td><input type='text' name='count' value={this.state.valueCount} onChange={this.changedText}/>      
          <span className='Err'>{this.state.validCountErr}</span><br/></td>
          </tr>
          <tr>
          <td><span>{'Ожидается привоз: '}</span></td>
          <td><input type='text' name='expected' value={this.state.valueExpected} onChange={this.changedText}/>
          <span className='Err'>{this.state.validExpectedErr}</span><br/></td>
          </tr>
          </tbody>
          </table>

          <input className='InputButtonSave' type='button' value='добавить' disabled={(this.state.validForm)?false:true} 
            onClick={this.clickedButtonAdd}/>
          <input className='InputButtonCancel' type='button' value='отмена' 
            onClick={this.clickedButtonCancel}/>    
        </div>
        );
        break; 
      }
      
      return card;
    }
  
  }
  export default MyCardProd;