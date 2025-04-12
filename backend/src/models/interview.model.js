import mongoose, { Schema } from 'mongoose'

const interviewSchema = new Schema({
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
      required: true,
    },
    meetingLink: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        enum: ["Not Scheduled", "Scheduled", "Cancelled", "Completed"],
        default: "Not Scheduled",
        required: true,
      },
      
    domain: {
      type: String, 
      required: true,
    },
    intervieweeAvailability: {
        type: [
          {
            startTime: {
              type: Date,
              required: true
            }
          }
        ],
        default: []
      },      
      
    // Feedback references
    feedbackFromInterviewer: {
      type: Schema.Types.ObjectId,
      ref: "Feedback"
    },
    feedbackFromInterviewee: {
      type: Schema.Types.ObjectId,
      ref: "Feedback"
    }
  
  }, { timestamps: true });
  

  export const Interview = mongoose.model("Interview",interviewSchema)