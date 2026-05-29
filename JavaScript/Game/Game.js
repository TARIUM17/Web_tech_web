import Hide from "../hide_bg.js"
import { game_html } from "./Game_html.js"
import { requireAuth } from "../../API/auth/reqAuth.js";
import { navigate } from "../router.js";

export async function renderGame() {
    const isAuth = await requireAuth();
    if (!isAuth) {
        navigate('/enter');
        return;
    }

    Game();
}

export function Game() {
    Hide(game_html);

    const commandsContainer = document.getElementById("commands");
    const currentMoves = document.getElementById("currentMoves");

    const upBtn = document.getElementById("upBtn");
    const downBtn = document.getElementById("downBtn");
    const leftBtn = document.getElementById("leftBtn");
    const rightBtn = document.getElementById("rightBtn");

    const startBtn = document.getElementById("startBtn");
    const resetBtn = document.getElementById("resetBtn");

    const mazeData = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1],
    [1,0,1,1,1,0,1,0,1,1],
    [1,0,1,0,0,0,0,0,0,1],
    [1,0,1,0,1,1,1,1,0,1],
    [1,0,0,0,1,0,0,1,0,1],
    [1,1,1,0,1,0,0,1,0,1],
    [1,0,0,0,0,0,1,1,0,1],
    [1,0,1,1,1,0,0,0,2,1],
    [1,1,1,1,1,1,1,1,1,1]
];

upBtn.onclick = () => addCommand("up");
downBtn.onclick = () => addCommand("down");
leftBtn.onclick = () => addCommand("left");
rightBtn.onclick = () => addCommand("right");

startBtn.onclick = startGame;
resetBtn.onclick = resetGame;

const maze = document.getElementById("maze");

const robotStart = { x: 1, y: 1 };
let robot = { ...robotStart };

const maxMoves = 20;
let commands = [];
let gameRunning = false;

function drawMaze() {
    maze.innerHTML = "";

    for (let y = 0; y < mazeData.length; y++) {
        for (let x = 0; x < mazeData[y].length; x++) {

            const cell = document.createElement("div");
            cell.classList.add("cell");

            if (mazeData[y][x] === 1)
                cell.classList.add("wall");

            if (mazeData[y][x] === 2)
                cell.classList.add("goal");

            if (robot.x === x && robot.y === y) {
                cell.classList.add("robot");
                cell.innerHTML() = ":K";
            }

            maze.appendChild(cell);
        }
    }
}

function addCommand(command) {
    if (gameRunning) return;

    if (commands.length >= maxMoves) {
        alert("Limit has reached!");
        return;
    }

    commands.push(command);
    updateCommands();
}

function updateCommands() {
    commandsContainer.innerHTML = commands.map(comm => {
            if (comm === "up") return "Up";
            if (comm === "down") return "Down";
            if (comm === "left") return "Left";
            if (comm === "right") return "Right";
        }).join(" ");

    currentMoves.textContent = commands.length;
}

function moveRobot(direction) {

    let newX = robot.x;
    let newY = robot.y;

    if (direction === "up") newY--;
    if (direction === "down") newY++;
    if (direction === "left") newX--;
    if (direction === "right") newX++;

    // Проверка стены
    if (mazeData[newY][newX] === 1) {
        return;
    }

    robot.x = newX;
    robot.y = newY;

    drawMaze();

    // Победа
    if (mazeData[newY][newX] === 2) {
        setTimeout(() => {
            alert("Congratulations");
            gameRunning = false;
        }, 100);
    }
}

async function startGame() {
    if (gameRunning) return;
    gameRunning = true;

    for (let i = 0; i < commands.length; i++) {
        moveRobot(commands[i]);
        if (mazeData[robot.y][robot.x] === 2) {
            return;
        }
        await sleep(500);
    }

    gameRunning = false;
    if (mazeData[robot.y][robot.x] !== 2) {
        alert("Sorry, but u lose ;)");
    }
}

function resetGame() {
    robot = { ...robotStart };
    commands = [];
    gameRunning = false;

    updateCommands();
    drawMaze();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

drawMaze();
updateCommands();
}

// import Hide from "../hide_bg.js";
// import { game_html } from "./Game_html.js";
// import { navigate } from "../router.js";
// import { requireAuth } from "../../API/auth/reqAuth.js";

// const mazeData = [
//     [1,1,1,1,1,1,1,1,1,1],
//     [1,0,0,0,0,0,1,0,0,1],
//     [1,0,1,1,1,0,1,0,1,1],
//     [1,0,1,0,0,0,0,0,0,1],
//     [1,0,1,0,1,1,1,1,0,1],
//     [1,0,0,0,1,0,0,1,0,1],
//     [1,1,1,0,1,0,0,1,0,1],
//     [1,0,0,0,0,0,1,1,0,1],
//     [1,0,1,1,1,0,0,0,2,1],
//     [1,1,1,1,1,1,1,1,1,1]
// ];

