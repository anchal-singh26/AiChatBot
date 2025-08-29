import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'

const Message = ({ message }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [message.content])

  return (
    <div className={`flex my-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {/* Avatar */}
      {message.role === 'assistant' && (
        <img src={assets.bot_icon} alt="AI" className="w-8 h-8 rounded-full mr-2" />
      )}

      <div
        className={`flex flex-col gap-2 p-3 px-4 rounded-lg max-w-[85%] sm:max-w-2xl
        ${message.role === 'user'
          ? 'bg-slate-50 dark:bg-[#573176]/30 border border-[#80609F]/30 text-right'
          : 'bg-primary/20 dark:bg-[#573176]/30 border border-[#80609F]/30 text-left'
        }`}
      >
        {/* Role indicator */}
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          {message.role === 'user' ? "You" : "AI Assistant"}
        </span>

        {/* Content */}
        {message.file ? (
          <a
            href={URL.createObjectURL(message.file)}
            download={message.file.name}
            className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 underline"
          >
            🗂️ {message.file.name}
          </a>
        ) : message.isImage ? (
          <img
            src={message.content}
            className="w-full max-w-md mt-2 rounded-md"
            alt="AI response"
          />
        ) : (
          <div className="text-sm dark:text-primary reset-tw">
            <Markdown>{message.content}</Markdown>
          </div>
        )}

        {/* Metadata */}
        <span className="text-xs text-gray-400 dark:text-[#B1A6C0] self-end">
          {moment(message.timestamp).format("HH:mm A")} • {moment(message.timestamp).fromNow()}
        </span>
      </div>

      {message.role === 'user' && (
        <img src={assets.user_icon} alt="User" className="w-8 h-8 rounded-full ml-2" />
      )}
    </div>
  )
}

export default Message
