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
        return (
            <Square 
                value={this.props.squares[i]} 
                onClick={() => this.props.onClick(i)} 
        />);
    }

    render(){
        const winner = calculateWinner(this.state.squares);
        let status;
        if(winner){
            status = 'Winner: ' + winner;
        }else{
            status = 'Next player: ' 
                + (this.state.xIsNext ? 'X':'O');
        }

        return(
            <div>
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
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        }
    }

    handleClick(i){
        const history = this.state.history;
        const current = history[history.length - 1];
        /**
         * We call .slice() to copy the squares array instead of
         * mutating the existing array.
         */
        const squares = current.squares.slice();
        if(calculateWinner(squares)||squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            // flip the value of xIsNext
            xIsNext: !this.state.xIsNext,
        });
    }

    render(){
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        let status;
        if(winner){
            status = 'Winner: ' + winner;
        }else{
            status = 'Next player: '
                + (this.state.xIsNext ? 'X':'O');
        }

        return(
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for(let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if(squares[a] 
            && squares[a] === squares[b] 
            && squares[a] === squares[c]){
                return squares[a];
            }
    }

    return null;
}

// ================================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);