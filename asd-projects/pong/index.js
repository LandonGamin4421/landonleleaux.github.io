/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  
  // Game Item Objects
  const KEY = {
    "W": 87,
    "S": 83,
    "UP": 38,
    "DOWN": 40
  }
  function GameItem(id, speedX, speedY){
    var objInstance = {
      id: id,
      x: parseFloat($(id).css("left")),
      y: parseFloat($(id).css("top")),
      speedX: speedX,
      speedY: speedY,
      width: $(id).width(),
      height: $(id).height()
    }
    return objInstance;
  }
  var message;
  var score1 = 0;
  var score2 = 0;
  var leftPaddle = GameItem("#leftPaddle", 0, 0)
  var rightPaddle = GameItem("#rightPaddle", 0, 0)
  var ball = GameItem("#ball", (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1), (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1))
  
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    drawGameItem(leftPaddle);
    updateGameItem(leftPaddle);
    paddleWallCollision(leftPaddle);
    drawGameItem(rightPaddle);
    updateGameItem(rightPaddle);
    paddleWallCollision(rightPaddle);
    drawGameItem(score1);
    updateGameItem(score1);
    drawGameItem(score2);
    updateGameItem(score2);
    drawGameItem(ball);
    updateGameItem(ball);
    pointHandler(ball);
    checkBoundaries(ball);
    wallBounce(ball);
    paddleCollision(ball);
    winCondition();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.W){
      leftPaddle.speedY = -5;
    }
    if(event.which === KEY.S){
      leftPaddle.speedY = 5;
    }
    if(event.which === KEY.UP){
      rightPaddle.speedY = -5;
    }
    if(event.which === KEY.DOWN){
      rightPaddle.speedY = 5;
    }
  }
  function handleKeyUp(event){
    if (event.which === KEY.W || KEY.UP){
      leftPaddle.speedY = 0;
      rightPaddle.speedY = 0;
    }
    if (event.which === KEY.S || KEY.DOWN){
      leftPaddle.speedY = 0;
      rightPaddle.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  //Movement helpers
  function drawGameItem(obj){
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }
  function updateGameItem(obj){
    obj.x += obj.speedX;
    obj.y += obj.speedY;
  }
  function paddleWallCollision(obj){
    if(obj.y > BOARD_HEIGHT-obj.height){
      obj.speedY = 0;
      obj.y = BOARD_HEIGHT-obj.height;
    }
    if(obj.y < 0){
      obj.speedY = 0;
      obj.y = 0;
    }
  }
  //check boundaries of paddles
  function checkBoundaries(obj){
    if(obj.x > BOARD_WIDTH - obj.width || obj.x < 0){
      obj.x = BOARD_WIDTH/2 - obj.width/2;
      obj.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
      obj.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    }
  }

  //handle what happens when the ball hits the walls
  function wallBounce(obj){
    if(obj.y > BOARD_HEIGHT - obj.height || obj.y < 0){
      obj.speedY = -obj.speedY;
      if (obj.speedX < 0){
        obj.speedX -= 1;
      }
      if (obj.speedX > 0){
        obj.speedX += 1;
      }
    }
  }

  //handle what happens when the ball hits the paddles
  function paddleCollision(obj){
    if(obj.x < leftPaddle.x + leftPaddle.width && obj.y > leftPaddle.y && obj.y < leftPaddle.y + leftPaddle.height){
      obj.speedX = -obj.speedX;
    }
    if(obj.x + obj.width > rightPaddle.x && obj.y > rightPaddle.y && obj.y < rightPaddle.y + rightPaddle.height){
      obj.speedX = -obj.speedX;
    }
  }
  //handle the points
  function pointHandler(obj){
    if(obj.x > BOARD_WIDTH - obj.width){
      score1 +=1;
    }
    if(obj.x < 0){
      score2 +=1;
    }
    $("#score1").text(score1);
    $("#score2").text(score2);
  }
  //handle what happens when someone wins
  function winCondition(){
    if(score1 === 15){
      message = "PLAYER ONE WINS!!!"
      endGame();
    }
    if(score2 === 15){
      message = "PLAYER TWO WINS!!!"
      endGame();
    }
    $("#winMessage").text(message);
  }
  //handle resetting the game
  function endGame() {
    $("#endGameButton").css('opacity', 1)
    // stop the interval timer
    clearInterval(interval);
    // turn off event handlers
    $(document).off();
  }
  
}
