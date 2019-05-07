`use strict`;
var move;
var computerMove;
var output;
var playerMove;
var pcMove;
var button = document.querySelectorAll(`.player-move`);
var playerResult = document.querySelector(`#playerResult`).innerText = 0;
var pcResult = document.querySelector(`#pcResult`).innerText = 0;
var stone = document.querySelector(`#stone`);
var paper = document.querySelector(`#paper`);
var scissors = document.querySelector(`#scissors`);
var output = document.querySelector(`#output`);
var rounds = document.querySelector(`#rounds`);
var game = document.querySelector(`#new_game`);

//Random number for computer choice
function drawComputer() {
    computerMove = Math.floor(Math.random() * 3 + 1);
    return computerMove;
}
drawComputer();
console.log(computerMove);

//check win condition
function check() {
    if (rounds > 0) {
        if (playerMove === pcMove) {
            output.innerText += ` jest remis!`;
            document.querySelector(`#playerResult`).innerText = 1 + playerResult++;
            document.querySelector(`#pcResult`).innerText = 1 + pcResult++;
            console.log(playerResult);
        } else if ((playerMove === 1 && pcMove === 2) || (playerMove === 2 && pcMove === 3) || (playerMove === 3 && pcMove === 1)) {
            output.innerText += ` wygrałeś !`;
            document.querySelector(`#playerResult`).innerText = 1 + playerResult++;
        } else if ((playerMove === 1 && pcMove === 3) || (playerMove === 2 && pcMove === 1) || (playerMove === 3 && pcMove === 2)) {
            output.innerText += ` przegrałś !`;
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

//new gam button 
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

//loop for button click
for (ele of button) {
    ele.addEventListener("click", buttonClick(ele));
}

//function for choose button
function buttonClick(ele) {
    return function() {
        move = ele.getAttribute('data-move');
        console.log(move);
        plMove();
    };
}

//function for player choice 
function plMove() {
    if (rounds > 0) {
        if (move == `paper`) {
            output.innerText = `Wybrałeś papier i`;
            playerMove = 1;
        } else if (move == `stone`) {
            playerMove = 2;
            output.innerText = `Wybrałeś kamień i`;
        } else if (move == `scissors`) {
            playerMove = 3;
            output.innerText = `Wybrałeś nożyczki i`;
        }
        console.log(playerMove);
        pcMove = drawComputer();
        check();
    }
}