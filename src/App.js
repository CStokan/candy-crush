import React, { useEffect, useState } from 'react';

// TILES_PER_ROW of the board
const TILES_PER_ROW = 8;

// Candy colours
const candyColours= [
  'red',
  'yellow',
  'orange',
  'purple',
  'green',
  'blue'
]

const App = () => {

  // State for the current colour array
  const [currentColourArray, setCurrentColourArray] = useState([])
  // determings the square being dragged and shows the img properties
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  // determings the square being replaced and shows the img properties
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)

  
  // Function to check if the move is valid
  function isValid(){
    const isColumnOfThree = checkForColumnOfThree()
    const isColumnOfFour = checkForColumnOfFour()
    const isRowOfThree = checkForRowOfThree()
    const isRowOfFour = checkForRowOfFour()

    if(isColumnOfThree || isColumnOfFour || isRowOfThree || isRowOfFour) {
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

      const isBlank = currentColourArray[i] === ''
      
      // checks if the three items in the column are the same colour if true turn blank
      if(columnOfFour.every(square => currentColourArray[square] === decidedColour && !isBlank)) {
        columnOfFour.forEach(square => {
        currentColourArray[square] = ''})
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

      const isBlank = currentColourArray[i] === ''

      // checks if the three items in the column are the same colour if true turn blank
      if(columnOfThree.every(square => currentColourArray[square] === decidedColour && !isBlank)) {
        columnOfThree.forEach(square => {
        currentColourArray[square] = ''})
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

      const isBlank = currentColourArray[i] === ''
      // Check if the index is in the notValid array
      if(notValid.includes(i)) continue

      // checks if the three items in the column are the same colour if true turn blank
      if(rowOfFour.every(square => currentColourArray[square] === decidedColour && !isBlank)) {
        rowOfFour.forEach(square => {
          currentColourArray[square] = ''})
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

      const isBlank = currentColourArray[i] === ''
      // Check if the index is in the notValid array
      if(notValid.includes(i)) continue

      // checks if the three items in the column are the same colour if true turn blank
      if(rowOfThree.every(square => currentColourArray[square] === decidedColour && !isBlank)) {
        rowOfThree.forEach(square => {
          currentColourArray[square] = ''})
          return true;
      }
    }
  }



  // Will take a row of 3 or four and shift the blanks to the top and creates a new candy if top row is blank
  const moveIntoSquareBelow = () => {
    for(let i = 0; i <= 55; i++) {

      const firstRow = [0,1,2,3,4,5,6,7]

      const isFirstRow = firstRow.includes(i)

      if(isFirstRow && currentColourArray[i] === '') {
        currentColourArray[i] = candyColours[Math.floor(Math.random() * candyColours.length)]
      }

      if(currentColourArray[i + TILES_PER_ROW] === '') {
        currentColourArray[i + TILES_PER_ROW] = currentColourArray[i]
        currentColourArray[i] = ''
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
    
    currentColourArray[squareBeingReplacedId] = squareBeingDragged.style.backgroundColor
    currentColourArray[squareBeingDraggedId] = squareBeingReplaced.style.backgroundColor

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
      currentColourArray[squareBeingReplacedId] = squareBeingReplaced.style.backgroundColor
      currentColourArray[squareBeingDraggedId] = squareBeingDragged.style.backgroundColor
      setCurrentColourArray([...currentColourArray])
      
    }
  
  }

  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
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

  // Runs the check column/row functions every 100ms
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
            style={{backgroundColor: candyColour}}
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
    </div>
  );
}

export default App;
