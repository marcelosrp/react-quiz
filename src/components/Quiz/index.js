import React, { useState, useEffect } from "react";

import QuizOptions from "./options";
import QuizResult from "./result";
import data from "../../data/data.json";

const Quiz = () => {
  const [totalQuestions] = useState(data.questions.length);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(null);
  const [selectedAnswersData, setSelectedAnswersData] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [disabled, setDisabled] = useState(true);

  function handleSelectOption({ target }) {
    const value = target.value;
    setScore(Number(value));
    setDisabled(false);
  }

  function handleLoadNextQuestion() {
    const selectedOption = document.querySelector(
      'input[type="radio"]:checked'
    );
    if (!selectedOption) {
      alert("Please select your answer!");
      return;
    }
    setSelectedAnswersData([...selectedAnswersData, score]);
    setCurrentQuestion((prev) => prev + 1);
    selectedOption.checked = false;
    setDisabled(true);
    if (currentQuestion + 1 === totalQuestions) {
      setShowResult(true);
      setCurrentQuestion(0);
    }
  }

  function handleLoadPrevQuestion() {
    setCurrentQuestion((prev) => prev - 1);
    setSelectedAnswersData(selectedAnswersData.slice(0, -1));
  }

  function handleReloadQuiz() {
    setSelectedAnswersData([]);
    setScore(null);
    setShowResult(false);
  }

  useEffect(() => {
    setTotalScore(selectedAnswersData.reduce((a, b) => a + b, 0));
  }, [currentQuestion, selectedAnswersData]);

  return (
    <>
      {!showResult && (
        <div className="container-perguntas">
          <h1>{data.title}</h1>
          <h2>{data.description}</h2>
          <br />
          <br />
          <span>
            Pergunta {currentQuestion + 1} de {totalQuestions}
          </span>
          <br />
          <br />
          <h3>{data.questions[currentQuestion].title}</h3>
          <ul>
            {data.questions[currentQuestion].alternatives.map(
              (alternative, index) => (
                <li key={index}>
                  <QuizOptions
                    id={`pergunta${index}`}
                    alternatives={alternative.title}
                    weight={alternative.weight}
                    handleSelectOption={handleSelectOption}
                  />
                </li>
              )
            )}
          </ul>
          {currentQuestion + 1 > 1 && (
            <button type="button" onClick={handleLoadPrevQuestion}>
              Anterior
            </button>
          )}
          <button
            type="button"
            onClick={handleLoadNextQuestion}
            disabled={disabled}
          >
            {currentQuestion === totalQuestions - 1
              ? "Ver Resultado"
              : "Próxima"}
          </button>
        </div>
      )}

      {showResult && (
        <QuizResult
          pontuacao={totalScore}
          handleReloadQuiz={handleReloadQuiz}
        />
      )}
    </>
  );
};

export default Quiz;
