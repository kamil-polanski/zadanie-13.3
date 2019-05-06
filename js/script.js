`use strict`;

var computerMove;
var output;
var playerMove;
var pcMove;
var playerResult = document.querySelector(`#playerResult`).innerText = 0;
var pcResult = document.querySelector(`#pcResult`).innerText = 0;
var stone = document.querySelector(`#stone`);
var paper = document.querySelector(`#paper`);
var scissors = document.querySelector(`#scissors`);
var output = document.querySelector(`#output`);
var rounds = document.querySelector(`#rounds`);
var game = document.querySelector(`#new_game`);

//Random number for computer
function drawComputer() {
    computerMove = Math.floor(Math.random() * 3 + 1);
    return computerMove;
}
drawComputer();
console.log(computerMove);

function check() {
    if (rounds > 0) {
        if (playerMove === pcMove) {
            output.innerText += ` remis !!`;
            document.querySelector(`#playerResult`).innerText = 1 + playerResult++;
            document.querySelector(`#pcResult`).innerText = 1 + pcResult++;
            console.log(playerResult);
        } else if ((playerMove === 1 && pcMove === 2) || (playerMove === 2 && pcMove === 3) || (playerMove === 3 && pcMove === 1)) {
            output.innerText += ` wygrana !`;
            document.querySelector(`#playerResult`).innerText = 1 + playerResult++;
        } else if ((playerMove === 1 && pcMove === 3) || (playerMove === 2 && pcMove === 1) || (playerMove === 3 && pcMove === 2)) {
            output.innerText += ` przegrana !`;
            document.querySelector(`#pcResult`).innerText = 1 + pcResult++;
        }
        document.querySelector(`#rounds`).innerText = `pozostała liczba rund: ${(-1 + rounds--)}`;
        if (rounds === 0 && (playerResult < pcResult)) {
            output.innerText = `Koniec gry, PRZEGRANA!`;

        } else if (rounds === 0 && (playerResult > pcResult)) {
            output.innerText = `Koniec gry, WYGRANA!`;

        } else if (rounds === 0 && (playerResult == pcResult)) {
            output.innerText = `Koniec gry, REMIS!`;
        }

    }
}


new_game.addEventListener(`click`, function() {
    playerResult = 0;
    pcResult = 0;
    rounds = 0;
    output.innerText = ``;
    rounds = window.prompt(`Podaj liczbę rund`);
    if (isNaN(rounds)) {
        document.querySelector(`#rounds`).innerText = `Wprowadź liczbę`;
    } else if (rounds === `` || rounds === null) {
        document.querySelector(`#rounds`).innerText = `wprowadź liczbę rund`;
    } else if (rounds < 0 || rounds == 0) {
        document.querySelector(`#rounds`).innerText = `Liczba rund nie może być ujemna lub równa zero`;
    } else {
        document.querySelector(`#rounds`).innerText = `Wybrałeś rund: ${rounds}`;


    }
});

{}
paper.addEventListener(`click`, function() {
    if (rounds > 0) {
        playerMove = 1;
        pcMove = drawComputer();
        output.innerText = `Wybrałeś papier`;
        check();
    }
});

stone.addEventListener(`click`, function() {
    if (rounds > 0) {
        playerMove = 2;
        pcMove = drawComputer();
        output.innerText = `Wybrałeś kamień`;
        check();
    }
});

scissors.addEventListener(`click`, function() {
    if (rounds > 0) {
        playerMove = 3;
        pcMove = drawComputer();
        output.innerText = `Wybrałeś nożyczki`;
        check();
    }
});


console.log(playerResult);
console.log(pcResult);