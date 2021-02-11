import React, { useState, useEffect } from "react";

import QuizOptions from "./options";
import QuizResult from "./result";
import data from "../../data/questions.json";

const Quiz = () => {
  const [totalQuestions] = useState(data.length);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [question, setQuestion] = useState({});
  const [score, setScore] = useState(null);
  const [selectedAnswersData, setSelectedAnswersData] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setQuestion(data[currentQuestion]);
    setTotalScore(selectedAnswersData.reduce((a, b) => a + b, 0));
  }, [currentQuestion, selectedAnswersData]);

  function handleSelectOption({ target }) {
    const attr = target.getAttribute("data-total");
    setScore(Number(attr));
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

  return (
    <>
      {!showResult && (
        <div className="container-perguntas">
          <span>
            Pergunta {currentQuestion + 1} de {totalQuestions}
          </span>
          <h1>{question.question}</h1>
          <ul>
            <li>
              <QuizOptions
                question={question.answer1}
                value={1}
                dataTotal={question.answer1Total}
                handleSelectOption={handleSelectOption}
              />
            </li>
            <li>
              <QuizOptions
                question={question.answer2}
                value={2}
                dataTotal={question.answer2Total}
                handleSelectOption={handleSelectOption}
              />
            </li>
            <li>
              <QuizOptions
                question={question.answer3}
                value={3}
                dataTotal={question.answer3Total}
                handleSelectOption={handleSelectOption}
              />
            </li>
          </ul>
          {currentQuestion + 1 > 1 && (
            <button type="button" onClick={handleLoadPrevQuestion}>
              Anterior
            </button>
          )}
          <button type="button" onClick={handleLoadNextQuestion}>
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
