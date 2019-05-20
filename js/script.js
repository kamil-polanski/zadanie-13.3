`use strict`;

let computerMove;
const button = document.querySelectorAll(`.player-move`);
const playerResult = document.querySelector(`#playerResult`);
const pcResult = document.querySelector(`#pcResult`);
const output2 = document.querySelector(`#rounds`);
const output = document.querySelector(`#output`);
const game = document.querySelector(`#new_game`);


var params = {
        move: ``,
        pcMove: ``,
        playerMove: ``,
        rounds: ``,
        playerResult: ``,
        pcResult: ``
    }
    //Random number for computer choice
function drawComputer() {
    computerMove = Math.floor(Math.random() * 3 + 1);
    return computerMove;
}
drawComputer();
console.log(computerMove);

//check win condition
function check() {
    if (params.rounds > 0) {
        if (params.playerMove === params.pcMove) {
            output.innerText += ` jest remis!`;
            playerResult.innerText = 1 + params.playerResult++;
            pcResult.innerText = 1 + params.pcResult++;
            console.log(playerResult);
        } else if ((params.playerMove === 1 && params.pcMove === 2) || (params.playerMove === 2 && params.pcMove === 3) || (params.playerMove === 3 && params.pcMove === 1)) {
            output.innerText += ` wygrałeś !`;
            playerResult.innerText = 1 + params.playerResult++;
        } else if ((params.playerMove === 1 && params.pcMove === 3) || (params.playerMove === 2 && params.pcMove === 1) || (params.playerMove === 3 && params.pcMove === 2)) {
            output.innerText += ` przegrałś !`;
            pcResult.innerText = 1 + params.pcResult++;
        }
        output2.innerText = `pozostała liczba rund: ${(-1 + params.rounds--)}`;
        if (params.rounds === 0 && (params.playerResult < params.pcResult)) {
            output.innerText = `Koniec gry, PRZEGRANA!`;

        } else if (params.rounds === 0 && (params.playerResult > params.pcResult)) {
            output.innerText = `Koniec gry, WYGRANA!`;

        } else if (params.rounds === 0 && (params.playerResult == params.pcResult)) {
            output.innerText = `Koniec gry, REMIS!`;
        }
    }
}

//new gam button 
game.addEventListener(`click`, function() {
    params.rounds = 0;
    params.pcResult = 0;
    params.playerResult = 0;
    output.innerText = ``;
    playerResult.innerText = params.playerResult;
    pcResult.innerText = params.pcResult;
    params.rounds = window.prompt(`Podaj liczbę rund`);
    if (isNaN(params.rounds)) {
        output2.innerText = `Wprowadź liczbę`;
        console.log(`wprowadz liczbe`);
    } else if (params.rounds === `` || params.rounds === null) {
        output2.innerText = `wprowadź liczbę rund`;
    } else if (params.rounds < 0 || params.rounds == 0) {
        output2.innerText = `Liczba rund nie może być ujemna lub równa zero`;
    } else {
        output2.innerText = `Wybrałeś rund: ${params.rounds}`;
    }
});

//loop for button click
for (ele of button) {
    ele.addEventListener("click", buttonClick(ele));
}

//function for choose button
function buttonClick(ele) {
    return function() {
        params.move = ele.getAttribute('data-move');
        console.log(params.move);
        plMove();
    };
}

//function for player choice 
function plMove() {
    if (params.rounds > 0) {
        if (params.move == `paper`) {
            output.innerText = `Wybrałeś papier i`;
            params.playerMove = 1;
        } else if (params.move == `stone`) {
            params.playerMove = 2;
            output.innerText = `Wybrałeś kamień i`;
        } else if (params.move == `scissors`) {
            params.playerMove = 3;
            output.innerText = `Wybrałeś nożyczki i`;
        }
        console.log(params.playerMove);
        params.pcMove = drawComputer();
        check();
    }
}