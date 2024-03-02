import React, { useState } from 'react';
import QUESTIONS from '../../questions';
import quizCompleteImg from '../assets/quiz-complete.png';

const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;

    const isQuizComplete = activeQuestionIndex === QUESTIONS.length;

    function selectAnswerHandler(selectedAnswer) {
        console.log(selectedAnswer);
        setUserAnswers(prev => {
            return [...prev, selectedAnswer];
        });
    }

    if (isQuizComplete) {
        return (
            <div id='summary'>
                <img src={quizCompleteImg} alt="Trophy icon" />
                <h2>Quiz completed!</h2>
            </div>
        );
    }

    const suffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    suffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id='quiz'>
            <div id="question">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id='answers'>
                    {suffledAnswers.map(answer => (
                        <li key={answer} className='answer'>
                            <button onClick={() => selectAnswerHandler(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Quiz