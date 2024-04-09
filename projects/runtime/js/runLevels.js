var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createSawBlade(x, y, image, moveX, moveY, velocityX, scaleX, scaleY, damage){
      var hitZoneSize = 25; //changes the sawblade's hitbox size
      var damageFromObstacle = damage; //changes how much damage the sawblade does
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      sawBladeHitZone.x = x; //changes the x position of the sawblade hitbox
      sawBladeHitZone.y = y; //changes the y position of the sawblade hitbox
      game.addGameItem(sawBladeHitZone); //adds the sawBladeHitzone as a game object to be used in the levelData file
      var obstacleImage = draw.bitmap(image); //draws an image of a sawblade
      sawBladeHitZone.addChild(obstacleImage); //adds the sawblade as a child of the sawBladeHitZone
      obstacleImage.x = moveX; //positions the image within the hitzone
      obstacleImage.y = moveY; //ditto
      obstacleImage.scaleX = scaleX; //changes the size of the sawblade image
      obstacleImage.scaleY = scaleY; //changes the size of the sawblade image
      sawBladeHitZone.velocityX = velocityX; //changes the speed of the sawblades
    }
    function createEnemy(x, y, image, moveX, moveY, velocityX, scaleX, scaleY, damage) {
      var enemy = game.createGameItem("enemy", 25);
      var zombie = draw.bitmap(image);
      zombie.x = moveX; //changes the square's x position in relation to the hitbox
      zombie.y = moveY; //changes the square's y position in relation to the hitbox
      zombie.scaleX = scaleX; //changes the size of the enemy image
      zombie.scaleY = scaleY; //changes the size of the enemy image
      enemy.addChild(zombie); //adds the image as a child of the enemy variable
      enemy.x = x; //changes the x position of the enemy hitbox
      enemy.y = y; //changes the y position of the enemy hitbox
      game.addGameItem(enemy); //adds enemy as a game item to be used elsewhere
      enemy.velocityX = velocityX; //changes the speed the enemy moves at on the x-axis
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(damage); //makes the player lose health when touched
      };
      enemy.onProjectileCollision = function () {
        game.increaseScore(100); //increases score when shot
        enemy.fadeOut(); //makes the enemy fade out when shot
      };
    }
    function createReward(x, y, image) {
      var reward = game.createGameItem("reward", 25); //creates the reward gameItem
      var steak = draw.bitmap(image); //draws an image of the steak
      steak.x = -25; //changes the position of the steak image relative to the reward hitbox
      steak.y = -25; //changes the position of the steak image relative to the reward hitbox
      steak.scaleX = 1.50; //changes the size of the steak image
      steak.scaleY = 1.50; //changes the size of the steak image
      reward.addChild(steak); //adds the steak image as a child of the reward game item
      reward.x = x; //changes the x position of the reward hitbox
      reward.y = y; //changes the y position of the reward hitbox
      game.addGameItem(reward); //adds reward as a game item to be used in the levelData file
      reward.velocityX = -2; //makes the reward move left or right
      reward.velocityY = 0; //makes the reward move up or down
      reward.rotationalVelocity = 0; //makes the reward rotate
      reward.onPlayerCollision = function () {
        game.changeIntegrity(+20); //gives the player health when touched
        fadeOut(); //makes the reward fade out when touched
      };
    }
    function createMarker(x, y) {
      var marker = game.createGameItem("marker", 25); //creates a marker gameItem
      var yellowSquare = draw.bitmap("img/chest.png"); //draws a chest
      yellowSquare.x = -30; //changes the position of the chest relative to the marker hitbox
      yellowSquare.y = -45; //changes the position of the chest relative to the marker hitbox
      marker.addChild(yellowSquare); //adds the chest as a child of the marker
      marker.x = x; //changes the x position of the marker hitbox
      marker.y = y; //changes the y position of the marker hitbox
      game.addGameItem(marker); //adds the marker as a game item to be used in the levelData file
      marker.velocityX = -2; //changes the speed of the marker
      marker.onPlayerCollision = function () {
        startLevel(); //plays the next level when touched by the player
      };
    }
    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel]; //makes the levelData array easier to use
      var levelObjects = level.gameItems; //makes the levelData array even easier to use
      for (var i = 0; i < levelObjects.length; i++) {
        var element = levelObjects[i]; //like before, ease of use
        //the next lines just create gameItems when specified in the levelData file
        if (element.type === "sawblade") {
          createSawBlade(element.x, element.y, element.image, element.moveX, element.moveY, element.velocityX, element.scaleX, element.scaleY, element.damage);
        }
        if (element.type === "enemy") {
          createEnemy(element.x, element.y, element.image, element.moveX, element.moveY, element.velocityX, element.scaleX, element.scaleY, element.damage);
        }
        if (element.type === "reward") {
          createReward(element.x, element.y, element.image);
        }
        if (element.type === "marker") {
          createMarker(element.x, element.y);
        }
      }


      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
