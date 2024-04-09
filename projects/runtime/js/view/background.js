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
        //just animation variables to use later
        var tree;
        var moon;
        var mountain1;
        var stars = [];
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

            
            for (var i = 0; i < 100; i++){
                var star = draw.bitmap("img/star.png"); //creates a variable to hold circle data
                star.x = canvasWidth * Math.random(); //gives the star a random x value
                star.y = groundY * Math.random()-50; //gives the star a random y value
                background.addChild(star); //adds the star as a child of the background
                stars.push(star); //pushes each star to the stars array
            }

            
            moon = draw.bitmap("img/moon.png"); //the variable moon holds an image of the moon
            moon.x = canvasWidth-1900; //determines x value of moon
            moon.y = groundY-500; //determines y value of moon
            moon.scaleX = 1.5; //determines the horizontal scale of the moon
            moon.scaleY = 1.5; //determines the vertical scale of the moon 
            background.addChild(moon); //adds the moon variable as a child of the background

            mountain1 = draw.bitmap("img/mountain1.png"); //draws a mountain
            mountain1.x = canvasWidth-1500; //determines the x value of the mountain
            mountain1.y = groundY-560; //determines the y value of the mountain
            mountain1.scaleX = 1.75; //changes the mountain size
            mountain1.scaleY = 1.75; //changes the mountain size
            background.addChild(mountain1); //adds the mountain as a child of the background
            

            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for (var i = 0; i < 5; ++i) {
                var buildingHeight = Math.random() * 500; //makes the buildings have random heigts
                var building = draw.rect(75, buildingHeight, "LightGray", "Black", 1); //creates a rectangle as a building
                building.x = 200 * i; //spaces the buildings apart
                building.y = groundY - buildingHeight; //sets the buildings on top of the ground
                background.addChild(building); //adds building as a child of the background
                buildings.push(building); //pushes each building to the buildings array
            }
            
            // TODO 3: Part 1 - Add a tree
            tree = draw.bitmap("img/tree.png"); //draws a tree
            tree.x = canvasWidth-1000; //determines the x value of the tree
            tree.y = groundY-245; //determines the y value of the tree
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
            tree.x = tree.x - 7; //moves the tree left
            mountain1.x -= 0.2; //moves the mountain left
            moon.x += 0.05; //moves the moon right

            if (tree.x < -200) {
                tree.x = canvasWidth; //makes the tree reappear on the right side
            }
            
            // TODO 4: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++) {
                buildings[i].x -= 1.5; //moves each building to the left
                if (buildings[i].x < -700) {
                    buildings[i].x = canvasWidth; //makes the buildings reappear on the right side
                }
            }
            for (var i = 0; i < stars.length; i++) {
                stars[i].x -= 0.25; //moves each star to the left
                if (stars[i].x < -700) {
                    stars[i].x = canvasWidth; //makes the stars reappear on the right side
                }
            }

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
