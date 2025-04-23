

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from "@/features/api/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:8080/api/v1/media";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const params = useParams();
  const { courseId, lectureId } = params;

  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setUploadVideoInfo(lecture.videoInfo);
    }
  }, [lecture]);

  const [editLecture, { data, isLoading, error, isSuccess }] = useEditLectureMutation();
  const [removeLecture, { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess }] = useRemoveLectureMutation();

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
  
    setMediaProgress(true);
    setUploadProgress(0);
  
    try {
      const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Requested-With": "XMLHttpRequest", // Helps browsers track progress
          "Cache-Control": "no-cache", // Ensures fresh upload
        },
        onUploadProgress: ({ loaded, total }) => {
          setUploadProgress(Math.round((loaded * 100) / total));
        },
        timeout: 300000, // 5-minute timeout for large uploads
      });
  
      if (res.data.success) {
        setUploadVideoInfo({
          videoUrl: res.data.data.url,
          publicId: res.data.data.public_id,
        });
        setBtnDisable(false);
        toast.success("Video uploaded successfully!");
      } else {
        throw new Error(res.data.message || "Video upload failed");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(error.response?.data?.message || "Video upload failed");
    } finally {
      setMediaProgress(false);
    }
  };
  

  const editLectureHandler = async () => {
    if (!uploadVideoInfo) {
      toast.error("Please upload a video first!");
      return;
    }

    await editLecture({
      lectureTitle,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Lecture updated successfully!");
    }
    if (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData?.message || "Lecture removed successfully!");
    }
  }, [removeSuccess]);

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>Make changes and click save when done.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button disabled={removeLoading} variant="destructive" onClick={removeLectureHandler}>
            {removeLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            type="text"
            placeholder="Ex. Introduction to Javascript"
          />
        </div>
        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            placeholder="Ex. Introduction to Javascript"
            className="w-fit"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch checked={isFree} onCheckedChange={setIsFree} id="free-video" />
          <Label htmlFor="free-video">Is this video FREE</Label>
        </div>

        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}

        <div className="mt-4">
          <Button disabled={isLoading || btnDisable} onClick={editLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;


// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Progress } from "@/components/ui/progress";
// import { Switch } from "@/components/ui/switch";
// import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from "@/features/api/courseApi";
// import axios from "axios";
// import { Loader2 } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "sonner";
// import { useCreateQuizMutation } from "@/features/api/quizApi";

// const MEDIA_API = "http://localhost:8080/api/v1/media";

// const LectureTab = () => {
//   const [lectureTitle, setLectureTitle] = useState("");
//   const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
//   const [isFree, setIsFree] = useState(false);
//   const [mediaProgress, setMediaProgress] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [btnDisable, setBtnDisable] = useState(true);
//   const [quizName, setQuizName] = useState("");
//   const [questions, setQuestions] = useState([]);
//   const [newQuestion, setNewQuestion] = useState("");
//   const [options, setOptions] = useState(["", "", "", ""]);
//   const [correctOption, setCorrectOption] = useState("");

//   const params = useParams();
//   const { courseId, lectureId } = params;

//   const { data: lectureData } = useGetLectureByIdQuery(lectureId);
//   const lecture = lectureData?.lecture;

//   useEffect(() => {
//     if (lecture) {
//       setLectureTitle(lecture.lectureTitle);
//       setIsFree(lecture.isPreviewFree);
//       setUploadVideoInfo(lecture.videoInfo);
//     }
//   }, [lecture]);

//   const [editLecture, { data, isLoading, error, isSuccess }] = useEditLectureMutation();
//   const [removeLecture, { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess }] = useRemoveLectureMutation();
//   const [createQuiz, { isLoading: quizLoading, isSuccess: quizSuccess, isError: quizError }] = useCreateQuizMutation();

//   const fileChangeHandler = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     setMediaProgress(true);
//     setUploadProgress(0);

//     try {
//       const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           "X-Requested-With": "XMLHttpRequest",
//           "Cache-Control": "no-cache",
//         },
//         onUploadProgress: ({ loaded, total }) => {
//           setUploadProgress(Math.round((loaded * 100) / total));
//         },
//         timeout: 300000,
//       });

//       if (res.data.success) {
//         setUploadVideoInfo({
//           videoUrl: res.data.data.url,
//           publicId: res.data.data.public_id,
//         });
//         setBtnDisable(false);
//         toast.success("Video uploaded successfully!");
//       } else {
//         throw new Error(res.data.message || "Video upload failed");
//       }
//     } catch (error) {
//       console.error("Upload Error:", error);
//       toast.error(error.response?.data?.message || "Video upload failed");
//     } finally {
//       setMediaProgress(false);
//     }
//   };

//   const editLectureHandler = async () => {
//     if (!uploadVideoInfo) {
//       toast.error("Please upload a video first!");
//       return;
//     }

//     await editLecture({
//       lectureTitle,
//       videoInfo: uploadVideoInfo,
//       isPreviewFree: isFree,
//       courseId,
//       lectureId,
//     });
//   };

//   const removeLectureHandler = async () => {
//     await removeLecture(lectureId);
//   };

//   // Handle adding a question with options
//   const handleAddQuestion = () => {
//     if (newQuestion.trim() === "") {
//       toast.error("Question cannot be empty");
//       return;
//     }
//     const newQ = {
//       question: newQuestion,
//       options,
//       correctOption: parseInt(correctOption, 10),
//     };
//     setQuestions((prevQuestions) => [...prevQuestions, newQ]);
//     setNewQuestion("");  // Reset new question input
//     setOptions(["", "", "", ""]);  // Reset options
//     setCorrectOption("");  // Reset correct option
//   };

//   const handleCreateQuiz = async () => {
//     if (questions.length === 0) {
//       toast.error("Please add at least one question!");
//       return;
//     }

//     try {
//       const response = await createQuiz({ courseId, quizName, questions }).unwrap();
//       // Check response
//       console.log(response); // This will log the backend response for debugging
//       toast.success("Quiz created successfully!");
//       setQuizName("");  // Reset quiz name
//       setQuestions([]);  // Clear questions
//     } catch (error) {
//       // Check the error message in the catch block
//       console.error("Quiz creation failed:", error);
//       toast.error(error?.message || "Failed to create quiz");
//     }
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(data?.message || "Lecture updated successfully!");
//     }
//     if (error) {
//       toast.error(error?.data?.message || "Something went wrong!");
//     }
//   }, [isSuccess, error]);

//   useEffect(() => {
//     if (removeSuccess) {
//       toast.success(removeData?.message || "Lecture removed successfully!");
//     }
//   }, [removeSuccess]);

//   return (
//     <Card>
//       <CardHeader className="flex justify-between">
//         <div>
//           <CardTitle>Edit Lecture</CardTitle>
//           <CardDescription>Make changes and click save when done.</CardDescription>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button disabled={removeLoading} variant="destructive" onClick={removeLectureHandler}>
//             {removeLoading ? (
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             ) : (
//               "Remove Lecture"
//             )}
//           </Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         {/* Lecture details here */}
//         {/* Quiz Creation Section */}
//         <div className="mt-6">
//           <h3 className="text-lg font-bold">Create Quiz</h3>
//           <Label>Quiz Name</Label>
//           <Input
//             type="text"
//             value={quizName}
//             onChange={(e) => setQuizName(e.target.value)}
//             placeholder="Quiz Name"
//           />

//           <div className="my-4">
//             <Label>Question</Label>
//             <Input
//               type="text"
//               value={newQuestion}
//               onChange={(e) => setNewQuestion(e.target.value)}
//               placeholder="Enter question"
//             />
//           </div>

//           <div className="my-4">
//             <Label>Options</Label>
//             {options.map((option, index) => (
//               <Input
//                 key={index}
//                 type="text"
//                 value={option}
//                 onChange={(e) => {
//                   const newOptions = [...options];
//                   newOptions[index] = e.target.value;
//                   setOptions(newOptions);
//                 }}
//                 placeholder={`Option ${index + 1}`}
//               />
//             ))}
//           </div>

//           <div className="my-4">
//             <Label>Correct Option</Label>
//             <select
//               value={correctOption}
//               onChange={(e) => setCorrectOption(e.target.value)}
//             >
//               <option value="">Select Correct Option</option>
//               {options.map((option, index) => (
//                 <option key={index} value={index}>
//                   Option {index + 1}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <Button onClick={handleAddQuestion}>Add Question</Button>

//           <div className="my-4">
//             <h4>Questions:</h4>
//             {questions.map((q, index) => (
//               <div key={index}>
//                 <p>{q.question}</p>
//                 <ul>
//                   {q.options.map((opt, idx) => (
//                     <li key={idx}>{opt}</li>
//                   ))}
//                 </ul>
//                 <p>Correct: {q.options[q.correctOption]}</p>
//               </div>
//             ))}
//           </div>

//           <Button onClick={handleCreateQuiz} disabled={quizLoading || questions.length === 0}>
//             {quizLoading ? (
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             ) : (
//               "Create Quiz"
//             )}
//           </Button>
//         </div>

//         {/* Update Lecture button */}
//         <div className="mt-4">
//           <Button disabled={isLoading || btnDisable} onClick={editLectureHandler}>
//             {isLoading ? (
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             ) : (
//               "Update Lecture"
//             )}
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default LectureTab;
