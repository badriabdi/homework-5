$(document).ready(function () {


    var rightAnswers = 0;
    var wrongAnswers = 0;
    var unanswerQuestions = 0;
    var questionIndex = 0;


    var intervalId;
    var clockRunning = false;
    var time = 15;

    $("#start").click(startTimer());
    // This function will start  the questions
    function startTimer() {
        if (!clockRunning) {
            time = 15;
            intervalId = setInterval(decrement, 1000)
            clockRunning = true;
        }
    };
    // This funtion will decrease the time as the client answers the question than it stops when the time is equal 0

    function decrement() {
        time--;
        $(".timer").text("<h1>" + time + "</h1>")
        if (time === 0) {
            stop();
        }

    };

    // This function will stop t
    function stop() {
        clockRunning = false;
        clearInterval(intervalId);


    };
    // the questions and the answers based on  index number of array
    var questions = [{
        question: "all time best soccer player?",
        choices: ["Pele", "Maradona", "Ronaldo"],
        answer: 0
    },
    {
        question: " longest serving fifa president?",
        choices: ["Zidane", "Blatter", "Platini"],
        answer: 1
    }, {
        question: " longest serving United States president?",
        choices: ["George Washington", "Abraham Lincoln", "Roosevelt"],
        answer: 2
    }, {

        question: " best selling book of all time?",
        choices: ["Think like man", "Harry Potter", "The Genes"],
        answer: 1



    }];

    function afterQuestion(after) {
        for (var i = 0; i < questions.length; i++) {
            // if (questionIndex < questions.length) {

            $(".questions").append("<h1>" + questions[i].question + "</h1>");
            for (var j = 0; j < questions[i].choices.length; j++) {
                var newDiv = $("<div>");
                newDiv.addClass("choices").attr("numIndex", i).text(questions[i].choices[j]);
                $(".questions").append(newDiv);
            }



        }

        $(".happy").on("click", function () {
            var userChoice = parseInt($(this).att("numIndex"));
            if (userChoice === questions[questionIndex].answer) {
                rightAnswers++;

            } else {
                wrongAnswers++;

            }
            questionIndex++;
        });




    };



    afterQuestion(questionIndex);
    $(".correct").html("<h1>" + rightAnswers + "<h1>");
    $(".incorrect").html("<h1>" + wrongAnswers + "<h1>");



});