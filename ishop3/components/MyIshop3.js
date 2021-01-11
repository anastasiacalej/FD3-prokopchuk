import React from 'react';
import PropTypes from 'prop-types';
import './MyIshop3.css';
import MyProduct from './MyProduct';
import MyCardProd from './MyCardProd';

class MyIshop3 extends React.Component{

    static propTypes = {
      name: PropTypes.string.isRequired,
      head:
        PropTypes.shape({
          code:PropTypes.string.isRequired,
          count: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          price: PropTypes.string.isRequired,
          expected: PropTypes.string.isRequired,
          view: PropTypes.string.isRequired,
        }),
      list:PropTypes.arrayOf(
        PropTypes.shape({
          code: PropTypes.number.isRequired,
          count: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          price: PropTypes.string.isRequired,
          expected: PropTypes.number,
          view: PropTypes.string.isRequired,
        })
      ),
    };

    state = {       
          selectedProduct: null,//код выбранного товара
          currentList:this.props.list,
          workMode:0,//режим работы: 0-ничего не показываем, 1-карта товара, 2-редактируем товар, 3-новый товар
          productIsEdit:false,//товар сейчас редактируется или добавляется?
    };

    productSelected = (code)=> {
        console.log('выбрана строка '+code);
        this.setState( {selectedProduct:code, workMode:1} );
    }

    productSelectedButton = (code)=> {
        console.log('удалена строка '+code);
        this.setState( {currentList:this.state.currentList.filter(v=>v.code!=code)} );
    }
    
    productSelectedButtonEdit = (code)=> {
        console.log('редактируется строка '+code);
        this.setState( {selectedProduct:code, workMode:2});
    }

    saveCard = (name,code,url,price,count,expected)=>{
        this.setState( {productIsEdit:false, currentList:this.state.currentList.map(v=>{(v.code==code)&&
        (v.code=code,v.name=name,v.view=url,v.price=price,v.count=count,v.expected=expected);
        return v;})
      } );
    }

    addCard = (name,code,url,price,count,expected)=>{
        var v={ name,code:parseInt(code),view:url,price,count:parseInt(count),expected:parseInt(expected)};//хэш со значениями новой карты
        var current=this.state.currentList;
        current.push(v);//добавляем новый товар
        this.setState( {productIsEdit:false, currentList:current, workMode:0});
    } 

    productIsEdit = ()=>{
        this.setState( {productIsEdit:true});
    }

    workMode = (n)=>{
        this.setState( {workMode:n, productIsEdit:false});
    }

    productClickedButtonNewProd = ()=>{
        this.setState( {productIsEdit:true, workMode:3, selectedProduct: null});
    }

    render() {
      var headCode=(
      <tr className='HeadProduct'>
        <td className='View'></td>
        <td className='Name'>{this.props.head.name}</td>
        <td className='Code'>{this.props.head.code}</td>
        <td className='Price'>{this.props.head.price}</td>
        <td className='Count'>{this.props.head.count}</td>
        <td className='Expected'>{this.props.head.expected}</td>
        <td className='Button'>{'Контроль'}</td>
      </tr>
      );
      
      var listsCode=this.state.currentList.map(v=>                   
        <MyProduct key={v.code} name={v.name} code={v.code} price={v.price}
            count={v.count} expected={v.expected} view={v.view}
            cbSelected={this.productSelected} 
            cbSelectedButton={this.productSelectedButton}
            cbSelectedButtonEdit={this.productSelectedButtonEdit}
            selectedProduct={this.state.selectedProduct}
            workMode={this.state.workMode}
            productIsEdit={this.state.productIsEdit}
        /> 
      );

      switch(this.state.workMode){
        case 1:
          var listsCard=(this.state.currentList.map(v=>                   
          <MyCardProd key={v.code} name={v.name} code={v.code} price={v.price}
            count={v.count} view={v.view} expected={v.expected}
            selectedProduct={this.state.selectedProduct}
            validForm={true}
            workMode={this.state.workMode}
          /> 
          ));
          break;
        case 2:
            var listsCard=(this.state.currentList.map(v=>                   
            <MyCardProd key={v.code} name={v.name} code={v.code} price={v.price}
              count={v.count} view={v.view} expected={v.expected}
              selectedProduct={this.state.selectedProduct}
              workMode={this.state.workMode}
              validForm={true}
              cbSaveCard={this.saveCard}
              cbProductIsEdit={this.productIsEdit}
              cbWorkMode={this.workMode}
            /> 
            ));
            break;
        case 3:
            var listsCard=(                
              <MyCardProd name='' code='' price=''
                 count='' view='' expected=''
                 workMode={this.state.workMode}
                 validForm={false}         
                 cbAddCard={this.addCard}
                 cbWorkMode={this.workMode}
                 cbProductIsEdit={this.productIsEdit}                 
             /> 
            );
            break;
      }
     
      return ( 
      <div className='MyIshop'> 
        <h1 className='NameShop'>{this.props.name}</h1>
        <div className='flexContainer'>
        <table className='Products'>
          <tbody>
             {headCode}
             {listsCode}
             <tr>
               <td>
                 <input className='InputButtonNewProd' type='button' value='Добавить товар' 
                 disabled={(this.state.workMode==2||this.state.workMode==3)&&true} 
                 onClick={this.productClickedButtonNewProd}/>
               </td>
             </tr>     
          </tbody>
        </table>
        {listsCard}
        </div>
      </div>
       
      );      
    }
  
  }

  export default MyIshop3;