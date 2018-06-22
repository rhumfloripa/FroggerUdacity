// Enemies our player must avoid
var Enemy = function(_x,_y,_speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = _x;
    this.y = _y;
    this.speed = _speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    //verifica se chegou ao final da tela e move o inimigo para esquerda e reposiciona de forma aleatória no .x
    if(this.x > 550){
        this.x = -(100 + (Math.floor(Math.random(50) * 10))); // defive de forma aleatoria o ponto de partida X do inimigo
        this.speed = 100 + Math.floor(Math.random() * 256); // define de forma aleatória a velocidade do inimigo
    }
    //Colisão do Player com Inimigo
    if (player.x < this.x + 60 && player.x + 37 > this.x && player.y < this.y + 25 && 30 + player.y > this.y) {

        if(player.lifes > 0){
            player.x = 200;
            player.y = 380;
            player.lifes --; //Desconta vida do player e manda para posição inicial
        }

        //alert("Você perdeu!");
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(_x, _y, _speed){
    this.x = _x;
    this.y = _y;
    this.speed = _speed;
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.lifes = 3;
};

// limitando a movimentação do player no mapa
Player.prototype.update = function() {
    if (this.y > 380) this.y = 380;
    if (this.x > 400) this.x = 400;
    if (this.x < 0) this.x = 0;
    if (this.y < 0) { // verifica se chegou na agua.
        this.score ++; // adiciona 1 ponto ao score
        this.x = 200; // envia para o ponto inicial para nova jogada
        this.y = 380;

    }

};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    hud(this.score, this.lifes); // Renderiza e atualiza o HUB
};

//movimentando o player
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = []; // vetor de inimigos
var enemyPosition = [60,140,220]; // pos y dos inimigos
var player = new Player(200,380,50); // Player
var enemy; // inimigo temporario
enemyPosition.forEach(function (_y) {
    enemy = new Enemy(-(100 + (Math.floor(Math.random(50) * 10))), _y, 100 + Math.floor(Math.random() * 256)); // cria i inimigo
    allEnemies.push(enemy); // envia para o vetor de inimigos

});

//HUD
function hud() {
    ctx.font = "30px Tahoma";
    ctx.fillstyle = 'black';
    ctx.fillText("Score: " + player.score, 10, 48);
    ctx.fillText("Life: " + player.lifes, 410, 48);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
