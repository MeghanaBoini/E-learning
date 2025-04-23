import { useEffect, useState } from "react";

const QuizList = ({ courseId }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/quiz/quizzes/${courseId}`, {
          method: "GET",
          credentials: "include", // To send cookies (JWT token)
        });

        const data = await response.json();
        if (data.success) {
          setQuizzes(data.quizzes);
        } else {
          console.error("Failed to load quizzes:", data.message);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [courseId]);

  return (
    <div>
      <h2>Quizzes</h2>
      {loading ? (
        <p>Loading...</p>
      ) : quizzes.length === 0 ? (
        <p>No quizzes found for this course.</p>
      ) : (
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz._id}>{quiz.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizList;
