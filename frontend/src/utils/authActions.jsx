import {
  loginStart,
  loginSuccess,
  loginFailure,
  fetchProfileSuccess,
} from "@/redux/auth/auth.slice";

import { checkOtpApi } from "@/services/auth/auth.service";
import { toast } from "react-hot-toast";
import { getUserProfileApi } from "@/services/user/user.service";
export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const { data } = await checkOtpApi(credentials);
    if (data.statusCode === 200) {
      dispatch(
        loginSuccess({
          user: data.user,
        }),
      );
      toast.success(data.message);
    }
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || "Login failed"));
  }
};

export const fetchUserProfile = () => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await getUserProfileApi();
    console.log(response.user);
    dispatch(fetchProfileSuccess({ user: response.user }));
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};
