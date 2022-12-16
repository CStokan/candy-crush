import React, { useEffect, useState } from 'react';
import blueCandy from './images/blueCandy.png'
import greenCandy from './images/greenCandy.png'
import orangeCandy from './images/orangeCandy.png'
import purpleCandy from './images/purpleCandy.png'
import redCandy from './images/redCandy.png'
import yellowCandy from './images/yellowCandy.png'
import blank from './images/blank.png'
import Scoreboard from './components/ScoreBoard';


// TILES_PER_ROW of the board
const TILES_PER_ROW = 8;
 
// Array of the colours
const candyColours= [
  redCandy,
  yellowCandy,
  orangeCandy,
  purpleCandy,
  greenCandy,
  blueCandy,
]

const App = () => {

  // State for the current colour array
  const [currentColourArray, setCurrentColourArray] = useState([])
  // determings the square being dragged and shows the img properties
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  // determings the square being replaced and shows the img properties
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  // determings the square being dragged and shows the img properties
  const [scoreDisplay, setScoreDisplay] = useState(0)

  
  // Function to check if the move is valid
  function isValid(){
    const isColumnOfFour = checkForColumnOfFour()
    const isRowOfFour = checkForRowOfFour()
    const isColumnOfThree = checkForColumnOfThree()
    const isRowOfThree = checkForRowOfThree()

    if(isColumnOfFour ||isRowOfFour || isColumnOfThree || isRowOfThree ) {
      return true
    }
  }

  // Function to check for a column of 4
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      // Creates an array of 4 in a column
      const columnOfFour = [i, i+TILES_PER_ROW, i+TILES_PER_ROW*2 , i+TILES_PER_ROW*3]
      // Gets the colour of the first item in the array
      const decidedColour = currentColourArray[i]
      // Checks if the colour is blank to stop counting as a match
      const isBlank = currentColourArray[i] === blank
      
      // checks if the three items in the column are the same colour if true turn blank
      if(columnOfFour.every(square => currentColourArray[square] === decidedColour && !isBlank)) {
        columnOfFour.forEach(square => {currentColourArray[square] = blank})
        setScoreDisplay((score) => score + 4)
        return true;
      }
    }
  }
  
  // Function to check for a column of three
  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      // Creates an array of three in a column
      const columnOfThree = [i, i+TILES_PER_ROW, i+TILES_PER_ROW*2]
      // Gets the colour of the first item in the array
      const decidedColour = currentColourArray[i]
      // Checks if the colour is blank to stop counting as a match
      const isBlank = currentColourArray[i] === blank

      // checks if the three items in the column are the same colour if true turn blank
      if(columnOfThree.every(square => currentColourArray[square] === decidedColour && !isBlank)) {
        columnOfThree.forEach(square => {currentColourArray[square] = blank})
        setScoreDisplay((score) => score + 3)
        return true;
      }
    }
  }

  // Function to check for a column of three
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      // Creates an array of three in a column
      const rowOfFour = [i, i+1, i+2, i+3]
      // Gets the colour of the first item in the array
      const decidedColour = currentColourArray[i]
      const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,61,62,63]

      const isBlank = currentColourArray[i] === blank
      // Check if the index is in the notValid array
      if(notValid.includes(i)) continue

      // checks if the three items in the column are the same colour if true turn blank
      if(rowOfFour.every(square => currentColourArray[square] === decidedColour && !isBlank)) {
        rowOfFour.forEach(square => {currentColourArray[square] = blank})
        setScoreDisplay((score) => score + 4)
        return true;
      }
    }
  }

  // Function to check for a column of three
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      // Creates an array of three in a column
      const rowOfThree = [i, i+1, i+2]
      // Gets the colour of the first item in the array
      const decidedColour = currentColourArray[i]
      const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,62,63]

      const isBlank = currentColourArray[i] === blank
      // Check if the index is in the notValid array
      if(notValid.includes(i)) continue

      // checks if the three items in the column are the same colour if true turn blank
      if(rowOfThree.every(square => currentColourArray[square] === decidedColour && !isBlank)) {
        rowOfThree.forEach(square => {currentColourArray[square] = blank})
        setScoreDisplay((score) => score + 3)
        return true;
      }
    }
  }



  // Will take a row of 3 or four and shift the blanks to the top and creates a new candy if top row is blank
  const moveIntoSquareBelow = () => {
    for(let i = 0; i <= 55; i++) {

      // Creates an array of the first row
      const firstRow = [0,1,2,3,4,5,6,7]
      // Checks if the index is in the first row
      const isFirstRow = firstRow.includes(i)
      // Checks if the square below is blank
      if(isFirstRow && currentColourArray[i] === blank) {
        currentColourArray[i] = candyColours[Math.floor(Math.random() * candyColours.length)]
      }

      if(currentColourArray[i + TILES_PER_ROW] === blank) {
        currentColourArray[i + TILES_PER_ROW] = currentColourArray[i]
        currentColourArray[i] = blank
      }
    }
    
  }

