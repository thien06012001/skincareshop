import { createReducer } from '@reduxjs/toolkit'

interface UserState {
    isAuthenticated: boolean,
    loading: boolean,
    user:any,
    error:any
  }
const initialState = {
    isAuthenticated: false,
    // loading: false,
    // user: null,
    // error: null,
} as UserState;

export const userReducer = createReducer(initialState, {
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
    clearErrors: (state) => {
        state.error = null;
    },

      // update user information
  updateUserInfoRequest: (state) => {
    state.loading = true;
  },
  updateUserInfoSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  updateUserInfoFailed: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },



})

