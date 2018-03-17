import React from 'react'
import ReactDOM from 'react-dom';
import './index.css'

/**
 *  Now when the square is clicked, it calls the onClick function that was passed by Board. Let’s recap what happens here:
 *  1. The onClick prop on the built-in DOM <button> component tells React to set up a click event listener.
 *  2. When the button is clicked, React will call the onClick event handler defined in Square’s render() method.
 *  3. This event handler calls this.props.onClick(). Square’s props were specified by the Board.
 *  4. Board passed onClick={() => this.handleClick(i)} to Square, so, when called, it runs this.handleClick(i) on the Board.
 *  5. handleClick() method gets called
 */

 /**
  * React supports a simpler syntact called functional components
  * for component types like Square that only consist of a render method.
  * Rather than define a class extending React.Component, simply write
  * a function that takes props and returns what should be rendered.
  */
function Square(props){
    return(
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component{
    /**
     * When one wants to aggregate data from multiple children
     * or to have two child components communicate with each other,
     * move the state upwards so that it lives in the parent component.
     * The parent can then pass the state back down to the children
     * via props, so that the child components are always in sync with
     * each other and with the parent.
     */
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    renderSquare(i){
        return <Square 
                value={this.state.squares[i]} 
                onClick={() => this.handleClick(i)} 
                />;
    }

    handleClick(i){
        /**
         * We call .slice() to copy the squares array instead of
         * mutating the existing array.
         */
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext? 'X' : 'O';
        this.setState({
            squares: squares,
            // flip the value of xIsNext
            xIsNext: !this.state.xIsNext,
        });
    }

    render(){
        const status = 'Next player: ' 
            + (this.state.xIsNext ? 'X' : 'O');

        return(
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component{
    render(){
        return(
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ================================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);