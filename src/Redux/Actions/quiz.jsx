import axios from "axios";
import { toast } from "react-hot-toast";
import { SERVER } from "../../Server";

// get all quiz
export const getAllQuiz = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllQuizRequest",
    });

    const { data } = await axios.get(`${SERVER}/quiz/get-all-quiz`, {
      withCredentials: true,
    });
    dispatch({
      type: "getAllQuizSuccess",
      payload: data.quiz,
    });
  } catch (error) {
    dispatch({
      type: "getAllQuizFailed",
      payload: error.response.data.message,
    });
  }
};

// get all quiz
export const getOneQuiz = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getOneQuizRequest",
    });

    const { data } = await axios.get(`${SERVER}/quiz/get-quiz/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: "getOneQuizSuccess",
      payload: data.quiz,
    });
  } catch (error) {
    dispatch({
      type: "getOneQuizFailed",
      payload: error.response.data.message,
    });
  }
};

// get all quiz
export const registerQuiz = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "registerQuizRequest",
    });

    const { data } = await axios.post(
      `${SERVER}/register/register-user-to-quiz/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    toast.success("Registered Successfully!");
    dispatch({
      type: "registerQuizSuccess",
      payload: true,
    });
  } catch (error) {
    dispatch({
      type: "registerQuizFailed",
      payload: error.response.data.message,
    });
  }
};

// get all quiz
export const startQuiz = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "startQuizRequest",
    });

    const { data } = await axios.get(`${SERVER}/register/start-quiz/${id}`, {
      withCredentials: true,
    });
    toast.success("Quiz Started");
    dispatch({
      type: "startQuizSuccess",
      payload: {
        questions: data.questions,
        startTime: data.startTime
      },
    });
  } catch (error) {
    dispatch({
      type: "startQuizFailed",
      payload: error.response.data.message,
    });
  }
};

// all user
export const getQuestionAdmin = (id) => async (dispatch) => {
  console.log(id);
  try {
    dispatch({
      type: "GetQuestionAdminRequest",
    });
    const { data } = await axios.get(
      `${SERVER}/question/get-all-question/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "GetQuestionAdminSuccess",
      payload: data.questions,
    });
  } catch (error) {
    dispatch({
      type: "GetQuestionAdminFail",
      payload: error?.response?.data?.message,
    });
  }
};

// all user
export const getAllRegisterUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "GetAllRegisterUserRequest",
    });
    const { data } = await axios.get(
      `https://treasure-hunt-tcb7.onrender.com/api/v1/register/get-registered-quiz/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "GetAllRegisterUserSuccess",
      payload: data.register,
    });
  } catch (error) {
    dispatch({
      type: "GetAllRegisterUserFail",
      payload: error?.response?.data?.message,
    });
  }
};
