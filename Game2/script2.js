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

//current player and current bg
let currentBg = document.getElementById("bg-img");
let bgGround = document.getElementById("ground-img");

//objects
let currentObject = document.getElementById('object');
//player
let currentPlayer = document.getElementById('player');


//images for background

let bgJungleImg = "images/bg_jungle.png";
let bgUnderwater = "images/bg-water.png";
let bgSnow = "images/bg_snowing.png";

//bubbles
let bubblesImg = document.getElementById('bubbles');
bubblesImg.src = "images/bubbles.png";
//ground
bgGround.src = "images/ground.png";

//objects
let coin = "images/coin.png";
let fish = "images/fish.png";
let ring = "images/ring.png";

//images for player
let playerIdle = "images/palmtreeguy_right.png";

let playerRight2Img = "images/palmtreeguy_right2.png";
let playerRight3Img = "images/palmtreeguy_right3.png";
let playerLeft1Img = "images/palmtreeguy_left01.png";
let playerLeft2Img = "images/palmtreeguy_left02.png";
let playerLeft3Img = "images/palmtreeguy_left03.png";
let playerUnderwater = "images/playerUnderwater.png";
let playerUnderwaterRight = "images/playerUnderwaterRight.png";
let playerUnderwaterLeft = "images/playerUnderwaterLeft.png";
let playerUnderwater2 = "images/playerUnderwater2.png";


//set the currentBg to first Img for background
currentBg.src = bgJungleImg;

//set current object
currentObject.src = coin;

//set the currentPlayer to first Img for player
currentPlayer.src= playerIdle;


//get src from currentBg
let cBackground;
 //get the src from currentPlayer
//let cPlayer = currentPlayer.getAttribute('src');
let cPlayer;

//jumping
let jumpY = 60;
let jumpUp = false;

let xSpeed = 0.5;

//score
let score = 0;

//sound
let bgMusic;
let collectSound;

//gameloop start and pause
let start = true;


let background = {
    x : 0,
    y : 0,
    width: 3000,
    height: 700,
    src: currentBg
};

let bubbles = {
    x : 0,
    y : 600,
    width: 1400,
    height: 40
};

let ground = {
    x : -500,
    y : 660,
    width: 3000,
    height: 40

};
let object = {
    x : 200,
    y : 600,
    width : 50,
    height: 50
};
let player = {
    x : 100,
    y : 580,
    width : 100,
    height : 100
   // src : currentPlayer
};

//game start
window.onload = gameStart();

function gameStart(){
   
    welcome.innerHTML = "Welcome!";
    titleImg.src ="images/palmtreeguy_right.png";
    description.innerHTML = "Collect all objects <br><br> Press Enter to Start and p to Pause <br> the arrow keys to move around<br>and space for jumping<br>Only on PC/Laptops";
    
}


function init(){
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');  
    welcome.innerHTML = "";
   // welcome.style.display= 'none';
    titleImg.style.display = 'none';
    description.innerHTML = "";
    footer.style.display = 'none';
     
    bgMusic = new sound("sounds/bgMusic.mp3");
    bgMusic.volume = 0.5;
    collectSound = new sound("sounds/collect.wav");
     
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
     //update currentPlayer and Bg src Attributes
     cPlayer = currentPlayer.getAttribute('src');
     cBackground = currentBg.getAttribute('src');
 
    //scrolling background
    if(background.x  === -1000){
        background.x = 0;
    }else{
        background.x -= xSpeed;
    }
    //ground is scrolling in other direction
    if(ground.x  === 0){
        ground.x = -500;
    }else{
        ground.x += xSpeed;
    }

    //make the bubbles move up
    if(bubbles.y=== 0){
        bubbles.y = 600;
    }else{
        bubbles.y -= 2;
    }
   
}

