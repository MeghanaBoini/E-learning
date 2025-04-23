import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/quiz",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createQuiz: builder.mutation({
      query: ({ courseId, question, options, correctAnswer }) => ({
        url: `/course/${courseId}`,
        method: "POST",
        body: { question, options, correctAnswer },
      }),
    }),
    getQuizByCourseId: builder.query({
      query: (courseId) => `/course/${courseId}`,
    }),
  }),
});

export const { useCreateQuizMutation, useGetQuizByCourseIdQuery } = quizApi;
