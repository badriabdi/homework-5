



$(document).ready(function(){
  
    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    // trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    // questions options and answers data
    questions: {
      q1: 'All time best soccer player?',
      q2: 'All time best basketball player?',
      q3: 'Who served the most years as united states president?',
      q4: 'who served the most years as Fifa president ?',
      q5: "What is the longest mountain range in the united states?",
      q6: 'How many countries are in africa?',
      q7: "Who thinks they're always the last to find out everything?"
    },
    options: {
      q1: ['Pele', 'Maradona', 'Cristiano', 'Messi'],
      q2: ['Jordan', 'Lebron', 'Curry', 'Durant'],
      q3: ['Roosevelt', 'Obama', 'John F. Kennedy', 'George Washington'],
      q4: ['pele', 'Maradona', 'Sepp Blatter', 'Messi'],
      q5: ['Kiliminjaro','Rocky Mountains','Emily','Carol'],
      q6: ['40','1','10','50'],
      q7: ['Ross', 'Phoebe', 'Monica','Chandler']
    },
    answers: {
      q1: 'Pele',
      q2: 'Jordan',
      q3: 'Roosevelt',
      q4: 'Sepp Blatter',
      q5: 'Rocky Mountain',
      q6: '50',
      q7: 'Phoebe'
    },
    
    
    startGame: function(){
    
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      // show game section
      $('#game').show();
      
      //  empty last results
      $('#results').html('');
      
      // show timer
      $('#timer').text(trivia.timer);
      
      // remove start button
      $('#start').hide();
  
      $('#remaining-time').show();
      
      // ask first question
      trivia.nextQuestion();
      
    },
    // 
    nextQuestion : function(){
      
      
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      
      // to prevent timer speed up
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      // gets all the questions then indexes the current questions
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      // an array of all the user options for the current question
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      // creates all the trivia guess options in the html
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    // method to decrement counter and count unanswered if timer runs out
    timerRunning : function(){
      
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        
        $('#game').hide();
        
        
        $('#start').show();
      }
      
    },
    
    guessChecker : function() {
      
      
      var resultId;
      
      
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      
      if($(this).text() === currentAnswer){
        
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      
      else{
        
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
    
    guessResult : function(){
      
      
      trivia.currentSet++;
      
      
      $('.option').remove();
      $('#results h3').remove();
      
      // begin next question
      trivia.nextQuestion();
       
    }
  
  }
  


