function draw(){

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(currentBg, background.x, background.y, background.width, background.height);
    
    if(cBackground === bgUnderwater){
        context.drawImage(bubblesImg, bubbles.x, bubbles.y, bubbles.width, bubbles.height);
    }
  
    context.drawImage(currentObject, object.x, object.y, object.width, object.height);
    context.drawImage(bgGround, ground.x, ground.y, ground.width, ground.height);
    context.drawImage(currentPlayer, player.x, player.y, player.width, player.height);
    context.fillText("Score: " + score , 10, 15);
   
}

function playerStandingRight(){
    if(cBackground === bgUnderwater){
        currentPlayer.src = playerUnderwater;
    }else{
        currentPlayer.src = playerIdle;
    }
   
}
function playerStandingLeft(){
    if(cBackground === bgUnderwater){
        currentPlayer.src = playerUnderwater2;
    }else{
        currentPlayer.src = playerLeft1Img;
    }
}
function playerUp(){
    if(cBackground === bgUnderwater){
        if(player.y < 20){
            player.y +=5;
        }else{
            player.y -= 10;
        }
       
    }
}
function playerDown(){
    if(cBackground === bgUnderwater){
        if(player.y > 600){
            player.y -=5;
        }else{
            player.y += 10;
        }
       
    }
}
function playerLeft(){

    if(player.x < 50){
        player.x += 5;
    }else{
        player.x -= 10;
    }
   
    
    if(cPlayer === playerIdle || cPlayer === playerLeft1Img){
       
        currentPlayer.src = playerLeft2Img;
     
    }
    else if(cPlayer === playerLeft2Img){
        currentPlayer.src = playerLeft3Img;
       
    }
    else if(cPlayer === playerLeft3Img){
        currentPlayer.src = playerLeft2Img;
    }
    else if(cPlayer === playerUnderwater2 || cPlayer === playerUnderwater){
        currentPlayer.src = playerUnderwaterLeft;
    }
}
function playerRight(){
   
    if(player.x > canvas.width - 150){
        player.x -= 10;
    }
    
    else{
        player.x += 10;
    }
   
   //compare with player Img
    if(cPlayer === playerIdle || cPlayer === playerLeft1Img){
      
        currentPlayer.src = playerRight2Img;

    }
    else if(cPlayer === playerRight2Img){
        currentPlayer.src = playerRight3Img;
     
       
    }
    else if(cPlayer === playerRight3Img){
        currentPlayer.src = playerRight2Img;
    }
    else if(cPlayer === playerUnderwater || cPlayer === playerUnderwater2){
        currentPlayer.src = playerUnderwaterRight;
    }

}

function collision(){

    let ranNumX = Math.floor(Math.random() * (600 - 10 +1)) + 50;
    let ranNumY = Math.floor(Math.random() * (600 - 500 +1)) + 500;
    if(player.x < object.x + (object.width - 10) && player.x + player.width > object.x
        && player.y < object.y + (object.height-20) 
        && player.height + player.y > object.y +10){
           
            object.x = ranNumX;
            object.y = ranNumY;
            if(score === 4){
                currentBg.src = bgUnderwater;
                currentObject.src = fish;
                currentPlayer.src = playerUnderwater;
                
                
            }else if(score === 8){
                currentBg.src = bgSnow;
                currentObject.src = ring;
                currentPlayer.src = player;
                player.y = 700- 20 - 100;
               
            }else if(score >= 12){
                description.innerHTML="To Be Continued...";
               
                gameEnd();
            }
            score++;
            collectSound.play();
            
        }       
}
function jump(){
   

    if(cBackground != bgUnderwater){
        if(jumpUp === false){
        
            player.y -= jumpY * 1.2;
            jumpUp = true;
        
        }else{
            player.y += jumpY * 1.2;
            jumpUp = false;
        }
    }
    if(cBackground === bgUnderwater){
        jumpUp = false;
    }
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

//https://www.w3schools.com/graphics/game_sound.asp
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


window.onclose = gameEnd();

function gameEnd(){
  
    start = false;
    currentBg.src = bgJungleImg;
    score = 0;
    currentObject.src = coin;
   
   
}