const boxes = document.querySelectorAll('.box');

const resetButton = document.querySelectorAll('.btn')[1];

const newGameButton = document.querySelectorAll('.btn')[0];

const modal = document.createElement('div');

const modalContent = document.createElement('div');

const modalText = document.createElement('p');

const closeModalButton = document.createElement('button');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let isGameOver = false;


modal.classList.add('modal');
modalContent.classList.add('modal-content');
closeModalButton.classList.add('close-modal');
closeModalButton.textContent = 'Close';

modalContent.appendChild(modalText);
modalContent.appendChild(closeModalButton);
modal.appendChild(modalContent);
document.body.appendChild(modal);

const winningPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const showModal = (message) => {
  modalText.textContent = message;
  modal.style.display = 'flex';
};

const hideModal = () => {
  modal.style.display = 'none';
};

const checkWinner = () => {
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return pattern;
    }
  }
  return null;
};

const highlightWinner = (winningPattern) => {
  winningPattern.forEach(index => {
    const cell = boxes[index];
    cell.classList.add('winning-line');
  });
};

const resetGame = () => {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  isGameOver = false;
  boxes.forEach(box => {
    box.textContent = '';
    box.classList.remove('winning-line', 'disabled');
  });
  hideModal();
};

const makeMove = (index) => {
  if (board[index] || isGameOver) return;
  board[index] = currentPlayer;
  boxes[index].textContent = currentPlayer;
  boxes[index].classList.add('disabled');
  const winnerPattern = checkWinner();
  if (winnerPattern) {
    highlightWinner(winnerPattern);
    isGameOver = true;
    showModal(`Player ${currentPlayer} wins!`);
  } else if (board.every(cell => cell)) {
    isGameOver = true;
    showModal(`It's a draw!`);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
};

boxes.forEach((box, index) => {
  box.addEventListener('click', () => makeMove(index));
});

resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', resetGame);
closeModalButton.addEventListener('click', hideModal);
