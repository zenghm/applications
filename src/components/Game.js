import React from 'react'
import Board from './Board';
class Game extends React.Component {
    constructor(props){
        super(props)
        this.state=({
            history:[{
                hisSquare:Array(9).fill(null)
            }],
            xIsNext:true
        })
    }
    render(){
        return(
            <Board/>
        );
    }
}
export default Game;