import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import logoutIcon from "../assets/logout.jpg";


const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {

  const { chats, setSelectedChat, theme, setTheme, user, setUser, navigate, createNewChat, axios, setChats, fetchUserChats, setToken, token } = useAppContext();
  const [search, setSearch] = useState('');

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    toast.success('Logged Out Successfully')
  }

  const deleteChat = async (e, chatId) => {
    try {
      e.stopPropagation()
      const confirm = window.confirm('Are u sure u want to delete this chat?')
      if (!confirm) return
      const { data } = await axios.post('/api/chat/delete', { chatId }, { headers: { Authorization: token } })
      if (data.success) {
        setChats(prev => prev.filter(chat => chat._id !== chatId))
        await fetchUserChats()
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

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
      <button onClick={createNewChat} className='flex justify-center items-center w-full py-2 mt-4 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md cursor-pointer' >
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
            <div onClick={() => { navigate('/'); setSelectedChat(chat); setIsMenuOpen(false) }}
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
                alt="" onClick={e => toast.promise(deleteChat(e, chat._id), { loading: 'deleting...' })}
              />
            </div>
          ))}
      </div>

      {/* User Profile Section at Bottom */}
      <div className='flex items-center justify-between gap-3 p-3 mt-4 border border-gray-300 dark:border-black/55 rounded-md'>
        <div className="flex items-center gap-3">
          <img src={assets.user_icon} className='w-7 rounded-full ' alt="" />
          <p className='flex-1 text-sm dark:text-primary truncate'>{user ? user.name : 'Login your account'}</p>
        </div>
        {user && (
          <img 
            onClick={logout} 
           src={assets.logoutIcon}  
            className='w-5 h-5 cursor-pointer dark:invert' 
            alt="Logout" 
          />
        )}
      </div>

      <img onClick={() => setIsMenuOpen(false)} src={assets.close_icon} className='absolute top-3 right-3 w-6 h-6 cursor-pointer md:hidden dark:invert' alt="" />

    </div>
  )
}

export default Sidebar;
