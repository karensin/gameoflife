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
  constructor(row, col, color, id) {
    this.row = row
    this.col = col
    this.board = this.makeBoard(row, col, color, id)
    this.color = color
    this.id = id
  }

  makeBoard(row, col, color, id) {
    let board = []
    color = null
    for (let i = 0; i < row; i++) {
      let tempCol = []
      for (let j = 0; j < col; j++) {
        id = [i, j]
        tempCol.push({ id, color })
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

  const [neighbors, setneighbors] = useState()
  useEffect(() => {
    //display the board  10x10? 
    let game = new Game(25, 25)
    let tempboard = game.board
    // setBoard(makeboard)
    setBoard(tempboard)
  }, []);


  function toggle(square) {
    let copyBoard = board
    let pink = 'pink'
    let row = square['id'][0]
    let col = square['id'][1]
    copyBoard[row][col]['color'] = pink

    setBoard([...copyBoard])
    console.log(getNeighbors(board, row, col), 'pinkllll')
  }

  function step(board) {
    let tempBoard = JSON.parse(JSON.stringify(board));

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board.length; col++) {
        const cell = board[row][col]['color']
        let neighborsCounter = getNeighbors(board, row, col)
        // console.log(tempBoard, '1', neighborsCounter)
        if (cell === 'pink') {
          console.log('1')
          if (neighborsCounter <= 1) {
            tempBoard[row][col]['color'] = null
            // console.log(tempBoard, '2', neighborsCounter)
          }

          if (neighborsCounter == 3) {
            tempBoard[row][col]['color'] = 'pink'
            console.log('meow3')
            // console.log(tempBoard, '3', neighborsCounter)
          }

          console.log(neighborsCounter, neighborsCounter === 2)
          if (neighborsCounter == 2) {
            tempBoard[row][col]['color'] = 'pink'
            console.log('meow')
            // console.log(tempBoard, '3', neighborsCounter)
          }
          console.log(tempBoard, 'wat', board, 'board')
          if (neighborsCounter >= 4) {
            tempBoard[row][col]['color'] = null
          }
        } else {
          // console.log(neighborsCounter, 'neighborsCounter')
          if (neighborsCounter === 3) {
            tempBoard[row][col]['color'] = 'pink'
          }
        }
      }

    }

    setBoard([...tempBoard])

    // console.log(Game.countNeighbors(square['id'][0], square['id'][1]))
    // console.log(board.countNeighbors(row, col), 'hai')
  }


  function getNeighbors(board, row, col) {
    let copyBoard = board
    let neighborsCounter = 0
    let dup = new Set([])
    // console.log(copyBoard[row][col]['color'])
    if (row - 1 > 0) {
      if (copyBoard[row - 1][col]['color'] === 'pink') {
        console.log('waa')
        let n = [row - 1, col]
        n = JSON.stringify(n)
        if (!dup.has(n)) {
          neighborsCounter++
          dup.add(n)
          console.log(n, 'up')
        }
      }
    }
    if (col - 1 >= 0) {
      if (copyBoard[row][col - 1]['color'] === 'pink') {
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
    if (row + 1 < copyBoard.length) {
      if (copyBoard[row + 1][col]['color'] === 'pink') {
        let n = [row + 1, col]
        n = JSON.stringify(n)
        if (!dup.has(n)) {
          console.log(n)
          neighborsCounter++
          dup.add(n)
        }
      }
    }

    if (col + 1 < copyBoard.length) {
      if (copyBoard[row][col + 1]['color'] === 'pink') {
        let n = [row, col + 1]
        n = JSON.stringify(n)
        if (!dup.has(n)) {
          console.log(n)
          neighborsCounter++
          dup.add(n)
        }
      }
    }
    if (col - 1 >= 0 && row - 1 >= 0) {
      if (copyBoard[row - 1][col - 1]['color'] === 'pink') {
        let n = [row - 1, col - 1]
        n = JSON.stringify(n)
        if (!dup.has(n)) {
          console.log(n)
          neighborsCounter++
          dup.add(n)
        }
      }
    }
    if (col + 1 < copyBoard.length && row + 1 < copyBoard.length) {
      if (copyBoard[row + 1][col + 1]['color'] === 'pink') {
        let n = [row + 1, col + 1]
        n = JSON.stringify(n)
        if (!dup.has(n)) {
          console.log(n)
          neighborsCounter++
          dup.add(n)
        }
      }
    }

    if (col + 1 < copyBoard.length && row - 1 >= 0) {
      if (copyBoard[row - 1][col + 1]['color'] === 'pink') {
        let n = [row - 1, col + 1]
        n = JSON.stringify(n)
        if (!dup.has(n)) {
          console.log(n)
          neighborsCounter++
          dup.add(n)
        }
      }

    }

    if (col - 1 >= 0 && row + 1 < board.length) {
      if (board[row + 1][col - 1]['color'] === 'pink') {
        let n = [row + 1, col - 1]
        n = JSON.stringify(n)
        if (!dup.has(n)) {
          console.log(n)
          neighborsCounter++
          dup.add(n)
        }
      }
    }
    return neighborsCounter
    // setneighbors(neighborsCounter)

  }



  return (
    <div>
      <Container className='grid'>
        <h1>I NEED SOME SPACE HERE </h1>
        {board.map((squareLists) => squareLists.map((grid) =>
          <button className={`squareBorder ${grid.color}`} onClick={(e) => toggle(grid)
          }  > </button>))}
        <button onClick={(e) => step(board)}> </button>
      </Container>

    </div >

  );
}

export default App;

