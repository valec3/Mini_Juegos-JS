// ==================== CONSTANTS ==================== //
const gameBoard = document.querySelector(".game-board");
const GAME_BOXS = ["", "", "", "", "", "", "", "", ""],
    WINNINGS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

function createBoard(){
    GAME_BOXS.forEach((celda,indice)=>{
        const casilla = document.createElement("div");
        casilla.classList.add("square");
        casilla.id=indice;
        casilla.addEventListener("click",addGo);
        gameBoard.append(casilla);
    })
}
function runGame(){
    createBoard();
}
function addGo(e){
    const piece = document.createElement("div");
    piece.classList.add("circle");
    e.target.append(piece)
}

// CORRER GAME
runGame();