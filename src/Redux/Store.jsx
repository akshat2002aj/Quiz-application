import { configureStore } from "@reduxjs/toolkit";
import { quizReducer } from "./Reducers/quiz";
import { authReducer } from "./Reducers/auth";
import { userReducer } from "./Reducers/user";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    user: userReducer
  },
});

export default Store;