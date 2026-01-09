import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../component/utilities/axiosInstance";

export const sendMessageThunk = createAsyncThunk(
  "message/send",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.post(`/message/send/${receiverId}`, {
        message
      });


      return response.data;
    } catch (error) {

      const errorOutput = error?.response?.data?.errMessage;

      return rejectWithValue(errorOutput);
    }
  }
);
export const getMessageThunk = createAsyncThunk(
  "message/get-message",
  async ({ otherParticipantId }, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.get(`/message/get-message/${otherParticipantId}`);


      return response.data;
    } catch (error) {

      const errorOutput = error?.response?.data?.errMessage;

      return rejectWithValue(errorOutput);
    }
  }
);
