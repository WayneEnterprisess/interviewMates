import { Interview } from "../models/interview.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// const createRequest = asyncHandler(async (req,res)=>{
//     //get interviewee
//     const interviewee = req.user._id;

//     //get name, domain and available times
//     const {domain, availability}=req.body;

//     console.log(domain,"domain")
//     console.log(availability,"interview availability")
//     //check inputs
//     if(!domain){
//         throw new ApiError(500, "domain is not provided")
//     }
//     if(!Array.isArray(availability) || availability.length === 0){
//         throw new ApiError(500,"time slots is required by interviewee");
//     }

//     //create request
//     const request = await Interview.create({
//         interviewee,
//         domain,
//         intervieweeAvailability:availability,
//         status:"Not Scheduled",
//     })

//     res.status(201).json({
//         success:true,
//         message:"interview request created successfully",
//         request
//     })
// })
const createRequest = asyncHandler(async (req, res) => {
  const interviewee = req.user._id;
  const { domain, availability } = req.body;

  console.log(domain, "domain");
  console.log(availability, "interview availability");

  if (!domain) {
    throw new ApiError(500, "domain is not provided");
  }

  if (!Array.isArray(availability) || availability.length === 0) {
    throw new ApiError(500, "time slots are required by interviewee");
  }

  // Convert to correct format: Date + [Date, Date, ...]
  const processedAvailability = availability.map(({ date, startTimes }) => {
    const baseDate = new Date(date);
    const startTimeDates = startTimes.map(timeStr => {
      const [hours, minutes] = timeStr.split(':');
      const fullDate = new Date(baseDate);
      fullDate.setHours(parseInt(hours));
      fullDate.setMinutes(parseInt(minutes));
      fullDate.setSeconds(0);
      fullDate.setMilliseconds(0);
      return fullDate;
    });

    return {
      date: baseDate,
      startTime: startTimeDates
    };
  });

  const request = await Interview.create({
    interviewee,
    domain,
    intervieweeAvailability: processedAvailability,
    status: "Not Scheduled",
  });

  res.status(201).json({
    success: true,
    message: "interview request created successfully",
    request
  });
});

const getPendingRequests = asyncHandler(async (req,res)=>{
    //find all requests that are not scheduled
    const pendingRequests = await Interview.find({status:"Not Scheduled"})
    .populate('interviewee','fullName avatar email')
    res.status(201).json({
        success:true,
        data:pendingRequests
    })
}) 


export {createRequest,getPendingRequests}