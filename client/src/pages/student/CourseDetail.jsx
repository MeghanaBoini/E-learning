// import BuyCourseButton from "@/components/BuyCourseButton";
// import EnrollCourseButton from "@/components/EnrollCourseButton";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// //import { Separator } from "@/components/ui/separator";
// //import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
// import { BadgeInfo, Import, Lock, PlayCircle } from "lucide-react";
// import React from "react";
// import { useState } from "react";
// import ReactPlayer from "react-player";
// import { useNavigate, useParams } from "react-router-dom";


// const CourseDetail = () => {
//   const params = useParams();
//   const courseId = params.courseId;
//   const navigate = useNavigate();
//   const { data, isLoading, isError } =
//     useGetCourseDetailWithStatusQuery(courseId);

//   if (isLoading) return <h1>Loading...</h1>;
//   if (isError) return <h>Failed to load course details</h>;

//   const { course, purchased } = data;

//   console.log("Course Detail Data:", data);

//   //console.log(purchased);

//   // const handleContinueCourse = () => {
//   //   if(purchased){
//   //     navigate(`/course-progress/${courseId}`)
//   //   }
//   // }

//   return (
//     <div className="space-y-5">
//       <div className="bg-[#2D2F31] text-white">
//         <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
//           <h1 className="font-bold text-2xl md:text-3xl">
//             {course?.courseTitle}
//           </h1>
//           <p className="text-base md:text-lg">Course Sub-title</p>
//           <p>
//             Created By{" "}
//             <span className="text-[#C0C4FC] underline italic">
//               {course?.creator.name}
//             </span>
//           </p>
//           <div className="flex items-center gap-2 text-sm">
//             <BadgeInfo size={16} />
//             <p>Last updated {course?.createdAt.split("T")[0]}</p>
//           </div>
//           <p>Students enrolled: {course?.enrolledStudents.length}</p>
//         </div>
//       </div>
//       <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
//         <div className="w-full lg:w-1/2 space-y-5">
//           <h1 className="font-bold text-xl md:text-2xl">Description</h1>
//           <p
//             className="text-sm"
//             dangerouslySetInnerHTML={{ __html: course.description }}
//           />
//           <Card>
//             <CardHeader>
//               <CardTitle>Course Content</CardTitle>
//               <CardDescription>4 lectures</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {course.lectures.map((lecture, idx) => (
//                 <div key={idx} className="flex items-center gap-3 text-sm">
//                   <span>
//                     {true ? <PlayCircle size={14} /> : <Lock size={14} />}
//                   </span>
//                   <p>{lecture.lectureTitle}</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>
//         <div className="w-full lg:w-1/3">
//           <Card>
//             <CardContent className="p-4 flex flex-col">
//               <div className="w-full aspect-video mb-4">
//                 <ReactPlayer
//                   width="100%"
//                   height={"100%"}
//                   url={course.lectures[0].videoUrl}
//                   controls={true}
//                 />
//               </div>
//               <h1>Lecture title</h1>
//               <Separator className="my-2" />
//               <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
//             </CardContent>
//             <CardFooter className="flex justify-center p-4">
//               {purchased ? (
//                 <Button onClick={handleContinueCourse} className="w-full">Continue Course</Button>
//               ) : (
//                 <BuyCourseButton courseId={courseId} />
//               )}
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;

//import React from "react";
//import { useGetCourseByIdQuery} from "@/features/api/courseApi";
//import {useGetCourseDetailWithEnrollmentStatusQuery} from "@/features/api/EnrollApi";



// const CourseDetail = () => {

//   const params = useParams();
//   const navigate = useNavigate();
//   const courseId = params.courseId;

//   const { data, isLoading, isError } = useGetCourseByIdQuery(courseId);

//   if (isLoading) return <h1>Loading...</h1>;
//   if (isError) return <h1>Failed to load course details</h1>;

