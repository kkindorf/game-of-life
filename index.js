import React from 'react';
import ReactDOM from 'react-dom';
import Square from './components/square'
var arr = [];
var BoardContainer = React.createClass({
  getInitialState: function() {
    return { currentCount: 0, intervalId: '', class: [0, 1], squareClass: [], board: []};
  },
  componentWillMount: function(){
    let size = 10;
    for(let i=0; i < size; i++){
      arr.push(this.state.class[Math.floor(Math.random()*this.state.class.length)])
    }
    this.setState({squareClass: arr})
  },
  componentDidMount: function() {
     console.log(arr)
      var intervalId = setInterval(this.setBoard, 300);
     // store intervalId in the state so it can be accessed later:
     this.setState({intervalId: intervalId});
  },
  componentWillUnmount: function() {
     // use intervalId from the state to clear the interval
     clearInterval(this.state.intervalId);
  },
  onClick: function(e){
    console.log(e.target.className)
    let id = e.target.id;
    arr = this.state.squareClass;
    console.log(arr[id])
    if(arr[id]===1){
      e.target.ClassName='squareLive';
      arr[id] = 0;
    }
    else if(arr[id]===0){
      e.target.ClassName='squareLive';
      arr[id] = 1;
    }

    this.setState({squareClass: arr})
  },
  switch: function(){
    arr = this.state.squareClass;
    for(let i = 0; i < arr.length;i++){
      if(arr[i]===0){
        arr[i]=1;
      }
      else if(arr[i]===1){
        arr[i]=0;
      }
    }
    this.setState({squareClass: arr})
  },
  setBoard: function() {
    this.switch();
    let square = [];
    for(let i = 0; i < 10; i++){
      square.push(<Square key={i} id={i} class = {this.state.squareClass[i]===1?'squareLive':'squareDie'} onClick={this.onClick}/>)
    }
     this.setState({ currentCount: this.state.currentCount+1, board: square});
  },
  render: function() {
      // You do not need to decrease the value here
      return (
        <section>
         {this.state.currentCount}
         <div>
         {this.state.board}
         </div>
        </section>
      );
  }
});
ReactDOM.render(<BoardContainer/>, document.querySelector('#app'));
