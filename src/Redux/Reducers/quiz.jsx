import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  loader: true,
  load: true,
  submitted: false,
  deleted: false,
};

export const quizReducer = createReducer(initialState, {
  // get all quiz
  getAllQuizRequest: (state) => {
    state.isLoading = true;
    state.deleted = false;
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
    state.deleted = false;
  },
  getOneQuizSuccess: (state, action) => {
    state.isLoading = false;
    state.quiz = action.payload;
  },
  getOneQuizFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete quiz
  deleteQuizRequest: (state) => {
    state.isLoading = true;
  },
  deleteQuizSuccess: (state, action) => {
    state.isLoading = false;
    state.deleted = true;
    state.allQuiz = state.allQuiz.filter((i) => i._id !== action.payload);
  },
  deleteQuizFailed: (state, action) => {
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

  // start quiz
  submitQuizRequest: (state) => {
    state.load = true;
  },
  submitQuizSuccess: (state, action) => {
    state.load = false;
    state.result = action.payload;
    state.submitted = true;
  },
  submitQuizFailed: (state, action) => {
    state.load = false;
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

  // delete quiz
  deleteQestionRequest: (state) => {
    state.isLoading = true;
  },
  deleteQestionSuccess: (state, action) => {
    state.isLoading = false;
    // state.deleted = true;
    state.allQuestion = state.allQuestion.filter(
      (i) => i._id !== action.payload
    );
  },
  deleteQestionFailed: (state, action) => {
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
