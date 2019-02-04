import React    from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button
                className="square"
                onClick= { () => this.props.onClick() }
            >
                { this.props.value }
            </button>
        );
    }
}

class Board extends React.Component {
    renderBoardRow(row) {
        let boardRow = row.map((squareNumber) => {
            return this.renderSquare(squareNumber);
        });

        return (
            <div className="board-row">
                { boardRow }
            </div>
        );
    }

    compoundBoard(rows, columns) {
        // [[1,2,3],[4,5,6],[7,8,9]]
        let boardRows = [];
        let currentColumn = 0;

        for (let i = 0; i < rows; i++) {
            boardRows.push([]);
            for (let j = 0; j < columns; j++) {
                boardRows[i][j] = currentColumn;
                currentColumn++;
            }
        }

        return boardRows.map((row) => {
            return this.renderBoardRow(row);
        });
    }

    renderSquare(i) {
        return (
            <Square
                value={ this.props.squares[i] }
                onClick={ () => this.props.onClick(i) }
            />
        );
    }

    render() {
        return (
            <div>
                { this.compoundBoard(3, 3) }
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: false,
        };
    }

    handleClick(square_index) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[square_index]) {
            return;
        }

        squares[square_index] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) !== 0,
        });
    }

    renderJumpToButton(step, move) {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';

        return (
            <li key={ move }>
                <button
                    onClick={ () => this.jumpTo(move) }
                    className="btn btn-info"
                >
                    { desc }
                </button>
            </li>
        )
    }

    handleGameStatus(winner) {
        if (winner) {
            return 'Winner: ' + winner;
        }  else if (this.state.stepNumber === 9) {
            return "Draw! Let's try one more time!"
        } else {
            return 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner  = calculateWinner(current.squares);
        const moves   = history.map((step, move) => this.renderJumpToButton(step, move));
        let status    = this.handleGameStatus(winner);

        return (
            <div className="game">
                <div className="game-content">
                    <div className='status'>{ status }</div>
                    <div className="game-board">
                        <Board
                            squares={ current.squares }
                            onClick={ (i) => this.handleClick(i) }
                        />
                    </div>
                </div>

                <div className="game-info">
                    <ol>{ moves }</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
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

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
