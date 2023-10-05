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
  UP_COMMENT,
  USER_CURRENT,
} from "../../actions/types/AuthType";
import { ThongTinUser } from "../../../_core/models/ThongTinUser";
import data from "../../../assets/dataRate.json";

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
  dataComment: data.dataRate,
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
    case UP_COMMENT: {
      let dataNew = [...state.dataComment];
      // console.log({ dataNew });
      // console.log(action.userCurrent.email === "lee123@gmail.com");
      let findIndex = dataNew.findIndex((item) => {
        // console.log("EMAIL", action.userCurrent);

        return item.email === action.userCurrent.email;
      });
      // console.log("FIND", findIndex);
      if (findIndex === -1) {
        dataNew.unshift(action.userCurrent);
      } else {
        dataNew[findIndex] = action.userCurrent;
      }
      return { ...state, dataComment: dataNew };
    }
    default:
      return { ...state };
  }
};
