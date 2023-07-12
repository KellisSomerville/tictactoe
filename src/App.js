import { useState } from "react";

// component to build individual square
function Square({ value, onSquareClick }) {
  // value is in the button to declare any value we so choose in each square component
  // onClick is used to connect the js function to the html button
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  // xIsNext is flipped to determine who goes next which is saved in the game's state
  const [xIsNext, setXIsNext] = useState(true);

  // creates an arry of 9 elements with each being set to null
  // useState uses the square state variable that is initially set to the array
  const [squares, setSquares] = useState(Array(9).fill(null));

  // this function is responsible for updating the squares array holding the board's state
  function handleClick(i) {
    // if the square is already filled, the function will return early before it attempts to update the board state
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // creates a clone of the squares array using .splice
    // nextSquares gets updated to the first index and adds an X when clicked
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    // React gets notified that setSquares was updated and re-renders components that use the squares state
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // displays the winner
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  // returns need empty tags to store multiple JSX elements
  // values are correlated to the array above
  // click features are added to each component to connect click functionality

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// possible combinations to determine the winner
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
