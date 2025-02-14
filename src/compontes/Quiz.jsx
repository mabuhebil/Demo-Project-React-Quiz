
import { useCallback, useState } from "react"
import QUESTIONS from '../questions'

import quizCompleteImg from '../assets/quiz-complete.png'
import QuetionTimer from "./QuestionTimer";

export default function Quiz(){

 const [answerState , setAnswerState] = useState('')    
 const [UserAnswers , setUserAnswers]=useState([])

    const activeQuestionIndex = answerState ==='' ? UserAnswers.length : UserAnswers.length -1;
    const quizIsComplete= activeQuestionIndex === QUESTIONS.length
    
    const handelSelectAnswer = useCallback( 
        function handelSelectAnswer(selectedAnswer){
            setAnswerState('answered')
            setUserAnswers( prev => {
                return [...prev , selectedAnswer]
            })

            setTimeout(() => {
                if(selectedAnswer ===   QUESTIONS[activeQuestionIndex].answers[0]){
                    setAnswerState('correct')
                }else{
                    setAnswerState('wrong')
                }
                setTimeout(() => {
                  setAnswerState('')  
                }, 2000);
            }, 1000);
        },[activeQuestionIndex]) 

    const handelSkipAnswer = useCallback(
        () => handelSelectAnswer(null),
    [handelSelectAnswer]) 

    if(quizIsComplete){
        return(
            <div id="summary">
                <img src={quizCompleteImg}/>
                <h2>Quiz Completed</h2>
            </div>
        )
    }


    const shuffledAnswers =[...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(()=>Math.random() -0.5)



 return(
        <div id="quiz">


            <div id="question">
                <QuetionTimer
                 key={activeQuestionIndex} 
                 timeout={10000} 
                 onTimeOut={handelSkipAnswer}/>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
            <ul id="answers">
                {QUESTIONS[activeQuestionIndex].answers.map((answer) =>{

                    const isSelected=UserAnswers[UserAnswers.length -1] ===answer
                    let cssClasses=''

                    if(answerState ==='answered' && isSelected){
                        cssClasses='selected'
                    }
                    
                    if((answerState ==='correct' || answerState ==='wrong') && isSelected){
                        cssClasses=answerState
                    }
                return (
                    <li key={answer} className="answer">
                        <button className={cssClasses} onClick={() => handelSelectAnswer(answer)}>{answer}</button>
                    </li>)
                })}
            </ul>
            </div>
        </div>
  )
}