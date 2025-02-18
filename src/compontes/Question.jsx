import QuetionTimer from "./QuestionTimer";
import Answers from "./Answers";
import { useState } from "react";
import  QUESTIONS from "../questions";


export default function Question ({
    index,
    onSelectAnswer,
    onSkipAnswer,
}){

    const [answer , setAnswer] = useState({
        selectedAnswer:'',
        isCorrect:null
    })

    let timer=10000;
    if(answer.selectedAnswer){
        timer =1000;
    }
    if(answer.isCorrect !=null){
        timer = 2000;
    }
    function handelSelectAnswer(answer){
        setAnswer({
            selectedAnswer:answer,
            isCorrect:null
        })

        setTimeout(() => {
           setAnswer({
            selectedAnswer: answer,
            isCorrect:QUESTIONS[index].answers[0] ===answer
           }) 

           setTimeout(() => {
            onSelectAnswer(answer)
           }, 2000);
        }, 1000);
    }

    let answerState = '' ;
    if(answer.selectedAnswer && answer.isCorrect !== null){
        answerState =answer.isCorrect? 'correct' : 'wrong'
    }else if(answer.selectedAnswer){
        answerState ='answered'
    }

return(
    
<div id="question">
    <QuetionTimer
     key={timer}
     timeout={timer} 
     mode={answerState}
     onTimeOut={answer.selectedAnswer ===''? onSkipAnswer: null}/>
    <h2>{QUESTIONS[index].text}</h2>

    <Answers 
    answers={QUESTIONS[index].answers}
    selectedAnswers={answer.selectedAnswer}
    answerState={answerState}
    onSelect={handelSelectAnswer}
    />
 </div>

)




}