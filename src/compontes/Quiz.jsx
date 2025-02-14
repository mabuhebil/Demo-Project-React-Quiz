
import { useCallback, useState } from "react"
import QUESTIONS from '../questions'

import quizCompleteImg from '../assets/quiz-complete.png'
import Question from "./Question"


export default function Quiz(){
  
 const [UserAnswers , setUserAnswers]=useState([])



    const activeQuestionIndex =  UserAnswers.length ;
    const quizIsComplete= activeQuestionIndex === QUESTIONS.length
    
    const handelSelectAnswer = useCallback( 
        function handelSelectAnswer(selectedAnswer){
            setUserAnswers( prev => {
                return [...prev , selectedAnswer]
            })

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

   


 return(
        <div id="quiz">
           <Question
           key={activeQuestionIndex}
           index={activeQuestionIndex}
           onSelectAnswer={handelSelectAnswer}
           onSkipAnswer={handelSkipAnswer}
           />
        </div>
  )
}