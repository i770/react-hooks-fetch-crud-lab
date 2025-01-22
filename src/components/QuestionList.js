import React from 'react';
import QuestionItem from './QuestionItem';

const QuestionList = ({ questions, onDeleteQuestion, onCorrectAnswerChange }) => {
  return (
    <div>
      <h1>Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={onDeleteQuestion}
            onCorrectAnswerChange={onCorrectAnswerChange}
          />
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
