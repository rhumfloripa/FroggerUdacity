// Enemies our player must avoid
var Enemy = function (_x, _y, _speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = _x;
    this.y = _y;
    this.w = 60; //largura
    this.h = 25; //altura
    this.speed = _speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //Colisão do Player com Inimigo
    if (player.x < (this.x + this.w) && (player.x + player.w) > this.x && player.y < (this.y + this.h) && (player.y + player.h) > this.y) {
        if (player.lifes > 0) {
            player.x = 200;
            player.y = 450;
            player.lifes--; //Desconta vida do player e manda para posição inicial
        }
        //alert("Você perdeu!");
    }
    //verifica se chegou ao final da tela e move o inimigo para esquerda e reposiciona de forma aleatória no .x
    if (this.x > 550) {
        this.x = -(100 + (Math.floor(Math.random() * 100))); // defive de forma aleatoria o ponto de partida X do inimigo
        this.speed = 100 + Math.floor(Math.random() * 256); // define de forma aleatória a velocidade do inimigo
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (_x, _y) {
    this.x = _x;
    this.y = _y;
    this.w = 37; //largura
    this.h = 30; //altura
    this.speed = 0;
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.lifes = 3;
};

// limitando a movimentação do player no mapa
Player.prototype.update = function () {
    if (this.x > 400) this.x = 400;
    if (this.x < 0) this.x = 0;
    if (this.y > 380) this.y = 380;
    if (this.y < 0) { // verifica se chegou na agua.
        this.score++; // adiciona 1 ponto ao score
        this.x = 200; // envia para o ponto inicial para nova jogada
        this.y = 380;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    hud(this.score, this.lifes); // Renderiza e atualiza o HUB
};

//movimentando o player
Player.prototype.handleInput = function (key) {

    switch (key) {
        case 'left':
            this.x -= this.speed + 100;
            break;

        case 'right':
            this.x += this.speed + 100;
            break;

        case 'up':
            this.y -= this.speed + 80;
            break;

        case 'down':
            this.y += this.speed + 80;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200, 450); // Player
var allEnemies = []; // vetor de inimigos
var enemyPosition = [220, 60, 140]; // pos y dos inimigos
var _enemy; // inimigo temporario
enemyPosition.forEach(function (_y) {
    let _x = -(100 + (Math.floor(Math.random() * 100)));
    let _speed = 100 + Math.floor(Math.random() * 500);
    _enemy = new Enemy(_x, _y, _speed); // cria o inimigo
    allEnemies.push(_enemy); // envia para o vetor de inimigos
});

//HUD
function hud() {
    ctx.font = "35px Tahoma";
    ctx.fillstyle = 'black';
    ctx.fillText("Lifes: " + player.lifes, 10, 48);
    ctx.fillText("Score: " + player.score, 350, 48);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
