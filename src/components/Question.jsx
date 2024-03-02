import React, { useState } from 'react';
import QUESTIONS from '../../questions';
import Answers from './Answers';
import Timer from './Timer';

const Question = ({ index, onSelectAnswer, onSkipAnswer }) => {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    let timer = 60000;
    if (answer.selectedAnswer) { // if i have a selected answer, i reduce time to reveal immediately the correct answer 
        timer = 1000;
    } else if (answer.isCorrect != null) { // if i know whether the answer is correct or not, i update the timer milliseconds because that's the time it'll take until i move to the next question
        timer = 2000;
    }

    function selectAnswerHandler(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        });

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            });

            setTimeout(() => onSelectAnswer(answer), 2000);

        }, 1000);
    }

    let answerState = '';
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }

    return (
        <div id="question">
            <Timer
                key={timer}
                timeout={timer}
                onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
                mode={answerState}
            />
            <h2>{QUESTIONS[index].text}</h2>
            <Answers
                answers={QUESTIONS[index].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={selectAnswerHandler}
            />
        </div>
    )
}

export default Question