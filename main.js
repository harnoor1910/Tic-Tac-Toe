console.log("Welcome to Tic Tac Toe");

let music = new Audio("content/music.mp3");
let ting = new Audio("content/ting.mp3");
let gameover = new Audio("content/gameover.mp3");

let turn = 'X';
let isGameover = false;

// function to change turn
const changeTurn = () => {
    return turn === 'X' ? '0' : 'X';
}

// function to check Win
const checkWin = ()=> {
    let boxtexts = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5 ,25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15,15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135]
    ]
    wins.forEach(e => {
        if((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[1]].innerText === boxtexts[e[2]].innerText) &&
        (boxtexts[e[0]].innerText !== ""))
        {
            document.querySelector('.info').innerText = boxtexts[e[0]].innerText + " Won";
            isGameover = true;
            document.querySelector(".image").getElementsByTagName("img")[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
            gameover.play();
        }
    }) 
}
var flag = 0;
// function to check draw
const checkDraw = () => {
    const boxtexts = document.querySelectorAll(".boxtext");
    const isFilled = Array.from(boxtexts).every(boxtext => boxtext.innerText !== '');

    if(isFilled && !isGameover === true)
    {
        document.querySelector('.info').innerText = "Game Draw";
        isGameover = true;
        flag = 1;
        gameover.play();
    }
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener('click', () => {
        if(boxtext.innerText === '')
        {
            boxtext.innerText = turn;
            turn = changeTurn();
            ting.play();
            checkWin();

            if(isGameover === false)
            {
                checkDraw();
                if(flag === 0)
                {
                    document.getElementsByClassName('info')[0].innerText = "Turn for " + turn;
                }
            }
        }
    })
})

// Add onclick listener to reset button
// let reset = document.getElementById("reset");
let reset = document.querySelector(".reset");
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = 'X';
    isGameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName('info')[0].innerText = "Turn for " + turn;
    document.querySelector(".image").getElementsByTagName("img")[0].style.width = "0px";
})