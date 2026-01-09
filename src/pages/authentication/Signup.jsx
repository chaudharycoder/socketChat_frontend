import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserThunk } from "../../store/slice/user/userThunk";
import toast from "react-hot-toast";
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(
    (state) => state.userReducer
  );
  const [signup, setsignup] = useState({
    fullName: "",
    username: "",
    password: "",
    repassword: "",
    gender: "male"
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated, navigate]);
  const handleinputchange = (e) => {
    setsignup({ ...signup, [e.target.name]: e.target.value });

  };
  const handleRegistration = async () => {
    if (signup.password !== signup.repassword) {
      return toast.error("password mismatch")
    }
    const response = await dispatch(registerUserThunk(signup));
    if (response?.payload?.success) {
      navigate("/")
    }
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center p-4 selection:bg-primary/30">
      <form onSubmit={(e) => { e.preventDefault(); handleRegistration(); }} className="glass-card w-full max-w-xl p-10 rounded-[2.5rem] flex flex-col gap-8 animate-float shadow-2xl relative overflow-hidden">
        {/* Decorative background elements */}
        <div className='absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-3xl rounded-full' />
        <div className='absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 blur-3xl rounded-full' />

        <div className='text-center space-y-3 relative z-10'>
          <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-primary to-secondary drop-shadow-sm uppercase">
            Join the Chat
          </h1>
          <p className='text-white/50 text-sm font-medium tracking-wide'>Create your account to start secure messaging</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className='space-y-2'>
            <label className='text-[10px] font-bold text-white/40 ml-1 uppercase tracking-[0.2em]'>Full Name</label>
            <div className="relative group">
              <FaUserAlt className='absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors' />
              <input
                type="text"
                name="fullName"
                required
                placeholder="John Doe"
                onChange={handleinputchange}
                className='w-full bg-white/5 border border-white/10 focus:border-primary/50 rounded-2xl py-3 pl-12 pr-4 outline-none transition-all focus:bg-white/10 placeholder:text-white/10 text-sm font-medium'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-[10px] font-bold text-white/40 ml-1 uppercase tracking-[0.2em]'>Username</label>
            <div className="relative group">
              <FaUserAlt className='absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors' />
              <input
                type="text"
                name="username"
                required
                placeholder="johndoe123"
                onChange={handleinputchange}
                className='w-full bg-white/5 border border-white/10 focus:border-primary/50 rounded-2xl py-3 pl-12 pr-4 outline-none transition-all focus:bg-white/10 placeholder:text-white/10 text-sm font-medium'
              />
            </div>
          </div>
        </div>

        <div className='space-y-2 relative z-10'>
          <label className='text-[10px] font-bold text-white/40 ml-1 uppercase tracking-[0.2em]'>Gender Selection</label>
          <div className="flex gap-6 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="gender"
                value="male"
                className="radio radio-primary radio-sm transition-all"
                onChange={handleinputchange}
                defaultChecked
              />
              <span className="text-xs font-bold text-white/40 group-hover:text-white/80 transition-colors uppercase tracking-widest">Male</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="gender"
                value="female"
                className="radio radio-primary radio-sm transition-all"
                onChange={handleinputchange}
              />
              <span className="text-xs font-bold text-white/40 group-hover:text-white/80 transition-colors uppercase tracking-widest">Female</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className='space-y-2'>
            <label className='text-[10px] font-bold text-white/40 ml-1 uppercase tracking-[0.2em]'>Password</label>
            <div className="relative group">
              <RiLockPasswordFill className='absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors' />
              <input
                type="password"
                name="password"
                required
                autoComplete="new-password"
                onChange={handleinputchange}
                placeholder="••••••••"
                className='w-full bg-white/5 border border-white/10 focus:border-primary/50 rounded-2xl py-3 pl-12 pr-4 outline-none transition-all focus:bg-white/10 placeholder:text-white/10 text-sm font-medium'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-[10px] font-bold text-white/40 ml-1 uppercase tracking-[0.2em]'>Verify Password</label>
            <div className="relative group">
              <RiLockPasswordFill className='absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors' />
              <input
                type="password"
                required
                name="repassword"
                autoComplete="new-password"
                placeholder="••••••••"
                onChange={handleinputchange}
                className='w-full bg-white/5 border border-white/10 focus:border-primary/50 rounded-2xl py-3 pl-12 pr-4 outline-none transition-all focus:bg-white/10 placeholder:text-white/10 text-sm font-medium'
              />
            </div>
          </div>
        </div>

        <div className='space-y-5 relative z-10'>
          <button
            type="submit"
            className="btn w-full h-14 bg-gradient-to-r from-primary to-secondary border-none text-white font-bold rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all pulse-glow"
          >
            Create My Account
          </button>

          <p className="text-center text-xs text-white/30 font-medium">
            Already have an account?
            <Link to="/login" className="text-white font-bold hover:text-primary transition-colors ml-1 border-b border-white/10 hover:border-primary">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Signup;
