import React from 'react'
import ReactDOM from 'react-dom';
import './index.css'

class ShoppingList extends React.Component{
    render(){
        return(
            <div className="shopping-list">
                <h1>
                    Shopping List for {this.props.name}
                </h1>

                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>
            </div>
        )
    }
}

// Example usage: <ShoppingList name="Mark" />

class Square extends React.Component{
    /*  React components can have state by setting this.state
    *   in the constructor, which should be considered private 
    *   to the component.
    */
    constructor(props){
        /*  In JavaScript classes, you need to
        *   explicitly call super(), when defining
        *   the constructor of a subclass
        */
        super(props);
        this.state = {
            value: null,
        };
    }
    
    render(){
        return(
            /*
            *   Whenver this.setState is called, an update to
            *   the component is scheduled, causing React to merge
            *   in the passed state update and rerender the component
            *   along with its dependencies. When the component rerenders,
            *   'this.state.value' will be 'X' so you'll see X in the grid
            */
            <button className="square" onClick={() =>
            this.setState({value:'X'})}>
                {this.state.value}
            </button>
        );
    }
}

class Board extends React.Component{
    renderSquare(i){
        return <Square value={i} />;
    }

    render(){
        const status = 'Next player: X';

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