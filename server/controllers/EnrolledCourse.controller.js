// import { Course } from "../models/course.model.js";
// import { CourseEnrolled } from "../models/EnrollCourse.model.js";
// import { Lecture } from "../models/lecture.model.js";
// import { User } from "../models/user.model.js";

// export const createCheckoutSession = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { courseId } = req.body;

//     const course = await Course.findById(courseId);
//     if (!course) return res.status(404).json({ message: "Course not found!" });

//     // Create a new course purchase record
//     const newEnroll= new CourseEnrolled({
//       courseId,
//       userId,
//       status: "notEnrolled",
//     });
    

    
//     await newEnroll.save();

//     return res.status(200).json({
//         success:true,
//     })
// } catch (error) {
//     console.log(error);
//   }

// };

// export const getCourseDetailWithPurchaseStatus = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const userId = req.id;

//     const course = await Course.findById(courseId)
//       .populate({ path: "creator" })
//       .populate({ path: "lectures" });

//     const enrolled = await CourseEnrolled.findOne({ userId, courseId });
//     console.log(enrolled);

//     if (!course) {
//       return res.status(404).json({ message: "course not found!" });
//     }

//     return res.status(200).json({
//       course
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getAllPurchasedCourse = async (_, res) => {
//   try {
//     const enrolledCourse = await CourseEnrolled.find({
//       status: "completed",
//     }).populate("courseId");
//     if (!enrolledCourse) {
//       return res.status(404).json({
//         enrolledCourse: [],
//       });
//     }
//     return res.status(200).json({
//         enrolledCourse,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };



import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import { Lecture } from "../models/lecture.model.js";
import { CourseEnrolled } from "../models/EnrollCourse.model.js";

export const enrollInCourse = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    // Check if the user is already enrolled
    let enrollment = await CourseEnrolled.findOne({ userId, courseId });
    if (!enrollment) {
      enrollment = new CourseEnrolled({ userId, courseId, status: "Enrolled" });
      await enrollment.save();
    } else {
      enrollment.status = "Enrolled";
      await enrollment.save();
    }

    // Update user's enrolledCourses
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { enrolledCourses: courseId } },
      { new: true }
    );

    // Update course to add user ID to enrolledStudents
    await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { enrolledStudents: userId } },
      { new: true }
    );

    // Make all lectures available by setting `isPreviewFree` to true
    if (course.lectures.length > 0) {
      await Lecture.updateMany(
        { _id: { $in: course.lectures } },
        { $set: { isPreviewFree: true } }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Successfully enrolled in the course.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCourseDetailWithEnrollmentStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const enrollment = await CourseEnrolled.findOne({ userId, courseId });

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    return res.status(200).json({
      course,
      enrolled: enrollment?.status === "Enrolled", // true if enrolled, false otherwise
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllEnrolledCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const enrollments = await CourseEnrolled.find({ userId, status: "Enrolled" }).populate("courseId");

    const enrolledCourses = enrollments.map(enrollment => enrollment.courseId);

    return res.status(200).json({ enrolledCourses });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
