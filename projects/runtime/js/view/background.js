var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        var tree;
        var buildings = [];
      
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundFill = draw.rect(canvasWidth, groundY,'#1c1f37');
            background.addChild(backgroundFill);
            
            // TODO 2: - Add a moon and starfield

            for (var stars = 0; stars < 100; stars++){
                var circle = draw.circle(10, "white", "LightGray", 2); //creates a variable to hold circle data
                circle.x = canvasWidth * Math.random(); //gives the star a random x value
                circle.y = groundY * Math.random(); //gives the star a random y value
                background.addChild(circle); //adds the star as a child of the background
            }

            
            var moon = draw.bitmap("img/moon.png"); //the variable moon holds an image of the moon
            moon.x = canvasWidth-2100; //determines x value of moon
            moon.y = groundY-700; //determines y value of moon
            moon.scaleX = 0.9; //determines the horizontal scale of the moon
            moon.scaleY = 0.9; //determines the vertical scale of the moon 
            background.addChild(moon); //adds the moon variable as a child of the background
            

            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for (var i = 0; i < 5; ++i) {
                var buildingHeight = Math.random() * 500; //makes the buildings have random heigts
                var building = draw.rect(75, buildingHeight, "LightGray", "Black", 1);
                building.x = 200 * i;
                building.y = groundY - buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }
            
            // TODO 3: Part 1 - Add a tree
            tree = draw.bitmap("img/tree.png"); //draws a tree
            tree.x = canvasWidth-1000; //determines the x value of the tree
            tree.y = groundY-210; //determines the y value of the tree
            background.addChild(tree); //adds the tree as a child of the background
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            tree.x = tree.x - 10; //moves the tree left

            if (tree.x < -200) {
                tree.x = canvasWidth; //makes the tree reappear on the right side
            }
            
            // TODO 4: Part 2 - Parallax
            

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
