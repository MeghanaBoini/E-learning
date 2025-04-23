import React, { useState } from 'react';
import './QuizPage.css';

const QuizPage = () => {
  // Computer Science Engineering Quiz Data
  const quizData = [
    {
      id: 1,
      question: "Which data structure uses FIFO (First In First Out) principle?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      correctAnswer: "Queue"
    },
    {
      id: 2,
      question: "What is the time complexity of binary search in a sorted array?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      correctAnswer: "O(log n)"
    },
    {
      id: 3,
      question: "Which of these is NOT a programming paradigm?",
      options: ["Object-oriented", "Functional", "Procedural", "Circular"],
      correctAnswer: "Circular"
    },
    {
      id: 4,
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Simple Query Language",
        "System Query Language",
        "Standard Query Language"
      ],
      correctAnswer: "Structured Query Language"
    },
    {
      id: 5,
      question: "Which protocol is used to securely transfer web pages?",
      options: ["HTTP", "FTP", "HTTPS", "SMTP"],
      correctAnswer: "HTTPS"
    },
    {
      id: 6,
      question: "What is the main purpose of an operating system?",
      options: [
        "To make the most efficient use of computer hardware",
        "To allow people to use the computer",
        "To keep track of files",
        "All of the above"
      ],
      correctAnswer: "All of the above"
    },
    {
      id: 7,
      question: "Which of these is a non-linear data structure?",
      options: ["Array", "Linked List", "Tree", "Stack"],
      correctAnswer: "Tree"
    },
    {
      id: 8,
      question: "What does CPU stand for?",
      options: [
        "Central Processing Unit",
        "Computer Processing Unit",
        "Central Process Unit",
        "Computer Process Unit"
      ],
      correctAnswer: "Central Processing Unit"
    },
    {
      id: 9,
      question: "Which sorting algorithm has the worst-case time complexity of O(n²)?",
      options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"],
      correctAnswer: "Bubble Sort"
    },
    {
      id: 10,
      question: "What is the full form of DNS?",
      options: [
        "Domain Name System",
        "Data Name System",
        "Domain Network System",
        "Data Network Service"
      ],
      correctAnswer: "Domain Name System"
    }
  ];

  // State to track selected answers
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle option selection
  const handleOptionSelect = (questionId, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option
    });
  };

  // Handle quiz submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Calculate score
  const calculateScore = () => {
    let score = 0;
    quizData.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="quiz-container">
      <h1>Computer Science Engineering Quiz</h1>
      <p className="quiz-description">Test your knowledge of fundamental CS concepts with this 10-question quiz.</p>
      
      <form onSubmit={handleSubmit}>
        {quizData.map((question) => (
          <div key={question.id} className="question-card">
            <h3>{question.id}. {question.question}</h3>
            <div className="options-container">
              {question.options.map((option, index) => (
                <div key={index} className="option">
                  <input
                    type="radio"
                    id={`q${question.id}-opt${index}`}
                    name={`question-${question.id}`}
                    checked={selectedAnswers[question.id] === option}
                    onChange={() => handleOptionSelect(question.id, option)}
                    disabled={submitted}
                    required={!submitted}
                  />
                  <label htmlFor={`q${question.id}-opt${index}`}>{option}</label>
                </div>
              ))}
            </div>
            {submitted && (
              <div className="feedback">
                {selectedAnswers[question.id] === question.correctAnswer ? (
                  <span className="correct">✓ Correct!</span>
                ) : (
                  <span className="incorrect">
                    ✗ Incorrect. The correct answer is <strong>{question.correctAnswer}</strong>.
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
        
        {!submitted ? (
          <button type="submit" className="submit-btn">
            Submit Quiz
          </button>
        ) : (
          <div className="results">
            <h2>
              Your Score: {calculateScore()} out of {quizData.length} (
              {Math.round((calculateScore() / quizData.length) * 100)}%)
            </h2>
            <div className="score-message">
              {calculateScore() === quizData.length ? (
                <p className="perfect">Perfect score! 🎉</p>
              ) : calculateScore() >= quizData.length * 0.7 ? (
                <p className="good">Good job! 👍</p>
              ) : (
                <p className="average">Keep practicing! 📚</p>
              )}
            </div>
            <button 
              type="button" 
              className="reset-btn"
              onClick={() => {
                setSelectedAnswers({});
                setSubmitted(false);
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default QuizPage;