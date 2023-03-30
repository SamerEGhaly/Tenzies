import React from 'react'
import Dice from './Components/Dice'
import { nanoid } from 'nanoid'

function App() {

  const [dices, setDices] = React.useState([])

  function initializeDices(){
    var newDices = []
    var randomNumber
    
    for(var i = 0; i < 10; i++){
      randomNumber = Math.floor(Math.random() * 6 + 1)

      newDices.push({
        id: nanoid(),
        value: randomNumber,
        isSelected: false
      })
      
      console.log(newDices[i].id)
    }
    setDices(newDices)
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
  />)
})

  return (
    <div className="app">
      <div className="main--container">
        <h1 className="game--title">Tenzies</h1>
        <p className="game--description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dices">
          {dicesArray}
        </div>
        <button className="roll--button">Roll</button>
      </div>
    </div>
  )
}

export default App
