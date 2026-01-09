import React, { useState, useEffect } from 'react'
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from '../../store/slice/user/userThunk';
const Login = () => {
  //
  const { isAuthenticated } = useSelector(
    (state) => state.userReducer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setloginData] = useState({
    username: "",
    password: ""
  })
  const handlechange = (e) => {
    setloginData({
      ...loginData,
      [e.target.name]: e.target.value
    })

  }
  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated, navigate]);


  const handleLogin = async () => {


    const response = await dispatch(loginUserThunk(loginData));
    if (response?.payload?.success) {
      navigate("/")
    }

  }
  return (
    <div className='w-full min-h-screen flex justify-center items-center p-4 selection:bg-primary/30'>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className='glass-card w-full max-w-md p-10 rounded-[2.5rem] flex flex-col gap-8 animate-float shadow-2xl relative overflow-hidden'>
        {/* Decorative background elements */}
        <div className='absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-3xl rounded-full' />
        <div className='absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 blur-3xl rounded-full' />

        <div className='text-center space-y-3 relative z-10'>
          <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-primary to-secondary drop-shadow-sm uppercase">
            Welcome Back
          </h1>
          <p className='text-white/50 text-sm font-medium tracking-wide'>Enter your credentials to access your chats</p>
        </div>

        <div className='space-y-6 relative z-10'>
          <div className='space-y-2'>
            <label className='text-[10px] font-bold text-white/40 ml-1 uppercase tracking-[0.2em]'>Username</label>
            <div className="relative group">
              <FaUserAlt className='absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors' />
              <input
                type="text"
                required
                placeholder="Enter your username"
                name='username'
                autoComplete="username"
                onChange={handlechange}
                className='w-full bg-white/5 border border-white/10 focus:border-primary/50 rounded-2xl py-3.5 pl-12 pr-4 outline-none transition-all focus:bg-white/10 placeholder:text-white/10 text-sm font-medium'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <label className='text-[10px] font-bold text-white/40 ml-1 uppercase tracking-[0.2em]'>Password</label>
              <button type="button" className='text-[10px] font-bold text-primary/60 hover:text-primary uppercase tracking-wider transition-colors'>Forgot?</button>
            </div>
            <div className="relative group">
              <RiLockPasswordFill className='absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors' />
              <input
                type="password"
                required
                name='password'
                placeholder="••••••••"
                autoComplete="current-password"
                onChange={handlechange}
                className='w-full bg-white/5 border border-white/10 focus:border-primary/50 rounded-2xl py-3.5 pl-12 pr-4 outline-none transition-all focus:bg-white/10 placeholder:text-white/10 text-sm font-medium'
              />
            </div>
          </div>
        </div>

        <div className='space-y-5 relative z-10'>
          <button
            type="submit"
            className="btn w-full h-14 bg-gradient-to-r from-primary to-secondary border-none text-white font-bold rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all pulse-glow"
          >
            Sign In
          </button>

          <p className='text-center text-xs text-white/30 font-medium'>
            Don't have an account?
            <Link to='/signup' className='text-white font-bold hover:text-primary transition-colors ml-1 border-b border-white/10 hover:border-primary'>Create Account</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login