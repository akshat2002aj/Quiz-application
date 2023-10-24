import axios from "axios";
import {toast} from 'react-hot-toast'

// all user
export const getAllUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "AllUserRequest",
    });
    const { data } = await axios.get(
      `https://treasure-hunt-tcb7.onrender.com/api/v1/user/get-all-user`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "AllUserSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "AllUserFail",
      payload: error?.response?.data?.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteRequest",
    });
    const { data } = await axios.delete(
      `https://treasure-hunt-tcb7.onrender.com/api/v1/user/delete-user/${id}`,
      { withCredentials: true }
    );
    toast.success("User deleted successfully!");
    dispatch({
      type: "DeleteSuccess",
      payload: id
    });
  } catch (error) {
    dispatch({
      type: "DeleteFail",
      payload: error?.response?.data?.message,
    });
  }
};
