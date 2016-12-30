import React from 'react';
import Square from './square';
import Row from './row';
import Board from './board';

class BoardContainer extends React.Component {
  constructor(props){
    super(props);
    this.state=({ currentCount: 0, start: true, clear: false,  intervalId: '', class: [0, 1], squareClass: [], setClass: [], board: [], squareNum: 30, rowNum: 20});
    this.arr = [];
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.clearGame = this.clearGame.bind(this);
    this.onClick = this.onClick.bind(this);
    this.switch = this.switch.bind(this);
    this.setBoard = this.setBoard.bind(this);

  }
  componentWillMount(){
    let size = this.state.squareNum * this.state.rowNum;
    let squares = [];
    let rows = [];
    for(let i=0; i < size; i++){
      squares.push(0)
      if(squares.length === this.state.squareNum){
        rows.push(squares);
        squares = [];
      }
      if(rows.length === this.state.rowNum){
        this.arr = rows;
      }
      for(let i = 1; i < this.arr.length-1; i++){
        for(let j=1; j < this.arr[i].length-1; j++){
          this.arr[i][j] = this.state.class[Math.floor(Math.random()*this.state.class.length)];
        }
      }

    }
    this.setState({squareClass: this.arr})
  }
  componentDidMount() {
      let intervalId = setInterval(this.setBoard, 300);
     // store intervalId in the state so it can be accessed later:
     this.setState({intervalId: intervalId});
  }
  componentWillUnmount() {
     // use intervalId from the state to clear the interval
     clearInterval(this.state.intervalId);
  }
  startGame(e){
    let count = 0;
    for(let i = 0; i<this.arr.length; i++){
      for(let j = 0; j < this.arr[i].length; j++){
        if(this.arr[i][j] === 0){
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
  }
  stopGame(e){
    this.setState({start: false})
  }
  clearGame(e){
    let thisArr = this.arr;
    for(let i = 0; i<thisArr.length; i++){
      for(let j = 0; j < thisArr[i].length; j++){
        thisArr[i][j] = 0

      }
    }
    this.arr = thisArr;
    let newarr = this.state.squareClass;
    for(let i = 0; i < newarr.length; i++){
      newarr[i]=0;
    }
    this.setState({squareClass: newarr, clear: true, currentCount: 0})
  }
  onClick(e){
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
        this.arr = rows;
      }
    }
    this.setState({squareClass: newarr})


  }
  switch() {
      let next = JSON.parse(JSON.stringify(this.arr));

      for (let x = 1; x < this.arr.length - 1; x++) {
          for (let y = 1; y < this.arr[x].length - 1; y++) {
              let neighbors = 0;
              for (let i = -1; i <= 1; i++) {
                  for (let j = -1; j <= 1; j++) {
                      // Add up all the neighbors’ states.
                      neighbors += this.arr[x + i][y + j];
                  }
              }
              neighbors -= this.arr[x][y];
              if ((this.arr[x][y] == 1) && (neighbors < 2)) next[x][y] = 0;
              else if ((this.arr[x][y] == 1) && (neighbors > 3)) next[x][y] = 0;
              else if ((this.arr[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;
              else next[x][y] = this.arr[x][y];
          }
      }
      this.arr = next;
      let result = [].concat.apply([], this.arr)
      return result;
  }
  setBoard() {
    if(this.state.start && !this.state.clear){
      let thisArr = this.arr;
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
  }
  render() {

      return (
        <div className="container-fluid">
          <div className="row">
          <div className="col-xs-12">
           <h1 className="head">The Game of Life</h1>
            <div className="game-container">
              <h3 className="gen">Generation: {this.state.currentCount}</h3>
              <Board rows = {this.state.board}/>
              <h4 className="instructions">Clear the game to reset the board or try to wait for all of the cells to die.</h4>
              <div className="buttons">
                <button type="button" className=" first btn btn-primary" onClick={this.startGame}>Start</button>
                <button type="button" className=" second btn btn-primary" onClick={this.stopGame}>Stop</button>
                <button type="button" className=" third btn btn-primary" onClick={this.clearGame}>Clear</button>
              </div>
              </div>
           </div>
         </div>
        </div>
      );
  }
}
export default BoardContainer;
