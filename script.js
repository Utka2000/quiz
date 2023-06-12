const questions=[
    {
        question:"What Does HTML stands for?",
        answers:[
            {text:"Hypertext Pre-Processor",correct:false},
            {text:"Hypertext Markup Language",correct:true},
            {text:"Hypertext Multiple Language",correct:false},
            {text:"Hypertext Multi Language",correct:false},
        ]
    },
    {
        question:"What Does CSS stands for?",
        answers:[
            {text:"Cascading-system sheet",correct:false},
            {text:"Cascading-style system",correct:false},
            {text:"Cascading-style sheet",correct:true},
            {text:"Cascading-standard sheet",correct:false},
        ]
    },
    {
        question:"HTML is the standard ____language for creating Web pages.",
        answers:[
            {text:"scripting",correct:false},
            {text:"programming",correct:false},
            {text:"styling",correct:false},
            {text:"markup",correct:true},
        ]
    },
    {
        question:" Which element/tag defines a paragraph?",
        answers:[
            {text:"p tag",correct:true},
            {text:"pre tag",correct:false},
            {text:"panel tag",correct:false},
            {text:"None of the above",correct:false},
        ]
    }
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");


var count = 15;
var interval = setInterval(function(){
  document.getElementById('count').innerHTML=count;
  count--;
  if (count === 0){
    showScore();
    clearInterval(interval);
    document.getElementById('count').innerHTML="00";
    // or...
    alert("You're out of time!");
    if(showQuestion==true)
    {
        setInterval(interval)
    }
  }
}, 1000);


let currentQuestionIndex=0;
let score= 0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next Que";
    showQuestion();
  
}
 

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

currentQuestion.answers.forEach(answer => {
    const button=document.createElement("button");
    button.innerHTML=answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct) {
        button.dataset.correct=answer.correct;
    }
    button.addEventListener("click",selectAnswer);
});
}

function resetState(){
    nextButton.style.display='none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
   Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
        
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    
    questionElement.innerHTML=`You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";

}
function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
       
    }
})
startQuiz();