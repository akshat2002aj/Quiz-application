import axios from "axios";
import { SERVER } from "../../Server";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(
      `${SERVER}/user/get-user`,
      {
        withCredentials: true,
      }
    );
    toast.success("User loaded successfully")
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error?.response?.data?.message,
    });
  }
};

// load user
export const logoutUser = () => async (dispatch) => {
  // const navigate = useNavigate();
  try {
    dispatch({
      type: "LogoutUserRequest",
    });
    const data = await axios.get(
      `${SERVER}/user/logout`,
      { withCredentials: true }
    );
    toast.success("Logout Successfully!");
    dispatch({
      type: "LogoutUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LogoutUserFail",
      payload: error?.response?.data?.message,
    });
  }
};

