const boardGame = document.querySelector('.board');
const velocityRender = 2;
const SNAKE = {
    size: 20,
    speed: 2,
    direction: 'static',
    body: [
        { x: 10, y: 5 },
        { x: 11, y: 5 },
        { x: 12, y: 5 },
    ],
};
let lastRenderTime = 0;


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
    if (snake.direction === 'up') snake.body[0].y -= 1;
    if (snake.direction === 'down') snake.body[0].y += 1;
    if (snake.direction === 'left') snake.body[0].x -= 1;
    if (snake.direction === 'right') snake.body[0].x += 1;
    handleLimits();
}
const handleKeyDown = (event) => {
    const keyPress = event.key;
    console.log(keyPress);
    if (keyPress === 'ArrowUp' && SNAKE.direction !== 'down')SNAKE.direction = 'up';
    if (keyPress === 'ArrowDown' && SNAKE.direction !== 'up')SNAKE.direction = 'down';
    if (keyPress === 'ArrowLeft' && SNAKE.direction !== 'right')SNAKE.direction = 'left';
    if (keyPress === 'ArrowRight' && SNAKE.direction !== 'left') SNAKE.direction = 'right';

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

const handleEvents = () => {
    document.addEventListener('keydown', handleKeyDown);
}




const startGame = () => {}
const resetGame = () => {}
const drawFood = (ctx, food) => {}
const drawGame = () => {
    boardGame.innerHTML = '';
    drawSnake(SNAKE);
}
const update = () => {
    handleEvents();
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
    console.log(time);
}
window.requestAnimationFrame(mainLoop);
