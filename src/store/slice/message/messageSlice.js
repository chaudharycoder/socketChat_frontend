import { createSlice } from '@reduxjs/toolkit'

import { sendMessageThunk, getMessageThunk } from './messageThunk';


export const messageSlice = createSlice(
  {
    name: 'message',
    initialState: {
      messages: null,
      buttonLoading: false

    },
    reducers: { //synchronous functions only
      setNewMessage: (state, action) => {
        const oldMessages = state.messages ?? [];
        state.messages = [...oldMessages, action.payload];
      },
    },

    extraReducers: (builder) => {
      //send-message
      builder.addCase(sendMessageThunk.pending, (state) => {

        state.buttonLoading = true;

      });
      builder.addCase(sendMessageThunk.fulfilled, (state, action) => {

        state.buttonLoading = false;
        state.messages = [...state.messages, action.payload?.responseData]
      });
      builder.addCase(sendMessageThunk.rejected, (state) => {

        state.buttonLoading = false;
      });
      //get-message
      builder.addCase(getMessageThunk.pending, (state) => {

        state.buttonLoading = true;

      });
      builder.addCase(getMessageThunk.fulfilled, (state, action) => {


        state.messages = action.payload?.responseData?.message
        state.buttonLoading = false;
        // state.otherUsers = action.payload?.responseData;
      });
      builder.addCase(getMessageThunk.rejected, (state) => {

        state.buttonLoading = false;
      });


    }
  }
)
// Action creators are generated for each case reducer function



// Action creators are generated for each case reducer function
export const { setNewMessage } = messageSlice.actions

export default messageSlice.reducer
