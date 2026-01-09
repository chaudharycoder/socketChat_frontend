import React, { useEffect } from 'react'
import User from './User.jsx'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux';
import { getMessageThunk } from '../../store/slice/message/messageThunk.js';
import SendMessage from './SendMessage.jsx';
import Avatar from '../../component/Avatar.jsx';

const MessageContainer = () => {
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { messages } = useSelector((state) => state.messageReducer);
  const { onlineUsers } = useSelector((state) => state.socketReducer);
  const isonline = onlineUsers?.includes(selectedUser?._id)


  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedUser) {
      dispatch(getMessageThunk({ otherParticipantId: selectedUser?._id }))
    }

  }, [selectedUser, dispatch])
  return (
    <div className='flex-1 flex flex-col h-screen relative bg-gradient-to-b from-white/[0.02] to-transparent'>
      {!selectedUser ? (
        <div className='flex-1 flex flex-col items-center justify-center text-center p-10'>
          <div className='w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-pulse'>
            <span className='text-5xl'>💬</span>
          </div>
          <h2 className='text-3xl font-bold mb-2'>Welcome to SocketTalk</h2>
          <p className='text-white/40 max-w-xs'>Select a contact from the sidebar to start a secure, real-time conversation.</p>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className='p-4 border-b border-white/5 bg-black/20 backdrop-blur-md flex items-center gap-4 sticky top-0 z-10'>
            <Avatar
              src={selectedUser?.avatar}
              name={selectedUser?.fullName || selectedUser?.username}
              isOnline={isonline}
              imgClassName="ring-2 ring-primary/30 ring-offset-2 ring-offset-black/20"
            />
            <div className='flex flex-col'>
              <h2 className='font-bold text-lg leading-tight'>{selectedUser?.fullName}</h2>
              <span className='text-xs text-primary font-medium'>Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className='flex-1 overflow-y-auto p-6 space-y-4'>
            {messages?.length > 0 ? (
              messages.map((message) => (
                <Message key={message?._id} messageDetails={message} />
              ))
            ) : (
              <div className='h-full flex flex-col items-center justify-center opacity-20'>
                <span className='text-6xl mb-4'>✨</span>
                <p>Start your first message!</p>
              </div>
            )}
          </div>

          {/* Footer Input */}
          <div className='p-4 bg-gradient-to-t from-black/20 to-transparent'>
            <SendMessage />
          </div>
        </>
      )}
    </div>
  )
}

export default MessageContainer