const gameContent= document.querySelector(".game_content");
const userResult= document.querySelector(".user_result i");
const cpuResult= document.querySelector(".cpu_result i");
const winner= document.querySelector(".winner");
const optionIcons = document.querySelectorAll(".option")

const options=["fa-hand-back-fist","fa-hand-paper","fa-hand-scissors"]
const combinations={
    "02":"El jugador",
    "10":"El jugador",
    "21":"El jugador",
    "01":"La computadora",
    "12":"La computadora",
    "20":"La computadora",
}
optionIcons.forEach((icon,index) => {
    icon.addEventListener("click",(e)=>{
        optionIcons.forEach(icon=>icon.classList.remove("active"))
        icon.classList.add("active");
        gameContent.classList.add("start")

        userResult.className=cpuResult.className="fas fa-hand-back-fist";
        winner.textContent="..."
        setTimeout(() => {
            gameContent.classList.remove("start")

            userResult.className = "";
            userResult.classList.add("fas",options[index]);
            
            let randomOption = Math.floor(Math.random()*3);
            
            cpuResult.className = "";
            cpuResult.classList.add("fas",options[randomOption]);
    
            let resultado = combinations[index.toString() + randomOption.toString()]
            winner.textContent = index === randomOption ? "Empate": `${resultado} gana`; 
    
        }, 2500);        
    })
});