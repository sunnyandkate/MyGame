/*

Background Music from Hina https://soundcloud.com/user-80857924
Title: Snow field
downloaded from https://www.chosic.com/free-music/all/




*/




//canvas
let canvas;
let context;
let welcome = document.querySelector('.welcome');
let description = document.querySelector('.description');
let titleImg = document.querySelector('.title-img');
let footer = document.querySelector('.footer');

let xSpeed = 0.5;

//background
let bgJungle = document.getElementById('bg-img');
let bgUnderwater = document.getElementById('bg-underwater');
let bgSnow = document.getElementById('bg-snow');
let bgGround = document.getElementById('ground-img');
let bgX = 0;
let bgY = 0;
let bgWidth = 3000;
let bgGroundX = -500;
let bgGroundY = 700 - 40;
let bgGroundWidth = 3000;
let currentBg = bgJungle;

//bubbles
let bubbles = document.getElementById('bubbles');
let bubblesX = 0;
let bubblesY = 600;

//player
let playerX = 100;
let playerY = 700- 20 - 100; // canvas.height - ground - player.height
let playerWidth = 50;
let playerHeight = 100;
let jumpY = 60;
let jumpUp = false;

let player = document.getElementById('player');
let playerRight2 = document.getElementById('playerRight2');
let playerRight3 = document.getElementById('playerRight3');
let playerLeft1 = document.getElementById('playerLeft1');
let playerLeft2 = document.getElementById('playerLeft2');
let playerLeft3 = document.getElementById('playerLeft3');
let playerUnderwater = document.getElementById('playerUnderwater');
let playerUnderwaterRight = document.getElementById('playerUnderwaterRight');
let playerUnderwater2 = document.getElementById('playerUnderwater2');
let playerUnderwaterLeft = document.getElementById('playerUnderwaterLeft');
let playerCurrentImg = player;


//object
let objectX = 200;
let objectY = 600;
let objectWidth = 32;
let objectHeight = 32;
//coin
let coin = document.getElementById('coin');
//fish
let fish = document.getElementById('fish');

//ring
let ring = document.getElementById('ring');


//objects
let currentObject = coin;

//score
let score = 0;

//sound
let bgMusic;
let collectSound;

//gameloop start and pause
let start = true;


//game start
window.onload = gameStart();

function gameStart(){
   
    welcome.innerHTML = "Welcome!";
    description.innerHTML = "Collect all objects <br><br> Press Enter to Start and p to Pause <br> the arrow keys to move around<br>and space for jumping<br>Only on PC/Laptops";
    
}

//game end
window.onclose = gameEnd();

function gameEnd(){
  
    start = false;
    currentBg = bgJungle;
    score = 0;
    currentObject = coin;
   
   
}

//key press
window.onkeydown = function getKeyAndMove(e){
    let keyCode = e.which || e.keyCode;
    switch(keyCode){
        case 13:             
            init();
            start = true;                      
            break;
        case 80:
            start = false;
            window.cancelAnimationFrame(gameLoop);
            break;
        case 37:
            playerLeft();
            break;
        case 38:
            playerUp();
            break;
        case 40:
            playerDown();
            break;
        case 39:
            playerRight();
            break;
        case 32:
            jump();
            break;
    }
}

//key released
window.onkeyup = function getKeyUp(e){
    let keyCode = e.which || e.keyCode;
    switch(keyCode){
        case 32:
            jump();
            break;
        case 37:
            playerStandingLeft();
            break;
        case 39:           
            playerStandingRight();
            break;
    }
}

function init(){
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');  
    welcome.innerHTML = "";
    description.innerHTML="";
    footer.innerHTML = "";
    titleImg.style.display = 'none';
    bgMusic = new sound("bgMusic.mp3");
    bgMusic.volume = 0.5;
    collectSound = new sound("collect.wav");
    
    window.requestAnimationFrame(gameLoop);
    context.font = "16px Arial";
   
}

function gameLoop(timeStamp){

    if(start === true){
        update();
        draw();
        collision();
        bgMusic.play();
        window.requestAnimationFrame(gameLoop);
       
    }
    else{
        bgMusic.stop();
    }
   
   
}

