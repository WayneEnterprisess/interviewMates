import React from 'react';
import { User, Calendar, Trophy, Settings, LogOut } from 'lucide-react';

export function Sidebar() {
  const menuItems = [
    { icon: User, label: 'Your Profile', href: '/profile' },
    { icon: Calendar, label: 'Your Interviews', href: '/interviews' },
    { icon: Trophy, label: 'Leaderboards', href: '/leaderboards' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    // <div className="w-64 bg-white h-screen hidden md:block md:fixed   left-0 top-24 border-r border-gray-200">
    //   <div className="p-6">
    //     {/* <h1 className="text-xl font-bold text-indigo-600 mb-8">InterviewPro</h1> */}

    //     <nav className="space-y-6 pt-5">
    //       {menuItems.map((item) => (
    //         <a
    //           key={item.label}
    //           href={item.href}
    //           className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition group"
    //         >
    //           <item.icon
    //             size={20}
    //             className="text-gray-400 group-hover:text-indigo-600"
    //           />
    //           <span className="font-semibold group-hover:text-indigo-600">
    //             {item.label}
    //           </span>
    //         </a>
    //       ))}
    //     </nav>
    //   </div>

    //   <div className="absolute bottom-25 left-0 right-0 p-6">
    //     <button className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 transition group w-full">
    //       <LogOut
    //         size={20}
    //         className="text-gray-400 group-hover:text-red-600"
    //       />
    //       <span className="font-medium group-hover:text-red-600">
    //         Logout
    //       </span>
    //     </button>
    //   </div>
    // </div>
    <></>
  );
}
