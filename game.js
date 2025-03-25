// Game Configuration
const config = {
    roundTime: 5 * 60 * 1000,
    mapSize: { width: 5000, height: 5000 },
    initialPlayerSize: 20,
    foodSize: 10,
    botCount: 50,
    maxPlayers: 20,
    playerSpeed: 5,
    joystickRadius: 100,
    levels: [
        { botSpeed: 1, botScoreMultiplier: 1 },
        { botSpeed: 1.2, botScoreMultiplier: 1.2 },
        { botSpeed: 1.5, botScoreMultiplier: 1.5 }
    ]
};

// Game State
let gameState = {
    players: {},
    foods: [],
    bots: [],
    roundEndTime: 0,
    currentLevel: 0,
    gameMode: null,
    keysPressed: {},
    joystick: {
        active: false,
        startX: 0,
        startY: 0,
        moveX: 0,
        moveY: 0
    }
};

// DOM Elements
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const uiScore = document.getElementById('score');
const uiTime = document.getElementById('time');
const uiLevel = document.getElementById('level');
const uiPlayers = document.getElementById('players-count');
const menu = document.getElementById('menu');

// Initialize Game
function initGame(mode) {
    console.log(`Starting ${mode} game`);
    gameState.gameMode = mode;
    gameState.currentLevel = 0;
    gameState.roundEndTime = Date.now() + config.roundTime;
    gameState.players = {};
    gameState.foods = [];
    gameState.bots = [];
    gameState.keysPressed = {};
    gameState.joystick.active = false;
    
    generateFood(50);
    
    if (mode === 'company') {
        generateBots();
        uiLevel.style.display = 'block';
        uiPlayers.style.display = 'none';
    } else {
        uiLevel.style.display = 'none';
        uiPlayers.style.display = 'block';
        updatePlayersCount(1);
    }
    
    addPlayer('player1');
    menu.style.display = 'none';
    resizeCanvas();
    gameLoop();
}

// [Все остальные функции (generateFood, generateBots, update, render и т.д.) 
// остаются БЕЗ ИЗМЕНЕНИЙ из предыдущего рабочего варианта]

// Важно: вызываем initGameEnvironment после загрузки DOM
function initGameEnvironment() {
    resizeCanvas();
    initControls();
    window.addEventListener('resize', resizeCanvas);
    console.log("Game environment ready");
}