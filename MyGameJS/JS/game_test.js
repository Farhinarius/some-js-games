// create Score counter

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// create variables :Images:
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

// create variable :Audio:
var fly = new Audio();
var score_audio = new Audio();
var hit = new Audio();

// attach the images
bird.src = "Assets/Images/bird.png";     
bg.src = "Assets/Images/background.png";
fg.src = "Assets/Images/foreground.png";
pipeUp.src = "Assets/Images/pipeUp.png";
pipeBottom.src = "Assets/Images/pipeBottom.png";

// attach audio to var.
fly.src = "Assets/Audio/fly.mp3";
score_audio.src = "Assets/Audio/score.mp3";
hit.src = "Assets/Audio/hit.wav";

// create game option variables
var space = 90;
var score = 0;
var acel = 1;
var speed = 0;
var time_counter = 0;
var pipe_dist = 100;


// create Positions of bird
var xPos = 10;
var yPos = 150;
var grav = 1.5;

// Where you pressed any button
document.addEventListener("keydown", moveUp)

function moveUp(){
    yPos -= 25;
    fly.play();
}

// create array of Pipes coordinates
var pipe = [];
pipe[0] = {
    x : cvs.width,
    y : 0
}


// DRAW GAME

function draw(){ // simultaneously draw all Images each mili-second
    // if game start check time
    time_counter++;
    
    // draw flappy bird
    ctx.drawImage(bg, 0, 0);

    // cycle create fly and offset pipe to left 
    // (bird stay and X axis)
    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + space);
        
        // offset screen -- illusion of bird flying
        pipe[i].x -= acel;

        
        if (time_counter % 50 == 0) {
            pipe_dist += 1;
        }

        // create new pipes
        if(pipe[i].x == pipe_dist) { // if draw new image at the right edge of screen, 
            // where pipe_dist is coordinate for drawing next pipe 
            pipe.push({
                    x: cvs.width,
                    y: 0
            });
        }

        

        
        // Check collision
        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + space) 
                ||  yPos + bird.height >= cvs.height - fg.height)  {
                        location.reload(); // reload page
                }

        // Score += 1
        if(pipe[i].x == 10) {
            score++;
            score_audio.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    // ctx.drawImage(bird, 10, 150);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    // create score counter
    ctx.fillstyle = '#000'
    ctx.font = "24px Sans-Serif"
    ctx.fillText("Score: " + score, 100, canvas.height - 20)

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;