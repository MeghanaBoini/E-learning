import express from "express";
import { createQuiz } from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/", createQuiz); // POST /api/v1/quiz

export default router;