//   const { course, enrolled } = data;
//   const handleContinueCourse = () => {
//     if(purchased){
//       navigate(`/course-progress/${courseId}`)
//     }
//   }

// console.log("course object:",data);


//   //const params = useParams();
  


//   // const enrolled=false;
//   // const params = useParams();
//   // const courseId = params.courseId;
//   // const { data, isLoading, isError } =useGetCourseByIdQuery(courseId);
//   //   if (isLoading) return <h1>Loading...</h1>;
//   //   if (isError) return <h>Failed to load course details</h>;

//   // const { course, purchased } = data;


  
//   return (
//     <div className="space-y-5">
//       <div className="bg-[#2D2F31] text-white">
//         <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
//           <h1 className="font-bold text-2xl md:text-3xl">
//             {course?.courseTitle}
//           </h1>
//           <p className="text-base md:text-lg">Course Sub-title: <span>{course?.subTitle}</span></p>
         
         
//           <p>
//             Created By{" "}
//             <span className="text-[#C0C4FC] underline italic">
//               {course.creator?.name}
//             </span>
//           </p>
//           <div className="flex items-center gap-2 text-sm">
//             <BadgeInfo size={16} />
//             <p>Last updated {course?.updatedAt.split("T")[0]}</p>
//           </div>
//           <p>Students enrolled: {course?.enrolledStudents.length}</p>

//         </div>
//       </div>
//       <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
//         <div className="w-full lg:w-1/2 space-y-5">
//           <h1 className="font-bold text-xl md:text-2xl">Description</h1>
//           <p
//             className="text-sm"
//             dangerouslySetInnerHTML={{ __html: course.description }}
//           />
//           <Card>
//             <CardHeader>
//               <CardTitle>Course Content</CardTitle>
//               <CardDescription>{course.lectures.length}</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {course.lectures.map((lecture, idx) => (
//                 <div key={idx} className="flex items-center gap-3 text-sm">
//                   <span>
//                     {true ? <PlayCircle size={14} /> : <Lock size={14} />}
//                   </span>
//                   <p>{lecture.lectureTitle}</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>
//         <div className="w-full lg:w-1/3">
//           <Card>
//             <CardContent className="p-4 flex flex-col">
//               <div className="w-full aspect-video mb-4">
//                 <ReactPlayer
//                   width="100%"
//                   height={"100%"}
//                   url={course.lectures[0].videoUrl}
//                   controls={true}
//                 />
//               </div>
//               <h1>Lecture title</h1>
//               <Separator className="my-2" />
//               <h1 className="text-lg md:text-xl font-semibold">Free</h1>
//             </CardContent>
//             <CardFooter className="flex justify-center p-4">
//             {/* <Button onClick={'#'} className="w-full">Enroll Now</Button> */}
//             {
//               enrolled?(
//                 <Button  onClick={handleContinueCourse}  className="w-full">Continue Course</Button>
                
//               ):(
//                 //  <Button className="w-full">Enroll Now</Button>
//                 <EnrollCourseButton courseId={courseId}/>
//               )
//             }
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;



















// const CourseDetail = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();

//   const { data, isLoading, isError } = useGetCourseByIdQuery(courseId);

//   if (isLoading) return <h1 className="text-center text-lg">Loading...</h1>;
//   if (isError) return <h1 className="text-red-500 text-center">Failed to load course details</h1>;

//   if (!data || !data.course) return <h1 className="text-center text-gray-500">No course data available.</h1>;

//   const { course, enrolled } = data;
//   const instructorName = course?.creator?.name || "Unknown Instructor";
//   const enrolledCount = course?.enrolledStudents?.length || 0;
  
//   const handleContinueCourse = () => {
//     if (enrolled) {
//       navigate(`/course-progress/${courseId}`);
//     }
//   };

