import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import ChatBox from './components/ChatBox'
import { assets } from './assets/assets'
import './assets/prism.css'
import { useAppContext } from './context/AppContext'
import Login from './pages/Login'

const App = () => {
  const { user } = useAppContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      {!isMenuOpen && (
        <img
          src={assets.menu_icon}
          className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden dark:invert z-50"
          onClick={() => setIsMenuOpen(true)}
          alt="menu"
        />
      )}

      <div className="flex h-screen w-screen overflow-hidden">
        {/* If user logged in */}
        {user ? (
          <>
            {/* Sidebar Mobile */}
            {isMenuOpen && (
              <div className="w-[280px] border-r md:hidden">
                <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
              </div>
            )}

            {/* Sidebar Desktop */}
            <div className="w-[280px] border-r hidden md:block">
              <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            </div>

            {/* Routes */}
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<ChatBox />} />
              </Routes>
            </div>
          </>
        ) : (
          // If user not logged in
          <div className="bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen">
            <Login />
          </div>
        )}
      </div>
    </>
  )
}

export default App
