import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const initialState = {
  socket: null,
  onlineUsers: null,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    initializeSocket: (state, action) => {

      const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const SOCKET_URL = isDev ? "http://localhost:5000" : "https://socketchat-backend-1.onrender.com";

      const socket = io(SOCKET_URL, {
        query: {
          userId: action.payload,
        },
      });
      state.socket = socket;
    },

    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { initializeSocket, setOnlineUsers } = socketSlice.actions;

export default socketSlice.reducer;