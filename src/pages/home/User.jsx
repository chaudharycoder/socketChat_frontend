import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../../store/slice/user/userSlice.js';
import Avatar from '../../component/Avatar.jsx';

const User = ({ userDetails }) => {

  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { onlineUsers } = useSelector((state) => state.socketReducer);
  const isonline = onlineUsers?.includes(userDetails?._id)



  const handleUserClick = () => {
    dispatch(setSelectedUser(userDetails));
  };
  return (
    <div
      className={`flex gap-4 p-3 mx-2 rounded-2xl items-center cursor-pointer transition-all duration-200 group
        ${userDetails?._id === selectedUser?._id
          ? 'bg-primary/20 border border-primary/20'
          : 'hover:bg-white/5 border border-transparent'
        }`}
      onClick={handleUserClick}
    >
      <Avatar
        src={userDetails?.avatar}
        name={userDetails?.fullName || userDetails?.username}
        isOnline={isonline}
        imgClassName="group-hover:scale-110"
      />

      <div className='flex flex-col flex-1 truncate'>
        <h2 className={`font-bold transition-colors ${userDetails?._id === selectedUser?._id ? 'text-primary' : 'text-white/80 group-hover:text-white'}`}>
          {userDetails?.fullName}
        </h2>
        <p className='text-xs text-white/40 truncate'>@{userDetails?.username}</p>
      </div>
    </div>
  )
}

export default User