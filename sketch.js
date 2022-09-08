var girlImg, girl
var bgImg, bg
var athenaImg, athena, athenaGroup
var nectarImg, nectar, nectarGroup
var score = 0
var artemis, artemisImg, artemisGroup
var daggerImg, dagger, daggerGroup
var reset, resetImg
var heart1, heart2, heart3, livesImg, lifeCount = 4
var game_over, game_overImg

function preload(){
girlImg = loadImage ("Images/girl_running.png")
bgImg = loadImage ("Images/greek_mythology_background.jpg")
athenaImg = loadImage ("Images/athena.png")
artemisImg = loadImage ("Images/artemis.png")
daggerImg = loadImage ("Images/dagger.png")
resetImg = loadImage ("Images/reset.png")
game_overImg = loadImage ("Images/game over.jpg")
livesImg = loadImage ("Images/heart.png")
}

function setup() {

  createCanvas(1000,800)

  bg = createSprite (500,400,50,50)
  bg.addImage (bgImg)
  bg.scale = 1
  bg.velocityX = -2

  girl = createSprite (200,200,100,100)
  girl.addImage (girlImg)
  girl.scale = 0.4

  nectar = createSprite (900, Math.round(random(100,700)), 100, 100)
  //nectar.addImage (nectarImg)
  nectar.scale = 0.5
  nectar.velocityX = -3

  athenaGroup = new Group ()

  artemisGroup = new Group ()

  nectarGroup = new Group ()

  daggerGroup = new Group ()

  heart1 = createSprite (720, 75, 50, 50)
  heart1.addImage ("heart1", livesImg)
  heart1.scale = 0.1

  heart2 = createSprite (760,75,50,50)
  heart2.addImage ("heart2", livesImg)
  heart2.scale = 0.1

  heart3 = createSprite (800,75,50,50)
  heart3.addImage ("heart3", livesImg)
  heart3.scale = 0.1

}

function draw() {
  //set background color
  background("white");
  
  drawSprites ()

  textSize (30)
  fill ("black")
  text ("Score: " + score,100,100)
  
  if (girl.isTouching (nectar)) {
    score += 10
      if (nectar.x < 270) {
        nectar.x = 900
        nectar.y = Math.round (random(100,700))
      }
  }

  if (keyDown ("SPACE")) {
    Dagger ()
  }

  if (daggerGroup.isTouching (athenaGroup)) {
    athenaGroup.destroyEach ()
    daggerGroup.destroyEach ()
    score += 15
  }

  if (daggerGroup.isTouching (artemisGroup)) {
    artemisGroup.destroyEach ()
    daggerGroup.destroyEach ()
    score += 15
  }

  if (girl.isTouching (athenaGroup)) {
    lifeCount = lifeCount - 1
    console.log (lifeCount)
    athenaGroup.destroyEach ()
    score = score - 10
    
    if (lifeCount === 3) {
      heart3.visible = false
    }

    if (lifeCount === 2) {
      heart2.visible = false
    }

    if (lifeCount === 1) {
      heart1.visible = false
    }
  }

  if (girl.isTouching (artemisGroup)) {
    
    lifeCount = lifeCount - 1
    console.log (lifeCount)
    artemisGroup.destroyEach ()

    score = score - 10
    
    if (lifeCount === 3) {
      heart3.visible = false
    }

    if (lifeCount === 2) {
      heart2.visible = false
    }

    if (lifeCount === 1) {
      heart1.visible = false
    }
  }


  
  if (bg.x < 500) {
    bg.x = 600
  }

  if (keyDown (UP_ARROW)){
    girl.y = girl.y - 5
  }

  if (keyDown (DOWN_ARROW)){
    girl.y = girl.y + 5
  }
  
  Athena ()
  Artemis ()
}

function Athena () {
  
  if (frameCount % 150 == 0) {
    athena = createSprite (800,Math.round (random (100,700)),75,75)
    athena.addImage (athenaImg)
    athena.scale = 0.5
    athena.velocityX = -5
    athenaGroup.add (athena)
    athena.setCollider ("rectangle", 30, 0, 70, 300)
    //athena.debug = true
  }
}

function Artemis () {
  
  if (frameCount % 230 == 0) {
    artemis = createSprite (800,Math.round (random (100,700)),75,75)
    artemis.addImage (artemisImg)
    artemis.scale = 0.5
    artemis.velocityX = -6
    artemisGroup.add (artemis)
    artemis.setCollider ("rectangle", 30, 0, 70, 300)
    //artemis.debug = true

  }
}

function Dagger () {

  dagger = createSprite (girl.x + 50,girl.y,50,50)
  dagger.addImage (daggerImg)
  dagger.scale = 0.3
  dagger.velocityX = 4
  daggerGroup.add (dagger)
}



