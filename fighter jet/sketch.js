var space , blueShip, redShip, edges, bullets
var database ;
var gamestate ="wallpaper"
var astroid = []
var astroids,maxAstroid = 100
var bulletarry
var astroidGroup
var death = 0
function preload() {
space =loadImage("images/background.gif")  
blueship = loadImage("images/blueship.png")
redship = loadImage("images/redship.png")
bulleti = loadImage("images/lazer beam.png")
wallpaper = loadImage("images/start.png")
Button = loadImage("images/button.png")
Astroid = loadImage("images/astroid.png")


}
function setup() {
  createCanvas(displayWidth,displayHeight-120);
blueShip = createSprite (displayWidth - 100, displayHeight/2);
blueShip.addImage(blueship);
blueShip.scale = 0.3

redShip = createSprite (90, displayHeight/2);
redShip.addImage(redship);
redShip.scale = 0.3
for (var i=0;i<9;i++){
  bullets = createSprite (displayWidth+100,displayHeight/2);
  bullets.addImage(bulleti);
  bullets.scale = 0.05

  button = createSprite(displayWidth/2,displayHeight/2);
  button.addImage(Button);

  astroidGroup = new Group()
}


edges = createEdgeSprites ();
  //database = firebase.database()
}

function draw() {
  background(space); 
  if (gamestate === "wallpaper"){
    background (wallpaper)
    blueShip.visible=false
    redShip.visible=false
   }

  if (mousePressedOver(button)){
gamestate ="serve"

button.visible=false;

blueShip.visible=true
redShip.visible=true
  }
  if (gamestate === "serve"){
    strokeWeight(5)
    stroke ("red")
    fill ("white")
    textSize(30)
    text ("player 1 press space to shoot ",200,100)
    text ("player 2 press ? to shoot" ,displayWidth-500,100)
    button.visible=false;
  }
   
  
    if (keyWentDown("space")&&gamestate=="serve") {
      
      bullets.velocityX = 69
      bullets.y=redShip.y
      bullets.x=redShip.x
      gamestate = "play"
    }
    if(bullets.x > displayWidth&&keyWentDown("space")&&gamestate==="play"){
      bullets.y=redShip.y
      bullets.x=redShip.x
      bullets.velocityX = 69
    }
    if (gamestate === "play"){
      spawnAstroid()
      textSize(20)
      text("Death:"+death,200,200 );
      text("Death:"+death,displayWidth-200,200 );
    }
  if (keyDown("w")) {
    redShip.y=redShip.y-2
  }

  if (keyDown("s")) {
    redShip.y=redShip.y+2
  }

  if (keyDown("up")) {
    blueShip.y=blueShip.y-2
  }

  if (keyDown("down")) {
    blueShip.y=blueShip.y+2
  }
  for(var i =0; i< astroidGroup.length;i++){
    if(astroidGroup.get(i).isTouching(redShip)){
      astroidGroup.get(i).destroy();
     redShip.destroy();
     death = death+1;
     //astroidGroup.setVelocityXEach(0)
    }
     if(astroidGroup.get(i).isTouching(blueShip)){
      astroidGroup.get(i).destroy();
      blueShip.destroy();
      death = death+1;
   }
   }


  redship.depth=bullets.depth
  bullets.depth=bullets.depth-1
  blueShip.bounceOff(edges)
  redShip.bounceOff(edges)
  drawSprites();
}
function spawnAstroid(){
  if (frameCount%280===0){
    astroids=createSprite(displayWidth-20,50)
    astroids.x=Math.round(random(displayWidth,50))
    astroids.addImage(Astroid)
    astroids.scale = 0.5
    astroids.y=Math.round(random(50,300))
    astroids.velocityX=Math.round(random(-2,-7))
    astroids.velocityY=Math.round(random(10,17))
    astroids.lifetime=displayWidth/10
    astroidGroup.add(astroids)
  }
}