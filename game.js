// alert("hello");
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function(){
    
    if(started === false){
        started = true;
        
        $("h1").text("Level 0");
        nextSequence();
        // console.log("started");
        
    }
});


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.random()*4;
    randomNumber = Math.floor(randomNumber);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    
    // console.log(gamePattern);
    
   
}
$(".btn").click( function(event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);


    playSound(userChosenColour);
    animatePress(userChosenColour);
});




function playSound(color){
    var audio = new Audio("./sounds/"+color+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed"); 
    }, 100);
}

function checkAnswer(currentLevel){
    
        if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
            // console.log("sucess");
            // console.log(gamePattern);
            // console.log(userClickedPattern);
            if(userClickedPattern.length === gamePattern.length){
                setTimeout(nextSequence(), 1000);
            }
        }
        else{
            playSound("wrong");
            // console.log("wrong");
            // console.log(gamePattern);
            // console.log(userClickedPattern);
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);

            $("h1").text("Game Over, Press Any Key to Start");
            startOver();
        }

    
}

function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    level = 0;

}



