var MyIshop = React.createClass({

    displayName: 'MyIshop',

    propTypes: {
      name: React.PropTypes.string.isRequired,
      head:
        React.PropTypes.shape({
          code: React.PropTypes.string.isRequired,
          count: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          price: React.PropTypes.string.isRequired,
          expected: React.PropTypes.string.isRequired,
          view: React.PropTypes.string.isRequired,
        }),
      list:React.PropTypes.arrayOf(
        React.PropTypes.shape({
          code: React.PropTypes.number.isRequired,
          count: React.PropTypes.number.isRequired,
          name: React.PropTypes.string.isRequired,
          price: React.PropTypes.string.isRequired,
          expected: React.PropTypes.number,
          view: React.PropTypes.string.isRequired,
        })
      ),
    },

    getInitialState: function() {
        return { 
          selectedProduct: null,//код выбранного товара
          currentList:this.props.list,
        };
    },

    productSelected: function(code) {
        console.log('выбрана строка '+code);
        this.setState( {selectedProduct:code} );
      },

    productSelectedButton: function(code) {
        console.log('удалена строка '+code);
        var m=this.state.currentList;
        m.splice(m.indexOf(this.state.currentList.find(v=>v.code==code)),1);//удаляем товар
        this.setState( {currentList:m} );//обновляем список товаров
    },  
    
    render: function() {
      var head=this.props.head;
      var headCode=        
          React.DOM.tr({className:'HeadProduct'},           
            React.DOM.td({className:'View'}),
            React.DOM.td({className:'Name'},head.name),
            React.DOM.td({className:'Code'},head.code),            
            React.DOM.td({className:'Price'},head.price),
            React.DOM.td({className:'Count'},head.count),
            React.DOM.td({className:'Expected'},head.expected),
            React.DOM.td({className:'Button'},'Контроль'),   
          );
     
      var listsCode=this.props.list.map(v=>                   
        React.createElement(MyProduct,{key:v.code,name:v.name,code:v.code,price:v.price,
            count:v.count,expected:v.expected,view:v.view,
            cbSelected:this.productSelected,cbSelectedButton:this.productSelectedButton,//колбэки
            selectedProduct:this.state.selectedProduct})//код выбранного товара  
      );

      return React.DOM.div( {className:'MyIshop'}, 
        React.DOM.h1( {className:'NameShop'}, this.props.name ),
        React.DOM.table( {className:'Products'},
                          React.DOM.tbody({},headCode,listsCode)),
      );
    },
  
  });