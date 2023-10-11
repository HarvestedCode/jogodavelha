const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const score = document.getElementById('score');
const round = document.getElementById('round');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameOver = false;
let playerScore = 0;
let aiScore = 0;
let roundNumber = 1;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

resetButton.addEventListener('click', resetGame);

function resetGame() {
    currentPlayer = 'X';
    gameOver = false;
    roundNumber = 1;
    updateRound();
    message.textContent = 'Comece o jogo!';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#eee';
    });
}

function updateRound() {
    round.textContent = `Rodada ${roundNumber}`;
}

function checkWin(player) {
    for (let pattern of winPatterns) {
        if (
            cells[pattern[0]].textContent === player &&
            cells[pattern[1]].textContent === player &&
            cells[pattern[2]].textContent === player
        ) {
            cells[pattern[0]].style.backgroundColor = 'green';
            cells[pattern[1]].style.backgroundColor = 'green';
            cells[pattern[2]].style.backgroundColor = 'green';
            return true;
        }
    }
    return false;
}

function checkTie() {
    return [...cells].every(cell => cell.textContent !== '');
}

function aiMove() {
    if (!gameOver && currentPlayer === 'O') {
        const emptyCells = [...cells].filter(cell => cell.textContent === '');
        if (emptyCells.length === 0) {
            gameOver = true;
            message.textContent = 'Empate!';
        } else {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const cell = emptyCells[randomIndex];
            cell.textContent = 'O';
            if (checkWin('O')) {
                gameOver = true;
                aiScore++;
                message.textContent = 'A IA venceu!';
                score.textContent = `Pontuação: Jogador ${playerScore} - IA ${aiScore}`;
            } else if (checkTie()) {
                gameOver = true;
                message.textContent = 'Empate!';
            } else {
                currentPlayer = 'X';
                message.textContent = 'Sua vez!';
            }
        }
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!gameOver && currentPlayer === 'X' && cell.textContent === '') {
            cell.textContent = currentPlayer;
            if (checkWin(currentPlayer)) {
                gameOver = true;
                playerScore++;
                message.textContent = 'Jogador venceu!';
                score.textContent = `Pontuação: Jogador ${playerScore} - IA ${aiScore}`;
            } else if (checkTie()) {
                gameOver = true;
                message.textContent = 'Empate!';
            } else {
                currentPlayer = 'O';
                message.textContent = 'Vez da IA...';
                setTimeout(aiMove, 1000);
            }
        }
    });
});

resetGame();
