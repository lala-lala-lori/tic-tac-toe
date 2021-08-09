import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  // for creating square grid
  myfunc(){
      let squareitems= [];
      for(let i=0;i<3;i++){
          let items=[];
          for(let j=0;j<3;j++){
              items.push(this.renderSquare(i*3+j));
          }
          squareitems.push(<div className="board-row">{items}</div>)

      }
      return squareitems;
  }

  render() {
    return (
        this.myfunc()
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber :0,

    };
  }

  goBack(){
      if(this.state.stepNumber===0){
          return ;
      }
      this.setState({
          stepNumber:this.state.stepNumber-1,
          xIsNext: !this.state.xIsNext,
      })
  }

  handleClick(i) {
    const history = this.state.history.slice(0,this.state.stepNumber+1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber : history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const prevBtn = <button onClick={() => this.goBack()}>Go back</button>;



    let status;
    if (winner) {
      status = 'Winner: ' + winner;
  } else if(winner===null && this.state.stepNumber===9) {
      status = "Game DRAW ):";
  }else{
      status = 'Player: ' + (this.state.xIsNext ? 'X' : 'O') + ' turn';
    }

    return (
      <div className="game">
         <h1> Black Box </h1>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{prevBtn}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
