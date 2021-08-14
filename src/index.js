import React from 'react';
import ReactDom from 'react-dom';
import './index.css';


function Square(props){
  return (
    <button className="square" onClick={() => props.prop2() }> 
      {props.name}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isFlag : true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();

    if (calculateWinner(squares)) {
      return;
    }
    squares[i] = this.state.isFlag ? 'X' : 'O';
    this.setState({squares: squares,
                  isFlag : !this.state.isFlag});
  }
  renderSquare(i) {
    return <Square name={this.state.squares[i]} prop2={() => this.handleClick(i)}/>;
  }

  render() {
    let winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      if(winner === 'X')
        winner = 'Arjun';
      else
        winner = 'Aditi';
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player:'+ (this.state.isFlag ? 'Arjun' : 'Aditi');
    }
    
    return (
      <div>
        <div className="header">
		        <h1>Tic-Toc-Toe</h1>
		    </div>
        <div className="gameContent">
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      </div>
    );
  }
}


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

ReactDom.render(<Board/>,document.getElementById('root'));

