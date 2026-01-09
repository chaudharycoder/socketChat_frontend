import React from 'react'
import MessageContainer from './MessageContainer.jsx'
import UserSidebar from './UserSidebar.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { initializeSocket, setOnlineUsers } from '../../store/slice/socket/socketSlice.js';
import { setNewMessage } from '../../store/slice/message/messageSlice.js';
import { useEffect } from 'react';

const Home = () => {

  const { isAuthenticated, userProfile } = useSelector((state) => state.userReducer);
  const { socket } = useSelector((state) => state.socketReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isAuthenticated) { return }
    dispatch(initializeSocket(userProfile?._id))
  }, [isAuthenticated, dispatch, userProfile?._id]);


  useEffect(() => {
    if (!socket) return;

    socket.on("onlineUsers", (onlineUsers) => {

      dispatch(setOnlineUsers(onlineUsers));
    });
    socket.on("newMessage", (newMessage) => {
      dispatch(setNewMessage(newMessage));
    });
    return () => {
      socket.close()
    }
  }, [socket, dispatch]);




  return (
    <div className='flex'>
      <UserSidebar />
      <MessageContainer />
    </div>
  )
}

export default Home