import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

// step 1:
// write a class that represents the game. It contains a 2d matrix for size N by N. 

// add 3 methods to that class:

// print() // just prints out the board
// step() // runs 1 step
// toggle(row, column) // this is an action the human player can take. each time it runs it toggles a cell eitgher on or off
//false is dead
//true is alive 

class Game {
  constructor(row, col) {
    this.row = row
    this.col = col
    this.board = this.makeBoard(row, col)
  }

  makeBoard(row, col) {
    let board = []
    for (let i = 0; i < row; i++) {
      let tempCol = []
      for (let j = 0; j < col; j++) {
        tempCol.push(false)
      }
      board.push(tempCol)
    }
    return board
  }

  printBoard() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === true) {
          process.stdout.write('O')
        } else {
          process.stdout.write('X')
        }
      }
      console.log('')
    }
    console.log('')
  }

  countNeighbors(row, col) {
    let neighborsCounter = 0
    let dup = new Set([])
    if (row - 1 >= 0 || col - 1 >= 0 || row + 1 <= this.board.length || col + 1 <= this.board.length) {
      // console.log('hi2')
      if (row - 1 >= 0) {
        if (this.board[row - 1][col]) {
          let n = [row - 1, col]
          n = JSON.stringify(n)
          if (!dup.has(n)) {
            neighborsCounter++
            dup.add(n)
            // console.log(n, 'hhh')
          }
        }
      }
      if (col - 1 >= 0) {
        if (this.board[row][col - 1]) {
          let n = [row, col - 1]
          n = JSON.stringify(n)
          // console.log(n, 'me')
          if (!dup.has(n)) {
            // console.log(row, ',', col - 1, 'wah')
            neighborsCounter++
            dup.add(n)
            // console.log(dup, row, col - 1, 'here?')
          }
        }
      }
      if (row + 1 < this.board.length) {
        if (this.board[row + 1][col]) {
          let n = [row + 1, col]
          n = JSON.stringify(n)
          if (!dup.has(n)) {
            neighborsCounter++
            dup.add(n)
          }
        }
      }

      if (col + 1 < this.board.length) {
        if (this.board[row][col + 1]) {
          let n = [row, col + 1]
          n = JSON.stringify(n)
          if (!dup.has(n)) {
            neighborsCounter++
            dup.add(n)
          }
        }
      }
      if (col - 1 >= 0 && row - 1 >= 0) {
        if (this.board[row - 1][col - 1]) {
          let n = [row - 1, col - 1]
          n = JSON.stringify(n)
          if (!dup.has(n)) {
            neighborsCounter++
            dup.add(n)
          }
        }
      }
      if (col + 1 < this.board.length && row + 1 < this.board.length) {
        if (this.board[row + 1][col + 1]) {
          let n = [row + 1, col + 1]
          n = JSON.stringify(n)
          if (!dup.has(n)) {
            neighborsCounter++
            dup.add(n)
          }
        }
      }

      if (col + 1 < this.board.length && row - 1 >= 0) {
        if (this.board[row - 1][col + 1]) {
          let n = [row - 1, col + 1]
          n = JSON.stringify(n)
          if (!dup.has(n)) {
            neighborsCounter++
            dup.add(n)
          }
        }

      }

      if (col - 1 >= 0 && row + 1 < this.board.length) {
        if (this.board[row + 1][col - 1]) {
          let n = [row + 1, col - 1]
          n = JSON.stringify(n)
          if (!dup.has(n)) {
            neighborsCounter++
            dup.add(n)
          }
        }
      }


    }
    return neighborsCounter
  }

  step() {
    // the step function gets called over and over again
    // each time it is called
    // it calcullates who lives and who dies
    // and updates the board '
    let tempBoard = JSON.parse(JSON.stringify(this.board));

    for (let row = 0; row < this.board.length; row++) {
      // console.log(row, 'row')
      for (let col = 0; col < this.board.length; col++) {
        // console.log(tempBoard)
        // For a space that is 'populated':
        // Each cell with one or no neighbors dies, as if by solitude.
        // Each cell with four or more neighbors dies, as if by overpopulation.
        // Each cell with two or three neighbors survives.
        // For a space that is 'empty' or 'unpopulated'
        // Each cell with three neighbors becomes populated.
        const cell = this.board[row][col]
        let neighborsCounter = this.countNeighbors(row, col)
        // console.log(tempBoard, '1', neighborsCounter)
        if (cell) {
          if (neighborsCounter <= 1) {
            tempBoard[row][col] = false
            // console.log(tempBoard, '2', neighborsCounter)
          }
          if (neighborsCounter === 3 || neighborsCounter === 2) {
            tempBoard[row][col] = true
            // console.log(tempBoard, '3', neighborsCounter)
          }
          if (neighborsCounter >= 4) {
            tempBoard[row][col] = false
          }
        } else {
          // console.log(neighborsCounter, 'neighborsCounter')
          if (neighborsCounter === 3) {
            tempBoard[row][col] = true

          }
        }

      }
    }
    this.board = tempBoard
  }

  // console.log(this.board, cell)


  toggle(row, col) {
    // toggle(row, column) // this is an action the human player can take. each time it runs it toggles a cell eitgher on or off
    if (this.board[row][col] === false) {
      this.board[row][col] = true
    }
    return this.board
  }

}
// const meow = new Game(10, 10)

// meow.toggle(1, 1)
// meow.toggle(2, 2)
// meow.toggle(3, 2)
// meow.toggle(3, 1)
// meow.toggle(3, 0)

//button- click grids 
//button- to click next step()
//button- to clear everything 

function App() {
  const [board, setBoard] = useState([])

  useEffect(() => {
    //display the board  10x10? 
    let game = new Game(50, 50)
    let tempboard = game.board
    // setBoard(makeboard)
    setBoard(tempboard)


  }, []);



  // console.log(board, '')


  return (
    <div>
      <Container className='grid'>
        {board.map((squareLists) => squareLists.map((square) =>
          <button className='squareBorder'> </button>))}
      </Container>

    </div>

  );
}

export default App;