// Will take the img initially dragged and set the data-id taking the attributes of the img
  const dragStart = (e) => {

    console.log(e.target)
    console.log("drag start")
    setSquareBeingDragged(e.target)
  }
// Will take the img thats being dropped on and set the data-id taking the attributes of the img
  const dragDrop = (e) => {
    console.log(e.target)
    console.log("drag Drop")
    setSquareBeingReplaced(e.target)
  }

  // Will swap the img being dragged with the img being dropped on
  // This is where the magic happens
  const dragEnd = (e) => {
    // takes the id of the dragged and dropped img
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

    console.log(squareBeingDraggedId)
    console.log(squareBeingReplacedId)

    // Swaps the img being dragged with the img being dropped on
    
    currentColourArray[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
    currentColourArray[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

    // Checks if the square being dragged is next to the square being replaced
    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - TILES_PER_ROW,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + TILES_PER_ROW
    ]
    // Checks if the square being dragged is next to the square being replaced
    const validMove = validMoves.includes(squareBeingReplacedId)

    // Checks if the move is valid and if it is then it will swap the img being dragged with the img being dropped on
    if(squareBeingReplacedId && validMove && isValid()) {
      console.log("valid move")
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
    } else{
      
      console.log("invalid move")
      currentColourArray[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
      currentColourArray[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
      setCurrentColourArray([...currentColourArray])
      
    }
  
  }

  // Function to create the board
  const createBoard = () => {
    const randomColourArray = []
    for (let i = 0; i < TILES_PER_ROW*TILES_PER_ROW; i++) {
      
      // floor it to create a random whole number between 0 and 5 then put them in a an array
      const randomColor = candyColours[Math.floor(Math.random() * candyColours.length)];

      randomColourArray.push(randomColor)
    }
    // Sets the random colour array to the current colour array
    setCurrentColourArray(randomColourArray)
  }

  // Runs the createBoard function once when the app loads
  useEffect(() => {

    createBoard()

  }, [])

  // basically gamme loop, runs the check column/row functions, move blank, and update array every 100ms
  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForRowOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      moveIntoSquareBelow()
      setCurrentColourArray([...currentColourArray])
    }, 100)
    return () => clearInterval(timer)
    
  },[checkForColumnOfFour,checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColourArray])


  return (
    <div className='app'>
      <div className="game">
        {/* maps the colour array and turns those colour into a grid using css/img*/}
        {currentColourArray.map((candyColour, index) => (
          <img 
            key={index} 
            src={candyColour}
            alt={candyColour}
            data-id={index}
            draggable="true"
            onDragStart = {dragStart}
            onDragOver = {e => e.preventDefault()}
            onDragEnter = {e => e.preventDefault()}
            onDragLeave = {e => e.preventDefault()}
            onDrop = {dragDrop}
            onDragEnd = {dragEnd}
          />
          ))}
      </div>
      <Scoreboard score={scoreDisplay}/>
    </div>
    
  );
}

export default App;
