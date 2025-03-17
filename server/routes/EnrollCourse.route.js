// import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { enrollInCourse, getAllEnrolledCourses, getCourseDetailWithEnrollmentStatus } from "../controllers/EnrolledCourse.controller.js";

// const router = express.Router();

// router.route("/enroll").post(isAuthenticated, enrollInCourse);
// router.route("/course/:courseId/detail-with-status").get(isAuthenticated, getCourseDetailWithEnrollmentStatus);
// router.route("/").get(isAuthenticated, getAllEnrolledCourses);

// export default router;

import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { 
  enrollInCourse, 
  getAllEnrolledCourses, 
  getCourseDetailWithEnrollmentStatus 
} from "../controllers/EnrolledCourse.controller.js";

const router = express.Router();

router.post("/enroll", isAuthenticated, enrollInCourse);
router.get("/course/:courseId/detail-with-status", isAuthenticated, getCourseDetailWithEnrollmentStatus);
router.get("/", isAuthenticated, getAllEnrolledCourses);

export default router;
