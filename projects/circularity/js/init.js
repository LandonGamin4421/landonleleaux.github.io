var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
        var circle;  //holds a single circle, used to iterate
        var circles = []; //stores all circles in a single array

        // TODO 2 : Create a function that draws a circle 
        function drawCircle() {
            // Code to draw a circle
            circle = draw.randomCircleInArea(canvas, true, true, "#999", 2);
            physikz.addRandomVelocity(circle, canvas, 2, 2); // added arguments to change speed
            view.addChild(circle);
            circles.push(circle);
        }

        // TODO 3 / 7 : Call the drawCircle() function 
        /* repetitive code
        drawCircle();
        drawCircle();
        drawCircle();
        drawCircle();
        drawCircle();
        */

        //creates 100 circles
        for (var loops = 0; loops < 100; loops++) {
            drawCircle();
        }
        

        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            
            

            // TODO 4 : Update the circle's position //
            //makes the circles move funny//
            /* repetitive code
            physikz.updatePosition(circles[0]);
            physikz.updatePosition(circles[1]);
            physikz.updatePosition(circles[2]);
            physikz.updatePosition(circles[3]);
            physikz.updatePosition(circles[4]);
            */
            
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
            /* repetitive code
            game.checkCirclePosition(circles[0]);
            game.checkCirclePosition(circles[1]);
            game.checkCirclePosition(circles[2]);
            game.checkCirclePosition(circles[3]);
            game.checkCirclePosition(circles[4]);
            */

            // TODO 9 : Iterate over the array
            //updates the circle positions and checks them with a loop
            for (var i = 0; i < circles.length; i++) {
                physikz.updatePosition(circles[i]);
                game.checkCirclePosition(circles[i]);
            }
            
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */

        game.checkCirclePosition = function(circle) {

            //did these for the challenge
            var rightEdge = circle.x + circle.radius;
            var leftEdge = circle.x - circle.radius;
            var topEdge = circle.y - circle.radius;
            var bottomEdge = circle.y + circle.radius;

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if (leftEdge > canvas.width) {
                circle.x = 0 - circle.radius; //this whole section was kinda hectic, but subtracting radius makes it more smooth
            }
            
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            // if the circle has gone past the LEFT side of the screen then place it on the RIGHT
            if (rightEdge < 0) {
                circle.x = canvas.width + circle.radius; // adding values to the left and right sides made it more smooth
            }
            // if the circle has gone past the TOP side of the screen then place it on the BOTTOM
            if (topEdge > canvas.height) {
                circle.y = 0;
            }
            // if the circle has gone past the BOTTOM side of the screen then place it on the TOP
            if (bottomEdge < 0) {
                circle.y = canvas.height;
            }


            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
