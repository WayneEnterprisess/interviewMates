import mongoose, { Schema } from 'mongoose'

const interviewModel = new Schema({
    interviewer:{
        type: Schema.Types.ObjectId,
        ref: "user",

    },
    interviewee:{
        type: Schema.Types.ObjectId,
        ref: "user",
        required:true,

    },
    startTime:{
        type:Date,
        required:true,
    },
    meetingLink:{
        type:String,
        required:true,
    },
    domain:{
        type:[String],
        required:true,
    },
    intervieweeAvailability: {
        type: {
            startTime: {
                type: Date,
                required:true
            },
            endTime: {
                type: Date,
                required:true
            }
        }
    }
    

},{timestamps:true})