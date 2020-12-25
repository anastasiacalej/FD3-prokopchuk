var MyProduct = React.createClass({

    displayName: 'MyProduct',

    propTypes: {
      code: React.PropTypes.number.isRequired,
      count: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      price: React.PropTypes.string.isRequired,
      expected: React.PropTypes.number,
      view: React.PropTypes.string.isRequired,
      cbSelectedButton: React.PropTypes.func.isRequired,
      cbSelected: React.PropTypes.func.isRequired,
    },

    productClicked: function(EO) {
        this.props.cbSelected(this.props.code);
    },

    productClickedButton: function(EO) {
      EO.stopPropagation();
      var deleteProduct = confirm("Вы уверены, что хотите удалить товар?");
      deleteProduct?this.props.cbSelectedButton(this.props.code):null;
    },

    render: function() { 
      var color=(this.props.code==this.props.selectedProduct)//если код товара==коду выбранного товара
      ?{backgroundColor:"#bcbfc2f1"}//выделяем товар цветом
      :null;

      return React.DOM.tr({className:'Product',style:color,onClick:this.productClicked},           
      React.DOM.td({className:'View'},
                    React.DOM.img({className:'ViewImg',src:this.props.view}),),
      React.DOM.td({className:'Name'},this.props.name),
      React.DOM.td({className:'Code'},'код '+this.props.code),              
      React.DOM.td({className:'Price'},this.props.price),
      React.DOM.td({className:'Count'},this.props.count),
      React.DOM.td({className:'Expected'},this.props.expected),
      React.DOM.td({className:'Button'},
                    React.DOM.input({className:'InputButton',type:'button',value:'удалить',onClick:this.productClickedButton}),),  
    );
    },
  
  });