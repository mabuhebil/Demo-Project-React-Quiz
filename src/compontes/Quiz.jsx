
import { useState } from "react"
import QUESTIONS from '../questions'

import quizCompleteImg from '../assets/quiz-complete.png'
import QuetionTimer from "./QuestionTimer";

export default function Quiz(){
    
 const [UserAnswers , setUserAnswers]=useState([])

    const activeQuestionIndex = UserAnswers.length ;
    const quizIsComplete= activeQuestionIndex === QUESTIONS.length
    
    function handelSelectAnswer(selectedAnswer){
        setUserAnswers( prev => {
            return [...prev , selectedAnswer]
        })
    }

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
                 timeout={10000} 
                 onTimeOut={() => handelSelectAnswer(null)}/>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
            <ul id="answers">
                {QUESTIONS[activeQuestionIndex].answers.map(answer =>(
                    <li key={answer} className="answer">
                        <button onClick={() => handelSelectAnswer(answer)}>{answer}</button>
                    </li>
                ))}
            </ul>
            </div>
        </div>
  )
}