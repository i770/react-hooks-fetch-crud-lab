import React from 'react';

const QuestionItem = ({ question, onDelete, onCorrectAnswerChange }) => {
  return (
    <li>
      <span>{question.prompt}</span>
      <select
        value={question.correctIndex}
        onChange={(e) => onCorrectAnswerChange(question.id, Number(e.target.value))}
      >
        {question.answers.map((_, index) => (
          <option key={index} value={index}>
            Correct Answer: {index + 1}
          </option>
        ))}
      </select>
      <button onClick={() => onDelete(question.id)}>Delete</button>
    </li>
  );
};

export default QuestionItem;
