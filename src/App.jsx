import React from 'react'
import Dice from './Components/Dice'
import { nanoid } from 'nanoid'

function App() {

  const [dices, setDices] = React.useState([])
  const [selectedCounter, setSelectedCounter] = React.useState(0)

  function initializeDices(){
    var newDices = []
    var randomNumber
    
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
          value: randomNumber
        })
        }
      }

      return newDices
    })
  }

  React.useEffect(() => {
    initializeDices()
  },[])

  const dicesArray = dices.map((dice,index) => {
  return(
  <Dice 
    key={index}
    id={dice.id}
    value={dice.value}
    isSelected={dice.isSelected}
    toggleSelect={toggleSelect}
  />)
  })
  
  React.useEffect(() => console.log(selectedCounter), [selectedCounter])

  return (
    <div className="app">
      <div className="main--container">
        <h1 className="game--title">Tenzies</h1>
        <p className="game--description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dices">
          {dicesArray}
        </div>
        <button onClick={rollDices} className="roll--button">Roll</button>
      </div>
    </div>
  )
}

export default App
