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
    console.log(arr)
    let count = 0;
    for(let i = 0; i<arr.length; i++){
      for(let j = 0; j < arr[i].length; j++){
        if(arr[i][j] === 0){
          count++;
        }
      }
    }
    if(count === this.state.squareNum*this.state.rowNum){
      return;
    }
    this.setState({start: true, clear: false})
    if(this.state.currentCount === 0){
      let intervalId=(setInterval(this.state.setBoard, 300))
     this.setState({intervalId: intervalId});
    }
  },
  stopGame: function(e){
    this.setState({start: false})
  },
  clearGame: function(e){
    console.log(arr);
    let thisArr = arr;
       let count = 0;
    for(let i = 0; i<thisArr.length; i++){
      for(let j = 0; j < thisArr[i].length; j++){
        thisArr[i][j] = 0
          
      }
    }
    arr = thisArr;
    let newarr = this.state.squareClass;
    for(let i = 0; i < newarr.length; i++){
      newarr[i]=0;
    }
    this.setState({squareClass: newarr, clear: true, currentCount: 0})
  },
  onClick: function(e){
    if(!this.state.clear){
      return;
    }
    let id = e.target.id;
    let newarr = this.state.squareClass;
    if(newarr[id]===1){
      e.target.className='squareDie';
      newarr[id] = 0;

    }
    else if(newarr[id]===0){
      e.target.className='squareLive';
      newarr[id] = 1;

    }
    let size = this.state.squareNum * this.state.rowNum;
    var squares = [];
    var rows = [];
    for(let i=0; i < size; i++){
      squares.push(newarr[i])
      if(squares.length === this.state.squareNum){
        rows.push(squares);
        squares = [];
      }
      if(rows.length === this.state.rowNum){
        arr = rows;
      }

    }

    console.log(arr)
    this.setState({squareClass: newarr})


  },
  switch: function(){
    console.log(arr)
    let next = JSON.parse(JSON.stringify(arr));

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
      let thisArr = arr;
      let count = 0;
      for(let i = 0; i < thisArr.length; i++){
        for(let j = 0; j < thisArr[i].length; j++){
          if(thisArr[i][j]===0){
            count++;
          }
        }
      }
      if(count === this.state.squareNum*this.state.rowNum){
        this.setState({currentCount: -1, clear: true})
        
      }
      
      this.setState({squareClass: this.switch()});
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
     
      return (
        <div>
         {this.state.currentCount}
         <div>
         <Board rows = {this.state.board}/>
         </div>
         <h3>Click the clear button to set up board or wait for all cells to die.</h3>
         <button type="button" className="btn btn-primary" onClick={this.startGame}>Start</button>
         <button type="button" className="btn btn-primary" onClick={this.stopGame}>Stop</button>
         <button type="button" className="btn btn-primary" onClick={this.clearGame}>Clear</button>
         </div>
      );
  }
});
ReactDOM.render(<BoardContainer/>, document.querySelector('#app'));
