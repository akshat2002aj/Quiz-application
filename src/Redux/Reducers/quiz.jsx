import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  loader: true
};

export const quizReducer = createReducer(initialState, {
  // get all quiz
  getAllQuizRequest: (state) => {
    state.isLoading = true;
  },
  getAllQuizSuccess: (state, action) => {
    state.isLoading = false;
    state.allQuiz = action.payload;
  },
  getAllQuizFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all quiz
  getOneQuizRequest: (state) => {
    state.isLoading = true;
  },
  getOneQuizSuccess: (state, action) => {
    state.isLoading = false;
    state.quiz = action.payload;
  },
  getOneQuizFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // start quiz
  startQuizRequest: (state) => {
    state.loader = true;
  },
  startQuizSuccess: (state, action) => {
    state.loader = false;
    state.start = action.payload;
  },
  startQuizFailed: (state, action) => {
    state.loader = false;
    state.error = action.payload;
  },

  // register quiz
  registerQuizRequest: (state) => {
    state.isLoading = true;
  },
  registerQuizSuccess: (state, action) => {
    state.isLoading = false;
    state.quiz = {
      ...state.quiz,
      registered: action.payload,
      registrations: state.quiz.registrations + 1,
    };
  },
  registerQuizFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  GetQuestionAdminRequest: (state) => {
    state.isLoading = true;
  },
  GetQuestionAdminSuccess: (state, action) => {
    state.isLoading = false;
    state.allQuestion = action.payload;
  },
  GetQuestionAdminFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  GetAllRegisterUserRequest: (state) => {
    state.isLoading = true;
  },
  GetAllRegisterUserSuccess: (state, action) => {
    state.isLoading = false;
    state.users = action.payload;
  },
  GetAllRegisterUserFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
