import React, { useState } from "react";
import "./Quiz.css"
import { data } from "../../assets/data"
import { useRef } from "react";

const Quiz = () => {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [choose, setChoose] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let option_array = [option1, option2, option3, option4];
    

    const validateAnswer = (item, answer) => {
        if(choose === false) {
            if (question.ans === answer) {
                item.target.classList.add("correct");
                setChoose(true);
                setScore(prev => prev + 1)
            } else {
                item.target.classList.add("wrong");
                setChoose(true);
                option_array[question.ans - 1].current.classList.add("correct");
            }
        }
    }

    const nextQuestion = () => {
        if(choose === true) {
            if(index === data.length - 1) {
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setChoose(false);
            option_array.map((option) =>  {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }

    const resetQuiz = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setChoose(false);
        setResult(false);
    }

    return (
        <div className="container">
            <h1>Quiz App</h1>
            <hr />
            {result? <></> : 
            <>
                <h2>{index + 1}. {question.question}</h2>
            <ul>
                <li ref={option1} onClick={(e) => { validateAnswer(e, 1) }}>{question.option1}</li>
                <li ref={option2} onClick={(e) => { validateAnswer(e, 2) }}>{question.option2}</li>
                <li ref={option3} onClick={(e) => { validateAnswer(e, 3) }}>{question.option3}</li>
                <li ref={option4} onClick={(e) => { validateAnswer(e, 4) }}>{question.option4}</li>
            </ul>
            <button onClick={nextQuestion}>Next</button>
            <div className="index">{index + 1} of {data.length} questions</div>            
            </> }
            {result? <>
                <h2>You Scored {score} out of {data.length}</h2>
            <button onClick={resetQuiz}>Reset</button>
            </> : <></>}
            
            
        </div>
    )
}

export default Quiz;