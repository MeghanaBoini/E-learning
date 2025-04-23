// // server.js
// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import connectDB from "./database/db.js";
// import userRoute from "./routes/user.route.js";
// import courseRoute from "./routes/course.route.js";
// import mediaRoute from "./routes/media.route.js";
// import enrolledRoute from "./routes/EnrollCourse.route.js";
// import courseProgressRoute from "./routes/courseProgress.route.js";
// import quizRoutes from "./routes/quiz.route.js";
// import askRoute from "./routes/askBot.route.js"; // Import the askBot route

// dotenv.config();
// connectDB();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middlewares
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
// }));
// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use("/api/v1/media", mediaRoute);
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/course", courseRoute);
// app.use("/api/v1/enroll", enrolledRoute);
// app.use("/api/v1/progress", courseProgressRoute);
// app.use("/api/v1/quizzes", quizRoutes);
// app.use("/api/ask-bot", askRoute); // Add the ask bot route

// app.listen(PORT, () => {
//     console.log(`Server listening at port ${PORT}`);
// });


// server.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import enrolledRoute from "./routes/EnrollCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import quizRoutes from "./routes/quiz.route.js";
import askRoute from "./routes/askBot.route.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/enroll", enrolledRoute);
app.use("/api/v1/progress", courseProgressRoute);
app.use("/api/v1/quizzes", quizRoutes);
app.use("/api/ask-bot", askRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});