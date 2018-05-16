class TicTacToe {
    constructor() {
        this.canvas = document.getElementById('tictactoe');
        this.boundingClientRect = this.canvas.getBoundingClientRect();
        this.context = this.canvas.getContext('2d');
        this.onClick = this.onClick.bind(this);
        this.canvas.addEventListener('click', this.onClick);
        this.board = new Board(this.context);
        this.game = new Game(this.board);
    }

    onClick(event) {
        const mousePosition = this.getMousePosition(event);
        this.game.makeMove(CoordinatesHelper.getSquareClicked(mousePosition));
        if (this.game.gameOver()) {
            this.canvas.removeEventListener('click', this.onClick);
            this.drawWinner();
        }
    }

    getMousePosition(event) {
        return {
            x: event.clientX - this.boundingClientRect.left,
            y: event.clientY - this.boundingClientRect.top
        }
    }

    initialize() {
        this.drawBackgroundStyle();
        this.drawTitle();
        this.board.drawBoard();
    }

    drawBackgroundStyle() {
        this.context.beginPath();
        this.context.rect(0, 0, 500, 500);
        this.context.fillStyle = '#D1E8E2';
        this.context.fill();
        this.context.lineWidth = 2;
        this.context.strokeStyle = '#116466';
        this.context.stroke();
    }

    setStrokeStyle() {
        this.context.fillStyle = '#2C3531';
        this.context.textAlign = 'center';
        this.context.shadowColor = null;
        this.context.shadowBlur = 0;
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
    }

    drawTitle() {
        this.context.font = '48px sans-serif';
        this.setStrokeStyle();
        this.context.fillText('Tic-Tac-Toe!', 250, 60);
    }

    drawWinner() {
        this.context.font = '40px sans-serif';
        this.setStrokeStyle();

        let winnerText;
        switch(this.game.winner) {
            case 0:
                winnerText = 'It\'s a cat\'s game!';
                break;
            case 1:
                winnerText = 'Player X wins!';
                break;
            case 2:
                winnerText = 'Player O wins!';
                break;
        }

        this.context.fillText(winnerText, 250, 460);
    }
}

const ticTacToe = new TicTacToe();
ticTacToe.initialize();