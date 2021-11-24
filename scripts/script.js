const FRONT = 'card_front';
const BACK = 'card_back';
const CARD = 'card';
const ICON = 'icon';

// display variables starts
let minutes = 0;
let seconds = 0;
let millisecond = 0;

const displayTimer = document.querySelector('.timer');

let timer;

let move = 0;
let displayMove = document.querySelector('.move');
// display variables ends

startGame();

function startGame() {
    initializeCards(game.createCardsFromTechs());
    startTimer();
};

// creation of game board starts
function initializeCards() {

    let gameBoard = document.getElementById('gameBoard');

    gameBoard.innerHTML = '';

    game.cards.forEach((card) => {

        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);

        gameBoard.appendChild(cardElement);
    })
}

function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = './images/' + card.icon + '.png';
        cardElementFace.appendChild(iconElement);
    }
    else {
        cardElementFace.innerHTML = '&lt/&gt';
    }

    element.appendChild(cardElementFace);
}
// creation of game board ends

// flipping the cards starts
function flipCard() {
    
    if (game.setCard(this.id)) {

        this.classList.add('flip');
        currentMove();
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCard();
                if (game.checkGameOver()) {
                    stop();
                    let gameOverLayer = document.getElementById('gameOver');
                    gameOverLayer.style.display = 'flex';
                }
            }
            else {
                setTimeout(() => {

                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');

                    game.unFlipCards();
                }, 1000);
            }
        }
    }
};
// flipping the cards ends

function restart() {

    game.clearCard();
    resetTimer();
    move = 0;
    displayMove.innerHTML = 'Jogadas: ' + (move < 10 ? '0' + move : move);
    startGame();
    let gameOverLayer = document.getElementById('gameOver');
    gameOverLayer.style.display = 'none';
}


// display starts

function startTimer() {
    timer = setInterval(timerLogic, 10);
}

function stop() {
    clearInterval(timer);
}

function resetTimer() {

    stop();
    minutes = 0;
    seconds = 0;
    millisecond = 0;

    displayTimer.innerHTML = '00:00:00';
}

function timerLogic() {

    millisecond++;

    if (millisecond == 100) {
        millisecond = 0;
        seconds++;
    }

    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }

    let format = (minutes < 10 ? '0' + minutes : minutes)
        + ':' +
        (seconds < 10 ? '0' + seconds : seconds)
        + ':' +
        (millisecond < 10 ? '0' + millisecond : millisecond);

    displayTimer.innerHTML = format;
}

function currentMove() {
    move++;
    displayMove.innerHTML = 'Jogadas: ' + (move < 10 ? '0' + move : move);
}

// display - ends
















