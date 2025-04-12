import React, { useState } from 'react';
import { Camera, Star, Calendar, Clock, X, Plus, Video } from 'lucide-react';
import DImage from '../../assets/dhairya.png'
import Navbar from '../global/Navbar';
import Footer from '../global/Footer';
const mockReviews = [
  {
    id: 1,
    author: "Alex Thompson",
    rating: 5,
    date: "2024-03-15",
    comment: "Excellent interviewer! Asked relevant questions and provided great feedback.",
    authorImage: "https://source.unsplash.com/random/100x100?portrait=1"
  },
  {
    id: 2,
    author: "Sarah Chen",
    rating: 4,
    date: "2024-03-10",
    comment: "Very knowledgeable in system design. Helped me understand complex concepts.",
    authorImage: "https://source.unsplash.com/random/100x100?portrait=2"
  },
  {
    id: 3,
    author: "Michael Rodriguez",
    rating: 5,
    date: "2024-03-05",
    comment: "Great experience! The feedback was constructive and helped me improve.",
    authorImage: "https://source.unsplash.com/random/100x100?portrait=3"
  }
];

const mockUpcomingInterviews = [
  {
    id: 1,
    interviewer: null,
    interviewee: "John Doe",
    domain: "Frontend Development",
    scheduledTime: null,
    meetingLink: null,
    status: "unscheduled"
  },
  {
    id: 2,
    interviewer: "Sarah Chen",
    interviewee: "John Doe",
    domain: "System Design",
    scheduledTime: "2024-03-20T14:00:00Z",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    status: "scheduled"
  }
];

const mockRecentInterviews = [
  {
    id: 3,
    interviewer: "Michael Rodriguez",
    interviewee: "John Doe",
    domain: "Backend Development",
    scheduledTime: "2024-03-10T15:00:00Z",
    meetingLink: "https://meet.google.com/xyz-uvwx-yz",
    status: "completed"
  }
];

export function UserProfile() {
  const [activeTab, setActiveTab] = useState('interviewer');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [interviewRequest, setInterviewRequest] = useState({
    domain: '',
    dates: ['', '', ''],
    timeSlot: ''
  });

  const userDomains = [
    "Frontend Development",
    "React",
    "System Design",
    "Cloud Architecture"
  ];

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    console.log('Interview request:', interviewRequest);
    setIsRequestModalOpen(false);
  };

  return (
    <>
    {/* <Navbar/> */}
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-8 p-8">
          {/* Left Column */}
          <div className="flex-grow">
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden">
                    <img
                      src={DImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="text-white" size={24} />
                  </div>
                </div>

                <div className="flex-1 w-full">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
                    <h1 className="text-3xl font-bold text-gray-900">Dhairya Kaithwar</h1>
                    <button
                      onClick={() => setIsRequestModalOpen(true)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 w-full md:w-auto justify-center"
                    >
                      <Plus size={20} />
                      Create Interview Request
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h2 className="text-sm font-semibold text-gray-700 mb-2">Expertise</h2>
                      <div className="flex flex-wrap gap-2">
                        {userDomains.map((domain) => (
                          <span key={domain} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                            {domain}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-6">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">4.9</span>
                        <p className="text-sm text-gray-600">Interviewer Rating</p>
                      </div>
                      <div>
                        <span className="text-2xl font-bold text-gray-900">156</span>
                        <p className="text-sm text-gray-600">Interviews Conducted</p>
                      </div>
                      <div>
                        <span className="text-2xl font-bold text-gray-900">45</span>
                        <p className="text-sm text-gray-600">Interviews Taken</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center gap-4 mb-6 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('interviewer')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                    activeTab === 'interviewer'
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Reviews as Interviewer
                </button>
                <button
                  onClick={() => setActiveTab('interviewee')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                    activeTab === 'interviewee'
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Reviews as Interviewee
                </button>
              </div>

              <div className="space-y-6">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.authorImage}
                        alt={review.author}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{review.author}</h3>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} size={16} className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-96 space-y-8">
            {/* Upcoming */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Interviews</h2>
              <div className="space-y-4">
                {mockUpcomingInterviews.map((interview) => (
                  <div key={interview.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{interview.domain}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        interview.status === 'scheduled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {interview.status === 'scheduled' ? 'Scheduled' : 'Pending'}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>Interviewer: {interview.interviewer || 'Not yet assigned'}</p>
                      <p>Interviewee: {interview.interviewee}</p>
                      {interview.scheduledTime && (
                        <p className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(interview.scheduledTime).toLocaleString()}
                        </p>
                      )}
                      {interview.meetingLink && (
                        <a
                          href={interview.meetingLink}
                          className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                        >
                          <Video size={14} />
                          Join Meeting
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Interviews</h2>
              <div className="space-y-4">
                {mockRecentInterviews.map((interview) => (
                  <div key={interview.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{interview.domain}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-800">
                        Completed
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>Interviewer: {interview.interviewer}</p>
                      <p>Interviewee: {interview.interviewee}</p>
                      <p className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(interview.scheduledTime).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Create Interview Request</h2>
              <button
                onClick={() => setIsRequestModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Domain
                </label>
                <select
                  value={interviewRequest.domain}
                  onChange={(e) =>
                    setInterviewRequest({ ...interviewRequest, domain: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                >
                  <option value="">Select a domain</option>
                  {userDomains.map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available Dates (Max 3)
                </label>
                {interviewRequest.dates.map((date, index) => (
                  <input
                    key={index}
                    type="date"
                    value={date}
                    onChange={(e) => {
                      const newDates = [...interviewRequest.dates];
                      newDates[index] = e.target.value;
                      setInterviewRequest({ ...interviewRequest, dates: newDates });
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2"
                    required
                  />
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time Slot
                </label>
                <input
                  type="time"
                  value={interviewRequest.timeSlot}
                  onChange={(e) =>
                    setInterviewRequest({ ...interviewRequest, timeSlot: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    <Footer/>   
    </>
  );
}
