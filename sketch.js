//Creating variables
var monkey , monkey_running, monkeyCollide;
var ground, invisiGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;


function preload(){
monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkeyCollide = loadAnimation("sprite_1.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage = loadImage("forest.jpg");
 
}

function setup(){
 createCanvas(800,290);
  
  //Creating groups
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
   
  //Creating Monkey
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.1;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
     
  //Creating Ground
  ground = createSprite(300,280,1500,10);
  ground.scale = 1; 
}

function draw(){
  
  //Creating background
  background("skyblue");
  
  fill("yellow");
  textSize(20);
  textFont("Algerian");
  text("Survival Time: "+score, 410, 30);
  
  fill("black");
  textSize(20);
  text("Food Collected: "+ bananaScore,100,30);
  
  if (gameState === PLAY){
    
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(20+score*1.9/100);
  
    if(keyDown("space")&& monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
      }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    }
  
  if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 245;
    monkey.scale = 0.1;
    monkey.changeAnimation("collide", monkeyCollide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    fill("red");
    textSize(30);
    text("Game Over", 220, 170);
    
    fill("green");
    textSize(20);
    text("Press 'R' to play again", 190, 190);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
  drawSprites(); 
  
  monkey.collide(ground);
}

//Creating bananas
function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(6 +score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);  
  
  }
}

//Creating obstacles
function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(6+score*1.5/100);
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
    
  } 
}