//   return (
//     <div className="space-y-5">
//       <div className="bg-[#2D2F31] text-white">
//         <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
//           <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
//           <p className="text-base md:text-lg">
//             <strong>Course Sub-title:</strong> <span>{course?.subTitle}</span>
//           </p>
//           <p>
//             <strong>Created By:</strong>{" "}
//             <span className="text-[#C0C4FC] underline italic">{course?.creator.name}</span>
//           </p>
//           <div className="flex items-center gap-2 text-sm">
//             <BadgeInfo size={16} />
//             <p>Last updated {course?.updatedAt?.split("T")[0] || "N/A"}</p>
//           </div>
//           <p><strong>Students enrolled:</strong> {enrolledCount}</p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
//         <div className="w-full lg:w-1/2 space-y-5">
//           <h1 className="font-bold text-xl md:text-2xl">Description</h1>
//           <p className="text-sm" dangerouslySetInnerHTML={{ __html: course?.description || "" }} />

//           <Card>
//             <CardHeader>
//               <CardTitle>Course Content</CardTitle>
//               <CardDescription>{course?.lectures?.length || 0} lectures</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {course?.lectures?.map((lecture, idx) => (
//                 <div key={idx} className="flex items-center gap-3 text-sm">
//                   <span>{enrolled ? <PlayCircle size={14} /> : <Lock size={14} />}</span>
//                   <p>{lecture?.lectureTitle}</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>

//         <div className="w-full lg:w-1/3">
//           <Card>
//             <CardContent className="p-4 flex flex-col">
//               <div className="w-full aspect-video mb-4">
//                 <ReactPlayer
//                   width="100%"
//                   height="100%"
//                   url={course?.lectures?.[0]?.videoUrl || ""}
//                   controls={true}
//                 />
//               </div>
//               <h1 className="text-lg md:text-xl font-semibold">Free</h1>
//             </CardContent>

//             <CardFooter className="flex justify-center p-4">
//               {enrolled ? (
//                 <Button onClick={handleContinueCourse} className="w-full">
//                   Continue Course
//                 </Button>
//               ) : (
//                 <EnrollCourseButton courseId={courseId} />
//               )}
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };










// const CourseDetail = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();

//   const { data, isLoading, isError, refetch } = useGetCourseByIdQuery(courseId);
//   const [isEnrolled, setIsEnrolled] = useState(false); // Local state to update instantly

//   if (isLoading) return <h1 className="text-center text-lg">Loading...</h1>;
//   if (isError) return <h1 className="text-red-500 text-center">Failed to load course details</h1>;
//   if (!data || !data.course) return <h1 className="text-center text-gray-500">No course data available.</h1>;

//   const { course, enrolled } = data;
//   const instructorName = course?.creator?.name || "Unknown Instructor";
//   const enrolledCount = course?.enrolledStudents?.length || 0;
  
//   // Update local state after enrolling
//   const handleEnrollSuccess = () => {
//     setIsEnrolled(true); // Mark as enrolled locally
//     refetch(); // Fetch updated course data from API
//   };

//   const handleContinueLearning = () => {
//     navigate(`/course-progress/${courseId}`);
//   };

//   const showVideo = enrolled || isEnrolled;
//   const videoUrl = course?.lectures?.[0]?.videoUrl || "";

//   return (
//     <div className="space-y-5">
//       <div className="bg-[#2D2F31] text-white">
//         <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
//           <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
//           <p className="text-base md:text-lg">
//             <strong>Course Sub-title:</strong> <span>{course?.subTitle}</span>
//           </p>
//           <p>
//             <strong>Created By:</strong>{" "}
//             <span className="text-[#C0C4FC] underline italic">{instructorName}</span>
//           </p>
//           <div className="flex items-center gap-2 text-sm">
//             <BadgeInfo size={16} />
//             <p>Last updated {course?.updatedAt?.split("T")[0] || "N/A"}</p>
//           </div>
//           <p><strong>Students enrolled:</strong> {enrolledCount}</p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
//         <div className="w-full lg:w-1/2 space-y-5">
//           <h1 className="font-bold text-xl md:text-2xl">Description</h1>
//           <p className="text-sm" dangerouslySetInnerHTML={{ __html: course?.description || "" }} />

