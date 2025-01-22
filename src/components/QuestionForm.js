import React, { useState } from 'react';

const QuestionForm = ({ onAddQuestion }) => {
  const [prompt, setPrompt] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newQuestion = {
      prompt,
      answers,
      correctIndex,
    };

    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((data) => onAddQuestion(data)) // Add new question to the state in App.js
      .catch((error) => console.error('Error adding question:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter the question prompt"
        required
      />
      <div>
        {answers.map((answer, index) => (
          <input
            key={index}
            type="text"
            value={answer}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[index] = e.target.value;
              setAnswers(newAnswers);
            }}
            placeholder={`Answer ${index + 1}`}
            required
          />
        ))}
      </div>
      <select
        value={correctIndex}
        onChange={(e) => setCorrectIndex(Number(e.target.value))}
      >
        {answers.map((_, index) => (
          <option key={index} value={index}>
            Correct Answer: {index + 1}
          </option>
        ))}
      </select>
      <button type="submit">Add Question</button>
    </form>
  );
};

export default QuestionForm;
