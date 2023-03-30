import React from 'react'
import Dice from './Components/Dice'
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

function App() {

  const noOfDice = 10
  const [dicesData, setDices] = React.useState(newDice()) // an array of dices data
  const [selectedCounter, setSelectedCounter] = React.useState(0) // counter to show how many dices are selected
  const [finished, setFinished] = React.useState(false) // boolean to show game state 

  function newDie(){
    var randomNumber = Math.floor(Math.random() * 6 + 1)
    return({
      id: nanoid(),
      value: randomNumber,
      isSelected: false
    })
  }

  function newDice(){
    var newDices = []
    for(var i = 0; i < noOfDice; i++){
      newDices.push(newDie())
    }
    return(newDices)
  }

  function resetGame(){
    setDices(newDice())
    setFinished(false)
    setSelectedCounter(0)
  }

  function toggleSelect(id){
    if(finished)
      return
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
      var currentDice

      for(var i = 0; i < prevDices.length; i++){
        currentDice = prevDices[i]
        if(currentDice.isSelected){
          newDices.push({...currentDice})
        }
        else{
          newDices.push(newDie())
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

  React.useEffect(() => { gameFinished() }, [dicesData, selectedCounter])

  React.useEffect(() => console.log(selectedCounter), [selectedCounter])

  const dicesArray = dicesData.map((dice,index) => {
    return(
    <Dice 
      key={index}
      id={dice.id}
      value={dice.value}
      isSelected={dice.isSelected}
      toggleSelect={toggleSelect}
    />)
    })

  console.log("render")

  return (
    <div className="app">
      <div className="main--container">
        {finished && <Confetti recycle={false} numberOfPieces={600} gravity={0.2}/>}
        <h1 className="game--title">Tenzies</h1>
        <p className="game--description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dices">
          {dicesArray}
        </div>
        <button onClick={() => {finished ? resetGame() : rollDices()}} className="roll--button">{finished ? "Reset Game" : "Roll"}</button>
      </div>
    </div>
  )
}

export default App