//           <Card>
//             <CardHeader>
//               <CardTitle>Course Content</CardTitle>
//               <CardDescription>{course?.lectures?.length || 0} lectures</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {course?.lectures?.map((lecture, idx) => (
//                 <div key={idx} className="flex items-center gap-3 text-sm">
//                   <span>{showVideo ? <PlayCircle size={14} /> : <Lock size={14} />}</span>
//                   <p>{lecture?.lectureTitle}</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>

//         <div className="w-full lg:w-1/3">
//           <Card>
//             <CardContent className="p-4 flex flex-col">
//               <div className="w-full aspect-video mb-4">
//                 {showVideo ? (
//                   videoUrl ? (
//                     <ReactPlayer width="100%" height="100%" url={videoUrl} controls={true} />
//                   ) : (
//                     <p className="text-center text-gray-500">Yet to upload by instructor</p>
//                   )
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center bg-gray-700 text-white">
//                     <Lock size={40} />
//                     <p className="ml-2">Enroll to watch the video</p>
//                   </div>
//                 )}
//               </div>
//               <h1 className="text-lg md:text-xl font-semibold">Free</h1>
//             </CardContent>

//             <CardFooter className="flex justify-center p-4">
//               {showVideo ? (
//                 <Button onClick={handleContinueLearning} className="w-full">
//                   Continue Learning
//                 </Button>
//               ) : (
//                 <EnrollCourseButton courseId={courseId} onEnrollSuccess={handleEnrollSuccess} />
//               )}
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CourseDetail;































// import EnrollCourseButton from "@/components/EnrollCourseButton";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import ReactPlayer from "react-player";
// import { useNavigate, useParams } from "react-router-dom";

// import { useGetCourseDetailWithEnrollmentStatusQuery } from "@/features/api/EnrollApi"; 

// const CourseDetail = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();

//   // Fetch course details with enrollment status
//   const { data, isLoading, isError, refetch } = useGetCourseDetailWithEnrollmentStatusQuery(courseId);
//   const [isEnrolled, setIsEnrolled] = useState(false);

//   console.log(data)
//   useEffect(() => {
//     if (data && data.enrolled) {
//       setIsEnrolled(true);
//     }
//   }, [data]);

//   if (isLoading) return <h1 className="text-center text-lg">Loading...</h1>;
//   if (isError || !data) return <h1 className="text-red-500 text-center">Failed to load course details</h1>;

//   const { course, enrolled } = data;
//   const instructorName = course?.creator?.name || "Unknown Instructor";
//   const enrolledCount = course?.enrolledStudents?.length || 0;
//   const videoUrl = course?.lectures?.[0]?.videoUrl || "";

//   // Called after a successful enrollment
//   const handleEnrollSuccess = () => {
//     setIsEnrolled(true);
//     refetch(); // Fetch updated enrollment data
//   };

//   const handleContinueLearning = () => {
//     navigate(`/course-progress/${courseId}`);
//   };

//   return (
//     <div className="space-y-5">
//       <div className="bg-[#2D2F31] text-white">
//         <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
//           <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
//           <p className="text-base md:text-lg">
//             <strong>Course Sub-title:</strong> <span>{course?.subTitle}</span>
//           </p>
//           <p>
//             <strong>Created By:</strong>{" "}
//             <span className="text-[#C0C4FC] underline italic">{instructorName}</span>
//           </p>
//           <div className="flex items-center gap-2 text-sm">
//             <BadgeInfo size={16} />
//             <p>Last updated {course?.updatedAt?.split("T")[0] || "N/A"}</p>
//           </div>
//           <p><strong>Students enrolled:</strong> {enrolledCount}</p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
//         <div className="w-full lg:w-1/2 space-y-5">
//           <h1 className="font-bold text-xl md:text-2xl">Description</h1>
//           <p className="text-sm" dangerouslySetInnerHTML={{ __html: course?.description || "" }} />

