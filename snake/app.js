const boardGame = document.querySelector('.board');
const btnPlay = document.querySelector('#btn-play');
const modalEndGame = document.querySelector('#end-game');

const velocityRender = 6;
const SNAKE = {
    size: 20,
    speed: 5,
    direction: 'static',
    body: [
        { x: 10, y: 5 },
        { x: 11, y: 5 },
        { x: 12, y: 5 },
    ],
};
let lastRenderTime = 0;
let FOOD = {x: 4, y: 5};

// LOGICA DE LA SERPIENTE

const drawSnake = (snake) => {
    snake.body.forEach((part,i) => {
        const snakePart = document.createElement('div');
        if (i === 0) snakePart.classList.add('head');
        snakePart.style.gridColumnStart = part.x;
        snakePart.style.gridRowStart = part.y;
        snakePart.classList.add('snake');
        boardGame.appendChild(snakePart);
    });
}

const updateSnake = (snake) => {
    for (let i = snake.body.length - 2; i >= 0; i--) {
        snake.body[i + 1] = { ...snake.body[i] };
    }

    if (snake.direction === 'static') return;
    else if (snake.direction === 'up') snake.body[0].y -= 1;
    else if (snake.direction === 'down') snake.body[0].y += 1;
    else if (snake.direction === 'left') snake.body[0].x -= 1;
    else if (snake.direction === 'right') snake.body[0].x += 1;
    console.log("move")
    handleLimits();
    handleCollision();
    eatFood();
}
const handleKeyDown = (event) => {
    const keyPress = event.key;
    if (keyPress === 'ArrowUp' && SNAKE.direction !== 'down')SNAKE.direction = 'up';
    else if (keyPress === 'ArrowDown' && SNAKE.direction !== 'up')SNAKE.direction = 'down';
    else if (keyPress === 'ArrowLeft' && SNAKE.direction !== 'right')SNAKE.direction = 'left';
    else if (keyPress === 'ArrowRight' && SNAKE.direction !== 'left') SNAKE.direction = 'right';
    console.log(SNAKE.direction);
    // quit game
    if (keyPress === 'Escape'){
        SNAKE.direction = 'static';
    }
}

const handleLimits = () => {
    if (SNAKE.body[0].x < 1) SNAKE.body[0].x = 20;
    if (SNAKE.body[0].x > 20) SNAKE.body[0].x = 1;
    if (SNAKE.body[0].y < 1) SNAKE.body[0].y = 20;
    if (SNAKE.body[0].y > 20) SNAKE.body[0].y = 1;
}
const eatFood = () => {
    if (SNAKE.body[0].x === FOOD.x && SNAKE.body[0].y === FOOD.y) {
        // Agregar un nuevo elemento al cuerpo de la serpiente en la ultima posicion
        console.log(SNAKE.body);
        SNAKE.body.push({ ...SNAKE.body[SNAKE.body.length - 1] });
        console.log({ ...SNAKE.body[SNAKE.body.length - 1]});
        console.log(SNAKE.body);
        FOOD = newFood();
    }
}
const handleCollision = () => {
    // Si la cabeza de la serpiente colisiona con el cuerpo, se termina el juego
    for (let i = 1; i < SNAKE.body.length; i++) {
        if (SNAKE.body[0].x === SNAKE.body[i].x && SNAKE.body[0].y === SNAKE.body[i].y) {
            endGame();
        }
    }
}
const handleEvents = () => {
    document.addEventListener('keyup', handleKeyDown);
}



//  LOGICA DE CONTROL DEL JUEGO
const startGame = () => {}
const resetGame = () => {}
const endGame = () => {
    SNAKE.direction = 'static';
    SNAKE.body = [
        { x: 10, y: 5 },
        { x: 11, y: 5 },
        { x: 12, y: 5 },
    ];
    FOOD = {x: 4, y: 5};
    modalEndGame.classList.add('active');
}

const newFood = () => {
    const foodX = Math.floor(Math.random() * 20) + 1;
    const foodY = Math.floor(Math.random() * 20) + 1;
    return { x: foodX, y: foodY };
}
const drawFood = () => {
    const food = document.createElement('div');
    food.style.gridColumnStart = FOOD.x;
    food.style.gridRowStart = FOOD.y;
    food.classList.add('food');
    boardGame.appendChild(food);
}
const drawGame = () => {
    boardGame.innerHTML = '';
    drawSnake(SNAKE);
    drawFood();
}
handleEvents(); 
const update = () => {
    updateSnake(SNAKE);
    drawGame();
}





// 
// BUCLE PRINCIPAL
// 


const mainLoop = (time) => {
    window.requestAnimationFrame(mainLoop);
    // Segundos desde el ultimo render
    const secondsSinceLastRender = (time - lastRenderTime) / 1000;
    // Si no ha pasado el tiempo necesario, no se renderiza
    if (secondsSinceLastRender < 1 / velocityRender) return;
    // Actualiza el tiempo del ultimo render
    lastRenderTime = time;
    update();
    // console.log(time);
}
window.requestAnimationFrame(mainLoop);
