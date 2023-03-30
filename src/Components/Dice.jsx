function Dice(props){

    const diceStyle = {
        backgroundColor: props.isSelected? "#59E391" : "white"
    }

    return(
        <div style={diceStyle} className="dice">{props.value}</div>
    )
}

export default Dice