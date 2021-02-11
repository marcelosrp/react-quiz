import React from "react";
import PropTypes from "prop-types";

const QuizResult = ({ pontuacao, handleReloadQuiz }) => {
  return (
    <div>
      <h1>Pontuação total: {pontuacao}</h1>

      {pontuacao === 5 && (
        <div>
          <p>5 - Are You Even Real</p>
        </div>
      )}

      {pontuacao >= 5 && pontuacao <= 10 && (
        <div>
          <p>5 - 10 - Meh</p>
        </div>
      )}

      {pontuacao >= 11 && pontuacao <= 15 && (
        <div>
          <p>10 - 15 - Good Soul</p>
        </div>
      )}

      {pontuacao >= 16 && pontuacao <= 20 && (
        <div>
          <p>15 - 21- You Need Help</p>
        </div>
      )}

      <button type="button" onClick={handleReloadQuiz}>
        Refazer quiz
      </button>
    </div>
  );
};

QuizResult.propTypes = {
  pontuacao: PropTypes.number.isRequired,
  handleReloadQuiz: PropTypes.func.isRequired,
};

export default QuizResult;
