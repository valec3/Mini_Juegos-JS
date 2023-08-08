let filas = 20,
    columnas=20,
    anchoCell=40,
    numMinas= (filas*columnas)*0.1,
    cellMark=0;

let boardHtml="",
    boardGame=[]
    gameOver = false
    gameActive = false;

function dobleClick(celda,c,f,e){
    if(gameOver){
        return;
    }
    refreshBoard();
}
function clickSimple(celda,c,f,e){
    if(gameOver){
        return;
    }
    if(boardGame[f][c].estado == "descubierto"){
        console.log("celda ya descubierta")
        return;
    }
    switch (e.button){
        case 0:
            if(boardGame[f][c].estado == "marcado"){
                break;
            }
            boardGame[f][c].estado = "descubierto";
            gameActive=true;
            break;
        case 1:
            break;
        case 2:
            if(boardGame[f][c].estado == "marcado"){
                boardGame[f][c].estado = undefined;
                cellMark--;
            }else{
                boardGame[f][c].estado = "marcado";
                cellMark++;
            }
            break;
        default:
            break;
    }
    refreshBoard();
}
function checkEvents(){
    console.log("EVENTOS")
    console.log(boardGame)
    for(let i=0;i<filas;i++){
        for(let j=0;j<columnas;j++){
            let  celda = document.querySelector(`#celda-${i}-${j}`);
            celda.addEventListener("dblclick",(e)=>{
                dobleClick(celda,j,i,e)
            }) 
            celda.addEventListener("click",(e)=>{
                clickSimple(celda,j,i,e)
                console.log(boardGame[i][j].valor)
            }) 
        }   
    }
}


// FUNCIONES PARA EL MANEJO DEL TABLERO
function createBoard(){
    for (let i = 0; i < filas; i++) {
        boardHtml += `<tr>`;
        for (let j = 0; j < columnas; j++) {
            boardHtml += `<td id="celda-${i}-${j}" class="cell">`;
            boardHtml += `</td>`;
        }    
        boardHtml += `</tr>`;
    }
    
    const board = document.querySelector("#board");
    board.innerHTML = boardHtml;
    // board.style.width=columnas*anchoCell+"px";
    // board.style.height=filas*anchoCell+"px";
}
function refreshBoard(){
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            let celda = document.querySelector(`#celda-${i}-${j}`);
            if(boardGame[i][j].estado == "descubierto"){
                switch(boardGame[i][j].valor){
                    case -1:
                        celda.innerHTML = "B";
                        break;
                    case 0: 
                        break;
                    default:
                        celda.innerHTML = boardGame[i][j].valor;
                        break;
                }
            }
        }
    }
}
function newGame(){
    createBoard();
    checkEvents();
    createBoardGame();/**/ 
    refreshBoard();
}
function clearBoard(){
    boardGame = []; 
    console.log("vaciar tablero")
    for (let i = 0; i < filas; i++) {
        boardGame.push([]);    
        console.log(boardGame[i][0])    
    }   
    console.log(boardGame)
}
function createMines(){
    for (let i = 0; i < numMinas; i++) {
        let c,f;
        do{
            c = Math.floor(Math.random()*columnas)
            f = Math.floor(Math.random()*filas)
        } while(boardGame[f][c] == -1)
        boardGame[f][c] = {valor: -1} 

    }  
}
function countMines(){
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if(boardGame[i][j] == undefined){
                let contador = 0;
                for (let f = -1; f <= 1; f++) {
                    for (let c = -1; c <= 1; c++) {
                        if (f == 0 && c == 0) {
                            continue
                        }
                        try { //hay que evitar errores con las posiciones negativas
                            if (boardGame[f + i][c + j].valor == -1) {
                            contador++;
                            }
                        } catch (e) {}
                    }
                }
                boardGame[i][j]={ valor: `${contador}`};
            }
        }
    }
}

function createBoardGame(){
    clearBoard();
    createMines();
    countMines();
}
// INICIAR
newGame()
