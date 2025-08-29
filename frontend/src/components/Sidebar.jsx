import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isMenuOpen, setIsMenuOpen}) => {

  const { chats, setSelectedChat, theme, setTheme, user, setUser } = useAppContext();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  return (
    <div className={`flex flex-col h-screen p-5 light:bg-gradient-to-b from-[#f8f9fa] to-[#FFFFF0] border-r border-[#80609F]/30 backdrop-blue-3xl transition-all duration-500 fixed top-0 left-0 z-50 ${!isMenuOpen && 'max-md:-translate-x-full'}`}>

      {/* Logo and Text */}
      <div className="flex items-center space-x-3 mb-3">
        <img
          src={theme === 'dark' ? assets.logo : assets.logo}
          alt="Logo"
          className="w-12 h-12 object-contain"
        />
        <span className="text-2xl font-bold text-purple-700 dark:text-gradientblack">
          AI CHATBOT
        </span>
      </div>

      {/* New Chat Button */}
      <button className='flex justify-center items-center w-full py-2 mt-4 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md cursor-pointer' >
        <span className='mr-2 text-xl'>+</span>New Chat
      </button>

      {/* Search Conversation */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-100 shadow-sm">
        <img
          src={assets.search_icon}
          alt="Search"
          className="w-5 h-5 opacity-70 dark:invert"
        />
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search Conversations"
          className="flex-1 text-sm bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-700 dark:text-gray-200 outline-none"
        />
      </div>

      {/* Recent Chats */}
      {chats.length > 0 && <p className="mt-4 text-sm">Recent chats</p>}

      <div className="flex-1 overflow-y-scroll mt-3 text-sm space-y-3">
        {chats
          .filter((chat) =>
            chat.messages[0]
              ? chat.messages[0]?.content
                .toLowerCase()
                .includes(search.toLowerCase())
              : chat.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((chat) => (
            <div onClick={() => {navigate('/'); setSelectedChat(chat); setIsMenuOpen(false)}}
              key={chat._id}
              className="p-2 px-4 flex justify-between items-center rounded-md cursor-pointer 
                   bg-white dark:bg-[#57317C]/10 border border-gray-200 dark:border-[#80609F]/15 
                   hover:bg-gray-100 dark:hover:bg-[#80609F]/20 group transition"
            >
              <div>
                <p className="truncate w-full">
                  {chat.messages.length > 0
                    ? chat.messages[0].content.slice(0, 32)
                    : chat.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-[#B1A6C0]">
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>

              <img
                src={assets.bin_icon}
                className="hidden group-hover:block w-4 h-4 opacity-70 hover:opacity-100 
                     transition cursor-pointer dark:invert"
                alt="Delete"
              />
            </div>
          ))}
      </div>

      {/* User Profile Section at Bottom */}
      {user && (
        <div className="mt-auto flex items-center justify-between p-3 bg-white dark:bg-[#57317C]/10 rounded-md shadow-sm">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar || assets.profile_icon}
              alt="User"
              className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-700"
            />
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setUser(null);
              navigate('/');
            }}
            className="text-xs text-red-500 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      )}

      <img onClick={() => setIsMenuOpen(false)} src={assets.close_icon} className='absolute top-3 right-3 w-6 h-6 cursor-pointer md:hidden dark:invert' alt="" />

    </div>
  )
}

export default Sidebar;
