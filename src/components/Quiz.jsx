import React, { useCallback, useState } from 'react';
import QUESTIONS from '../../questions';
import Question from './Question';
import Summary from './Summary';

const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;
    const isQuizComplete = activeQuestionIndex === QUESTIONS.length;

    const selectAnswerHandler = useCallback(
        function selectAnswerHandler(selectedAnswer) {
            setUserAnswers(prev => {
                return [...prev, selectedAnswer];
            });
        }, []);

    const skipAnswerHandler = useCallback(() => selectAnswerHandler(null), [selectAnswerHandler]);

    if (isQuizComplete) {
        return <Summary
            userAnswers={userAnswers}
        />
    }

    return (
        <div id='quiz'>
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex} // recreates timer when we switch to a new question
                onSelectAnswer={selectAnswerHandler}
                onSkipAnswer={skipAnswerHandler}
            />
        </div>
    )
}

export default Quiz