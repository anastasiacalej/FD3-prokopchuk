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
      var strValue=EO.target.value; 
      console.log('Текст поиска изменён - '+strValue); 
      this.setState( {freeanswertext:strValue} );
      this.state.selectedCheckbox//если checkbox активирован - сортируем массив, если нет - сортировка не требуется 
      ?this.setState( {newMassiv:this.props.massiv.filter(v=>(new RegExp(strValue)).test(v)).sort()})
      :this.setState( {newMassiv:this.props.massiv.filter(v=>(new RegExp(strValue)).test(v))});
    },

    checkboxClicked: function(EO) {
      this.state.selectedCheckbox//если checkbox деактивирован - возвращаем порядок как в массиве, в обратной ситуации - сортируем
      ?this.setState( {selectedCheckbox: false,
                       newMassiv:this.props.massiv.filter(v=>(new RegExp(this.state.freeanswertext)).test(v))})
      :this.setState( {selectedCheckbox: true,
                       newMassiv:this.props.massiv.filter(v=>(new RegExp(this.state.freeanswertext)).test(v)).sort()});
    },

    clickButton: function(EO){//возвращаем первоначальное состояние по нажатии на "сброс"
      this.setState( {newMassiv:this.props.massiv,
                      freeanswertext:"",
                      selectedCheckbox: false} );
    },
    
    render: function() {
      var massivOption=this.state.newMassiv.map( v =>
        React.DOM.option({key:v},v)//ключ - само слово(т.к.слова уникальны)
      );

      return React.DOM.div( {className:'MyFilter'},
        React.DOM.div( {className:'MyFilterChoose'},          
          React.DOM.input({type:'checkbox',name:'check',className:'MyFilterCheckbox',checked:this.state.selectedCheckbox,
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