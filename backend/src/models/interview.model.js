import mongoose, { Schema } from "mongoose";

const interviewSchema = new Schema(
  {
    interviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    interviewee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scheduleTime: {
      type: Date,
    },
    meetingLink: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Not Scheduled", "Scheduled", "Cancelled", "Completed"],
      default: "Not Scheduled",
    },

    domain: {
      type: String,
      required: true,
    },
    intervieweeAvailability: {
      type: [
        {
          date: {
            type: Date,
          },
          startTime: [{
            type: Date, 
          }],
            
        },
      ],
      default: [],
    },

    // Feedback references
    feedbackFromInterviewer: {
      type: Schema.Types.ObjectId,
      ref: "Feedback",
    },
    feedbackFromInterviewee: {
      type: Schema.Types.ObjectId,
      ref: "Feedback",
    },
  },
  { timestamps: true }
);

export const Interview = mongoose.model("Interview", interviewSchema);
