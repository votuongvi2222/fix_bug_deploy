import { Login } from "iconsax-react";
import { USER_LOGIN } from "../../../types/configType";
import {
  DANG_NHAP_THANH_CONG,
  DANG_NHAP_THAT_BAI,
  LOGIN,
  REGISTER,
} from "../../actions/types/AuthType";

let userDangNhap = {};
if (localStorage.getItem(USER_LOGIN)) {
  userDangNhap = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const stateDefault = {
  user: userDangNhap,
};

export const AuthReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
      };
    case DANG_NHAP_THANH_CONG:
      localStorage.setItem(USER_LOGIN, JSON.stringify(action.userLogin));
      localStorage.setItem(
        "accessToken",
        JSON.stringify(action.userLogin.accessToken)
      );
      return {
        ...state,
        user: action.userLogin,
      };

    default:
      return { ...state };
  }
};
