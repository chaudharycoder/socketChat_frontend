import React, { useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk } from '../../store/slice/message/messageThunk';
const SendMessage = () => {
    const dispatch = useDispatch();
    const [message, setmessage] = useState("");
    const { selectedUser } = useSelector((state) => state.userReducer)
    const handleSend = (e) => {
        e.preventDefault();
        dispatch(sendMessageThunk({
            receiverId: selectedUser?._id,
            message
        }))
        setmessage("")
    }

    const handleChangeInput = (e) => {

        setmessage(e.target.value);
    }
    return (
        <form onSubmit={handleSend} className='max-w-4xl mx-auto'>
            <div className='relative flex items-center gap-2 bg-white/5 border border-white/10 p-2 pl-4 rounded-2xl focus-within:bg-white/10 focus-within:border-primary/50 transition-all shadow-xl backdrop-blur-sm'>
                <input
                    type="text"
                    placeholder="Write your message..."
                    value={message}
                    className="flex-1 bg-transparent border-none outline-none text-sm py-2"
                    onChange={handleChangeInput}
                />
                <button
                    type='submit'
                    disabled={!message.trim()}
                    className="btn btn-primary btn-circle btn-sm shadow-lg disabled:bg-white/5 disabled:text-white/20 transition-all active:scale-95"
                >
                    <IoIosSend className='text-lg' />
                </button>
            </div>
        </form>
    )
}

export default SendMessage 