//           <Card>
//             <CardHeader>
//               <CardTitle>Course Content</CardTitle>
//               <CardDescription>{course?.lectures?.length || 0} lectures</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {course?.lectures?.map((lecture, idx) => (
//                 <div key={idx} className="flex items-center gap-3 text-sm">
//                   <span>{isEnrolled ? <PlayCircle size={14} /> : <Lock size={14} />}</span>
//                   <p>{lecture?.lectureTitle}</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>

//         <div className="w-full lg:w-1/3">
//           <Card>
//             <CardContent className="p-4 flex flex-col">
//               <div className="w-full aspect-video mb-4">
//                 {isEnrolled ? (
//                   videoUrl ? (
//                     <ReactPlayer width="100%" height="100%" url={videoUrl} controls={true} />
//                   ) : (
//                     <p className="text-center text-gray-500">Yet to upload by instructor</p>
//                   )
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center bg-gray-700 text-white">
//                     <Lock size={40} />
//                     <p className="ml-2">Enroll to watch the video</p>
//                   </div>
//                 )}
//               </div>
//               <h1 className="text-lg md:text-xl font-semibold">Free</h1>
//             </CardContent>

//             <CardFooter className="flex justify-center p-4">
//               {isEnrolled ? (
//                 <Button onClick={handleContinueLearning} className="w-full">
//                   Continue Course
//                 </Button>
//               ) : (
//                 <EnrollCourseButton courseId={courseId} onEnrollSuccess={handleEnrollSuccess} />
//               )}
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;




// import EnrollCourseButton from "@/components/EnrollCourseButton";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

// import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import ReactPlayer from "react-player";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// import { useGetCourseDetailWithEnrollmentStatusQuery } from "@/features/api/EnrollApi"; 

// const CourseDetail = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth); // Get logged-in user info

//   // Fetch course details with enrollment status
//   const { data, isLoading, isError, refetch } = useGetCourseDetailWithEnrollmentStatusQuery(courseId);
//   const [isEnrolled, setIsEnrolled] = useState(false);

//   useEffect(() => {
//     if (data && data.enrolled) {
//       setIsEnrolled(true);
//     }
//   }, [data]);

//   if (isLoading) return <h1 className="text-center text-lg">Loading...</h1>;
//   if (isError || !data) return <h1 className="text-red-500 text-center">Failed to load course details</h1>;

//   const { course, enrolled } = data;
//   const enrolledCount = course?.enrolledStudents?.length || 0;
//   const videoUrl = course?.lectures?.[0]?.videoUrl || "";

//   // ✅ Check if logged-in user is the course creator
//   const isCreator = user?._id === course?.creator?._id;

//   const handleContinueLearning = () => {
//     navigate(`/course-progress/${courseId}`);
//   };

//   return (
//     <div className="space-y-5">
//       <div className="bg-[#2D2F31] text-white">
//         <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
//           <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
//           <p className="text-base md:text-lg">
//             <strong>Course Sub-title:</strong> <span>{course?.subTitle}</span>
//           </p>
//           <div className="flex items-center gap-2 text-sm">
//             <BadgeInfo size={16} />
//             <p>Last updated {course?.updatedAt?.split("T")[0] || "N/A"}</p>
//           </div>
//           <p><strong>Students enrolled:</strong> {enrolledCount}</p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
//         <div className="w-full lg:w-1/2 space-y-5">
//           <h1 className="font-bold text-xl md:text-2xl">Description</h1>
//           <p className="text-sm" dangerouslySetInnerHTML={{ __html: course?.description || "" }} />

//           <Card>
//             <CardHeader>
//               <CardTitle>Course Content</CardTitle>
//               <CardDescription>{course?.lectures?.length || 0} lectures</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {course?.lectures?.map((lecture, idx) => (
//                 <div key={idx} className="flex items-center gap-3 text-sm">
//                   <span>{isEnrolled ? <PlayCircle size={14} /> : <Lock size={14} />}</span>
//                   <p>{lecture?.lectureTitle}</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>

