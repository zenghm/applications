import React from 'react';
import '../css/game.css'
class Square extends React.Component {
    render() {
        return (
            <button className="square"
                onClick={this.props.onClickSquare}>{this.props.value}</button>
        );
    }
}
export default Square;