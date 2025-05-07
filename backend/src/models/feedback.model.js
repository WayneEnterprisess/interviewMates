import mongoose, { Schema } from 'mongoose';


const feedbackSchema = new Schema({
    interviewId: {
      type: Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
    },
    givenBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    givenTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["interviewer", "interviewee"], // who is giving the feedback
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comments: {
      type: String,
      default: "",
    },
  
    // Optional: for interviewers giving detailed feedback
    strengths: {
      type: [String],
      default: [],
    },
    weaknesses: {
      type: [String],
      default: [],
    },
    problemSolving: {
      type: Number,
      min: 1,
      max: 5,
    },
    communication: {
      type: Number,
      min: 1,
      max: 5,
    },
    codingSkills: {
      type: Number,
      min: 1,
      max: 5,
    },
    domainKnowledge: {
      type: Number,
      min: 1,
      max: 5,
    },
  
    // Optional: for interviewees rating interviewers
    helpfulness: {
      type: Number,
      min: 1,
      max: 5,
    },
    clarity: {
      type: Number,
      min: 1,
      max: 5,
    }
  
  }, { timestamps: true });
  

export const Feedback = mongoose.model("Feedback",feedbackSchema);