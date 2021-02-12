import React from "react";
import PropTypes from "prop-types";

const QuizOptions = ({ id, alternatives, weight, handleSelectOption }) => {
  return (
    <label htmlFor={id}>
      <input
        type="radio"
        name="option"
        id={id}
        value={weight}
        onChange={handleSelectOption}
      />
      {alternatives}
    </label>
  );
};

QuizOptions.propTypes = {
  id: PropTypes.string.isRequired,
  alternatives: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  handleSelectOption: PropTypes.func.isRequired,
};

export default QuizOptions;
