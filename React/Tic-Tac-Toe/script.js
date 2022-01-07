/** 튜토리얼 코드 보고 따라쳤는데
 * Uncaught SyntaxError: expected expression, got '<' 에러가 떴다.
 * 보니까 Babel로 변환해줘야 잘 돌아간다고 한다.
 */
'use strict';
// function component: state를 가지지 않고 render()밖에 없는 component를 표현
// React.Component를 상속받지 않고 return값으로 render()에서 표현할 내용을 return함.
function Square(props) {
    return (
        <button className="square"
            // () => props.onClick()에서 ()가 다 사라짐.
            onClick={props.onClick}>
            {props.value}
        </button>
    )
}
// class Square extends React.Component {
//     render() {
//         return (
//             <button className="square"
//                 onClick={() => this.props.onClick()}>
//                 {this.props.value}
//             </button>
//         );
//     }
// }

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
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

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        // 이겼거나 채워진 칸을 누르면 무시하기
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = (this.state.xIsNext) ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';


            /** dynamic list와 key
             * React는 list가 re-rendered 될 때마다 key를 사용해서 이전 list의 item을 비교한다.
             * key가 있는데 list에 없으면 component를 새로 만들고,
             * 이전 list에는 있던 key가 현재는 없으면 component를 삭제함
             * props랑 비슷한데 this.props.key 처럼 접근할 수는 없고,
             * React가 component update가 있을 때마다 자동으로 사용하는 예약어같은 존재임
             * 동적 list일때 key 사용을 추천하고, global unique 하지 않아도 됨.
             * 현재 list items 안에서만 unique한 값이라면 key로 사용 가능하다.
             */
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
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

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);