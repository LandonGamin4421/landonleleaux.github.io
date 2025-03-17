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

  var leftPaddle = GameItem("#leftPaddle", 0, 0)
  var rightPaddle = GameItem("#rightPaddle", 0, 0)
  var ball = GameItem("#ball", (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1),0 )

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
    drawGameItem(rightPaddle);
    updateGameItem(rightPaddle);
    drawGameItem(ball);
    updateGameItem(ball);
    checkBoundaries(ball);
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

  //check boundaries of paddles
  function checkBoundaries(obj){
    if(obj.x > BOARD_WIDTH - obj.width){
      obj.x = BOARD_WIDTH/2 - obj.width/2;
    }
    if(obj.x < 0){
      obj.x = BOARD_WIDTH/2 - obj.width/2;
    }
    if(obj.y > BOARD_HEIGHT - obj.height){
      obj.y = BOARD_HEIGHT/2 - obj.height/2;
    }
    if(obj.y < 0){
      obj.y = BOARD_HEIGHT/2 - obj.height/2;
    }
  }
  //handle what happens when the ball hits the walls
  //handle what happens when the ball hits the handles
  //handle what happens when someone wins
  //handle the points
  //handle resetting the game
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
