// import React, { useEffect } from "react";
// import { Button } from "./ui/button";
// import { useEnrollInCourseMutation } from "@/features/api/EnrollApi";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";

// const EnrollCourseButton = ({ courseId }) => {
//   const [enrollInCourse, { data, isLoading, isSuccess, isError, error }] =
//     useEnrollInCourseMutation();

//   const enrollCourseHandler = async () => {
//     await enrollInCourse({courseId});
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("Successfully enrolled in the course!");
//     }
//     if (isError) {
//       toast.error(error?.data?.message || "Failed to enroll in the course");
//     }
//   }, [data, isSuccess, isError, error]);

//   return (
//     <Button
//       disabled={isLoading}
//       onClick={enrollCourseHandler}
//       className="w-full"
//     >
//       {isLoading ? (
//         <>
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           Please wait
//         </>
//       ) : (
//         "Enroll Now"
//       )}
//     </Button>
//   );
// };

// export default EnrollCourseButton;


// import React, { useEffect } from "react";
// import { Button } from "./ui/button";
// import { useEnrollInCourseMutation } from "@/features/api/EnrollApi";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";

// const EnrollCourseButton = ({ courseId }) => {
//   const [enrollInCourse, { data, isLoading, isSuccess, isError, error }] =
//     useEnrollInCourseMutation();

//   const enrollCourseHandler = async () => {
//     await enrollInCourse({courseId});
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("Successfully enrolled in the course!");
//     }
//     if (isError) {
//       toast.error(error?.data?.message || "Failed to enroll in the course");
//     }
//   }, [data, isSuccess, isError, error]);

//   return (
//     <Button
//       disabled={isLoading}
//       onClick={enrollCourseHandler}
//       className="w-full"
//     >
//       {isLoading ? (
//         <>
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           Please wait
//         </>
//       ) : (
//         "Enroll Now"
//       )}
//     </Button>
//   );
// };

// export default EnrollCourseButton;




import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useEnrollInCourseMutation } from "@/features/api/EnrollApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const EnrollCourseButton = ({ courseId }) => {
  const [enrollInCourse, { isLoading, isSuccess, isError, error }] = useEnrollInCourseMutation();

  useEffect(() => {
    if (isSuccess) toast.success("Successfully enrolled!");
    if (isError) toast.error(error?.data?.message || "Enrollment failed");
  }, [isSuccess, isError, error]);

  return (
    <Button disabled={isLoading} onClick={() => enrollInCourse({ courseId })} className="w-full">
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Enroll Now"}
    </Button>
  );
};

export default EnrollCourseButton;

