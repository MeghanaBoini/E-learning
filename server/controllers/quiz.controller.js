import asyncHandler from "express-async-handler";
import Quiz from "../models/quiz.model.js";

export const createQuiz = asyncHandler(async (req, res) => {
  const { courseId, quizName, questions } = req.body;

  if (!courseId || !quizName || !questions || questions.length === 0) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const quiz = await Quiz.create({ course: courseId, name: quizName, questions });
  res.status(201).json({ success: true, message: "Quiz created", quiz });
});
