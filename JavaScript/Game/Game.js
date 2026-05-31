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
    console.log(upBtn);
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

if (upBtn)
    upBtn.addEventListener("click", () => {
        addCommand("up");
    });

if (downBtn)
    downBtn.addEventListener("click", () => {
        addCommand("down");
    });

if (leftBtn)
    leftBtn.addEventListener("click", () => {
        addCommand("left");
    });

if (rightBtn) {
    console.log("rightBtn 1");
    rightBtn.addEventListener("click", () => {
        console.log("rightBtn 2");
        addCommand("right");
    });
}

if (startBtn)
    startBtn.addEventListener("click", () => {
        startGame();
    });

if (resetBtn)
    resetBtn.addEventListener("click", () => {
        resetGame();
    });

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
                cell.append(":K");;
            }

            maze.appendChild(cell);
        }
    }
}

function addCommand(command) {
    if (gameRunning) return;

    if (commands.length >= maxMoves) {
        new Toast({
            title: false,
            text: 'You reached your max',
            theme: 'light',
            autohide: true,
            interval: 3000
        });
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

    if (mazeData[newY][newX] === 1) {
        return;
    }

    robot.x = newX;
    robot.y = newY;

    drawMaze();

    if (mazeData[newY][newX] === 2) {
        setTimeout(() => {
            new Toast({
                title: false,
                text: 'Congratulations',
                theme: 'light',
                autohide: true,
                interval: 3000
            });
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
        new Toast({
            title: false,
            text: 'Sorry, but u lose ;)',
            theme: 'light',
            autohide: true,
            interval: 3000
        });
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