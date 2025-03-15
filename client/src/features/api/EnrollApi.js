import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_ENROLL_API = "http://localhost:8080/api/v1/enroll";

export const EnrollApi = createApi({
  reducerPath: "EnrollApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_ENROLL_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    enrollInCourse: builder.mutation({
      query: (courseId) => ({
        url: "/enroll",
        method: "POST",
        body: JSON.stringify({ courseId }),
        headers: { "Content-Type": "application/json" },
        // body: { courseId },
      }),
    }),
    getCourseDetailWithEnrollmentStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getEnrolledCourses: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useEnrollInCourseMutation,
  useGetCourseDetailWithEnrollmentStatusQuery,
  useGetEnrolledCoursesQuery,
} = EnrollApi;
