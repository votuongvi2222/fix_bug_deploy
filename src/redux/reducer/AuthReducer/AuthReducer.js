import { Login } from "iconsax-react";
import { USER_LOGIN } from "../../../types/configType";
import {
  DANG_NHAP_THANH_CONG,
  DANG_NHAP_THAT_BAI,
  DANG_XUAT,
  LAY_DANH_SACH_USER,
  LOGIN,
  REGISTER,
  TIM_KIEM_NGUOI_DUNG,
  USER_CURRENT,
} from "../../actions/types/AuthType";
import { ThongTinUser } from "../../../_core/models/ThongTinUser";

let userDangNhap = {};
if (localStorage.getItem(USER_LOGIN)) {
  userDangNhap = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const stateDefault = {
  user: userDangNhap,
  soDT: null,
  lstUser: [],
  userEdit: {},
  lstUserDefault: [],
};

export const AuthReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        soDT: action.dataUser.soDt,
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
    case DANG_XUAT:
      localStorage.removeItem("USER_LOGIN");
      localStorage.removeItem("accessToken");

      return {
        ...state,
        user: {},
      };
    case LAY_DANH_SACH_USER: {
      return {
        ...state,
        lstUser: action.lstUser,
        lstUserDefault: action.lstUser,
      };
    }
    case USER_CURRENT: {
      // console.log(action);
      return { ...state, userEdit: action.userEdit };
    }
    case TIM_KIEM_NGUOI_DUNG: {
      return { ...state, lstUser: action.dataUser };
    }
    default:
      return { ...state };
  }
};
