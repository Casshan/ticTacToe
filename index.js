// DOM SELECTORS

const playerOneNameInput = document.querySelector(`#player-one`);
const playerTwoNameInput = document.querySelector(`#player-two`);
const submitPlayerButton = document.querySelector(`#submit-player-names`);
const playerOneName = document.querySelector(`#player-one-name`);
const playerTwoName = document.querySelector(`#player-two-name`);
const restartButton = document.querySelector(`#restart`);
const winnerText = document.querySelector(`#winner`);

const cell0 = document.querySelector(`#cell-0`);
const cell1 = document.querySelector(`#cell-1`);
const cell2 = document.querySelector(`#cell-2`);
const cell3 = document.querySelector(`#cell-3`);
const cell4 = document.querySelector(`#cell-4`);
const cell5 = document.querySelector(`#cell-5`);
const cell6 = document.querySelector(`#cell-6`);
const cell7 = document.querySelector(`#cell-7`);
const cell8 = document.querySelector(`#cell-8`);

// HELPER FUNCTIONS

const newGame = () => {
    disableClick();

    return {
        currentPlayer: `X`,
        playerOne: null,
        playerTwo: null,
        singlePlayer: false,
        board: [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]
    }
}

const disableClick = () => {
    cell0.style.pointerEvents = `none`;
    cell1.style.pointerEvents = `none`;
    cell2.style.pointerEvents = `none`;
    cell3.style.pointerEvents = `none`;
    cell4.style.pointerEvents = `none`;
    cell5.style.pointerEvents = `none`;
    cell6.style.pointerEvents = `none`;
    cell7.style.pointerEvents = `none`;
    cell8.style.pointerEvents = `none`;
}

const enableClick = () => {
    cell0.style.pointerEvents = `auto`;
    cell1.style.pointerEvents = `auto`;
    cell2.style.pointerEvents = `auto`;
    cell3.style.pointerEvents = `auto`;
    cell4.style.pointerEvents = `auto`;
    cell5.style.pointerEvents = `auto`;
    cell6.style.pointerEvents = `auto`;
    cell7.style.pointerEvents = `auto`;
    cell8.style.pointerEvents = `auto`;
}

const swapPlayer = () => {
    if (game.currentPlayer === `X`) {
        game.currentPlayer = `O`;
    } else if (game.currentPlayer === `O`) {
        game.currentPlayer = `X`;
    }
}

const shuffle = (arr) => {
    let m = arr.length;
    let t;
    let i;

    while (m) {
        i = Math.floor(Math.random() * m--);

        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
    }

    return arr;
}

const getColumns = (object, num) => {
    let result = [];

    for (let i = 0; i < object.board.length; i++) {
        result.push(object.board[i][num]);
    }

    return result;
}

const checkBoard = (object) => {
    let result = [];
    let tempStorage = [];
    let positon = 0;

    for (let i = 0; i < object.board.length; i++) {
        result.push(object.board[i]);
    }

    for (let i = 0; i < object.board.length; i++) {
        result.push(getColumns(object, i));
    }

    for (let i = 0; i < object.board.length; i++) {
        tempStorage.push(object.board[i][positon])
        if (i < 2) {
            positon++;
        }
    }

    result.push(tempStorage);

    tempStorage = [];

    for (let i = 0; i < object.board.length; i++) {
        tempStorage.push(object.board[i][positon])
        if (i < 2) {
            positon--;
        }
    }

    result.push(tempStorage);

    return result;
}


const threeInRow = (arr) => {
    if (arr.every(value => value === arr[0]) && arr.every(value => typeof value !== `object`)) {
        return true;
    } else {
        return false;
    }
}

const isFilled = (arr) => {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].every(value => typeof value !== `object`)) {
            count++
        }
    }

    if (count === 8) {
        return true;
    } else {
        return false;
    }
}

const winCondition = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (threeInRow(arr[i]) === true) {
            return declareWinner(arr[i]);
        } else if (threeInRow(arr[i]) !== true && isFilled(arr) === true) {
            return winnerText.innerText = `It is a draw.`;
        } else {
            continue;
        }
    }

    if (game.singlePlayer === true && game.currentPlayer === `O`) {
        return computerPlayer(game);
    }
}

const declareWinner = (arr) => {
    disableClick();

    if (arr[0] === `X`) {
        return winnerText.innerText = `Player One wins!`
    } else if (arr[0] === `O`) {
        return winnerText.innerText = `Player Two wins!`
    }
}

