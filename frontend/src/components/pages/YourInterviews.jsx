import React from 'react';
import { Calendar, Video, Star } from 'lucide-react';
import { Sidebar } from '../global/Sidebar';
import Navbar from '../global/Navbar';

const mockInterviews = [
  {
    id: 1,
    interviewer: {
      id: 101,
      name: "Sarah Chen",
      image: "https://source.unsplash.com/random/100x100?portrait=1",
      rating: 4.9
    },
    interviewee: {
      id: 201,
      name: "John Smith",
      image: "https://source.unsplash.com/random/100x100?portrait=6",
      rating: 4.7
    },
    domain: "Frontend Development",
    scheduledTime: "2024-03-20T14:00:00Z",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    status: "scheduled"
  },
  {
    id: 2,
    interviewer: {
      id: 102,
      name: "Michael Rodriguez",
      image: "https://source.unsplash.com/random/100x100?portrait=2",
      rating: 4.8
    },
    interviewee: {
      id: 202,
      name: "Emma Wilson",
      image: "https://source.unsplash.com/random/100x100?portrait=7",
      rating: 4.6
    },
    domain: "System Design",
    scheduledTime: null,
    meetingLink: null,
    status: "pending"
  },
  {
    id: 3,
    interviewer: {
      id: 103,
      name: "Priya Sharma",
      image: "https://source.unsplash.com/random/100x100?portrait=3",
      rating: 4.9
    },
    interviewee: {
      id: 203,
      name: "David Kim",
      image: "https://source.unsplash.com/random/100x100?portrait=8",
      rating: 4.8
    },
    domain: "Backend Development",
    scheduledTime: "2024-03-15T15:00:00Z",
    meetingLink: "https://meet.google.com/xyz-uvwx-yz",
    status: "completed"
  }
];

export function YourInterviews() {
  const upcomingInterviews = mockInterviews.filter(
    interview => interview.status === 'scheduled' || interview.status === 'pending'
  );
  const recentInterviews = mockInterviews.filter(
    interview => interview.status === 'completed'
  );

  const InterviewCard = ({ interview }) => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <span className="text-lg font-medium text-gray-900">{interview.domain}</span>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          interview.status === 'scheduled' 
            ? 'bg-green-100 text-green-800'
            : interview.status === 'pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Interviewer */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Interviewer</h4>
          <div className="flex items-center gap-3">
            <img
              src={interview.interviewer.image}
              alt={interview.interviewer.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-900">{interview.interviewer.name}</p>
              <div className="flex items-center gap-1">
                <Star className="text-yellow-400 fill-current" size={14} />
                <span className="text-sm text-gray-600">{interview.interviewer.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interviewee */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Interviewee</h4>
          <div className="flex items-center gap-3">
            <img
              src={interview.interviewee.image}
              alt={interview.interviewee.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-900">{interview.interviewee.name}</p>
              <div className="flex items-center gap-1">
                <Star className="text-yellow-400 fill-current" size={14} />
                <span className="text-sm text-gray-600">{interview.interviewee.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {interview.scheduledTime && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={16} />
            <span>
              {new Date(interview.scheduledTime).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short'
              })}
            </span>
          </div>
          
          {interview.meetingLink && interview.status === 'scheduled' && (
            <a
              href={interview.meetingLink}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition"
            >
              <Video size={16} />
              Join Meeting
            </a>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
    <Navbar/>
    <Sidebar/>
    <div className="min-h-screen bg-gray-50 md:ml-64 ml-0 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upcoming Interviews */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Interviews</h2>
          <div className="grid gap-6">
            {upcomingInterviews.map(interview => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        </div>

        {/* Recent Interviews */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Interviews</h2>
          <div className="grid gap-6">
            {recentInterviews.map(interview => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
