import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"; 
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { EnrollApi } from "@/features/api/EnrollApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";
import { quizApi } from "@/features/api/quizApi";


const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    [EnrollApi.reducerPath]: EnrollApi.reducer,
    [courseProgressApi.reducerPath]:courseProgressApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
    auth:authReducer, 
    
});
export default rootReducer;