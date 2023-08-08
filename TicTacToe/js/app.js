// ==================== CONSTANTS ==================== //
const infoDisplay = document.querySelector("#info") 
const gameBoard = document.querySelector(".game-board");
let GAME_BOXS = ["", "", "", "", "", "", "", "", ""],
    WINNINGS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    btnRestart = document.querySelector("#btn-restart");

let go = "circle";
infoDisplay.textContent = "El Jugador 1 comienza primero (o)"
let gameState=false,
    ganador=""

btnRestart.addEventListener("click",()=>{
    if ( gameBoard.hasChildNodes() )
    {
    while ( gameBoard.childNodes.length >= 1 )
    {
    gameBoard.removeChild( gameBoard.firstChild );
    }
    }
    ganador="";
    infoDisplay.textContent="El Jugador 1 comienza primero (o)";
    GAME_BOXS = ["", "", "", "", "", "", "", "", ""];
    go = "circle";
    createBoard();
    gameState=false;
})


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
    piece.classList.add(go);
    e.target.append(piece)
    e.target.removeEventListener("click",addGo)
    GAME_BOXS[Number(e.target.id)] = go;
    checkScore()
    go = go==="circle" ?"cross":"circle";
    infoDisplay.textContent=gameState ? ganador + " gano el juego":"Ahora es el turno de "+go;
}
function checkScore(){
    const casillas = document.querySelectorAll(".square");
    WINNINGS.forEach(array=>{
        const circleWins=array.every(cell => GAME_BOXS[cell] === go)
        if (circleWins){
            gameState=true;
            ganador=go;
            casillas.forEach(square => square.replaceWith(square.cloneNode(true)));
            return 0;
        }
    })
}   
// CORRER GAME
runGame();