const buttons = [
    document.getElementById('button00'),
    document.getElementById('button01'),
    document.getElementById('button02'),
    document.getElementById('button10'),
    document.getElementById('button11'),
    document.getElementById('button12'),
    document.getElementById('button20'),
    document.getElementById('button21'),
    document.getElementById('button22')
];

let currentPlayer = 'X';
let turn = 1;
const tictactoe = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (turn <= 9) {
            const id = button.id;
            const row = parseInt(id.charAt(6));
            const col = parseInt(id.charAt(7));

            if (tictactoe[row][col] === '') {
                button.textContent = currentPlayer;
                tictactoe[row][col] = currentPlayer;

                if (checkWin(currentPlayer, row, col)) {
                    showWinner(currentPlayer);
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    turn++;
                }
            }
        } else {
            showDraw();
        }
    });
});

function checkWin(player, row, col) {
    // Verifică pe orizontală și verticală
    if (
        (tictactoe[row][0] === player && tictactoe[row][1] === player && tictactoe[row][2] === player) ||
        (tictactoe[0][col] === player && tictactoe[1][col] === player && tictactoe[2][col] === player)
    ) {
        return true;
    }

    // Verifică pe diagonale
    if (
        (row === col || row + col === 2) &&
        ((tictactoe[0][0] === player && tictactoe[1][1] === player && tictactoe[2][2] === player) ||
        (tictactoe[0][2] === player && tictactoe[1][1] === player && tictactoe[2][0] === player))
    ) {
        return true;
    }

    return false;
}

function showWinner(player) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = 'Player ' + player + ' wins!';
    displayResetButton();
}

function showDraw() {
    const messageElement = document.getElementById('message');
    messageElement.textContent = 'Jocul s-a încheiat cu rezultat de egalitate!';
    displayResetButton();
}

function resetGame() {
    buttons.forEach(button => {
        button.textContent = '';
    });

    const messageElement = document.getElementById('message');
    messageElement.textContent = '';

    currentPlayer = 'X';
    turn = 1;
    tictactoe.forEach((row, rowIndex) => {
        row.forEach((_, colIndex) => {
            tictactoe[rowIndex][colIndex] = '';
        });
    });

    hideResetButton();
}

function displayResetButton() {
    const resetButton = document.getElementById('reset-button');
    resetButton.classList.remove('hidden');
}

function hideResetButton() {
    const resetButton = document.getElementById('reset-button');
    resetButton.classList.add('hidden');
}

// Adaugă un event listener pentru butonul de reset
document.getElementById('reset-button').addEventListener('click', resetGame);
