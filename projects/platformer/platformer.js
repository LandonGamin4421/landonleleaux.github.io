$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }
    //create walls
    createPlatform(-50, -50, canvas.width + 100, 50); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
    createPlatform(-50, -50, 50, canvas.height + 500); //bottom
    createPlatform(canvas.width, -50, 50, canvas.height + 100);

    /**
     * Uncomment the loops below to add a "grid" to your platformer game's screen
     * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
     * This can give you a better idea of where to create new platforms
     * Comment the lines out to remove the grid
     */

    // for (let i = 100; i < canvas.width; i += 100) {
    //   createPlatform(i, canvas.height, -1, -canvas.height);
    // }
    // for (let i = 100; i < canvas.height; i += 100) {
    //   createPlatform(canvas.width, i, -canvas.width, -1);
    // }

    /////////////////////////////////////////////////
    //////////ONLY CHANGE BELOW THIS POINT///////////
    /////////////////////////////////////////////////


    // TODO 1
    // Create platforms
    // You must decide the x position, y position, width, and height of the platforms
    // example usage: createPlatform(x,y,width,height)

    createPlatform(200, 650, 200, 25);
    createPlatform(250, 450, 150, 20);
    createPlatform(150, 250, 150, 20);
    createPlatform(500, 320, 165, 20);
    createPlatform(930, 320, 100, 20);
    createPlatform(200, 650, 25, 100);
    createPlatform(400, 650, 25, 100);
    createPlatform(550, 550, 25, 200);
    createPlatform(565, 550, 100, 25);
    createPlatform(650, 320, 25, 255);
    createPlatform(900, 630, 80, 20);
    createPlatform(1000, 560, 80, 20);
    createPlatform(1250, 520, 80, 20);
    createPlatform(800, 450, 80, 20);


    
    // TODO 2
    // Create collectables
    // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
    // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
    // example usage: createCollectable(type, x, y, gravity, bounce)

    createCollectable("redEmerald", 200, 600, 30, 1);
    createCollectable("blueEmerald", 150, 210, 30, 1);
    createCollectable("greenEmerald", 1270, 480, 30, 1);
    createCollectable("whiteEmerald", 960, 280, 30, 1);
    createCollectable("orangeEmerald", 580, 500, 30, 1);
    createCollectable("cyanEmerald", 600, 700, 30, 1);
    createCollectable("purpleEmerald", 520, 280, 30, 1);


    // TODO 3
    // Create cannons
    // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
    // Your wall choices are: 'top' 'left' 'right' and 'bottom'
    // example usage: createCannon(side, position, delay, width, height)

    createCannon("top", 500, 700, 50, 50);
    createCannon("top", 820, 700, 50, 50);
    createCannon("bottom", 1100, 1000, 75, 75);


    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }

  registerSetup(setup);
});
