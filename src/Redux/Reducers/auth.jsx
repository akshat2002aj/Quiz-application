import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: true,
  loader: false,
};

export const authReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LogoutUserRequest: (state) => {
    state.loading = true;
  },
  LogoutUserSuccess: (state, action) => {
    state.isAuthenticated = false;
    state.loading = false;
    state.user = action.payload;
  },
  LogoutUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LoginUserRequest: (state) => {
    state.loader = true;
  },
  LoginUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loader = false;
    state.user = action.payload;
  },
  LoginUserFail: (state, action) => {
    state.loader = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.successMessage = null;
  },
});