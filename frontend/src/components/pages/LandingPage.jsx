import React from 'react'
import { Users, Shuffle, Calendar, ArrowRight, Trophy, Star } from 'lucide-react';
import { topInterviewers } from '../../data/data';


const LandingPage = () => {
    
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        
      {/* Hero Section */}
      <div className="bg-indigo-600/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Master Your Tech Interviews
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Connect with expert interviewers or practice with peers. Your dream job awaits.
            </p>
            <div className="flex justify-center gap-4">
                <button className="bg-white cursor-pointer text-indigo-600/90 px-6 py-3 rounded-lg font-semibold hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center gap-2 shadow-md"> 
                 Get Started 
                 <ArrowRight size={20} />
                </button>

              <button className="border-2 border-gray-300 cursor-pointer px-6 py-3 rounded-lg text-white font-semibold hover:bg-indigo-700/80  transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl bg-white my-8 rounded-3xl shadow-md mx-auto px-4 sm:px-6 lg:px-8 py-15">
      <div className="text-center mb-15">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Schedule your Interview</h2>
            <p className="text-gray-600">Select On the Basis Of Your Needs</p>
          </div>
        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-gray-100 p-6 cursor-pointer rounded-xl shadow-sm hover:shadow-md transition">
            <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <Users className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Interviewers</h3>
            <p className="text-gray-600">Connect with experienced professionals from top tech companies.</p>
          </div>
          
          <div className="bg-gray-100 p-6 cursor-pointer rounded-xl shadow-sm hover:shadow-md transition">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Shuffle className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Random Matching</h3>
            <p className="text-gray-600">Get paired with random interviewers to diversify your practice.</p>
          </div>
          
          <div className="bg-gray-100 p-6 cursor-pointer rounded-xl shadow-sm hover:shadow-md transition">
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="text-purple-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
            <p className="text-gray-600">Book interviews at your convenience with our flexible scheduling.</p>
          </div>
        </div>
      </div>

      {/* Top Interviewers Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Interviewers</h2>
            <p className="text-gray-600">Learn from the Experienced one's</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {topInterviewers.map((interviewer, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-xl">
                <div className="flex items-center justify-between gap-4 mb-4">
                  
                  <div>
                    <h3 className="font-semibold text-lg">{interviewer.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span className="text-gray-600">{interviewer.rating}</span>
                    </div>
                  </div>
                  <div className="h-16 w-16 bg-gray-200 rounded-full overflow-hidden">
                    <img 
                      src={interviewer.img}

                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Trophy  size={16} style={{ color: "rgb(234, 179, 8)" }} />
                    <span>{interviewer.interviews} interviews conducted</span>
                  </div>
                  <p className="text-gray-600">{interviewer.expertise}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-gray-900 cursor-pointer text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
              View All Interviewers
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-indigo-600/90 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to ace your next interview?</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have improved their interviewing skills through our platform.
          </p>
          <button className="bg-white cursor-pointer text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition">
            Start Practicing Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
