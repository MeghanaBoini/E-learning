import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOption: { type: Number, required: true }, // index of the correct option
});

const quizSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  name: { type: String, required: true },
  questions: [questionSchema],
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
