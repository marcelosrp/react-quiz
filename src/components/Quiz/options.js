import React from "react";
import PropTypes from "prop-types";

const QuizOptions = ({ question, value, dataTotal, handleSelectOption }) => (
  <label htmlFor={question}>
    <input
      type="radio"
      name="option"
      id={question}
      value={value}
      data-total={dataTotal}
      onChange={handleSelectOption}
    />
    {question}
  </label>
);

QuizOptions.propTypes = {
  question: PropTypes.string,
  value: PropTypes.number,
  dataTotal: PropTypes.string,
  handleSelectOption: PropTypes.func,
};

export default QuizOptions;
