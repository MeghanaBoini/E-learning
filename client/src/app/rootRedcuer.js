import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"; 
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
// import { purchaseApi } from "@/features/api/purchaseApi";
import { EnrollApi } from "@/features/api/EnrollApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";

const rootRedcuer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    // [purchaseApi.reducerPath]:purchaseApi.reducer,
    [EnrollApi.reducerPath]:EnrollApi.reducer,
    [courseProgressApi.reducerPath]:courseProgressApi.reducer,
    auth:authReducer, 
});
export default rootRedcuer;