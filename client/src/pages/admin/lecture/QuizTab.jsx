import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetQuizQuery, useUpdateQuizMutation } from "@/features/api/quizApi"; // Assuming useGetQuizQuery and useUpdateQuizMutation are available
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const QuizTab = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const params = useParams();
  const { lectureId, quizId } = params; // Assuming quizId is passed in the URL

  // Fetch quiz data from backend
  const { data: quizData, error: fetchError, isLoading } = useGetQuizQuery(quizId);

  const [updateQuiz, { isUpdating, updateError, isUpdated }] = useUpdateQuizMutation();

  // If quiz data is fetched, populate the state with it
  useEffect(() => {
    if (quizData) {
      setQuestion(quizData.question);
      setOptions(quizData.options);
      setCorrectAnswer(quizData.correctAnswer);
    }
  }, [quizData]);

  const handleOptionChange = (e, index) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const handleSubmitQuiz = async () => {
    if (!question || options.includes("") || correctAnswer === null) {
      toast.error("Please fill out all fields correctly.");
      return;
    }

    const hasDuplicateOptions = new Set(options).size !== options.length;
    if (hasDuplicateOptions) {
      toast.error("Options must be unique.");
      return;
    }

    await updateQuiz({
      quizId,
      lectureId,
      question,
      options,
      correctAnswer,
    });
  };

  const handleCorrectAnswerChange = (index) => {
    setCorrectAnswer(index);
  };

  useEffect(() => {
    if (isUpdated) {
      toast.success("Quiz updated successfully!");
    }
    if (updateError) {
      toast.error(updateError?.data?.message || "Failed to update quiz.");
    }
    if (fetchError) {
      toast.error(fetchError?.data?.message || "Failed to fetch quiz.");
    }
  }, [isUpdated, updateError, fetchError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Edit Quiz</h2>
      <div className="space-y-4">
        <div>
          <Label>Question</Label>
          <Input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter quiz question"
            className={question ? "" : "border-red-500"} // Highlight if empty
          />
        </div>
        {options.map((option, index) => (
          <div key={index}>
            <Label>Option {index + 1}</Label>
            <Input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(e, index)}
              placeholder={`Option ${index + 1}`}
              className={option ? "" : "border-red-500"} // Highlight if empty
            />
            <div>
              <input
                type="radio"
                id={`correctOption${index}`}
                checked={correctAnswer === index}
                onChange={() => handleCorrectAnswerChange(index)}
              />
              <label htmlFor={`correctOption${index}`} className="ml-2">
                Correct Answer
              </label>
            </div>
          </div>
        ))}
        <Button disabled={isUpdating} onClick={handleSubmitQuiz}>
          {isUpdating ? "Saving..." : "Update Quiz"}
        </Button>
      </div>
    </div>
  );
};

export default QuizTab;
