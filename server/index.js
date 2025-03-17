// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import connectDB from "./database/db.js";
// import userRoute from "./routes/user.route.js";
// import courseRoute from "./routes/course.route.js";
// import mediaRoute from "./routes/media.route.js";
// //import enrolledRoute from "./routes/EnrollCourse.route.js";
// import courseProgressRoute from "./routes/courseProgress.route.js";

// dotenv.config({});

// // call database connection here
// connectDB();
// const app = express();

// const PORT = process.env.PORT || 3000;

// // default middleware
// app.use(express.json());
// app.use(cookieParser());

// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }));
 
// // apis
// app.use("/api/v1/media", mediaRoute);
// app.use("/api/v1/user", userRoute);
// // app.get("/home",(_,res)=>{
// //     res.status(200).json({
// //         success:true,
// //         message:"Hello  I am coming from backend"
// //     })
// // })
// app.use("/api/v1/course", courseRoute);
// //app.use("/api/v1/enroll",enrolledRoute);
// app.use("/api/v1/progress", courseProgressRoute);
 
 
// app.listen(PORT, () => {
//     console.log(`Server listen at port ${PORT}`);
// })


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


dotenv.config({});

connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/enroll", enrolledRoute);
app.use("/api/v1/progress", courseProgressRoute);

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});