//         <div className="w-full lg:w-1/3">
//           <Card>
//             <CardContent className="p-4 flex flex-col">
//               <div className="w-full aspect-video mb-4">
//                 {isEnrolled ? (
//                   videoUrl ? (
//                     <ReactPlayer width="100%" height="100%" url={videoUrl} controls={true} />
//                   ) : (
//                     <p className="text-center text-gray-500">Yet to upload by instructor</p>
//                   )
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center bg-gray-700 text-white">
//                     <Lock size={40} />
//                     <p className="ml-2">Enroll to watch the video</p>
//                   </div>
//                 )}
//               </div>
//               <h1 className="text-lg md:text-xl font-semibold">Free</h1>
//             </CardContent>

//             <CardFooter className="flex justify-center p-4">
//               {isCreator ? (
//                 <p className="text-green-500 font-semibold">You are the creator of this course</p>
//               ) : isEnrolled ? (
//                 <Button onClick={handleContinueLearning} className="w-full">
//                   Continue Course
//                 </Button>
//               ) : (
//                 <EnrollCourseButton courseId={courseId} onEnrollSuccess={() => { setIsEnrolled(true); refetch(); }} />
//               )}
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;









import EnrollCourseButton from "@/components/EnrollCourseButton";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCourseDetailWithEnrollmentStatusQuery } from "@/features/api/EnrollApi";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading, isError, refetch } = useGetCourseDetailWithEnrollmentStatusQuery(courseId);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);

  useEffect(() => {
    if (data && data.enrolled) {
      setIsEnrolled(true);
    }
  }, [data]);

  if (isLoading) return <h1 className="text-center text-lg">Loading...</h1>;
  if (isError || !data) return <h1 className="text-red-500 text-center">Failed to load course details</h1>;

  const { course } = data;
  const enrolledCount = course?.enrolledStudents?.length || 0;
  const lectures = course?.lectures || [];
  const isCreator = user?._id === course?.creator?._id;

  const handleLectureEnd = () => {
    if (currentLectureIndex < lectures.length - 1) {
      setCurrentLectureIndex(currentLectureIndex + 1);
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
          <p className="text-base md:text-lg">
            <strong>Course Sub-title:</strong> <span>{course?.subTitle}</span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {course?.updatedAt?.split("T")[0] || "N/A"}</p>
          </div>
          <p><strong>Students enrolled:</strong> {enrolledCount}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: course?.description || "" }} />

          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>{lectures.length} lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm cursor-pointer" onClick={() => setCurrentLectureIndex(idx)}>
                  <span>{isEnrolled || isCreator ? <PlayCircle size={14} /> : <Lock size={14} />}</span>
                  <p>{lecture?.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                {isCreator || isEnrolled ? (
                  lectures[currentLectureIndex]?.videoUrl ? (
                    <ReactPlayer
                      width="100%"
                      height="100%"
                      url={lectures[currentLectureIndex]?.videoUrl}
                      controls={true}
                      playing={true}
                      onEnded={handleLectureEnd}
                    />
                  ) : (
                    <p className="text-center text-gray-500">Yet to upload by instructor</p>
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-700 text-white">
                    <Lock size={40} />
                    <p className="ml-2">Enroll to watch the video</p>
                  </div>
                )}
              </div>
              <h1 className="text-lg md:text-xl font-semibold">Free</h1>
            </CardContent>

            <CardFooter className="flex flex-col items-center p-4">
              {isCreator ? (
                <p className="text-green-500 font-semibold">You are the creator of this course</p>
              ) : isEnrolled ? (
                <Button onClick={() => setCurrentLectureIndex(0)} className="w-full">Continue Course</Button>
              ) : (
                <EnrollCourseButton courseId={courseId} onEnrollSuccess={() => { setIsEnrolled(true); refetch(); }} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;