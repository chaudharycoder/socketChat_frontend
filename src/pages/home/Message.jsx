import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Avatar from '../../component/Avatar.jsx';

const Message = ({ messageDetails }) => {
  const { userProfile, selectedUser } = useSelector((state) => state.userReducer)
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  const updatedAt = new Date(messageDetails.createdAt);

  const formattedTime = updatedAt.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  const isMe = userProfile?._id === messageDetails?.senderId;

  return (
    <div ref={messageRef} className={`chat ${isMe ? 'chat-end' : 'chat-start'} group mb-2`}>
      <Avatar
        src={isMe ? userProfile?.avatar : selectedUser?.avatar}
        name={isMe ? (userProfile?.fullName || userProfile?.username) : (selectedUser?.fullName || selectedUser?.username)}
        size="w-8"
        className="chat-image"
        imgClassName="rounded-lg ring-1 ring-white/10"
      />

      <div className="chat-header mb-1">
        <time className="text-[10px] font-bold opacity-0 group-hover:opacity-30 transition-opacity uppercase tracking-widest ml-1">
          {formattedTime}
        </time>
      </div>

      <div className={`chat-bubble text-sm font-medium shadow-lg min-h-0 py-2 px-4
        ${isMe
          ? 'bg-gradient-to-br from-primary to-secondary text-primary-content rounded-tr-none'
          : 'bg-white/10 text-white backdrop-blur-sm border border-white/5 rounded-tl-none'
        }`}>
        {messageDetails?.message}
      </div>

      <div className="chat-footer opacity-0 group-hover:opacity-30 text-[10px] mt-1 transition-opacity">
        {isMe ? 'Sent & Delivered' : 'Received'}
      </div>
    </div>
  )
}

export default Message