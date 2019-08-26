`use strict`;

let computerMove;
const button = document.querySelectorAll(`.player-move`);
const playerResult = document.querySelector(`#playerResult`);
const pcResult = document.querySelector(`#pcResult`);
const playerResultModal = document.querySelector(`#playerResultModal`);
const pcResultModal = document.querySelector(`#pcResultModal`);
const output2 = document.querySelector(`#rounds`);
const output = document.querySelector(`#output`);
const game = document.querySelector(`#new_game`);
const tabl = document.querySelector(`.table`);

const params = {
    move: ``,
    pcMove: ``,
    playerMove: ``,
    rounds: ``,
    playerResult: ``,
    pcResult: ``,
    pcText: ``,
    progress: []
}

//Random number for computer choice
function drawComputer() {
    computerMove = Math.floor(Math.random() * 3 + 1);
    return computerMove;
}
drawComputer();

//check win condition
function check() {
    if (params.rounds > 0) {
        if (params.playerMove === params.pcMove) {
            output.innerText += ` jest remis!`;
            playerResult.innerText = 1 + params.playerResult++;
            pcResult.innerText = 1 + params.pcResult++;
            console.log(playerResult);
            push(`remis`);
        } else if ((params.playerMove === 1 && params.pcMove === 2) || (params.playerMove === 2 && params.pcMove === 3) || (params.playerMove === 3 && params.pcMove === 1)) {
            output.innerText += ` wygrałeś !`;
            playerResult.innerText = 1 + params.playerResult++;
            push(`wygrana`);
        } else if ((params.playerMove === 1 && params.pcMove === 3) || (params.playerMove === 2 && params.pcMove === 1) || (params.playerMove === 3 && params.pcMove === 2)) {
            output.innerText += ` przegrałś !`;
            pcResult.innerText = 1 + params.pcResult++;
            push(`przegrana`);
        }
        output2.innerText = `pozostała liczba rund: ${(-1 + params.rounds--)}`;
        if (params.rounds === 0 && (params.playerResult < params.pcResult)) {
            output.innerText = `Koniec gry, PRZEGRANA!`;
            table()
            showModal(event);
            console.log(params.progress);
        } else if (params.rounds === 0 && (params.playerResult > params.pcResult)) {
            output.innerText = `Koniec gry, WYGRANA!`;
            table()
            showModal(event);
            console.log(params.progress);
        } else if (params.rounds === 0 && (params.playerResult == params.pcResult)) {
            output.innerText = `Koniec gry, REMIS!`;
            table()
            showModal(event);
            console.log(params.progress);
        }
    }
}
// push round info 
function push(text) {
    params.progress.push({ plM: params.move, pcM: params.pcMove, pcT: params.pcText, rr: text, orp: params.playerResult, orpc: params.pcResult })
}

//new gam button 
game.addEventListener(`click`, function () {
    reset();
    params.progress = [];
    params.rounds = 0;
    params.pcResult = 0;
    params.playerResult = 0;
    output.innerText = ``;
    params.pcText = ``;
    playerResult.innerText = params.playerResult;
    pcResult.innerText = params.pcResult;
    params.rounds = window.prompt(`Podaj liczbę rund`);
    if ((isNaN(params.rounds)) || params.rounds === `` || params.rounds === null) {
        alert(`Błąd! Liczba rund musi być liczbą`);
    } else if (params.rounds < 0 || params.rounds == 0) {
        alert(`Błąd! Liczba rund nie może być ujemna lub równa zero`);
    } else {
        output2.innerText = `Wybrałeś rund: ${params.rounds}`;
    }
});

//loop for button click
for (ele of button) {
    ele.addEventListener("click", buttonClick(ele));
}

//function for whitch button has been choosen
function buttonClick(ele) {
    return function () {
        params.move = ele.getAttribute('data-move');
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
        params.pcMove = drawComputer();
        translate(params.pcMove);
        check();
    }
}

//translate pcmove number to text
function translate(move) {
    switch (move) {
        case 1:
            params.pcText = `paper`;
            break;
        case 2:
            params.pcText = `stone`;
            break;
        case 3:
            params.pcText = `scissors`;
            break;
    }
};

//close modal
(function () {
    const hideModal = function (event) {
        event.preventDefault();
        document.querySelector(`#modal-overlay`).classList.remove(`show`);
    };
    document.querySelector(`#modal-overlay`).addEventListener(`click`, hideModal);
    const closeButtons = document.querySelectorAll(`.modal .close`);
    closeButtons.forEach(function (ele) {
        ele.addEventListener(`click`, hideModal);
    })
})();

//show modal
const showModal = function (event) {
    event.preventDefault();
    document.querySelector(`#modal-overlay`).classList.add(`show`);
    document.querySelector(`.modal`).classList.add(`show`);
    modalResoult()
};

//scoreboard 
function table() {
    params.progress.forEach(function (ele, index) {
        const tr = document.createElement('tr');
        tabl.appendChild(tr);
        const th1 = document.createElement('th');
        tr.appendChild(th1);
        th1.innerText = index + 1;
        const th2 = document.createElement('th');
        tr.appendChild(th2);
        th2.innerText = ele.plM;
        const th3 = document.createElement('th');
        tr.appendChild(th3);
        th3.innerText = ele.pcT;
        const th4 = document.createElement('th');
        tr.appendChild(th4);
        th4.innerText = ele.rr;
        const th5 = document.createElement('th');
        tr.appendChild(th5);
        th5.innerText = ele.orp;
        th5.innerText += ` - ${ele.orpc}`
    });
}

//reset table with resoults
function reset() {
    while (tabl.firstChild) {
        tabl.removeChild(tabl.firstChild);
    }
    const tr = document.createElement('tr');
    tabl.appendChild(tr);
    const th1 = document.createElement('th');
    tr.appendChild(th1);
    th1.innerText = 'Lp'
    const th2 = document.createElement('th');
    tr.appendChild(th2);
    th2.innerText = 'Ruch gracza';
    const th3 = document.createElement('th');
    tr.appendChild(th3);
    th3.innerText = 'Ruch komputera';
    const th4 = document.createElement('th');
    tr.appendChild(th4);
    th4.innerText = 'Wynik rundy';
    const th5 = document.createElement('th');
    tr.appendChild(th5);
    th5.innerText = 'Wynik';
}

//modal resoult 
function modalResoult() {
    playerResultModal.innerText = params.playerResult;
    pcResultModal.innerText = params.pcResult;
}