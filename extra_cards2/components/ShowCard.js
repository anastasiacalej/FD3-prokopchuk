"use strict";
import React from 'react';
import PropTypes from 'prop-types';

class ShowCard extends React.PureComponent {

  static propTypes = {
    string: PropTypes.number.isRequired,
    column: PropTypes.number.isRequired,
    spriteList: PropTypes.string.isRequired
  };
  
  myImgRef=null;//ссылка на спрайт лист
  widthSL=0;//размер w отображаемой части спрайт-листа
  heightSL=0;//размер h отображаемой части спрайт-листа
 
  //узнаем ссылку на спрайт-лист 1 раз:
  setImgRef = (ref)=>{
    this.myImgRef=ref;
  }
  
  //узнаем размеры отображаемой части спрайт-листа 1 раз:
  setImgSize = ()=>{
    if(this.myImgRef){
      let myImg=this.myImgRef;
      this.widthSL=myImg.clientWidth/4;
      this.heightSL=myImg.clientHeight/14;
    }
  }

  render() {
    //если в props попадает цифра 0 - карту не отображаем  
    return (          
          <div style={{position:'relative',overflow: 'hidden', 
                       width:this.widthSL, height:this.heightSL}}>
                        
              <img src={this.props.spriteList} ref={this.setImgRef} onLoad={this.setImgSize}
                   style={{position:'absolute', 
                   top:this.heightSL*(1-this.props.string), 
                   left:this.widthSL*(1-this.props.column),
                   visibility:(this.props.string==0||this.props.column==0)&&'hidden'}} /> 

          </div>                        
    ); 
  }
}

export default ShowCard;
