import React, { useEffect, useState } from 'react';
import { Star, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../global/Navbar';
import Footer from '../global/Footer';
import { Sidebar } from '../global/Sidebar';
import axios from 'axios';
import { BASE_URL } from '../../utils/url';

const mockRequests = [
  {
    id: 1,
    interviewee: {
      id: 101,
      name: "Sarah Chen",
      image: "https://source.unsplash.com/random/100x100?portrait=1",
      rating: 4.9,
      interviewsCompleted: 156
    },
    domain: "Frontend Development",
    availableDates: ["2024-03-20", "2024-03-21", "2024-03-22"],
    timeSlot: "14:00"
  },
  {
    id: 2,
    interviewee: {
      id: 102,
      name: "Michael Rodriguez",
      image: "https://source.unsplash.com/random/100x100?portrait=2",
      rating: 4.8,
      interviewsCompleted: 142
    },
    domain: "System Design",
    availableDates: ["2024-03-21", "2024-03-23", "2024-03-24"],
    timeSlot: "15:30"
  },
  {
    id: 3,
    interviewee: {
      id: 103,
      name: "Emma Wilson",
      image: "https://source.unsplash.com/random/100x100?portrait=3",
      rating: 4.7,
      interviewsCompleted: 98
    },
    domain: "Backend Development",
    availableDates: ["2024-03-22", "2024-03-23", "2024-03-25"],
    timeSlot: "10:00"
  },
  {
    id: 4,
    interviewee: {
      id: 104,
      name: "David Kim",
      image: "https://source.unsplash.com/random/100x100?portrait=4",
      rating: 4.9,
      interviewsCompleted: 167
    },
    domain: "Cloud Architecture",
    availableDates: ["2024-03-23", "2024-03-24", "2024-03-26"],
    timeSlot: "16:00"
  },
  {
    id: 5,
    interviewee: {
      id: 105,
      name: "Priya Sharma",
      image: "https://source.unsplash.com/random/100x100?portrait=5",
      rating: 4.8,
      interviewsCompleted: 134
    },
    domain: "Mobile Development",
    availableDates: ["2024-03-24", "2024-03-25", "2024-03-27"],
    timeSlot: "11:30"
  }
];

export function InterviewRequests() {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 3;
  const totalPages = Math.ceil(mockRequests.length / requestsPerPage);

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = mockRequests.slice(indexOfFirstRequest, indexOfLastRequest);



  //get all requests
  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/interview-requests/pending-requests`,{
          withCredentials:true
        })
        const reqArr = await res.data.data;
        setRequests(reqArr);
      } catch (error) {
        console.error("error while getting pending requests", error.response?.data || error.message);
      }
    }
    getRequests();
  }, [])

  useEffect(()=>{
    console.log("requests array",requests)
  },[requests])
  

  const handleSchedule = (requestId, date) => {
    console.log(`Scheduling interview for request ${requestId} on ${date}`);
    // Handle scheduling logic here
  };

  return (
    <>
    <Navbar/>
    {/* <Sidebar/> */}
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Interview Requests</h1>
          <p className="text-gray-600">Schedule interviews with candidates based on their availability</p>
        </div>

        <div className="grid gap-6">
          {currentRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium text-gray-900">{request.domain}</span>
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400 fill-current" size={16} />
                  <span className="text-gray-600">{request.interviewee.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={request.interviewee.image}
                  alt={request.interviewee.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{request.interviewee.name}</h3>
                  <p className="text-sm text-gray-600">
                    {request.interviewee.interviewsCompleted} interviews completed
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Available Time Slot</h4>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    <span>{request.timeSlot}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Available Dates</h4>
                  <div className="flex flex-wrap gap-2">
                    {request.availableDates.map((date) => (
                      <button
                        key={date}
                        onClick={() => handleSchedule(request.id, date)}
                        className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition text-sm font-medium"
                      >
                        {new Date(date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