function update(){
  
  
    if(bgX  === -1000){
        bgX = 0;
    }else{
        bgX -= xSpeed;
    }
    if(bgGroundX  === 0){
        bgGroundX = -500;
    }else{
        bgGroundX += xSpeed;
    }

    if(bubblesY === 0){
        bubblesY = 600;
    }else{
        bubblesY -= 2;
    }
   
}

function draw(){

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(currentBg, bgX, bgY, bgWidth, canvas.height);
    context.drawImage(bgGround, bgGroundX, bgGroundY, bgGroundWidth, 40);
    if(currentBg === bgUnderwater){
        context.drawImage(bubbles, bubblesX, bubblesY, canvas.width + 200, 40);
    }
  
    context.drawImage(currentObject, objectX, objectY, objectWidth, objectHeight);
    context.drawImage(playerCurrentImg, playerX, playerY, 100, 100);
    context.fillText("Score: " + score , 10, 15);
   
}
function playerStandingRight(){
    if(currentBg === bgUnderwater){
        playerCurrentImg = playerUnderwater;
    }else{
        playerCurrentImg = player;
    }
   
}
function playerStandingLeft(){
    if(currentBg === bgUnderwater){
        playerCurrentImg = playerUnderwater2;
    }else{
    playerCurrentImg = playerLeft1;
    }
}
function playerUp(){
    if(currentBg === bgUnderwater){
        if(playerY < 20){
            playerY +=5;
        }else{
            playerY -= 10;
        }
       
    }
}
function playerDown(){
    if(currentBg === bgUnderwater){
        if(playerY > 600){
            playerY -=5;
        }else{
            playerY += 10;
        }
       
    }
}
function playerRight(){

    if(playerX > canvas.width - 150){
        playerX -= 10;
    }
    
    else{
        playerX += 10;
    }
   
    if(playerCurrentImg === player ||  playerCurrentImg === playerLeft1){
      
        playerCurrentImg = playerRight2;
    }
    else if(playerCurrentImg === playerRight2){
        playerCurrentImg = playerRight3;
    }
    else if(playerCurrentImg === playerRight3){
        playerCurrentImg = playerRight2;
    }
    else if(playerCurrentImg === playerUnderwater || playerCurrentImg === playerUnderwater2){
        playerCurrentImg = playerUnderwaterRight;
    }
}
function playerLeft(){

    if(playerX < 50){
        playerX += 5;
    }else{
        playerX -= 10;
    }
   
    
    if(playerCurrentImg === player || playerCurrentImg === playerLeft1){
       
        playerCurrentImg = playerLeft2;
    }
    else if(playerCurrentImg === playerLeft2){
        playerCurrentImg = playerLeft3;
    }
    else if(playerCurrentImg === playerLeft3){
        playerCurrentImg = playerLeft2;
    }
    else if(playerCurrentImg === playerUnderwater2 || playerCurrentImg === playerUnderwater){
        playerCurrentImg = playerUnderwaterLeft;
    }
}

function jump(){
  
    if(currentBg != bgUnderwater){
        if(jumpUp === false){
        
            playerY -= jumpY * 1.2;
            jumpUp = true;
        
        }else{
            playerY += jumpY * 1.2;
            jumpUp = false;
        }
    }
    if(currentBg === bgUnderwater){
        jumpUp = false;
    }
}

function collision(){

    let ranNumX = Math.floor(Math.random() * (600 - 10 +1)) + 50;
    let ranNumY = Math.floor(Math.random() * (600 - 500 +1)) + 500;
    if(playerX < objectX + (objectWidth - 10) && playerX + playerWidth > objectX 
        && playerY < objectY + (objectHeight-20) 
        && playerHeight + playerY > objectY +10){
           
            objectX = ranNumX;
            objectY = ranNumY;
            if(score === 4){
                currentBg = bgUnderwater;
                currentObject = fish;
                playerCurrentImg = playerUnderwater;
                
                
            }else if(score === 8){
                currentBg = bgSnow;
                currentObject = ring;
                playerCurrentImg = player;
                playerY = 700- 20 - 100;
               
            }else if(score >= 12){
                description.innerHTML="To Be Continued...";
               
                gameEnd();
            }
            score++;
            collectSound.play();
            
        }       
}
function sound(src){
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }

}
