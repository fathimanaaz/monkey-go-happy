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
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png",
  "sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkeyCollide = loadAnimation("sprite_1.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup(){
 createCanvas(500,300);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
   
  monkey = createSprite(70,275,10,10);
  monkey.scale = 0.1;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
  monkey.debug=false
  monkey.setCollider("rectangle", 0, 0, 250,555);
     
  ground = createSprite(300,295,1500,10);
  ground.scale = 1; 
  ground.shapeColor = "lightgreen"
}

function draw(){
  
  fill("green");
  background("lightyellow");
  textSize(20);
  text("Score: "+score, 300, 20);
  textSize(20);
  text("Bananas Collected: "+bananaScore,40,20);

  if (gameState === PLAY){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -4
  
    if(keyDown("space")&&monkey.y >= 235) {
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
    fill("darkgreen");
    textSize(30);
    text("Game Over", 180, 150);
  
  }
  
  drawSprites(); 
  
  monkey.collide(ground);
}

function bananas(){
  if (frameCount%100 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-5      
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);  
  
  }
}

function obstacles(){
  if (frameCount%300 === 0){
    
    obstacle = createSprite(620,275,50,50);
    obstacle.addAnimation("rock", obstacleImage); 
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -5
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.debug=false
  } 
}