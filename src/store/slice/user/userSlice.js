import { createSlice } from '@reduxjs/toolkit'
import { loginUserThunk, logoutUserThunk, registerUserThunk, getUserProfileThunk, getOtherUsersThunk } from './userThunk.js';


export const userSlice = createSlice(
  {
    name: 'user',
    initialState: {
      isAuthenticated: false,
      screenLoading: true,
      userProfile: null,
      buttonLoading: false,
      otherUsers: null,
      selectedUser: JSON.parse(localStorage.getItem("selectedUser")),
    },
    reducers: { //synchronous functions only
      setSelectedUser: (state, action) => {

        localStorage.setItem("selectedUser", JSON.stringify(action?.payload));

        state.selectedUser = action.payload;

      },
    },

    extraReducers: (builder) => {
      //get-other-user
      builder.addCase(getOtherUsersThunk.pending, (state) => {

        state.screenLoading = true;

      });
      builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {

        state.screenLoading = false;
        state.otherUsers = action.payload?.responseData;
      });
      builder.addCase(getOtherUsersThunk.rejected, (state) => {

        state.screenLoading = false;
      });
      //get-profile
      builder.addCase(getUserProfileThunk.pending, (state) => {


        state.screenLoading = true;
      });
      builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {

        state.isAuthenticated = true;
        state.screenLoading = false;

        state.userProfile = action.payload?.responseData;

      });
      builder.addCase(getUserProfileThunk.rejected, (state) => {

        state.screenLoading = false;
      });
      //logout
      builder.addCase(logoutUserThunk.pending, (state) => {

        state.buttonLoading = true
      }),
        builder.addCase(logoutUserThunk.fulfilled, (state) => {

          state.userProfile = null;
          state.buttonLoading = false
          state.isAuthenticated = false
          state.screenLoading = false;
          state.otherUsers = null,
            state.selectedUser = null,
            localStorage.clear();
        }),
        builder.addCase(logoutUserThunk.rejected, (state) => {

          state.buttonLoading = false
        })
      //registration
      builder.addCase(registerUserThunk.pending, (state) => {

        state.isAuthenticated = false;
        state.buttonLoading = true
      }),
        builder.addCase(registerUserThunk.fulfilled, (state, action) => {

          state.userProfile = action.payload?.responseData?.user;
          state.buttonLoading = false;
          state.isAuthenticated = true
        }),
        builder.addCase(registerUserThunk.rejected, (state) => {

          state.buttonLoading = false
        })
      //login user
      builder.addCase(loginUserThunk.pending, (state) => {

        state.isAuthenticated = false;
        state.buttonLoading = true;
      }),
        builder.addCase(loginUserThunk.fulfilled, (state, action) => {

          state.userProfile = action.payload?.responseData?.user;
          state.buttonLoading = false
          state.isAuthenticated = true;
        }),
        builder.addCase(loginUserThunk.rejected, (state) => {

          state.buttonLoading = false
          state.isAuthenticated = false
        })
    }
  }
)
// Action creators are generated for each case reducer function



// Action creators are generated for each case reducer function
export const { setSelectedUser } = userSlice.actions

export default userSlice.reducer
