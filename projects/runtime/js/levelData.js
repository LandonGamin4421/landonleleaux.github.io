var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Twilight Forest",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 300, y: groundY-10, image: "img/arrow.png", moveX: -25, moveY: -25, velocityX: -3, scaleX: 1.5, scaleY: 1.5, damage: 10 },
          { type: "enemy", x: 600, y: groundY-50, image: "img/zombie.png", moveX: -65, moveY: -75, velocityX: -2, scaleX: 1, scaleY: 1, damage: -10 },
          { type: "reward", x: 800, y: groundY-150, image: "img/steak.png" },
          { type: "sawblade", x: 1000, y: groundY-10, image: "img/arrow.png", moveX: -25, moveY: -25, velocityX: -3, scaleX: 1.5, scaleY: 1.5, damage: 10 },
          { type: "sawblade", x: 1000, y: groundY-210, image: "img/arrow.png", moveX: -25, moveY: -25, velocityX: -3, scaleX: 1.5, scaleY: 1.5, damage: 10 },
          { type: "enemy", x: 1200, y: groundY-50, image: "img/zombie.png", moveX: -65, moveY: -75, velocityX: -2, scaleX: 1, scaleY: 1, damage: -10 },
          { type: "enemy", x: 1300, y: groundY-50, image: "img/zombie.png", moveX: -65, moveY: -75, velocityX: -2, scaleX: 1, scaleY: 1, damage: -10 },
          { type: "enemy", x: 1400, y: groundY-50, image: "img/zombie.png", moveX: -65, moveY: -75, velocityX: -2, scaleX: 1, scaleY: 1, damage: -10 },
          { type: "reward", x: 1600, y: groundY-150, image: "img/steak.png" },
          { type: "sawblade", x: 1800, y: groundY-110, image: "img/arrow.png", moveX: -25, moveY: -25, velocityX: -3, scaleX: 1.5, scaleY: 1.5, damage: 10 },
          { type: "marker", x: 1700, y: groundY },
        ],
      },
      {
        name: "Grim Grotto",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "enemy", x: 1500, y: groundY-50, image: "img/enderman.png", moveX: -65, moveY: -135, velocityX: -2, scaleX: 1.25, scaleY: 1.5, damage: -10 },
          { type: "enemy", x: 1700, y: groundY-50, image: "img/enderman.png", moveX: -65, moveY: -135, velocityX: -2, scaleX: 1.25, scaleY: 1.5, damage: -10 },
          { type: "sawblade", x: 1900, y: groundY-110, image: "img/dragon_fireball.png", moveX: -25, moveY: -25, velocityX: -5, scaleX: 1.5, scaleY: 1.5, damage: 10 },
          { type: "sawblade", x: 1800, y: groundY-10, image: "img/dragon_fireball.png", moveX: -25, moveY: -25, velocityX: -6, scaleX: 1.5, scaleY: 1.5, damage: 10 },
          { type: "sawblade", x: 2150, y: groundY-10, image: "img/dragon_fireball.png", moveX: -25, moveY: -25, velocityX: -5, scaleX: 1.5, scaleY: 1.5, damage: 10 },
          { type: "sawblade", x: 2400, y: groundY-10, image: "img/dragon_fireball.png", moveX: -25, moveY: -25, velocityX: -5, scaleX: 1.5, scaleY: 1.5, damage: 10 },
          { type: "sawblade", x: 2400, y: groundY-210, image: "img/dragon_fireball.png", moveX: -25, moveY: -25, velocityX: -5, scaleX: 1.5, scaleY: 1.5, damage: 10 },
          { type: "sawblade", x: 2150, y: groundY-110, image: "img/dragon_fireball.png", moveX: -25, moveY: -25, velocityX: -3.5, scaleX: 1.5, scaleY: 1.5, damage: 10 },
          { type: "sawblade", x: 2150, y: groundY-110, image: "img/dragon_fireball.png", moveX: -25, moveY: -25, velocityX: -4, scaleX: 1.5, scaleY: 1.5, damage: 10 },
          { type: "sawblade", x: 2150, y: groundY-10, image: "img/dragon_fireball.png", moveX: -25, moveY: -25, velocityX: -3, scaleX: 1.5, scaleY: 1.5, damage: 10 },
          { type: "sawblade", x: 2150, y: groundY-110, image: "img/dragon_fireball.png", moveX: -25, moveY: -25, velocityX: -2.5, scaleX: 1.5, scaleY: 1.5, damage: 10 },
          { type: "reward", x: 2000, y: groundY-150, image: "img/porkchop.png" },
          { type: "reward", x: 2100, y: groundY-150, image: "img/porkchop.png" },
          { type: "marker", x: 2500, y: groundY },
        ],
      },
      {
        name: "Solitary Stronghold",
        number: 3,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY },
          { type: "sawblade", x: 600, y: groundY },
          { type: "sawblade", x: 900, y: groundY },
        ],
      },
      {
        name: "THE END",
        number: 4,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY },
          { type: "sawblade", x: 600, y: groundY },
          { type: "sawblade", x: 900, y: groundY },
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
