import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user/userSlice";
import messageReducer from './slice/message/messageSlice'
import socketReducer from "./slice/socket/socketSlice";
export const store = configureStore({
  reducer: { 
    userReducer,
    messageReducer,
    socketReducer
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({
      serializableCheck: {
        ignoredPaths: ["socketReducer.socket"],
      },
    }),
});
