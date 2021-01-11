import React from 'react';
import PropTypes from 'prop-types';
import './MyProduct.css';

class MyProduct extends React.Component{

    static propTypes = {
      code: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      expected: PropTypes.number,
      view: PropTypes.string.isRequired,
      cbSelectedButton: PropTypes.func.isRequired,
      cbSelectedButtonEdit: PropTypes.func.isRequired,
      cbSelected: PropTypes.func.isRequired,
    };

    productClicked = (EO)=> {
      this.props.cbSelected(this.props.code);
    }

    productClickedButton = (EO)=> {
      EO.stopPropagation();
      var deleteProduct = confirm("Вы уверены, что хотите удалить товар?");
      deleteProduct?this.props.cbSelectedButton(this.props.code):null;
    }

    productClickedButtonEdit = (EO)=> {
      EO.stopPropagation();
      this.props.cbSelectedButtonEdit(this.props.code);
    }

    render() { 
      var color=(this.props.code==this.props.selectedProduct)//если код товара==коду выбранного товара
      ?{backgroundColor:"#bcbfc2f1"}//выделяем товар цветом
      :null;
     
      return (
      <tr className='Product' style={color} onClick={(!this.props.productIsEdit)?this.productClicked:undefined}>          
      <td className='View'>
                    <img className='ViewImg' src={this.props.view}/>
      </td>                
      <td className='Name'>{this.props.name}</td> 
      <td className='Code'>{'код '+this.props.code}</td>              
      <td className='Price'>{this.props.price}</td>
      <td className='Count'>{this.props.count}</td>
      <td className='Expected'>{this.props.expected}</td>
      <td className='Button'>
          <input className='InputButton' type='button' value='изменить' 
          disabled={(this.props.productIsEdit)&&true}
          onClick={this.productClickedButtonEdit}/>
          <input className='InputButton' type='button' value='удалить' 
          disabled={(this.props.workMode==2||this.props.workMode==3)&&true} 
          onClick={this.productClickedButton}/>                    
      </td>
      </tr>                  
    );
    
    }
  
  }
  export default MyProduct;