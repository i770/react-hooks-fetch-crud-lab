import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';

const App = () => {
  const [questions, setQuestions] = useState([]);

  // Fetch questions from the API on component mount
  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching questions:', error));
  }, []); // Runs only once, when the component is mounted

  const handleAddQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== id)
        );
      })
      .catch((error) => console.error('Error deleting question:', error));
  };

  const handleCorrectAnswerChange = (id, newCorrectIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then(() => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === id ? { ...question, correctIndex: newCorrectIndex } : question
          )
        );
      })
      .catch((error) => console.error('Error updating correct answer:', error));
  };

  return (
    <div>
      <AdminNavbar />
      <QuestionForm onAddQuestion={handleAddQuestion} />
      <QuestionList
        questions={questions}
        onDeleteQuestion={handleDeleteQuestion}
        onCorrectAnswerChange={handleCorrectAnswerChange}
      />
    </div>
  );
};

export default App;
