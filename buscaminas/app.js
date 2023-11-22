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
const boardStateCont = document.querySelector("#board");
const btnNewGame = document.querySelector("#newGame");
const btnConfig = document.querySelector("#config");
btnNewGame.addEventListener("click",()=>{
    
    newGame();
})
btnConfig.addEventListener("click",()=>{
    ajustes();
})


function showArea(f,c){
    for(let i = -1;i<=1;i++){
        for(let j = -1;j <= 1; j++){
            if(i==0 && j==0){
                continue
            }
            try {
                if(!(["descubierto", "marcado"].includes(boardGame[f+i][c+j].estado))){
                    boardGame[f+i][c+j].estado = "descubierto";
                    if(boardGame[f+i][c+j].valor == 0){
                        showArea(f+i,c+j);
                    }
                }
            } catch (error) {
                
            }
        }
    }
}


function dobleClick(celda,c,f,e){
    if(gameOver){
        return;
    }
    showArea(f,c)
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
            // click izquierdo
            if(boardGame[f][c].estado == "marcado"){
                break;
            }
            boardGame[f][c].estado = "descubierto";
            gameActive=true;

            // si pulsamos una casilla vacia
            if(boardGame[f][c].valor==0){
                showArea(f,c);
            }

            break;
        case 1:
            // botón scroll
            break;
        case 2:
        // click derecho
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
    
}
function refreshBoard(){
    if(!gameActive){
        // Evitar que se actualice el tablero si el juego termino
        return ;
    }
    
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            let celda = document.querySelector(`#celda-${i}-${j}`);
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

            checkEnd(celda);
        }
    }
}
function checkEnd(celda){
    // verificar si hay una bomba visible
    if(celda.classList.contains("bomb")){
        boardStateCont.classList.add("game_over");
        gameActive=false;
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
function newGame(){
    boardStateCont.classList.remove("game_over");
    boardHtml="";
    gameActive = false;gameOver=false;cellMark=0;
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
//  Funcion para el modal de configuraciones
async function ajustes() {
    const {
      value: ajustes
    } = await swal.fire({
      title: "Ajustes",
      html: `
              Dificultad &nbsp; (minas/área)
              <br>
              <br>
              <input oninput="this.onchange()" id="dificultad" type="range" min="10" max="40" step="1" value="${100 * numMinas / (filas * columnas)}" onchange="">
              <span id="valor-dificultad">${100 * numMinas / (filas * columnas)}%</span>
              <br>
              <br>
              Filas
              <br>
              <input class="swal2-input" type="number" value=${filas} placeholder="filas" id="filas" min="10" max="1000" step="1">
              <br>
              Columnas
              <br>
              <input class="swal2-input" type="number" value=${columnas} placeholder="columnas" id="columnas" min="10" max="1000" step="1">
              <br>
              `,
      confirmButtonText: "Establecer",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      preConfirm: () => {
        return {
          columnas: document.getElementById("columnas").value,
          filas: document.getElementById("filas").value,
          dificultad: document.getElementById("dificultad").value
        }
      }
    })
    if (!ajustes) {
      return
    }
    filas = Math.floor(ajustes.filas)
    columnas = Math.floor(ajustes.columnas)
    numMinas = Math.floor(columnas * filas * ajustes.dificultad / 100)
    newGame()
}







// INICIAR
newGame()
