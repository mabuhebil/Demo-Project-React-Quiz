
import { useCallback, useState } from "react"
import QUESTIONS from '../questions'

import quizCompleteImg from '../assets/quiz-complete.png'
import Question from "./Question"


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

   


 return(
        <div id="quiz">
           <Question
           key={activeQuestionIndex}
           questionText={QUESTIONS[activeQuestionIndex].text}
           answers={QUESTIONS[activeQuestionIndex].answers}
           answerState={answerState}
           selectedAnswer={UserAnswers[UserAnswers.length -1]}
           onSelectAnswer={handelSelectAnswer}
           onSkipAnswer={handelSkipAnswer}
           />
        </div>
  )
}