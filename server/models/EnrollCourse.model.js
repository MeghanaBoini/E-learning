import mongoose from "mongoose";
const EnrollCourseSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    // amount:{
    //     type:Number,
    //     required:true
    // },
    status:{
        type:String,
        enum:['notEnrolled', 'Enrolled', 'failed'],
        default:'notEnrolled'
    },
    // paymentId:{
    //     type:String,
    //     required:true
    // }

},{timestamps:true});
export const CourseEnrolled = mongoose.model('CourseEnrolled', EnrollCourseSchema);