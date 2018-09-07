//making sure the variables are established before any other part of the javascript loads
var questionArray =[{
    question:"How many different comic book characters have had the name Spider-man?",
    answerArray:["One", "Two", "Three", "Four"],
    correct:"Two"
}, {
    question:"What High School did Peter Parker attend?",
    answerArray:["Downtown", "Uptown", "Midtown", "Central"],
    correct:"Midtown"
}, {
    question:"What Issue of Amazing Spiderman introducted Mary Jane Watson?",
    answerArray:["1", "15", "25", "42"],
    correct:"42"
}, {
    question:"In what issue did the infamous death of Gwen Stacy occur?",
    answerArray:["101", "121", "141", "211"],
    correct:"121"
}, {
    question:"Who was the first character to wear the Venom Symbiote?",
    answerArray:["Peter Parker", "Flash Thompson", "Eddie Brock", "Wade Wilson"],
    correct:"Wade Wilson"
}, {
    question:"Who was the third Green Goblin?",
    answerArray:["Harry Osborn", "Bart Hamilton", "Norman Osborn", "Phil Urich"],
    correct:"Bart Hamilton"
}, {
    question:"Who was the first supervillain Spider-Man faught?",
    answerArray:["The Chameleon", "Doctor Octopus", "The Rhino", "The Vulture"],
    correct:"The Chameleon"
}, {
    question:"There have been how many live action Spider-Man Movies?",
    answerArray:["Five", "Six", "Seven", "Eight"],
    correct:"Six"
}, {
    question:"What is the largest number of movies a single actor has portrayed Spider-Man in?",
    answerArray:["One", "Two", "Three", "Four"],
    correct:"Three"
}, {
    question:"How many children does Peter Parker have in the MC2 universe?",
    answerArray:["none", "One", "Two", "Three"],
    correct:"Two"
}];
//tracking the game and making the countdown clock
var gameRecord = { //
    correctAnswers: 0, //initial value of 0 to increment
    incorrectAnswers: 0, //initial value of 0 to increment
    gameTime: 120, // 2 minutes start time
    //create a named function tocreate the countdown timer on the html 
    countDown: function(){
        //decriment startTime
        gameRecord.gameTime--;
        //grabbing the startTime element in the html, and updating the visible counter down. This html element doesn't actually exist yet, but will be added (prepended?) in a later method.
        $("#gameTime").html(gameRecord.gameTime);
        //creates an end state for the game
        if (gameRecord.gameTime<=0) {
            ///tell the console time ran out
            console.log("You've run out of time");
            // run the game completion function/(method?)
            gameRecord.over();
        }
    },
    //making a callable function for the game, so i can remove it from the button itself
    start: function(){
        //create a timer tied to the gameRecord variable for every 1k milliseconds.
        timer = setInterval(gameRecord.countDown,1000);
        //create the html for the time remaining/
        $("#quizContainer").prepend("<h2>Remaining Time: <span id='gameTime'>120</span> Seconds</h2>");
        //logging to console to make sure button is registering wheenever it gets pressed
        console.log("Start has been clicked.") //remove from final version
        //remove the start button after the first click
        $("#start").remove()
        //function call to print out all of the questions on the page.
        for (let i = 0; i<questionArray.length; i++) {
        //logging the question to console as a test
        //console.log(questionArray[i]); //remove once tested true
        //appending the questions to the main quiz container
        $("#quizContainer").append("<h2>"+questionArray[i].question+"</h2>");
        //creating an additional for loop to append the answers to their own questions
            for (let j = 0; j < questionArray[i].answerArray.length; j++) {
                //testing for loop output in console: remember that the initial array needs to identify location with [i] here!
                //console.log(questionArray[i].answerArray[j]); //removed when tested true
                // appending all 4 answers to the same row with an additional radio input, still in the quiz container, but under their respective questions
                //need to remember that layering requires "    " with '   '  for each plateau. also that pesky # keeps getting forgotten!
                $("#quizContainer").append("<input type='radio' name='question-"+i+"' value='"+questionArray[i].answerArray[j]+"'>"+questionArray[i].answerArray[j]);
            };
        }
        $("#quizContainer").append("<br><button id='endEarly'>Finished? Click me!</button>");
    },
    //making the exit function with results, etc.
    over: function(){
        //clear the timer interval so it doesn't count negative!
        clearInterval(timer);
        //i wanted to do this as a single for loop, but it kept giving me a sizzle error, which I could not understand how to parse out.
        //woo got it working!!!!!!!!!!!!!!!
        for (let k = 0; k < questionArray.length; k++) {        
            //checking and comparing the radio to the correct answer, and incrementing the associate correct/incorrect counter.    
            $.each($("input[name='question-"+k+"']:checked"),function(){
                if($(this).val()==questionArray[k].correct){
                    gameRecord.correctAnswers++;
                    console.log(gameRecord.correctAnswers);
                } else {
                    gameRecord.incorrectAnswers++;
                    console.log(gameRecord.incorrectAnswers);
                };
            });
        };
        $("#quizContainer h3").remove();
        $("#quizContainer").html("<h2>Time is up</h2>");
        $("#quizContainer").append("<h3> Correct Answers: "+this.correctAnswers+"</h3>")
        $("#quizContainer").append("<h3> Incorrect Answers: "+this.incorrectAnswers+"</h3>")
        $("#quizContainer").append("<h3> You failed to answer: "+(questionArray.length-(this.incorrectAnswers+this.correctAnswers))+" Questions</h3>")

    }

};

// creating the on click event tied to the start button
$("#start").on("click",function(){
gameRecord.start();
});
$(document).on("click","#endEarly", function(){
    gameRecord.over();
    });