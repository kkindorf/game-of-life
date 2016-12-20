import React from 'react';
import ReactDOM from 'react-dom';
import Square from './components/square';
import Row from './components/row';
import Board from './components/board';
var arr = [];
var BoardContainer = React.createClass({
  getInitialState: function() {
    return { currentCount: 0, start: true, clear: false,  intervalId: '', class: [0, 1], squareClass: [], setClass: [], board: [], squareNum: 10, rowNum: 10};
  },
  componentWillMount: function(){
    let size = this.state.squareNum * this.state.rowNum;
    var squares = [];
    var rows = [];
    for(let i=0; i < size; i++){
      squares.push(0)
      if(squares.length === this.state.squareNum){
        rows.push(squares);
        squares = [];
      }
      if(rows.length === this.state.rowNum){
        arr = rows;
      }
      for(let i = 1; i < arr.length-1; i++){
        for(let j=1; j < arr[i].length-1; j++){
          arr[i][j] = this.state.class[Math.floor(Math.random()*this.state.class.length)];
        }
      }

    }
    this.setState({squareClass: arr})
  },
  componentDidMount: function() {
      var intervalId = setInterval(this.setBoard, 300);
     // store intervalId in the state so it can be accessed later:
     this.setState({intervalId: intervalId});
  },
  componentWillUnmount: function() {
     // use intervalId from the state to clear the interval
     clearInterval(this.state.intervalId);
  },
  startGame: function(e){
    this.setState({start: true, clear: false})
  },
  stopGame: function(e){
    this.setState({start: false})
  },
  clearGame: function(e){
    arr = this.state.squareClass;
    for(let i = 0; i < arr.length; i++){
      arr[i]=0;
    }
    this.setState({squareClass: arr, clear: true, currentCount: 0})
  },
  onClick: function(e){
    arr = [].concat.apply([],arr)
    if(!this.state.clear){
      return;
    }
    let id = e.target.id;
    arr = this.state.squareClass;
    if(arr[id]===1){
      e.target.className='squareDie';
      arr[id] = 0;

    }
    else if(arr[id]===0){
      e.target.className='squareLive';
      arr[id] = 1;

    }

    this.setState({squareClass: arr})

  },
  switch: function(){
    let next = JSON.parse(JSON.stringify(arr));
    console.log(next)
for (let x = 1; x < arr.length-1; x++) {
for (let y = 1; y < arr[x].length-1; y++) {
let neighbors = 0;
for (let i = -1; i <= 1; i++) {
for (let j = -1; j <= 1; j++) {
  // Add up all the neighbors’ states.
  neighbors += arr[x+i][y+j];
 }
}
neighbors -= arr[x][y];
  if      ((arr[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;
  else if ((arr[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;
  else if ((arr[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;
  else next[x][y] = arr[x][y];
}
}
  arr = next;
  let result = [].concat.apply([],arr)
  return result;
},
  setBoard: function() {
    if(this.state.start && !this.state.clear){
      console.log(this.state.squareClass)
      this.setState({squareClass: this.switch()});
      console.log(this.state.squareClass)
      var size = this.state.squareNum*this.state.rowNum;
      var squares = [];
      var rows = [];
      var board = [];
      for(var i = 0; i < size; i++){
        squares.push(<Square key={i} id={i} class = {this.state.squareClass[i]===1?'squareLive':'squareDie'} onClick={this.onClick}/>)
        if(squares.length === this.state.squareNum){
          rows.push(<Row key = {i+1} squares = {squares}/>);
          squares = [];
        }
        if(rows.length === this.state.rowNum){
          board= rows;
        }
      }
       this.setState({ currentCount: this.state.currentCount+1, board: board});
    }
    if(this.state.clear){
      var size = this.state.squareNum*this.state.rowNum;
      var squares = [];
      var rows = [];
      var board = [];
      for(var i = 0; i < size; i++){
        squares.push(<Square key={i} id={i} class = {this.state.squareClass[i]===1?'squareLive':'squareDie'} onClick={this.onClick}/>)
        if(squares.length === this.state.squareNum){
          rows.push(<Row key = {i+1} squares = {squares}/>);
          squares = [];
        }
        if(rows.length === this.state.rowNum){
          board= rows;
        }
      }
       this.setState({board: board});
    }

  },
  render: function() {
      // You do not need to decrease the value here
      return (
        <div>
         {this.state.currentCount}
         <div>
         <Board rows = {this.state.board}/>
         </div>
         <button type="button" className="btn btn-primary" onClick={this.startGame}>Start</button>
         <button type="button" className="btn btn-primary" onClick={this.stopGame}>Stop</button>
         <button type="button" className="btn btn-primary" onClick={this.clearGame}>Clear</button>
         </div>
      );
  }
});
ReactDOM.render(<BoardContainer/>, document.querySelector('#app'));
