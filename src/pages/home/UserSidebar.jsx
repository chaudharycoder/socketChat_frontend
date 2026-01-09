import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import User from './User.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { getOtherUsersThunk, getUserProfileThunk, logoutUserThunk } from '../../store/slice/user/userThunk.js';
import Avatar from '../../component/Avatar.jsx';

const UserSidebar = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const { otherUsers, userProfile } = useSelector((state) => state.userReducer);

  useEffect(() => {
    (async () => {
      dispatch(getUserProfileThunk());
      dispatch(getOtherUsersThunk());
    })();
  }, [dispatch])



  const handlelogout = async () => {
    dispatch(logoutUserThunk());
  }

  useEffect(() => {
    if (!searchValue) {
      setUsers(otherUsers);
    } else {
      setUsers(
        otherUsers.filter((user) => {
          return (
            user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.fullName
              .toLowerCase()
              .includes(searchValue.toLocaleLowerCase())
          );
        })
      );
    }
  }, [searchValue, otherUsers]);
  return (
    <div className='glass-sidebar min-w-[22rem] h-screen flex flex-col cursor-pointer transition-all duration-300'>
      <div className='p-6'>
        <h1 className='text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-center mb-6'>
          SOCKET TALK
        </h1>

        <div className='relative group'>
          <input
            type="search"
            onChange={(e) => setSearchValue(e.target.value)}
            required
            placeholder="Search conversations..."
            className="input input-bordered w-full pl-12 bg-white/5 focus:bg-white/10 border-white/10 focus:border-primary/50 transition-all rounded-xl"
          />
          <IoSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-white/30 group-focus-within:text-primary transition-colors' />
        </div>
      </div>

      <div className='flex-1 overflow-y-auto px-4 space-y-1 py-4'>
        <div className='text-xs font-bold text-white/30 px-4 mb-2 uppercase tracking-widest'>Recent Chats</div>
        {users?.map((userDetails) => {
          return <User key={userDetails?._id} userDetails={userDetails} />;
        })}
        {users?.length === 0 && (
          <div className='text-center py-10 text-white/20 italic'>No users found</div>
        )}
      </div>

      <div className='p-4 bg-black/20 border-t border-white/5'>
        <div className='flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/5 border border-white/5'>
          <div className='flex items-center gap-3'>
            <Avatar
              src={userProfile?.avatar}
              name={userProfile?.fullName || userProfile?.username}
              isOnline={true}
              imgClassName="ring-2 ring-primary ring-offset-2 ring-offset-black/20"
            />
            <div className='flex flex-col'>
              <span className='font-bold text-sm'>{userProfile?.username}</span>
              <span className='text-xs text-white/40'>Online</span>
            </div>
          </div>
          <button
            className="btn btn-ghost btn-sm text-error hover:bg-error/10"
            onClick={handlelogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserSidebar