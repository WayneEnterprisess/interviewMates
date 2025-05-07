import React from 'react';
import { User, Calendar, Trophy, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import axios from 'axios';
import { BASE_URL } from '../../utils/url';

export function Sidebar() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async ()=>{
    try {
      console.log("entered")
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


  const menuItems = [
    { icon: User, label: 'Your Profile', href: '/userprofile' },
    { icon: Calendar, label: 'Your Interviews', href: '/your-interviews' },
    { icon: Trophy, label: 'Leaderboards', href: '/leaderboards' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <div className="w-64 bg-white h-screen z-50 hidden md:inline-block fixed top-0  border-gray-200">
      <div className="p- ">
        <div className=' bg-indigo-600/90 mx-6 my-5  w-50 text-center rounded-4xl'>
          <h1 className="text-xl font-bold text-white py-3 mb-8">InterviewPro</h1>
        </div>

        <nav className="space-y-6  pt-5 pl-6">
          {menuItems.map((item) => (
            <div
              key={item.label}
              onClick={()=>navigate(item.href)}
              className="flex items-center cursor-pointer  gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition group"
            >
              <item.icon
                size={20}
                className="text-gray-400 group-hover:text-indigo-600"
              />
              <span className="font-semibold group-hover:text-indigo-600">
                {item.label}
              </span>
            </div>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-5 left-0 right-0 p-6">
        <button className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 transition group w-full cursor-pointer" onClick={handleLogout}>
          <LogOut
            size={20}
            className="text-gray-400 group-hover:text-red-600"
          />
          <span className="font-medium group-hover:text-red-600">
            Logout
          </span>
        </button>
      </div>
    </div>
    
  );
}