// export async function renderGame() {
//     const isAuth = await requireAuth();

//     if (!isAuth) {
//         navigate('/enter');
//         return;
//     }

//     Game();
// }

// export function Game() {

//     Hide(game_html);

//     // =========================
//     // DOM
//     // =========================

//     const maze = document.getElementById("maze");

//     const commandsContainer = document.getElementById("commands");
//     const currentMoves = document.getElementById("currentMoves");

//     const upBtn = document.getElementById("upBtn");
//     const downBtn = document.getElementById("downBtn");
//     const leftBtn = document.getElementById("leftBtn");
//     const rightBtn = document.getElementById("rightBtn");

//     const startBtn = document.getElementById("startBtn");
//     const resetBtn = document.getElementById("resetBtn");

//     // =========================
//     // STATE
//     // =========================

//     const robotStart = { x: 1, y: 1 };

//     let robot = { ...robotStart };

//     const maxMoves = 20;

//     let commands = [];
//     let gameRunning = false;

//     // =========================
//     // DRAW
//     // =========================

//     function drawMaze() {

//         maze.innerHTML = "";

//         for (let y = 0; y < mazeData.length; y++) {

//             for (let x = 0; x < mazeData[y].length; x++) {

//                 const cell = document.createElement("div");

//                 cell.classList.add("cell");

//                 if (mazeData[y][x] === 1)
//                     cell.classList.add("wall");

//                 if (mazeData[y][x] === 2)
//                     cell.classList.add("goal");

//                 if (robot.x === x && robot.y === y) {
//                     cell.classList.add("robot");
//                     cell.innerHTML = "🤖";
//                 }

//                 maze.appendChild(cell);
//             }
//         }
//     }

//     // =========================
//     // COMMANDS
//     // =========================

//     function addCommand(command) {

//         if (gameRunning) return;

//         if (commands.length >= maxMoves) {
//             alert("Limit has reached!");
//             return;
//         }

//         commands.push(command);

//         updateCommands();
//     }

//     function updateCommands() {

//         commandsContainer.innerHTML = commands
//             .map(command => {

//                 if (command === "up") return "↑";
//                 if (command === "down") return "↓";
//                 if (command === "left") return "←";
//                 if (command === "right") return "→";

//             })
//             .join(" ");

//         currentMoves.textContent = commands.length;
//     }

//     // =========================
//     // ROBOT
//     // =========================

//     function moveRobot(direction) {

//         let newX = robot.x;
//         let newY = robot.y;

//         if (direction === "up") newY--;
//         if (direction === "down") newY++;
//         if (direction === "left") newX--;
//         if (direction === "right") newX++;

//         // WALL CHECK

//         if (mazeData[newY][newX] === 1)
//             return;

//         robot.x = newX;
//         robot.y = newY;

//         drawMaze();

//         // WIN

//         if (mazeData[newY][newX] === 2) {

//             setTimeout(() => {

//                 alert("Congratulations!");

//                 gameRunning = false;

//             }, 100);
//         }
//     }

//     // =========================
//     // GAME
//     // =========================

//     async function startGame() {

//         if (gameRunning) return;

//         gameRunning = true;

//         for (let i = 0; i < commands.length; i++) {

//             moveRobot(commands[i]);

//             if (mazeData[robot.y][robot.x] === 2)
//                 return;

//             await sleep(500);
//         }

//         gameRunning = false;

//         if (mazeData[robot.y][robot.x] !== 2) {
//             alert("Sorry, but you lose ;)");
//         }
//     }

//     function resetGame() {

//         robot = { ...robotStart };

//         commands = [];

//         gameRunning = false;

//         updateCommands();

//         drawMaze();
//     }

//     function sleep(ms) {
//         return new Promise(resolve => setTimeout(resolve, ms));
//     }

//     // =========================
//     // EVENTS
//     // =========================

//     upBtn.addEventListener("click", () => addCommand("up"));

//     downBtn.addEventListener("click", () => addCommand("down"));

//     leftBtn.addEventListener("click", () => addCommand("left"));

//     rightBtn.addEventListener("click", () => addCommand("right"));

//     startBtn.addEventListener("click", startGame);

//     resetBtn.addEventListener("click", resetGame);

//     // =========================
//     // INIT
//     // =========================

//     drawMaze();

//     updateCommands();
// }