import { configureStore } from "@reduxjs/toolkit";
import rootRedcuer from "./rootRedcuer";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";
import { EnrollApi } from "@/features/api/EnrollApi";
import { quizApi } from "@/features/api/quizApi"; // ✅ Import quizApi

export const appStore = configureStore({
  reducer: rootRedcuer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      authApi.middleware,
      courseApi.middleware,
      EnrollApi.middleware,
      courseProgressApi.middleware,
      quizApi.middleware // ✅ Add quizApi middleware
    ),
});

// Load user info on app start
const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
