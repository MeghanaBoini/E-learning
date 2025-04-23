
import EnrollCourseButton from "@/components/EnrollCourseButton";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCourseDetailWithEnrollmentStatusQuery } from "@/features/api/EnrollApi";
import { Link } from "react-router-dom";




const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  
  const { data, isLoading, isError, refetch } = useGetCourseDetailWithEnrollmentStatusQuery(courseId);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);

  const handleTakeQuiz = (quizId) => {
    navigate(`/course/${courseId}/take-quiz/${quizId}`);
  };

  

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

            {/* <CardFooter className="flex flex-col items-center p-4">
              {isCreator ? (
                <p className="text-green-500 font-semibold">You are the creator of this course</p>
              ) : isEnrolled ? (
                <Button onClick={() => setCurrentLectureIndex(0)} className="w-full">Continue Course</Button>
              ) : (
                <EnrollCourseButton courseId={courseId} onEnrollSuccess={() => { setIsEnrolled(true); refetch(); }} />
              )}
            </CardFooter> */}
            <CardFooter className="flex flex-col items-center p-4">
  {isCreator ? (
    <p className="text-green-500 font-semibold">You are the creator of this course</p>
  ) : isEnrolled ? (
    <>
      
      <Link 
    to={`/quiz`} 
    className="quiz-button-link"
  >
    Take Quiz
  </Link>
      
    </>
    
  ) : (
    <EnrollCourseButton
      courseId={courseId}
      onEnrollSuccess={() => {
        setIsEnrolled(true);
        refetch();
      }}
    />
  )}
</CardFooter>

          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;