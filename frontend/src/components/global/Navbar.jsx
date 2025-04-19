import React, { useState } from 'react'
import { Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../utils/url';


const Navbar = () => {

  const dispatch = useDispatch();

  const isUser = useSelector((state)=> state.auth.user);
  const navigate = useNavigate();

  const handleLogout = async ()=>{
    try {
      const res = await axios.post(`${BASE_URL}/api/users/logout`, {}, {
        withCredentials: true,
      })
      dispatch(logout()); 
      localStorage.clear();
      console.log("user logged out",res)
      navigate('/login')
    } catch (error) {
      throw new Error("error while logout");
      
    }
  }


  const [isMenuOpen,setIsMenuOpen]=useState(false);
  return (
    <nav className=" mx-auto bg-indigo-600/90   sm:py-4">
      <div className="max-w-4xl  sm:rounded-4xl bg-white  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-indigo-600">InterviewPro</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-indigo-500">Find Interviewers</a>
            <a href="#" className="text-gray-600 hover:text-indigo-500">Random Match</a>
            <p onClick={()=>navigate('/userprofile')} className="text-gray-600 hover:text-indigo-500">Profile</p>
            <a href="#" className="text-gray-600 hover:text-indigo-500">About</a>
            {!isUser && <button className="bg-indigo-600 text-white px-4 py-2 rounded-3xl hover:bg-indigo-700 transition" onClick={()=>navigate('/login')}>
              Sign In
            </button>}

            {isUser && <button className="bg-indigo-600 text-white px-4 py-2 rounded-3xl hover:bg-indigo-700 transition" onClick={handleLogout}>
              Log Out
            </button>}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                Find Interviewers
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                Random Match
              </a>
              <a
                href="/userProfile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                About
              </a>
              <button className="w-full mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition" onClick={()=>navigate("/login")}>
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
