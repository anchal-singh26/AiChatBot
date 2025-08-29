import React, { useEffect, useState, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'
import toast from 'react-hot-toast'

const ChatBox = () => {
  const { selectedChat, theme, user, axios, token,setUser } = useAppContext()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState('text')
  const [isPublished, setIsPublished] = useState(false)
  const [attachedFile, setAttachedFile] = useState(null) 
  const timeoutRef = useRef(null) 
  
   const onSubmit = async (e) => {
    try {
      e.preventDefault()
      if (!user) return toast('Login to Send message')
      setLoading(true)
      const promptCopy = prompt
      setPrompt('')
      setMessages(prev => [...prev, { role: 'user', content: prompt, timestamp: Date.now(), isImage: false }])

      const { data } = await axios.post(
        `/api/message/${mode}`,
        { chatId: selectedChat._id, prompt, isPublished },
        { headers: { Authorization: token } }
      )

      if (data.success) {
        setMessages(prev => [...prev, data.reply])
      } else {
        toast.error(data.message)
        setPrompt(promptCopy)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setPrompt('')
      setLoading(false)
    }

    
    setAttachedFile(null) 
    setLoading(true)

    timeoutRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            mode === "text"
              ? `AI response to: ${prompt || attachedFile?.name}`
              : "https://via.placeholder.com/300",
          timestamp: new Date(),
          isImage: mode === "image"
        }
      ])
      setLoading(false)
      timeoutRef.current = null
    }, 2000)
  }


  
  const stopGeneration = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

  return (
    <div className="h-full flex flex-col m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40">

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-5">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-primary">
            <img
              src={theme === "light" ? assets.logo : assets.logo}
              alt=""
              className="w-full max-w-56 sm:max-w-68"
            />
            <p className="mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-black">
              Ask me anything
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}

        {/* Typing Indicator */}
        {loading && (
          <div className="flex my-4 justify-start">
            <img src={assets.bot_icon} alt="AI" className="w-8 h-8 rounded-full mr-2" />
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/20 dark:bg-[#573176]/30 border border-[#80609F]/30 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-white animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-white animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      {mode === 'image' && (
        <label className='inline-flex items-center gap-2 mb-3 text-sm mx-auto'>
          <p className='text-xs '>Publish generated Image to Community</p>
          <input
            type="checkbox"
            className='cursor-pointer'
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </label>
      )}

      {/* Prompt Input Box */}
      <div className="w-full flex justify-start mb-20">
        <form
          onSubmit={onSubmit}
          className="bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 
                     rounded-full w-full max-w-2xl p-3 pl-4 flex gap-3 items-center"
        >
          {/* Mode select */}
          <select
            onChange={(e) => setMode(e.target.value)}
            value={mode}
            className="text-sm pl-3 pr-2 outline-none bg-transparent"
          >
            <option className="dark:bg-purple-900" value="text">Text</option>
            <option className="dark:bg-purple-900" value="image">Image</option>
          </select>

          {/* File input with 🗂️ icon */}
          <label className="cursor-pointer text-xl">
            🗂️
            <input
              type="file"
              className="hidden"
              onChange={(e) => setAttachedFile(e.target.files[0])}
            />
          </label>

          {/* Attached File Preview (filename + remove ❌) */}
          {attachedFile && (
            <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">
              <span className="truncate max-w-[120px]">{attachedFile.name}</span>
              <button
                type="button"
                onClick={() => setAttachedFile(null)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </div>
          )}

          {/* Prompt input */}
          <input
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            type="text"
            placeholder="Type your prompt here..."
            className="flex-1 w-full text-sm outline-none bg-transparent"
          />

          {/* Buttons */}
          {!loading ? (
            <button type="submit">
              <img
                src={assets.send_icon}
                className="w-6 cursor-pointer"
                alt="send"
              />
            </button>
          ) : (
            <button type="button" onClick={stopGeneration}>
              <img
                src={assets.stop_icon}
                className="w-6 cursor-pointer"
                alt="stop"
              />
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default ChatBox
