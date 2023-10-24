import axios from "axios";
import { SERVER } from "../../Server";

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