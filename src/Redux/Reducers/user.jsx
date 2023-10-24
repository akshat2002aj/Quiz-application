import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
};

export const userReducer = createReducer(initialState, {
  AllUserRequest: (state) => {
    state.isLoading = true;
  },
  AllUserSuccess: (state, action) => {
    state.isLoading = false;
    state.users = action.payload;
  },
  AllUserFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  DeleteRequest: (state) => {
    state.isLoading = true;
  },
  DeleteSuccess: (state, action) => {
    state.isLoading = false;
    state.users = state.users.filter((i)=> i._id !== action.payload)
  },
  DeleteFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.successMessage = null;
  },
});