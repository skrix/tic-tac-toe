import React  from "react";
import Square from './square';

export default class Board extends React.Component {
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

    renderSquare(square_index) {
        return (
            <Square
                value={ this.props.squares[square_index] }
                onClick={ () => this.props.onClick(square_index) }
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
