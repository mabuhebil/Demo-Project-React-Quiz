import QuetionTimer from "./QuestionTimer";
import Answers from "./Answers";


export default function Question ({
    questionText,
    answers,
    onSelectAnswer,
    selectedAnswer,
    onSkipAnswer,
    answerState
}){


return(
    
<div id="question">
    <QuetionTimer
     timeout={10000} 
     onTimeOut={onSkipAnswer}/>
    <h2>{questionText}</h2>

    <Answers 
    answers={answers}
    selectedAnswers={selectedAnswer}
    answerState={answerState}
    onSelect={onSelectAnswer}
    />
 </div>

)




}