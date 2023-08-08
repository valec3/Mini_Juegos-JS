let filas = 20,
    columnas=20,
    anchoCell=40,
    numMinas= (filas*columnas)*0.1,
    cellMark=0;

let boardHtml="",
    boardGame=[],
    minasPos=[],
    gameOver = false,
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
            // botón scroll
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
            celda.addEventListener("mouseup",(e)=>{
                clickSimple(celda,j,i,e)
                // console.log(boardGame[i][j].estado)
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
            if(!gameActive){
                // Evitar que se actualice el tablero si el juego termino
                return ;
            }
            if(boardGame[i][j].estado == "descubierto"){
                celda.style.boxShadow="none";
                switch(boardGame[i][j].valor){
                    case -1:
                        celda.innerHTML = `<i class="fa-solid fa-bomb"></i>`;
                        celda.classList.add("bomb");
                        break;
                    case 0: 
                        break;
                    default:
                        celda.innerHTML = boardGame[i][j].valor;
                        break;
                }
            }else if(boardGame[i][j].estado == "marcado"){
                celda.innerHTML=`<i class="fa-solid fa-flag"></i>`;
                celda.classList.add("flag");
            }else{
                celda.innerHTML=``;
                celda.classList.remove("bomb","flag")
            }

            // verificar si hay una bomba visible
            if(celda.classList.contains("bomb")){
                document.querySelector("#board").classList.add("game_over");
                gameActive=false;
                let num=0
                // revelar minas del tablero
                minasPos.forEach(posMina => {
                    const mina = document.querySelector(`#celda-${posMina[0]}-${posMina[1]}`);
                    mina.classList.add("bomb");
                    mina.classList.remove("flag");
                    mina.innerHTML = `<i class="fa-solid fa-bomb"></i>`;
                    mina.style.boxShadow="none";
                    console.log(mina)
                });
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
        minasPos.push([f,c]);

    }  
}
function countMines(){
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if(boardGame[i][j] == undefined){
                let contador = 0;
                // contar bombas alrededor de una celda
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
                boardGame[i][j]={ valor:contador};
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
