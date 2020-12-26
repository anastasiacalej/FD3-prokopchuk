var MyFilter = React.createClass({

    displayName: 'MyFilter',

    propTypes: {      
      massiv:React.PropTypes.arrayOf(        
          React.PropTypes.string.isRequired,      
        )     
    },

    getInitialState: function() {
      return { 
        newMassiv:this.props.massiv,
        freeanswertext:"",
        selectedCheckbox: false,
      };
    },

    freeAnswerTextChanged: function(EO) {
      this.setState( {freeanswertext:EO.target.value},this.processList);
    },

    checkboxClicked: function(EO) {
     this.setState( {selectedCheckbox: EO.target.checked},this.processList);
    },

    processList: function() {
      let result=this.props.massiv;
      if(this.state.freeanswertext)
         result=result.filter(v=>v.indexOf(this.state.freeanswertext)!=-1);
      else
         result=result.slice();
         
      if(this.state.selectedCheckbox)
         result.sort();
      
      this.setState( {newMassiv: result});      
    },


    clickButton: function(EO){//возвращаем первоначальное состояние по нажатии на "сброс"
      this.setState( {newMassiv:this.props.massiv,
                      freeanswertext:"",
                      selectedCheckbox: false} );
    },
    
    render: function() {
      let massivOption=this.state.newMassiv.map( v =>
        React.DOM.option({key:v},v)//ключ - само слово(т.к.слова уникальны)
      );

      return React.DOM.div( {className:'MyFilter'},
        React.DOM.div( {className:'MyFilterChoose'},          
          React.DOM.input({type:'checkbox',name:'check',className:'MyFilterCheckbox', checked:this.state.selectedCheckbox,
            onClick:this.checkboxClicked}
            ),
          React.DOM.input({type:'text',name:'chooseText',className:'MyFilterText', value:this.state.freeanswertext,
            onChange:this.freeAnswerTextChanged,}
            ),  
          React.DOM.input({type:'button',value:'сброс',name:'chooseButton',className:'MyFilterButton',
            onClick:this.clickButton}
            )
        ),            
          React.DOM.select({size:6},massivOption)  
      );        
    },
  
  });