import React from 'react'
import Dice from './Components/Dice'
import { nanoid } from 'nanoid'

function App() {

  const [dicesData, setDices] = React.useState([]) // an array of dices data
  const [dicesArray, setDicesArray] = React.useState([]) // an array of the dice components to be rendered
  const [selectedCounter, setSelectedCounter] = React.useState(0) // counter to show how many dices are selected
  const [finished, setFinished] = React.useState(false) // boolean to show game state

  function initializeGame(){
    var newDices = []
    var randomNumber
    
    setFinished(false)
    setSelectedCounter(0)

    for(var i = 0; i < 10; i++){
      randomNumber = Math.floor(Math.random() * 6 + 1) //random number in range [1,6]

      newDices.push({
        id: nanoid(),
        value: randomNumber,
        isSelected: false
      })
    }
    setDices(newDices)
  }

  function toggleSelect(id){
    setDices(prevDices => {
      var newDices = []
      var currentDice

      for(var i = 0; i < prevDices.length; i++){
        currentDice = prevDices[i]

        if(currentDice.id === id){
          newDices.push({
            ...currentDice,
            isSelected: !currentDice.isSelected
          })
          if(currentDice.isSelected){ // if the clicked device was already selected and got unselected then decrease the counter
            setSelectedCounter(selectedCounter - 1)
          }
          else{ // else increase the counter
            setSelectedCounter(selectedCounter + 1)
          }
        }
        else{
          newDices.push(prevDices[i])
        }
      }

      return newDices
    })
  }

  function rollDices(){
    setDices(prevDices => {
      var newDices = []
      var randomNumber
      var currentDice

      for(var i = 0; i < prevDices.length; i++){
        currentDice = prevDices[i]
        if(currentDice.isSelected){
          newDices.push({...currentDice})
        }
        else{
          randomNumber = Math.floor(Math.random() * 6 + 1) //random number in range [1,6]
          newDices.push({
            ...currentDice,
            value: randomNumber,
          })
        }
      }

      return newDices
    })
  }

  function gameFinished(){
    if(dicesData.length > 0 && selectedCounter == dicesData.length){
      var firstValue = dicesData[0].value
      var currentValue
      for(var i = 1; i < dicesData.length; i++){
        currentValue = dicesData[i].value
        if(firstValue == currentValue){
          continue
        }
        else{
          return
        }
      }
      setFinished(true)
      console.log("You Win!!")
    }
  }

  React.useEffect(() => {
    initializeGame()
  },[])

  React.useEffect(() => console.log(selectedCounter), [selectedCounter])

  React.useEffect(() => {
    gameFinished()
    setDicesArray(dicesData.map((dice,index) => {
      return(
      <Dice 
        key={index}
        id={dice.id}
        value={dice.value}
        isSelected={dice.isSelected}
        toggleSelect={toggleSelect}
      />)
      }))
  }, [dicesData])

  return (
    <div className="app">
      <div className="main--container">
        <h1 className="game--title">Tenzies</h1>
        <p className="game--description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dices">
          {dicesArray}
        </div>
        <button onClick={() => {finished ? initializeGame() : rollDices()}} className="roll--button">{finished ? "Reset Game" : "Roll"}</button>
      </div>
    </div>
  )
}

export default App