const computerPlayer = (object) => {
    let storage = [];

    const arr = [
        cell0,
        cell1,
        cell2,
        cell3,
        cell4,
        cell5,
        cell6,
        cell7,
        cell8
    ]

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].innerText === `-`) {
            storage.push(arr[i]);
        }
    }

    shuffle(storage);

    storage[0].click();
}

const restart = () => {
    game = newGame();

    cell0.innerText = `-`;
    cell1.innerText = `-`;
    cell2.innerText = `-`;
    cell3.innerText = `-`;
    cell4.innerText = `-`;
    cell5.innerText = `-`;
    cell6.innerText = `-`;
    cell7.innerText = `-`;
    cell8.innerText = `-`;

    playerOneName.innerText = `Player One: `;
    playerTwoName.innerText = `Player Two: `;

    winnerText.innerText = `Tic Tac Toe`

    submitPlayerButton.disabled = false;

    disableClick();
}

// STATE

let game = newGame();

// EVENT LISTENERS

submitPlayerButton.addEventListener(`click`, () => {
    if (playerOneNameInput.value === ``) {
        playerOneName.innerText = `Player One must have a name`
        playerTwoName.innerText = ``

    } else if (playerOneNameInput.value !== `` && playerTwoNameInput.value !== ``) {
        let playerOne = playerOneNameInput.value;
        let playerTwo = playerTwoNameInput.value;

        game.playerOne = playerOne;
        game.playerTwo = playerTwo;

        playerOneNameInput.value = ``;
        playerTwoNameInput.value = ``;
        playerOneName.innerText = `Player One: ` + game.playerOne;
        playerTwoName.innerText = `Player Two: ` + game.playerTwo;

        submitPlayerButton.disabled = true;
        enableClick();

    } else if (playerOneNameInput.value !== `` && playerTwoNameInput.value === ``) {
        let playerOne = playerOneNameInput.value;

        game.playerOne = playerOne;

        game.singlePlayer = true;

        playerOneNameInput.value = ``;
        playerOneName.innerText = `Player One: ` + game.playerOne;
        playerTwoName.innerText = `Player Two: Computer`;

        submitPlayerButton.disabled = true;
        enableClick();
    }
})

restartButton.addEventListener(`click`, () => {
    restart();
})

cell0.addEventListener(`click`, () => {
    cell0.innerText = game.currentPlayer;
    game.board[0][0] = game.currentPlayer;

    swapPlayer();
    winCondition(checkBoard(game));
    cell0.style.pointerEvents = `none`;
})

cell1.addEventListener(`click`, () => {
    cell1.innerText = game.currentPlayer;
    game.board[0][1] = game.currentPlayer;

    swapPlayer();
    winCondition(checkBoard(game));
    cell1.style.pointerEvents = `none`;
})

cell2.addEventListener(`click`, () => {
    cell2.innerText = game.currentPlayer;
    game.board[0][2] = game.currentPlayer;

    swapPlayer();
    winCondition(checkBoard(game));
    cell2.style.pointerEvents = `none`;
})

cell3.addEventListener(`click`, () => {
    cell3.innerText = game.currentPlayer;
    game.board[1][0] = game.currentPlayer;

    swapPlayer();
    winCondition(checkBoard(game));
    cell3.style.pointerEvents = `none`;
})

cell4.addEventListener(`click`, () => {
    cell4.innerText = game.currentPlayer;
    game.board[1][1] = game.currentPlayer;

    swapPlayer();
    winCondition(checkBoard(game));
    cell4.style.pointerEvents = `none`;
})

cell5.addEventListener(`click`, () => {
    cell5.innerText = game.currentPlayer;
    game.board[1][2] = game.currentPlayer;

    swapPlayer();
    winCondition(checkBoard(game));
    cell5.style.pointerEvents = `none`;
})

cell6.addEventListener(`click`, () => {
    cell6.innerText = game.currentPlayer;
    game.board[2][0] = game.currentPlayer;

    swapPlayer();
    winCondition(checkBoard(game));
    cell6.style.pointerEvents = `none`;
})

cell7.addEventListener(`click`, () => {
    cell7.innerText = game.currentPlayer;
    game.board[2][1] = game.currentPlayer;

    swapPlayer();
    winCondition(checkBoard(game));
    cell7.style.pointerEvents = `none`;
})

cell8.addEventListener(`click`, () => {
    cell8.innerText = game.currentPlayer;
    game.board[2][2] = game.currentPlayer;

    swapPlayer();
    winCondition(checkBoard(game));
    cell8.style.pointerEvents = `none`;
})